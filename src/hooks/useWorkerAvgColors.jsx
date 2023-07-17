import { useEffect, useRef, useState } from 'react';

import {
	addImageLocalStorage,
	getFromLocalStorage,
} from '../utils/localStorageOperations';
import useLoadLocalImage from './useLoadLocalImage';

export default function useWorkerAvgColors(colorMode, divsQty, imgSizes) {
	const [imgUrl, setImgUrl] = useState('');
	const [avgColors, setAvgColors] = useState([]);
	const [imgBitMap, setImgBitMap] = useState({});
	const [handleChangeImage, setHandleChangeImage] = useState({});
	const [time, setTime] = useState({
		fetchImg: { start: 0, end: 0 },
		getAvgColors: { start: 0, end: 0 },
	});
	const { loadImg } = useLoadLocalImage(setImgBitMap, setImgUrl);
	const [isLoading, setIsLoading] = useState(false);
	// Reference for worker
	const workerRef = useRef();

	useEffect(() => {
		console.log('Entrando al efect 🤖');
		const worker = new Worker('../src/workers/worker.js', { type: 'module' });
		workerRef.current = worker;
		const getNewImgFromWorker = (queryParam) => {
			const workerGetImg = new Worker('../src/workers/worker.js', {
				type: 'module',
			});

			console.log(worker);
			setAvgColors([]);
			setImgUrl();
			setImgBitMap();
			postMessageToWorker(
				'fetch-new-image',
				{ colorMode, divsQty, query: queryParam },
				workerGetImg
			).then((res) => {
				setTime({
					...time,
					fetchImg: { start: res.time.start, end: res.time.end },
				});
				addImageLocalStorage(res.blob);
				setImgUrl(res.url);
				setImgBitMap(res.imgBitMap);
			});
		};

		const getCalculationsFromWorker = () => {
			console.log('Calculating avg colors');

			postMessageToWorker(
				'calculate-pixels',
				{ colorMode, divsQty, imgBitMap },
				worker
			).then((res) => {
				setAvgColors(res.avgColors);
				setTime({
					...time,
					getAvgColors: { start: res.time.start, end: res.time.end },
				});
			});
		};

		setHandleChangeImage({
			func: (query) => {
				console.log(query);
				setAvgColors([]);
				setImgUrl();
				setImgBitMap();
				console.log('get-new-img');
				getNewImgFromWorker(query);
			},
		});
		console.log('loading? 🥌', isLoading, avgColors);

		if (!imgUrl && !isLoading) {
			console.log('Getting first image');
			const localImg = getFromLocalStorage('image-list');
			console.log(localImg);
			if (localImg.length === 0) {
				getNewImgFromWorker();
				return;
			}
			setTimeout(() => {
				loadImg(localImg[0]);
			}, 200);
			return;
		}

		if (imgBitMap && !isLoading) {
			getCalculationsFromWorker();
			return;
		}
		return () => worker.terminate();
	}, [colorMode, divsQty, imgSizes, imgBitMap]);

	function postMessageToWorker(msg, params, intWork) {
		console.log('Sending ', msg, intWork);
		intWork.postMessage({
			msg,
			params,
		});
		setIsLoading(true);
		return new Promise((res, rej) => {
			intWork.onmessage = (e) => {
				console.log('Mensaje recibido de intWork de promesa', e);
				setIsLoading(false);
				res(e.data);
				intWork.terminate();
			};
			intWork.onerror = (e) => {
				console.log(e);
				setIsLoading(false);
				rej(e);
			};
			intWork.onmessageerror = (e) => {
				console.log(e);
				setIsLoading(false);
				rej(e);
			};
		});
	}

	return {
		avgColors,
		isLoading,
		handleChangeImage,
		imgUrl,
		setImgUrl,
		time,
		setImgBitMap,
	};
}
