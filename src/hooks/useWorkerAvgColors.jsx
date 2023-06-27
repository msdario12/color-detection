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
		setHandleChangeImage({
			func: () => {
				postMessageToWorker(
					'fetch-new-image',
					{
						colorMode,
						divsQty,
					},
					worker
				);
				setImgUrl();
			},
		});
		console.log('dentro de effect');
		if (!imgUrl) {
			console.log('Getting first image');
			setTime({
				...time,
				fetchImg: { ...time.fetchImg, start: new Date().getTime() },
			});
			postMessageToWorker('fetch-new-image', { colorMode, divsQty }, worker);
			worker.onmessage = (e) => {
				// Set a new image in DOM
				if (e.data.url) {
					setImgUrl(e.data.url);
					setImgBitMap(e.data.imgBitMap);
					setTime({
						...time,
						fetchImg: { ...time.fetchImg, end: new Date().getTime() },
					});
				}
				if (e.data.avgColors) {
					setAvgColors(e.data.avgColors);
					setTime({
						...time,
						getAvgColors: { ...time.fetchImg, end: new Date().getTime() },
					});
				}
				setIsLoading(false);
			};
			return () => {
				worker.terminate();
			};
		}
		setTime({
			...time,
			getAvgColors: { ...time.fetchImg, start: new Date().getTime() },
		});
		postMessageToWorker(
			'calculate-pixels',
			{ colorMode, divsQty, imgBitMap },
			worker
		);

		worker.onmessage = (e) => {
			console.log(e);

			if (e.data.avgColors) {
				setAvgColors(e.data.avgColors);
			}
			setIsLoading(false);
		};

		return () => {
			worker.terminate();
		};
	}, [colorMode, divsQty, imgSizes, imgBitMap, imgUrl]);

	function postMessageToWorker(msg, params, worker) {
		console.log('Sending ', msg);
		setIsLoading(true);
		worker.postMessage({
			msg,
			params,
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
