import { useEffect, useRef, useState } from 'react';

export default function useWorkerAvgColors(colorMode, divsQty, imgSizes) {
	const [imgUrl, setImgUrl] = useState('');
	const [avgColors, setAvgColors] = useState([]);
	const [imgBitMap, setImgBitMap] = useState({});
	const [handleChangeImage, setHandleChangeImage] = useState({});
	const [time, setTime] = useState({
		fetchImg: { start: 0, end: 0 },
		getAvgColors: { start: 0, end: 0 },
	});

	const [isLoading, setIsLoading] = useState(false);
	// Reference for worker
	const workerRef = useRef();

	useEffect(() => {
		const worker = new Worker('../src/workers/worker.js', { type: 'module' });
		workerRef.current = worker;
		console.log(imgBitMap);
		const getNewImgFromWorker = () => {
			postMessageToWorker(
				'fetch-new-image',
				{ colorMode, divsQty },
				worker
			).then((res) => {
				setTime({
					...time,
					fetchImg: { start: res.time.start, end: res.time.end },
				});
				setImgUrl(res.url);
				setImgBitMap(res.imgBitMap);
			});
		};

		const getCalculationsFromWorker = () => {
			postMessageToWorker(
				'calculate-pixels',
				{ colorMode, divsQty, imgBitMap },
				worker
			).then((res) => {
				setTime({
					...time,
					getAvgColors: { start: res.time.start, end: res.time.end },
				});
				setAvgColors(res.avgColors);
			});
		};

		setHandleChangeImage({
			func: () => {
				setImgUrl();
				setImgBitMap();
				console.log('get-new-img');
				getNewImgFromWorker();
			},
		});

		if (!imgUrl) {
			console.log('Getting first image');

			getNewImgFromWorker();

			return;
		}

		console.log('loading?', isLoading);

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
				console.log('Mensaje recibido de intWork de promesa');
				setIsLoading(false);
				res(e.data);
				intWork.terminate();
			};
			intWork.onerror = (e) => {
				console.log(e);
				rej(e);
			};
			intWork.onmessageerror = (e) => {
				console.log(e);
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
