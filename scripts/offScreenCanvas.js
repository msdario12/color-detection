self.importScripts('rgb-to-hsl.js', 'get-avg-color.js');

async function fetchRandomImg() {
	response = await fetch('https://source.unsplash.com/random/?$cat');
	const arrayBuffer = await response.arrayBuffer();
	const blob = new Blob([arrayBuffer]);
	return await createImageBitmap(blob);
}

function readPixelData(dataColor) {
	let response;
	let imgBitMap, urlImage;
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
	return colors;
}

async function createDataForPixel(
	colors,
	h,
	w,
	deltaW,
	deltaH,
	scaleW,
	scaleH,
	colorRGBstate,
	colorHSLstate,
	divisionQtyState
) {
	const totalPixels = deltaW * deltaH;

	// Llamamos a la funcion encargada de obtener el color promedio de la imagen
	let colorRGBString, colorHSLString, fillColor;

	if (colorRGBstate) {
		const avgColorRGB = await getAvgColor(colors, totalPixels);
		colorRGBString = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;
		fillColor = {
			RGBArray: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
			fillStyle: `rgb(${colorRGBString})`,
		};
	}
	if (colorHSLstate) {
		const avgColorHSL = await getAvgColorHSL(colors, totalPixels);
		colorHSLString = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
		fillColor = {
			HSLArray: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
			fillStyle: `hsl(${colorHSLString})`,
		};
	}
	// Calculamos la escala entre las dimensiones naturales y renderizadas

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
		drawText = {
			textColor: colorRGBstate ? colorRGBString : colorHSLString,
			wPos: w * deltaWScale + deltaWScale / 2,
			hPos: h * deltaHScale + deltaHScale / 2,
		};
	}

	return { fillColor, drawRectangle, drawText };
}

async function readImgData(
	imgBitMap,
	numDiv,
	colorRGBstate,
	colorHSLstate,
	divisionQtyState
) {
	const canvas = new OffscreenCanvas(imgBitMap.width, imgBitMap.height);
	const ctx = canvas.getContext('2d', { willReadFrequently: true });
	// Dimensiones del canvas de la imagen referidas a los valores naturales de la img
	canvas.width = imgBitMap.width;
	canvas.height = imgBitMap.height;

	ctx.drawImage(imgBitMap, 0, 0);

	// Definimos la cantidad de divisiones en cada eje
	const deltaW = canvas.width / numDiv;
	const deltaH = canvas.height / numDiv;

	const scaleW = canvas.width / imgBitMap.width;
	const scaleH = canvas.height / imgBitMap.height;

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

			const colors = readPixelData(dataColor);

			const { fillColor, drawRectangle, drawText } = await createDataForPixel(
				colors,
				h,
				w,
				deltaW,
				deltaH,
				scaleW,
				scaleH,
				colorRGBstate,
				colorHSLstate,
				divisionQtyState
			);

			avgColors.push({ fillColor, drawRectangle, drawText });
		}
	}
	return avgColors;
}

self.onmessage = async (evt) => {
	console.log('Mensaje recibido en canvasOff', evt.data);

	const {
		numDiv,
		colorRGBstate,
		colorHSLstate,
		divisionQtyState,
		setNewImage,
	} = evt.data;

	try {
		if (setNewImage) {
			imgBitMap = await fetchRandomImg();
		}
		urlImage = response.url;
	} catch (error) {
		console.log('Error en fetch del worker', error);
	}

	self.postMessage({
		w: imgBitMap.width,
		h: imgBitMap.height,
		urlImage: urlImage,
	});

	const avgColors = await readImgData(
		imgBitMap,
		numDiv,
		colorRGBstate,
		colorHSLstate,
		divisionQtyState
	);

	postMessage({ avgColors: avgColors });
};
