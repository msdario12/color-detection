import { getAvgColorHSL } from './getAvgColor';

const getPrimaryColorHSL = async (colorList) => {
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

		let similarsColors = [];

		similarsColors.push({ HSL: colorList[i].HSL });

		for (let j = i; j < HSlColors.length; j++) {
			const H = HSlColors[j].HSL[0];
			const S = HSlColors[j].HSL[1];
			const L = HSlColors[j].HSL[2];

			const HCompare = Hc - toleranceH <= H && Hc + toleranceH >= H;
			const SCompare = Sc - tolerance <= S && Sc + tolerance >= S;
			const LCompare = Lc - tolerance <= L && Lc + tolerance >= L;

			if (HCompare && SCompare && LCompare) {
				similarsColors.push({ HSL: HSlColors[j].HSL });
				HSlColors.splice(j, 1);
				j = 0;
			}
		}
		result.push({
			base: similarsColors[0],
			similarsColors,
		});
		HSlColors.splice(i, 1);
	}
	// Ordeno el array en relacion a la cantidad de elementos de similarColors
	result.sort((a, b) => b.similarsColors.length - a.similarsColors.length);
	showColor.innerHTML = '';
	let divPromises = [];
	// Iteramos el array de resultado para crear un div por cada base color
	result.forEach(async (baseAndSimilarColorObj) => {
		const avgBaseColor = await getAvgColorHSL(
			baseAndSimilarColorObj.similarsColors,
			baseAndSimilarColorObj.similarsColors.length
		);
		// Reemplazamos el color base con este promedio
		baseAndSimilarColorObj.base.HSL = [
			avgBaseColor.H,
			avgBaseColor.S,
			avgBaseColor.L,
		];

		divPromises.push(createDivWithBgColor(baseAndSimilarColorObj.base));
	});

	Promise.allSettled(divPromises);

	return result;
};

export default getPrimaryColorHSL;
