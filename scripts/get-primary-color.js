// Creamos nuevo canvas para los colores primarios
// const primaryColorsCanvas = document.createElement('canvas')
// const ctxPrimaryColors = primaryColorsCanvas.getContext('2d')
// primaryColorsCanvas.width = '300px'
// primaryColorsCanvas.height = '600px'

const getPrimaryColor = (colorList) => {
	const result = [];
	const percentage = colorTolerance;
	const tolerance = (percentage / 100) * 255;
	let totalReps = 0;
	for (let i = 0; i < colorList.length; i++) {
		const Rc = colorList[i].RGB[0];
		const Gc = colorList[i].RGB[1];
		const Bc = colorList[i].RGB[2];

		let similarsColors = [];

		similarsColors.push(colorList[i].RGB);

		for (let j = i; j < colorList.length; j++) {
			const R = colorList[j].RGB[0];
			const G = colorList[j].RGB[1];
			const B = colorList[j].RGB[2];

			const redCompare = Rc - tolerance <= R && Rc + tolerance >= R;
			const greenCompare = Gc - tolerance <= G && Gc + tolerance >= G;
			const blueCompare = Bc - tolerance <= B && Bc + tolerance >= B;

			if (redCompare && greenCompare && blueCompare) {
				similarsColors.push(colorList[j].RGB);
				colorList.splice(j, 1);
				j = 0;
			}
		}

		result.push({
			base: colorList[i] ? colorList[i] : similarsColors[0],
			similarsColors,
		});
		colorList.splice(i, 1);
	}
	// Ordeno el array en relacion a la cantidad de elementos de similarColors
	result.sort((a, b) => b.similarsColors.length - a.similarsColors.length);

	// console.log("resultado de primary", result[0]);
	showColor.innerHTML = "";

	result.forEach((match) => {
		const avgBaseColor = getAvgColor(
			match.similarsColors,
			match.similarsColors.length
		);
		match.base.RGB = [avgBaseColor.R, avgBaseColor.G, avgBaseColor.B];
		const [R, G, B] = match.base.RGB;
		const [H, S, L] = RGBToHSL(match.base.RGB);
		const divColor = document.createElement("div");
		const textDiv = document.createElement("div");
		totalReps += match.similarsColors.length;
		textDiv.innerHTML = `Repeats: ${match.similarsColors.length} <br>
		hsl[${[H, S, L]}] <br>
		rgb[${match.base.RGB}]
		`;
		const style = divColor.style;
		const textStyle = textDiv.style;
		L > 40 ? (textStyle.color = "black") : (textStyle.color = "white");
		style.textAlign = "center";
		style.display = "flex";
		style.justifyContent = "center";
		style.alignItems = "center";
		// divColor.appendChild(textDiv);
		style.width = style.height = "100px";
		style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
		showColor.insertBefore(divColor, null);
	});
	console.log("Total repeticiones", totalReps);
	console.log("1er PrimaryColor", result[0]);
	return result;
};

const getPrimaryColorHSL = (colorList) => {
	let result = [];
	const tolerance = 5;

	// Convertimos los valores a HSL
	const HSlColors = colorList;
	// console.log(HSlColors);
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
	result.sort((a, b) => b.similarsColors.length - a.similarsColors.length);

	console.log("1er PrimaryColor", result[0]);
	// console.log("2do", result[1]);
	// console.log("3ro", result[2]);

	return result;
};
