import { useEffect, useState, useRef } from 'react';
import PrimaryColorsWorker from '../workers/workerPrimaryColors?worker';

export default function useWorkerPrimaryColors(
	avgColors,
	colorMode,
	colorTolerance
) {
	const [colorList, setColorList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [timeColorPrimary, setTimeColorPrimary] = useState({
		start: 0,
		end: 0,
	});

	const workerRef = useRef();

	// Get the current state of worker, and save in a variable

	useEffect(() => {
		const worker = new PrimaryColorsWorker();
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

				setTimeColorPrimary({ start: e.data.time.start, end: e.data.time.end });
			}
		};
		return () => {
			worker.terminate();
		};
	}, [avgColors, colorMode, colorTolerance]);

	return {
		colorList,
		isLoading,
		timeColorPrimary,
	};
}
