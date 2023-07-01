import IndividualPrimaryColor from './IndividualPrimaryColor';
import useWorkerPrimaryColors from '../hooks/useWorkerPrimaryColors';
import { useEffect, useRef, useState } from 'react';
import useHoverAnimation from '../hooks/useHoverAnimation';

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
	const [colorWidth, setColorWidth] = useState('');
	const { onEnter, onLeave } = useHoverAnimation();
	const divRef = useRef(null);
	useEffect(() => {
		setTimeColorPrimary({
			start: timeColorPrimary.start,
			end: timeColorPrimary.end,
		});
		setColorPrimaryList(colorList);
	}, [timeColorPrimary, colorList]);

	useEffect(() => {
		if (divRef.current.clientWidth && colorList.length > 0) {
			const clientWidth = divRef.current.clientWidth;
			const colorNumber = colorList.length;
			setColorWidth(Math.floor(clientWidth / colorNumber));
			console.log(colorWidth);
		}
	}, [divRef, colorList]);

	const isColorSmall = colorWidth < 150;

	return (
		<div ref={divRef} className='my-10'>
			<h2 className='mb-5 text-4xl'>Colors</h2>
			<p>Se seleccionaron {colorList.length} colores</p>
			<div className='flex flex-wrap justify-center'>
				{colorList.length > 0 && !isLoading
					? colorList.map((color, idx) => (
							<IndividualPrimaryColor
								style={{ width: colorWidth }}
								className={`text-center`}
								onEnter={onEnter}
								onLeave={onLeave}
								divsQty={divsQty}
								key={'C' + idx}
								colorMode={colorMode}
								color={color}
								isColorSmall={isColorSmall}
							/>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))
					: 'Cargando datos de los colores primarios...'}
			</div>
		</div>
	);
}
