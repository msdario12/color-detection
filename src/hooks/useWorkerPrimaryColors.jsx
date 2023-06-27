import { useEffect, useState, useRef } from 'react';

export default function useWorkerPrimaryColors(
	avgColors,
	colorMode,
	colorTolerance
) {
	const [colorList, setColorList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const workerRef = useRef();

	// Get the current state of worker, and save in a variable

	useEffect(() => {
		const worker = new Worker('../src/workers/workerPrimaryColors.js', {
			type: 'module',
		});
		workerRef.current = worker;

		setIsLoading(true);
		worker.postMessage({
			msg: 'get-primary-colors',
			avgColors,
			colorMode,
			colorTolerance,
		});
		worker.onmessage = (e) => {
			if (e.data.primaryColor) {
				setColorList(e.data.primaryColor);
				setIsLoading(false);
			}
		};
		return () => {
			worker.terminate();
		};
	}, [avgColors, colorMode, colorTolerance]);

	return {
		colorList,
		isLoading,
	};
}
