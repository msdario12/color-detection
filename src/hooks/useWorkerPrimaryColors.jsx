import { useEffect, useState, useRef } from 'react';

export default function useWorkerPrimaryColors(
	avgColors,
	colorMode,
	colorTolerance
) {
	const [colorList, setColorList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const workerRef = useRef(
		new Worker('../src/workers/workerPrimaryColors.js', { type: 'module' })
	);

	// Get the current state of worker, and save in a variable
	const worker = workerRef.current;

	useEffect(() => {
		setIsLoading(true);
		worker.postMessage({
			msg: 'get-primary-colors',
			avgColors,
			colorMode,
			colorTolerance,
		});
	}, [avgColors, colorMode, colorTolerance]);

	worker.onmessage = (e) => {
		if (e.data.primaryColor) {
			setColorList(e.data.primaryColor);
			setIsLoading(false);
		}
	};
	return {
		colorList,
		isLoading,
	};
}
