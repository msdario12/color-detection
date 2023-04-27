// Funcion que se encarga de obtener el color promedio RGB
const getAvgColor = (colors, totalPixels) => {
	let result = {
		R: 0,
		G: 0,
		B: 0,
	};
	// Obtenemos el valor promedio de color de toda la imagen
	for (let i = 0; i < colors.length; i++) {
		result.R += colors[i].R ** 2;
		result.G += colors[i].G ** 2;
		result.B += colors[i].B ** 2;
	}
	// Obtenemos el promedio de cada uno de los canales
	result.R = Math.round(Math.sqrt(result.R / totalPixels));
	result.G = Math.round(Math.sqrt(result.G / totalPixels));
	result.B = Math.round(Math.sqrt(result.B / totalPixels));

	// console.log(`AvgColor: ${result.R}, ${result.G}, ${result.B}`);
	return result;
};

// Funcion que se encarga de obtener el color promedio HSL
const getAvgColorHSL = (colors, totalPixels) => {
	let result = {
		H: 0,
		S: 0,
		L: 0,
	};
	// Convertimos los valores a HSL
	const HSlColors = colors.map((color) =>
		RGBToHSL([color.R, color.G, color.B])
	);
	// Obtenemos el valor promedio de color de toda la imagen
	for (let i = 0; i < HSlColors.length; i++) {
		result.H += HSlColors[i].HSL[0] ** 2;
		result.S += HSlColors[i].HSL[1] ** 2;
		result.L += HSlColors[i].HSL[2] ** 2;
	}
	// Obtenemos el promedio de cada uno de los canales
	result.H = Math.round(Math.sqrt(result.H / totalPixels));
	result.S = Math.round(Math.sqrt(result.S / totalPixels));
	result.L = Math.round(Math.sqrt(result.L / totalPixels));

	// console.log(`AvgColor: ${result.H}, ${result.S}, ${result.L}`);
	return result;
};
