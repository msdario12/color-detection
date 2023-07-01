import IndividualPrimaryColor from './IndividualPrimaryColor';
import useWorkerPrimaryColors from '../hooks/useWorkerPrimaryColors';
import { useEffect, useRef, useState } from 'react';
import useHoverAnimation from '../hooks/useHoverAnimation';
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
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [offsetDiv, setOffsetDiv] = useState({ x: 0, y: 0 });
	const [hoverColor, setHoverColor] = useState({});
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

	function handleMouseEnter(color) {
		setHoverColor(color);
	}
	function handleMouseLeave() {
		setHoverColor({});
	}
	function handleMouseMove(e) {
		setMousePosition({ x: e.clientX, y: e.clientY });
	}
	function handleScroll(ref) {
		const current = ref.current;
		const boundingDiv = current.getBoundingClientRect();

		setOffsetDiv({
			x: boundingDiv.x,
			y: boundingDiv.y,
			w: boundingDiv.width,
			h: boundingDiv.height,
		});
	}

	const isHoverColor = hoverColor.base;

	useEffect(() => {
		const current = divRef.current;
		const boundingDiv = current.getBoundingClientRect();

		setOffsetDiv({
			x: boundingDiv.x,
			y: boundingDiv.y,
			w: boundingDiv.width,
			h: boundingDiv.height,
		});

		if (isHoverColor) {
			document.onscroll = () => handleScroll(divRef);
			window.onmousemove = handleMouseMove;
		}

		return () => {
			window.onmousemove = null;
			current.onscroll = null;
		};
	}, [hoverColor]);

	const isColorSmall = colorWidth < 150;

	return (
		<div ref={divRef} className='my-10'>
			<h2 className='mb-3 text-4xl text-slate-200'>Colors</h2>
			<p className='mb-3'>Se seleccionaron {colorList.length} colores</p>
			<div className='relative flex flex-wrap justify-center'>
				{colorList.length > 0 && !isLoading
					? colorList.map((color, idx) => (
							<IndividualPrimaryColor
								style={{ width: colorWidth }}
								className={`text-center`}
								onEnter={handleMouseEnter}
								onLeave={handleMouseLeave}
								divsQty={divsQty}
								key={'C' + idx}
								colorMode={colorMode}
								color={color}
								isColorSmall={isColorSmall}
							/>
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  ))
					: 'Cargando datos de los colores primarios...'}
				{isHoverColor ? (
					<PopoverPrimaryColor
						colorMode={colorMode}
						hoverColor={hoverColor}
						divsQty={divsQty}
						style={{
							top: mousePosition.y - offsetDiv.y - offsetDiv.h / 2,
							left: mousePosition.x - offsetDiv.x + 25,
						}}
					/>
				) : (
					''
				)}
			</div>
		</div>
	);
}
