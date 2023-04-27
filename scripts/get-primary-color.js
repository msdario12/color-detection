const getPrimaryColor = (colorList) => {
	const result = [];
	const tolerance = 5;

	for (let i = 0; i < colorList.length; i++) {
		const Rc = colorList[i].RGB[0];
		const Gc = colorList[i].RGB[1];
		const Bc = colorList[i].RGB[2];

		let similarsColors = [];

		for (let j = i; j < colorList.length; j++) {
			const R = colorList[j].RGB[0];
			const G = colorList[j].RGB[1];
			const B = colorList[j].RGB[2];

			const redCompare = Rc - tolerance < R && Rc + tolerance > R;
			const greenCompare = Gc - tolerance < G && Gc + tolerance > G;
			const blueCompare = Bc - tolerance < B && Bc + tolerance > B;

			if (redCompare && greenCompare && blueCompare) {
				similarsColors.push(colorList[j].RGB);
				// colorList.splice(j, 1)
			}
		}
		if (similarsColors.length > 3) {
			result.push({
				base: colorList[i],
				similarsColors,
			});
		}
	}
	console.log(result);
	return result;
};

const getPrimaryColorHSL = (colorList) => {
	let result = [];
	const tolerance = 5;

	// Convertimos los valores a HSL
	const HSlColors = colorList.map((color) => RGBToHSL(color.RGB));
	console.log(HSlColors);
	for (let i = 0; i < HSlColors.length; i++) {
		const Hc = HSlColors[i].HSL[0];
		const Sc = HSlColors[i].HSL[1];
		const Bc = HSlColors[i].HSL[2];

		let similarsColors = [];

		for (let j = i + 1; j < HSlColors.length; j++) {
			const R = HSlColors[j].HSL[0];
			const G = HSlColors[j].HSL[1];
			const B = HSlColors[j].HSL[2];

			const redCompare = Hc - tolerance <= R && Hc + tolerance >= R;
			const greenCompare = Sc - tolerance <= G && Sc + tolerance >= G;
			const blueCompare = Bc - tolerance <= B && Bc + tolerance >= B;

			if (redCompare && greenCompare && blueCompare) {
				similarsColors.push(HSlColors[j].HSL);
				// HSlColors.splice(j, 1);
			}
		}
		if (similarsColors.length > 0) {
			result.push({
				base: HSlColors[i],
				similarsColors,
			});
		}
	}
	// Ordenamos el resultado en funcion de la saturacion del color, que es la posicion 1 del array.
	result.sort((a, b) => b.similarsColors[1] - a.similarsColors[1]);
	// Ordeno el array en relacion a la cantidad de elementos de similarColors
	// result.sort((a, b) => b.similarsColors.length - a.similarsColors.length);

	console.log("1ero", result[0]);
	// console.log("2do", result[1]);
	// console.log("3ro", result[2]);

	return result;
};
