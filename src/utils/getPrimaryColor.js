import { getAvgColor } from './getAvgColor';

const getPrimaryColor = async (colorList, colorTolerance) => {
	// colorList = [...,{RGB:[R, G, B], HSL:[H, S, L]}, ...]
	let result = [];
	const percentage = colorTolerance;
	const tolerance = (percentage / 100) * 255;
	// let totalReps = 0;
	async function asyncCompare(i, colorList, similarColors, Rc, Gc, Bc) {
		for (let j = i; j < colorList.length; j++) {
			const R = colorList[j].RGB[0];
			const G = colorList[j].RGB[1];
			const B = colorList[j].RGB[2];

			const redCompare = Rc - tolerance <= R && Rc + tolerance >= R;
			const greenCompare = Gc - tolerance <= G && Gc + tolerance >= G;
			const blueCompare = Bc - tolerance <= B && Bc + tolerance >= B;

			if (redCompare && greenCompare && blueCompare) {
				similarColors.push({ RGB: colorList[j].RGB });
				colorList.splice(j, 1);
				j = 0;
			}
		}
	} // end function

	for (let i = 0; i < colorList.length; i++) {
		const Rc = colorList[i].RGB[0];
		const Gc = colorList[i].RGB[1];
		const Bc = colorList[i].RGB[2];

		let similarColors = [];

		similarColors.push({ RGB: colorList[i].RGB });

		asyncCompare(i, colorList, similarColors, Rc, Gc, Bc);

		result.push({
			base: similarColors[0],
			similarColors,
		});
		colorList.splice(i, 1);
	}
	// Ordeno el array en relacion a la cantidad de elementos de similarColors
	result.sort((a, b) => b.similarColors.length - a.similarColors.length);
	let divPromises = [];

	// Iteramos el array de resultado para crear un div por cada base color
	result.forEach(async (baseAndSimilarColorObj) => {
		// Color promedio de la lista de colores similares
		const avgBaseColor = await getAvgColor(
			baseAndSimilarColorObj.similarColors,
			baseAndSimilarColorObj.similarColors.length
		);
		delete baseAndSimilarColorObj.similarColors;

		// Reemplazamos el color base con este promedio
		baseAndSimilarColorObj = [avgBaseColor.R, avgBaseColor.G, avgBaseColor.B];
	});

	Promise.allSettled(divPromises);

	const formatResult = result.map((color) => color.base);

	return formatResult;
};

export default getPrimaryColor;
