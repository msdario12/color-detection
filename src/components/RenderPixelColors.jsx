import { gsap } from 'gsap';
import Canvas from './Canvas';
import { useEffect, useRef } from 'react';

export default function RenderPixelColors(props) {
	const { imgSizes, colorMode, avgColors, style } = props;

	const scaleW = imgSizes.naturalSize.w / imgSizes.renderSize.w;
	const scaleH = imgSizes.naturalSize.h / imgSizes.renderSize.h;

	const colorHSLstate = colorMode === 'HSL' ? true : false;
	const colorRGBstate = colorMode === 'RGB' ? true : false;

	const difRef = useRef(null);

	useEffect(() => {
		gsap.from(difRef.current, {
			duration: 0.5,
			autoAlpha: 0,
			ease: 'none',
		});
	}, []);

	return (
		<div style={style} ref={difRef} id='newCanvas'>
			<Canvas
				avgColors={avgColors}
				scaleH={scaleH}
				scaleW={scaleW}
				colorHSLstate={colorHSLstate}
				colorRGBstate={colorRGBstate}
				imgSizes={imgSizes}
			/>
		</div>
	);
}
