import { useEffect, useRef, useState } from 'react';

export default function useWorkerAvgColors(colorMode, divsQty, imgSizes) {
	const [imgUrl, setImgUrl] = useState('');
	const [avgColors, setAvgColors] = useState([]);

	const [isLoading, setIsLoading] = useState(false);
	// Reference for worker
	const workerRef = useRef(
		new Worker('../src/workers/worker.js', { type: 'module' })
	);

	// Get the current state of worker, and save in a variable
	const worker = workerRef.current;

	function postMessageToWorker(msg, params) {
		setIsLoading(true);
		worker.postMessage({
			msg,
			params,
		});
	}

	useEffect(() => {
		if (!imgUrl) {
			console.log('Getting first image');
			postMessageToWorker('fetch-new-image', { colorMode, divsQty });
			return;
		}
		postMessageToWorker('calculate-pixels', { colorMode, divsQty });
	}, [colorMode, divsQty, imgSizes]);

	function handleChangeImage() {
		// Send message to web worker to get a new image
		postMessageToWorker('fetch-new-image', { colorMode, divsQty });
	}

	worker.onmessage = (e) => {
		// Set a new image in DOM
		if (e.data.url) {
			setImgUrl(e.data.url);
			console.log(e.data.url);
		}
		if (e.data.avgColors) {
			setAvgColors(e.data.avgColors);
		}
		setIsLoading(false);
	};
	return {
		avgColors,
		isLoading,
		handleChangeImage,
		imgUrl,
	};
}
