self.importScripts('rgb-to-hsl.js', 'get-avg-color.js');
let response;
let imgBitMap, urlImage;
self.onmessage = async (evt) => {
	console.log('Mensaje recibido en canvasOff', evt.data);
	// const canvas = evt.data.canvas;
	const numDiv = evt.data.numDiv;
	const colorRGBstate = evt.data.colorRGBstate;
	const colorHSLstate = evt.data.colorHSLstate;
	const divisionQtyState = evt.data.divisionQtyState;
	const setNewImage = evt.data.setNewImage;
	// const ctx = canvas.getContext('2d', { willReadFrequently: true });

	try {
		if (setNewImage) {
			response = await fetch('https://source.unsplash.com/random/?$cat');
			const arrayBuffer = await response.arrayBuffer();
			const blob = new Blob([arrayBuffer]);

			const imageUrl = URL.createObjectURL(blob);
			imgBitMap = await createImageBitmap(blob);
		}
		urlImage = response.url;
		// postMessage({ urlImage: urlImage });

		// console.log('datos img', imgBitMap);
	} catch (error) {
		console.log('Error en fetch del worker', error);
	}

	const canvas = new OffscreenCanvas(imgBitMap.width, imgBitMap.height);
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	// Dimensiones del canvas de la imagen referidas a los valores naturales de la img
	canvas.width = imgBitMap.width;
	canvas.height = imgBitMap.height;
	// Creo el contexto para canvas
	// const ctxColor = canvasColor.getContext('2d', { willReadFrequently: true });
	// Dimensiones del canvas de la imagen pixeleada, toma los valores de la imagen despues de aplicar las propiedades de CSS
	// canvasColor.width = imgBitMap.width;
	// canvasColor.height = imgBitMap.height;
	// Montamos la imagen en canvas
	ctx.drawImage(imgBitMap, 0, 0);

	const imageData = ctx.getImageData(0, 0, imgBitMap.width, imgBitMap.height);

	const modifiedData = imageData.data;

	self.postMessage({
		data: modifiedData.buffer,
		array: [modifiedData.buffer],
		w: imgBitMap.width,
		h: imgBitMap.height,
		urlImage: urlImage,
	});

	// Definimos la cantidad de divisiones en cada eje
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
			// !DESDE ACA
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
			// ! HASTA ACA

			const totalPixels = deltaW * deltaH;
			// Llamamos a la funcion encargada de obtener el color promedio de la imagen
			let colorRGB, colorHSL;
			// colors = [...,{RGB:[...], HSL:[]}, ...]
			let fillColor;
			if (colorRGBstate) {
				const avgColorRGB = await getAvgColor(colors, totalPixels);
				colorRGB = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;
				fillColor = {
					RGBArray: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
					fillStyle: `rgb(${colorRGB})`,
				};
				// Dibujar y pintar cada cuadrado con el color promedio
				// ctxColor.fillStyle = `rgb(${colorRGB})`;
			}
			if (colorHSLstate) {
				const avgColorHSL = await getAvgColorHSL(colors, totalPixels);
				colorHSL = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
				fillColor = {
					HSLArray: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
					fillStyle: `hsl(${colorHSL})`,
				};
				// Dibujar y pintar cada cuadrado con el color promedio
				// ctxColor.fillStyle = `hsl(${colorHSL})`;
			}
			// Creamos el canvas de cada color (h,w) y lo montamos en el DOM

			// Calculamos la escala entre las dimensiones naturales y renderizadas
			const scaleW = canvas.width / imgBitMap.width;
			const scaleH = canvas.height / imgBitMap.height;

			const deltaWScale = deltaW / scaleW;
			const deltaHScale = deltaH / scaleH;
			const drawRectangle = {
				hIndex: h,
				wIndex: w,

				deltaW: deltaWScale,
				deltaH: deltaHScale,
			};
			// Insertar string del color en cada cuadrado del canvas
			let drawText;
			if (divisionQtyState <= 5) {
				// ctxColor.font = '12px Arial';
				// ctxColor.textAlign = 'center';

				drawText = {
					textColor: colorRGBstate ? colorRGB : colorHSL,
					wPos: w * deltaWScale + deltaWScale / 2,
					hPos: h * deltaHScale + deltaHScale / 2,
				};
			}
			// Montar el canvas en el DOM
			// newCanvas.append(canvasColor);
			avgColors.push({ fillColor, drawRectangle, drawText });
		}
	}
	// console.log('avgColors de worker', avgColors);
	// return avgColors;
	postMessage({ avgColors: avgColors });
};
