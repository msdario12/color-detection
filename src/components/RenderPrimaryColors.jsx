import IndividualPrimaryColor from './IndividualPrimaryColor';
import useWorkerPrimaryColors from '../hooks/useWorkerPrimaryColors';
import { useEffect } from 'react';
import { gsap } from 'gsap';

export default function RenderPrimaryColors(props) {
	const {
		avgColors,
		colorMode,
		colorTolerance,
		divsQty,
		setTimeColorPrimary,
		setColorPrimaryList,
	} = props;
	const { colorList, isLoading, timeColorPrimary } = useWorkerPrimaryColors(
		avgColors,
		colorMode,
		colorTolerance
	);
	useEffect(() => {
		setTimeColorPrimary({
			start: timeColorPrimary.start,
			end: timeColorPrimary.end,
		});
		setColorPrimaryList(colorList);
	}, [timeColorPrimary, colorList]);

	const onEnter = ({ currentTarget }) => {
		gsap.to(currentTarget, { scale: 1.2 });
	};

	const onLeave = ({ currentTarget }) => {
		gsap.to(currentTarget, { scale: 1 });
	};

	return (
		<div className='my-10'>
			<h2 className='text-4xl mb-5'>Colors</h2>
			<div className='flex gap-5 flex-wrap justify-center'>
				{colorList.length > 0 && !isLoading
					? colorList.map((color, idx) => (
							<IndividualPrimaryColor
								onEnter={onEnter}
								onLeave={onLeave}
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
