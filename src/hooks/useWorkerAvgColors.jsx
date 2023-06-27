import { useEffect, useRef, useState } from 'react';

export default function useWorkerAvgColors(colorMode, divsQty, imgSizes) {
	const [imgUrl, setImgUrl] = useState('');
	const [avgColors, setAvgColors] = useState([]);
	const [imgBitMap, setImgBitMap] = useState({});
	const [handleChangeImage, setHandleChangeImage] = useState({});

	const [isLoading, setIsLoading] = useState(false);
	// Reference for worker
	const workerRef = useRef();

	useEffect(() => {
		const worker = new Worker('../src/workers/worker.js', { type: 'module' });
		workerRef.current = worker;
		setHandleChangeImage({
			func: () =>
				postMessageToWorker(
					'fetch-new-image',
					{
						colorMode,
						divsQty,
					},
					worker
				),
		});
		console.log('dentro de effect');
		if (!imgUrl) {
			console.log('Getting first image');
			postMessageToWorker('fetch-new-image', { colorMode, divsQty }, worker);
			worker.onmessage = (e) => {
				// Set a new image in DOM
				if (e.data.url) {
					setImgUrl(e.data.url);
					setImgBitMap(e.data.imgBitMap);
					console.log(e.data.url);
				}
				if (e.data.avgColors) {
					setAvgColors(e.data.avgColors);
				}
				setIsLoading(false);
			};
			return () => {
				worker.terminate();
			};
		}
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
	}, [colorMode, divsQty, imgSizes]);

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
	};
}
