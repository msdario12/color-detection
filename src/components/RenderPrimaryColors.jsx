import IndividualPrimaryColor from './IndividualPrimaryColor';
import useWorkerPrimaryColors from '../hooks/useWorkerPrimaryColors';
import { useEffect, useRef, useState } from 'react';
import PopoverPrimaryColor from './PopoverPrimaryColor';

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
	const [isMobile, setIsMobile] = useState(false);
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
			const clientWidth = divRef.current.clientWidth - 225;
			const colorNumber = colorList.length;
			if (clientWidth < 500) {
				console.log('Mobile!');
			}
			setColorWidth(Math.floor(clientWidth / colorNumber));
		}
	}, [divRef, colorList]);

	const isColorSmall = colorWidth < 175;

	return (
		<div ref={divRef} className='my-10'>
			<h2 className='mb-3 text-4xl text-slate-200'>Colors</h2>
			<p className='mb-3'>Se seleccionaron {colorList.length} colores</p>
			<div className='relative flex flex-wrap justify-center md:flex-row'>
				{colorList.length > 0 && !isLoading
					? colorList.map((color, idx) => (
							<IndividualPrimaryColor
								className={`relative text-center`}
								divsQty={divsQty}
								key={'C' + idx}
								colorMode={colorMode}
								color={color}
								colorWidth={colorWidth}
								isColorSmall={isColorSmall}
							/>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))
					: 'Cargando datos de los colores primarios...'}
			</div>
		</div>
	);
}
