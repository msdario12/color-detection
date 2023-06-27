import IndividualPrimaryColor from './IndividualPrimaryColor';
import useWorkerPrimaryColors from '../hooks/useWorkerPrimaryColors';
import { useEffect } from 'react';

export default function RenderPrimaryColors(props) {
	const { avgColors, colorMode, colorTolerance, divsQty, setTimeColorPrimary } =
		props;
	const { colorList, isLoading, timeColorPrimary } = useWorkerPrimaryColors(
		avgColors,
		colorMode,
		colorTolerance
	);
	useEffect(
		() =>
			setTimeColorPrimary({
				start: timeColorPrimary.start,
				end: timeColorPrimary.end,
			}),
		[timeColorPrimary]
	);

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
