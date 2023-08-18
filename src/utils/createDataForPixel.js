import { getAvgColor, getAvgColorHSL } from './getAvgColor';

async function createDataForPixel(
	colors,
	h,
	w,
	deltaW,
	deltaH,
	scaleW,
	scaleH,
	colorRGBstate,
	colorHSLstate,
	divisionQtyState
) {
	const totalPixels = deltaW * deltaH;

	// Llamamos a la funcion encargada de obtener el color promedio de la imagen
	let colorRGBString, colorHSLString, fillColor;

	if (colorRGBstate) {
		const avgColorRGB = await getAvgColor(colors, totalPixels);
		colorRGBString = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;
		fillColor = {
			RGBArray: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
			fillStyle: `rgb(${colorRGBString})`,
		};
	}
	if (colorHSLstate) {
		const avgColorHSL = await getAvgColorHSL(colors, totalPixels);
		colorHSLString = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
		fillColor = {
			HSLArray: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
			fillStyle: `hsl(${colorHSLString})`,
		};
	}
	// Calculamos la escala entre las dimensiones naturales y renderizadas

	const deltaWScale = deltaW / scaleW;
	const deltaHScale = deltaH / scaleH;
	const drawRectangle = {
		hIndex: h,
		wIndex: w,
		deltaW: deltaWScale,
		deltaH: deltaHScale,
	};
	// Insertar string del color en cada cuadrado del canvas
	let drawText;
	// if (divisionQtyState <= 5) {
	// 	drawText = {
	// 		textColor: colorRGBstate ? colorRGBString : colorHSLString,
	// 		wPos: w * scaleW,
	// 		hPos: h * scaleH,
	// 	};
	// }

	return { fillColor, drawRectangle, drawText };
}

export default createDataForPixel;
