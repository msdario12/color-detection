import IndividualPrimaryColor from './IndividualPrimaryColor';
import useWorkerPrimaryColors from '../hooks/useWorkerPrimaryColors';

export default function RenderPrimaryColors(props) {
	const { avgColors, colorMode, colorTolerance, divsQty } = props;
	const { colorList, isLoading } = useWorkerPrimaryColors(
		avgColors,
		colorMode,
		colorTolerance
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
