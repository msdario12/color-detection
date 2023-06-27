import Canvas from './Canvas';

export default function RenderPixelColors(props) {
	const { imgSizes, colorMode, avgColors, style } = props;

	const scaleW = imgSizes.naturalSize.w / imgSizes.renderSize.w;
	const scaleH = imgSizes.naturalSize.h / imgSizes.renderSize.h;

	const colorHSLstate = colorMode === 'HSL' ? true : false;
	const colorRGBstate = colorMode === 'RGB' ? true : false;

	return (
		<div style={style} id='newCanvas'>
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
