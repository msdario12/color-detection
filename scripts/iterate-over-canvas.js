const iterateOverCanvas = (canvas, canvasColor) => {
	showColor.innerHTML = "";

	// Asigno las dimensiones del canvas en funcion de las dimensiones de la imagen
	canvas.width = imgFile.naturalWidth;
	canvas.height = imgFile.naturalHeight;
	// Creo el contexto para canvas
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	const ctxColor = canvasColor.getContext("2d", { willReadFrequently: true });

	canvasColor.width = imgFile.width;
	canvasColor.height = imgFile.height;

	// Montamos la imagen en canvas
	ctx.drawImage(imgFile, 0, 0);
	// Definimos la cantidad de divisiones en cada eje
	const numDiv = divisionQtyState;
	const deltaW = canvas.width / numDiv;
	const deltaH = canvas.height / numDiv;
	// Calculamos la escala entre las dimensiones naturales y renderizadas
	const scale = imgFile.width / canvas.width;

	const scaleW = canvas.width / imgFile.width;
	const scaleH = canvas.height / imgFile.height;
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
			let colorRGB, colorHSL;
			if (colorRGBstate) {
				const avgColorRGB = getAvgColor(colors, totalPixels);
				colorRGB = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;
				avgColors.push({
					RGB: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
				});
			}
			if (colorHSLstate) {
				const avgColorHSL = getAvgColorHSL(colors, totalPixels);
				colorHSL = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
				avgColors.push({
					HSL: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
				});
			}

			// Color promedio en HSL

			// Color promedio del sector que se esta analizando - (h, w)
			// Guardamos este valor en el array

			// showColor.style.backgroundColor = `rgb(${colorRGB})`;

			// !COLOR CANVA

			// Dibujar y pintar cada cuadrado con el color promedio
			if (colorRGBstate) {
				ctxColor.fillStyle = `rgb(${colorRGB})`;
			}
			if (colorHSLstate) {
				ctxColor.fillStyle = `hsl(${colorHSL})`;
			}
			const deltaWScale = deltaW / scaleW;
			const deltaHScale = deltaH / scaleH;
			ctxColor.fillRect(
				w * deltaWScale,
				h * deltaHScale,
				deltaWScale,
				deltaHScale
			);
			// Insertar string del color en cada cuadrado del canvas

			if (divisionQtyState <= 5) {
				ctxColor.font = "12px Arial";
				ctxColor.textAlign = "center";
				ctxColor.strokeText(
					colorRGBstate ? colorRGB : colorHSL,
					w * deltaWScale + deltaWScale / 2,
					h * deltaHScale + deltaHScale / 2
				);
			}

			// Montar el canvas en el DOM

			newCanvas.append(canvasColor);

			// !COLOR CANVA
		}
	}
	return avgColors;
};
