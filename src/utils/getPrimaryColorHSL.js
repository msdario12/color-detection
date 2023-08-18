import { getAvgColorHSL } from './getAvgColor';

const getPrimaryColorHSL = async (colorList, colorTolerance) => {
	let result = [];
	const percentage = colorTolerance;
	const toleranceH = (percentage / 100) * 360 * 1.1;
	const tolerance = percentage;

	// Convertimos los valores a HSL
	const HSlColors = colorList;
	for (let i = 0; i < HSlColors.length; i++) {
		const Hc = HSlColors[i].HSL[0];
		const Sc = HSlColors[i].HSL[1];
		const Lc = HSlColors[i].HSL[2];

		let similarColors = [];

		similarColors.push({ HSL: colorList[i].HSL });

		for (let j = i; j < HSlColors.length; j++) {
			const H = HSlColors[j].HSL[0];
			const S = HSlColors[j].HSL[1];
			const L = HSlColors[j].HSL[2];

			const HCompare = Hc - toleranceH <= H && Hc + toleranceH >= H;
			const SCompare = Sc - tolerance <= S && Sc + tolerance >= S;
			const LCompare = Lc - tolerance <= L && Lc + tolerance >= L;

			if (HCompare && SCompare && LCompare) {
				similarColors.push({ HSL: HSlColors[j].HSL });
				HSlColors.splice(j, 1);
				j = 0;
			}
		}
		result.push({
			base: similarColors[0],
			similarColors,
		});
		HSlColors.splice(i, 1);
	}
	// Ordeno el array en relacion a la cantidad de elementos de similarColors
	result.sort((a, b) => b.similarColors.length - a.similarColors.length);

	let divPromises = [];
	// Iteramos el array de resultado para crear un div por cada base color
	result.forEach(async (baseAndSimilarColorObj) => {
		const avgBaseColor = await getAvgColorHSL(
			baseAndSimilarColorObj.similarColors,
			baseAndSimilarColorObj.similarColors.length
		);

		// Reemplazamos el color base con este promedio
		baseAndSimilarColorObj.base.HSL = [
			avgBaseColor.H,
			avgBaseColor.S,
			avgBaseColor.L,
		];
	});

	Promise.allSettled(divPromises);

	// const formatResult = result.map((color) => color.base.HSL);
	console.log(result);

	return result;
};

export default getPrimaryColorHSL;
