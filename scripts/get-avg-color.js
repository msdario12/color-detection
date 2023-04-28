// Funcion que se encarga de obtener el color promedio RGB
const getAvgColor = (colors, totalPixels) => {
	let result = {
		R: 0,
		G: 0,
		B: 0,
	};
	// Obtenemos el valor promedio de color de toda la imagen
	for (let i = 0; i < colors.length; i++) {
		result.R += colors[i][0] ** 2;
		result.G += colors[i][1] ** 2;
		result.B += colors[i][2] ** 2;
	}
	// Obtenemos el promedio de cada uno de los canales
	result.R = Math.round(Math.sqrt(result.R / totalPixels));
	result.G = Math.round(Math.sqrt(result.G / totalPixels));
	result.B = Math.round(Math.sqrt(result.B / totalPixels));

	// console.log(`AvgColor: ${result.R}, ${result.G}, ${result.B}`);
	return result;
};

// Funcion que se encarga de obtener el color promedio HSL
const getAvgColorHSL = (colorsRGB, totalPixels) => {
	let result = {
		H: 0,
		S: 0,
		L: 0,
	};
	let colors = [];

	colorsRGB.map((color) => {
		colors.push(RGBToHSL(color));
	});

	const PI = Math.PI;

	let sumX = 0.0;
	let sumY = 0.0;
	let sumSaturation = 0.0;
	let sumLuminosity = 0.0;

	for (let i = 0; i < colors.length; i++) {
		const [hue, saturation, luminosity] = colors[i];

		const radianHue = (hue / 180) * PI;
		sumX += Math.cos(radianHue);
		sumY += Math.sin(radianHue);
		sumSaturation += saturation;
		sumLuminosity += luminosity;
	}

	const averageHue = (Math.atan2(sumY, sumX) * 180) / PI;
	const averageSaturation = sumSaturation / colors.length;
	const averageLuminosity = sumLuminosity / colors.length;

	result.H = Math.round(averageHue);
	result.S = Math.round(averageSaturation);
	result.L = Math.round(averageLuminosity);

	// console.log(
	// 	`Average Color: hsl(${averageHue}, ${averageSaturation}%, ${averageLuminosity}%)`
	// );
	return result;
};
