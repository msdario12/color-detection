const iterateOverCanvas = (canvas, canvasColor) => {
	showColor.innerHTML = '';
	// Dimensiones del canvas de la imagen referidas a los valores naturales de la img
	canvas.width = imgFile.naturalWidth;
	canvas.height = imgFile.naturalHeight;
	// Creo el contexto para canvas
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	const ctxColor = canvasColor.getContext('2d', { willReadFrequently: true });
	// Dimensiones del canvas de la imagen pixeleada, toma los valores de la imagen despues de aplicar las propiedades de CSS
	canvasColor.width = imgFile.width;
	canvasColor.height = imgFile.height;
	// Montamos la imagen en canvas
	ctx.drawImage(imgFile, 0, 0);
	// Definimos la cantidad de divisiones en cada eje
	const numDiv = divisionQtyState;
	const deltaW = canvas.width / numDiv;
	const deltaH = canvas.height / numDiv;

	// Array para almacenar los resultados de avg-color en cada sector
	const avgColors = [];

	// Iteramos 2 veces para recorrer el nuevo canvas discretizado
	// Avance en el eje Y, vertical
	for (let h = 0; h < numDiv; h++) {
		// Avance en el eje X, horizontal, va primero.
		for (let w = 0; w < numDiv; w++) {
			// Obtenemos la información de cada pixel de la imagen
			const imageData = ctx.getImageData(
				w * deltaW,
				h * deltaH,
				deltaW,
				deltaH
			);
			const dataColor = imageData.data;
			let colors = [];
			// Obtenemos los valores de R,G,B y A de cada pixel, saltando de a 4 elementos
			for (let i = 0; i < dataColor.length; i += 4) {
				const R = dataColor[i];
				const G = dataColor[i + 1];
				const B = dataColor[i + 2];
				// A: dataColor[i + 3],

				const HSLArray = RGBToHSL([R, G, B]);

				colors.push({
					RGB: [R, G, B],
					HSL: [HSLArray[0], HSLArray[1], HSLArray[2]],
				});
			}
			const totalPixels = deltaW * deltaH;
			// Llamamos a la funcion encargada de obtener el color promedio de la imagen
			let colorRGB, colorHSL;
			// colors = [...,{RGB:[...], HSL:[]}, ...]
			if (colorRGBstate) {
				const avgColorRGB = getAvgColor(colors, totalPixels);
				colorRGB = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;
				avgColors.push({
					RGB: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
				});
				// Dibujar y pintar cada cuadrado con el color promedio
				ctxColor.fillStyle = `rgb(${colorRGB})`;
			}
			if (colorHSLstate) {
				const avgColorHSL = getAvgColorHSL(colors, totalPixels);
				colorHSL = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
				avgColors.push({
					HSL: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
				});
				// Dibujar y pintar cada cuadrado con el color promedio
				ctxColor.fillStyle = `hsl(${colorHSL})`;
			}
			// Creamos el canvas de cada color (h,w) y lo montamos en el DOM

			// Calculamos la escala entre las dimensiones naturales y renderizadas
			const scaleW = canvas.width / imgFile.width;
			const scaleH = canvas.height / imgFile.height;

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
				ctxColor.font = '12px Arial';
				ctxColor.textAlign = 'center';
				ctxColor.strokeText(
					colorRGBstate ? colorRGB : colorHSL,
					w * deltaWScale + deltaWScale / 2,
					h * deltaHScale + deltaHScale / 2
				);
			}
			// Montar el canvas en el DOM
			newCanvas.append(canvasColor);
		}
	}

	return avgColors;
};
