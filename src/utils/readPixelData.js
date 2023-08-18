import RGBToHSL from './RGBToHSL';

function readPixelData(dataColor) {
	let colors = [];
	// Obtenemos los valores de R,G,B y A de cada pixel, saltando de a 4 elementos

	for (let i = 0; i < dataColor.length; i += 4) {
		const R = dataColor[i];
		const G = dataColor[i + 1];
		const B = dataColor[i + 2];
		// A: dataColor[i + 3],

		const HSLArray = RGBToHSL([R, G, B]);

		colors.push({
			RGB: [R, G, B],
			HSL: [HSLArray[0], HSLArray[1], HSLArray[2]],
		});
	}
	return colors;
}

export default readPixelData;
