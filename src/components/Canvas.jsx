import { useEffect, useRef } from 'react';

export default function Canvas(props) {
	const { avgColors, colorRGBstate, colorHSLstate, scaleW, scaleH, imgSizes } =
		props;
	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;

		canvas.width = imgSizes.renderSize.w;
		canvas.height = imgSizes.renderSize.h;

		const ctxColor = canvas.getContext('2d', { willReadFrequently: true });

		avgColors.map((color) => {
			if (colorRGBstate) {
				ctxColor.fillStyle = color.fillColor.fillStyle;
			}
			if (colorHSLstate) {
				ctxColor.fillStyle = color.fillColor.fillStyle;
			}

			let { wIndex, hIndex, deltaW, deltaH } = color.drawRectangle;
			deltaW /= scaleW;
			deltaH /= scaleH;
			// Insertar string del color en cada cuadrado del canvas
			ctxColor.fillRect(wIndex * deltaW, hIndex * deltaH, deltaW, deltaH);

			if (color.drawText) {
				ctxColor.font = '12px Arial';
				ctxColor.textAlign = 'center';

				ctxColor.strokeText(
					color.drawText.textColor,
					color.drawText.wPos,
					color.drawText.hPos
				);
			}
		});
	}, [avgColors]);

	return (
		<div id='newCanvas'>
			<canvas id='canvas-color' ref={canvasRef}></canvas>
		</div>
	);
}
