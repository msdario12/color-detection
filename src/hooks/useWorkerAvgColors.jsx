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

		console.log('setFunction');
		setHandleChangeImage({
			func: () => {
				setImgUrl();
				setImgBitMap();
				console.log('get-new-img');
				postMessageToWorker(
					'fetch-new-image',
					{ colorMode, divsQty },
					worker
				).then((res) => {
					setImgUrl(res.url);
					setImgBitMap(res.imgBitMap);
					setTime({
						...time,
						fetchImg: { ...time.fetchImg, end: new Date().getTime() },
					});
				});
			},
		});

		if (!imgUrl) {
			console.log('Getting first image');
			setTime({
				...time,
				fetchImg: { ...time.fetchImg, start: new Date().getTime() },
			});
			postMessageToWorker(
				'fetch-new-image',
				{ colorMode, divsQty },
				worker
			).then((res) => {
				console.log(res);
				setImgUrl(res.url);
				setImgBitMap(res.imgBitMap);
				setTime({
					...time,
					fetchImg: { ...time.fetchImg, end: new Date().getTime() },
				});
			});

			return;
		}

		console.log('loading?', isLoading);

		if (imgBitMap && !isLoading) {
			setTime({
				...time,
				getAvgColors: { ...time.fetchImg, start: new Date().getTime() },
			});
			postMessageToWorker(
				'calculate-pixels',
				{ colorMode, divsQty, imgBitMap },
				worker
			).then((res) => setAvgColors(res.avgColors));
			return;
		}
		return () => worker.terminate();
	}, [colorMode, divsQty, imgSizes, imgBitMap, imgUrl]);

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
		time,
	};
}
