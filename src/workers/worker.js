import readPixelData from '../utils/readPixelData';
import createDataForPixel from '../utils/createDataForPixel';
// globalVar
let imgBitMap;
// Function to fetch a random img from web
async function fetchRandomImg() {
	const response = await fetch('https://source.unsplash.com/random/?$cat');
	const arrayBuffer = await response.arrayBuffer();
	const blob = new Blob([arrayBuffer]);
	return { img: await createImageBitmap(blob), res: response };
}

async function readImgData(
	imgBitMap,
	numDiv,
	colorRGBstate,
	colorHSLstate,
	divisionQtyState
) {
	console.log(imgBitMap);
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
// Register a callback to process messages from the parent
self.onmessage = (e) => {
	const { divsQty, colorMode } = e.data.params;
	let colorHSLstate, colorRGBstate;
	if (colorMode === 'RGB') {
		colorHSLstate = false;
		colorRGBstate = true;
	}
	if (colorMode === 'HSL') {
		colorHSLstate = true;
		colorRGBstate = false;
	}

	switch (e.data.msg) {
		case 'fetch-new-image':
			fetchRandomImg()
				.then(({ res, img }) => {
					imgBitMap = img;
					self.postMessage({
						url: res.url,
					});
				})
				.then(() =>
					readImgData(
						imgBitMap,
						divsQty,
						colorRGBstate,
						colorHSLstate,
						divsQty
					).then((res) => self.postMessage({ avgColors: res }))
				);

			break;
		case 'calculate-pixels':
			readImgData(
				imgBitMap,
				divsQty,
				colorRGBstate,
				colorHSLstate,
				divsQty
			).then((res) => self.postMessage({ avgColors: res }));

			break;

		default:
			break;
	}
};
