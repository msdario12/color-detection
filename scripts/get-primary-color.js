const getPrimaryColor = (colorList) => {
	// colorList = [...,{RGB:[R, G, B], HSL:[H, S, L]}, ...]
	showColor.innerHTML = '';
	let result = [];
	const percentage = colorTolerance;
	const tolerance = (percentage / 100) * 255;
	let totalReps = 0;
	for (let i = 0; i < colorList.length; i++) {
		const Rc = colorList[i].RGB[0];
		const Gc = colorList[i].RGB[1];
		const Bc = colorList[i].RGB[2];

		let similarsColors = [];

		similarsColors.push({ RGB: colorList[i].RGB });

		for (let j = i; j < colorList.length; j++) {
			const R = colorList[j].RGB[0];
			const G = colorList[j].RGB[1];
			const B = colorList[j].RGB[2];

			const redCompare = Rc - tolerance <= R && Rc + tolerance >= R;
			const greenCompare = Gc - tolerance <= G && Gc + tolerance >= G;
			const blueCompare = Bc - tolerance <= B && Bc + tolerance >= B;

			if (redCompare && greenCompare && blueCompare) {
				similarsColors.push({ RGB: colorList[j].RGB });
				colorList.splice(j, 1);
				j = 0;
			}
		}

		result.push({
			base: similarsColors[0],
			similarsColors,
		});
		colorList.splice(i, 1);
	}
	// Ordeno el array en relacion a la cantidad de elementos de similarColors
	result.sort((a, b) => b.similarsColors.length - a.similarsColors.length);

	// console.log("resultado de primary", result[0]);
	showColor.innerHTML = '';
	// Iteramos el array de resultado para crear un div por cada base color
	result.forEach((baseAndSimilarColorObj) => {
		// Color promedio de la lista de colores similares
		const avgBaseColor = getAvgColor(
			baseAndSimilarColorObj.similarsColors,
			baseAndSimilarColorObj.similarsColors.length
		);
		// Reemplazamos el color base con este promedio
		baseAndSimilarColorObj.base.RGB = [
			avgBaseColor.R,
			avgBaseColor.G,
			avgBaseColor.B,
		];

		const divWithBaseColorBG = createDivWithBgColor(
			baseAndSimilarColorObj.base
		);

		// Inserto el div en el elemento #showColor del DOM
		showColor.insertBefore(divWithBaseColorBG, null);
	});
	// console.log("Total repeticiones", totalReps);
	// console.log('1er PrimaryColor', result[0]);
	return result;
};

const getPrimaryColorHSL = (colorList) => {
	let result = [];
	const percentage = colorTolerance;
	const toleranceH = (percentage / 100) * 360 * 1.1;
	const tolerance = percentage;

	// Convertimos los valores a HSL
	const HSlColors = colorList;
	// console.log(HSlColors);
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
	// Iteramos el array de resultado para crear un div por cada base color
	result.forEach((baseAndSimilarColorObj) => {
		const avgBaseColor = getAvgColorHSL(
			baseAndSimilarColorObj.similarsColors,
			baseAndSimilarColorObj.similarsColors.length
		);
		// Reemplazamos el color base con este promedio
		baseAndSimilarColorObj.base.HSL = [
			avgBaseColor.H,
			avgBaseColor.S,
			avgBaseColor.L,
		];

		const divWithBaseColorBG = createDivWithBgColor(
			baseAndSimilarColorObj.base
		);

		// Inserto el div en el elemento #showColor del DOM
		showColor.insertBefore(divWithBaseColorBG, null);
	});
	// console.log('1er PrimaryColor', result[0]);
	return result;
};

const createDivWithBgColor = (baseColor) => {
	// Creamos el div encargado de mostrar el color
	const divColor = document.createElement('div');
	// Div que contiene el texto dentro del color
	const textDiv = document.createElement('div');
	// Abreviatura de codigo para estilos del divColor y text
	const style = divColor.style;
	const textStyle = textDiv.style;

	let R, G, B;
	let H, S, L;
	if (colorRGBstate) {
		[R, G, B] = baseColor.RGB;
		// Obtenemos los valores en HSL del color base
		[H, S, L] = RGBToHSL(baseColor.RGB);
		// Definimos el texto del textDiv
		textDiv.innerHTML = `rgb[${baseColor.RGB}]`;
		style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
	}
	if (colorHSLstate) {
		// Obtenemos los valores en HSL del color base
		[H, S, L] = baseColor.HSL;
		// Definimos el texto del textDiv
		// Definimos el texto del textDiv
		textDiv.innerHTML = `hsl[${[H, S, L]}]`;
		style.backgroundColor = `hsl(${H}, ${S}%, ${L}%)`;
	}

	// Condicion para definir si el texto es oscuro o claro en funcion de la L
	L > 50 ? (textStyle.color = 'black') : (textStyle.color = 'white');
	// Definicion de estilos del div de color
	style.textAlign = 'center';
	style.display = 'flex';
	style.justifyContent = 'center';
	style.alignItems = 'center';
	divColor.appendChild(textDiv);
	style.width = style.height = '100px';

	return divColor;
};
