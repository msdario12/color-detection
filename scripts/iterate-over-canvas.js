const iterateOverCanvas = (canvas, canvasColor) => {
	// Asigno las dimensiones del canvas en funcion de las dimensiones de la imagen
	canvas.width = imgFile.naturalWidth;
	canvas.height = imgFile.naturalHeight;
	// Creo el contexto para canvas
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	const ctxColor = canvasColor.getContext("2d", { willReadFrequently: true });

	canvasColor.width = canvas.width;
	canvasColor.height = canvas.height;

	// Montamos la imagen en canvas
	ctx.drawImage(imgFile, 0, 0);
	// Definimos la cantidad de divisiones en cada eje
	const numDiv = divisionQtyState;
	const deltaW = canvas.width / numDiv;
	const deltaH = canvas.height / numDiv;
	// Calculamos la escala entre las dimensiones naturales y renderizadas
	const scale = imgFile.width / canvas.width;
	// Array para almacenar los resultados de avg-color en cada sector
	const avgColors = [];

	// Iteramos 2 veces para recorrer el nuevo canvas discretizado
	for (let h = 0; h < numDiv; h++) {
		for (let w = 0; w < numDiv; w++) {
			// Obtenemos la informacion de cada pixel de la imagen
			const imageData = ctx.getImageData(
				w * deltaW,
				h * deltaH,
				deltaW,
				deltaH
			);

			// Obtenemos los valores de R,G,B y A de cada pixel, saltando de a 4 elementos
			const dataColor = imageData.data;
			let colors = [];
			for (let i = 0; i < dataColor.length; i += 4) {
				colors.push(
					[dataColor[i], dataColor[i + 1], dataColor[i + 2]]
					// A: dataColor[i + 3],
				);
			}
			const totalPixels = deltaW * deltaH;
			// Llamamos a la funcion encargada de obtener el color promedio de la imagen

			const avgColorRGB = getAvgColor(colors, totalPixels);
			const colorRGB = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;

			const avgColorHSL = getAvgColorHSL(colors, totalPixels);
			const colorHSL = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;

			// Color promedio en HSL

			// Color promedio del sector que se esta analizando - (h, w)
			// Guardamos este valor en el array
			avgColors.push({
				x: w,
				y: h,
				HSL: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
				RGB: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
			});
			// showColor.style.backgroundColor = `rgb(${colorRGB})`;

			// !COLOR CANVA

			// Dibujar y pintar cada cuadrado con el color promedio
			if (colorRGBstate) {
				ctxColor.fillStyle = `rgb(${colorRGB})`;
			}
			if (colorHSLstate) {
				ctxColor.fillStyle = `hsl(${colorHSL})`;
			}
			ctxColor.fillRect(w * deltaW, h * deltaH, deltaW, deltaH);
			// Insertar string del color en cada cuadrado del canvas
			ctxColor.font = "12px Arial";
			ctxColor.textAlign = "center";
			ctxColor.strokeText(
				colorRGBstate ? colorRGB : colorHSL,
				w * deltaW + deltaW / 2,
				h * deltaH + deltaH / 2
			);
			// Montar el canvas en el DOM

			canvasColor.style.scale = scale;
			newCanvas.append(canvasColor);

			// !COLOR CANVA
		}
	}
	return avgColors;
};
