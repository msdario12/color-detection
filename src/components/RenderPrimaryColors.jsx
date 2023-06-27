import { useEffect, useState, useRef } from 'react';
import IndividualPrimaryColor from './IndividualPrimaryColor';

function useWorkerPrimaryColors() {}

export default function RenderPrimaryColors(props) {
	const { avgColors, colorMode, colorTolerance, divsQty } = props;
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

	return (
		<div className='my-10'>
			<h2 className='text-4xl mb-5'>Colors</h2>
			<div className='flex gap-5 flex-wrap justify-center'>
				{colorList.length > 0 && !isLoading
					? colorList.map((color, idx) => (
							<IndividualPrimaryColor
								divsQty={divsQty}
								key={'C' + idx}
								colorMode={colorMode}
								color={color}
							/>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))
					: 'Cargando datos de los colores primarios...'}
			</div>
		</div>
	);
}
