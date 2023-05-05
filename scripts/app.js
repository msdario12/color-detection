// Defino estados iniciales de inputs
let colorRGBstate = true;
let colorHSLstate = false;
let divisionQtyState = 2;
let avgColors = [];
let colorTolerance = 15;

// Variables globales
let imgRenderWidth = 0;
let imgRenderHeight = 0;
let naturalWidthImg = 0;
let naturalHeightImg = 0;
let setNewImage = true;
let ifWorkerOnline = true;
// Guardo los elementos radio del dom
const rgbColorMode = document.getElementById('rgb-mode');
const hslColorMode = document.getElementById('hsl-mode');
const numDivSelect = document.getElementById('num-div');
const toleranceSelect = document.getElementById('num-tol');
const loader = document.getElementById('loader');
const buttonChangeImage = document.getElementById('change-img');

const showLoader = (loader) => {
	// loader.style.display = 'block';
	loader.classList.add('showLoader');
};
const hideLoader = (loader) => {
	// loader.style.display = 'none';
	loader.classList.remove('showLoader');
};

// Color detection

// Obtener elementos del dom
const showColor = document.getElementById('showColor');
const newCanvas = document.getElementById('newCanvas');

const canvasColor = document.getElementById('canvas-color');
const ctxColor = canvasColor.getContext('2d', { willReadFrequently: true });

// canvasColor.width = 300;
// canvasColor.height = 300;

async function renderPixelColor(color) {
	if (colorRGBstate) {
		stringRGB = color.fillColor.fillStyle;
		ctxColor.fillStyle = stringRGB;
	}
	if (colorHSLstate) {
		stringHSL = color.fillColor.fillStyle;
		ctxColor.fillStyle = stringHSL;
	}

	const scaleW = naturalWidthImg / imgRenderWidth;
	const scaleH = naturalHeightImg / imgRenderHeight;

	let { wIndex, hIndex, deltaW, deltaH } = color.drawRectangle;
	deltaW /= scaleW;
	deltaH /= scaleH;
	// Insertar string del color en cada cuadrado del canvas
	ctxColor.fillRect(wIndex * deltaW, hIndex * deltaH, deltaW, deltaH);

	if (color.drawText) {
		ctxColor.font = '12px Arial';
		ctxColor.textAlign = 'center';

		ctxColor.strokeText(
			color.drawText.textColor,
			color.drawText.wPos,
			color.drawText.hPos
		);
	}
}

showLoader(loader);

let worker = new Worker('./scripts/offScreenCanvas.js');

function callWorker() {
	worker.postMessage(
		{
			// canvas: offScreenCanvas,
			numDiv: divisionQtyState,
			colorRGBstate: colorRGBstate,
			colorHSLstate: colorHSLstate,
			divisionQtyState: divisionQtyState,
			setNewImage: setNewImage,
		}
		// [offScreenCanvas]
	);
	setNewImage = false;
}
// Llamada con valores inciales para la primera carga
callWorker();

function formatAvgColorsList(avgColors) {
	let arrayForPrimaryColors = [];
	for (let i = 0; i < avgColors.length; i++) {
		arrayForPrimaryColors.push({
			RGB: avgColors[i].fillColor.RGBArray,
			HSL: avgColors[i].fillColor.HSLArray,
		});
	}
	return arrayForPrimaryColors;
}

function createImgFromWorker(url) {
	document.getElementById('img-container').innerHTML = '';

	const imgFromWorker = document.createElement('img');

	imgFromWorker.setAttribute('id', 'worker-img');
	imgFromWorker.setAttribute('src', url);

	document.getElementById('img-container').append(imgFromWorker);

	setTimeout(() => {
		imgRenderHeight = imgFromWorker.height;
		imgRenderWidth = imgFromWorker.width;
		console.log(`render-img: w:${imgRenderWidth} h:${imgRenderHeight}`);
	}, 100);
}

worker.onmessage = async (event) => {
	console.log('Recibido en MainThread', event.data);

	if (event.data.urlImage) {
		console.log('Create img');
		const urlImage = event.data.urlImage;

		naturalWidthImg = event.data.w;
		naturalHeightImg = event.data.h;

		newCanvas.width = naturalWidthImg;
		newCanvas.height = naturalHeightImg;

		createImgFromWorker(urlImage);
	}

	if (event.data.avgColors) {
		console.log('Render pixels');

		const avgColors = event.data.avgColors;
		canvasColor.width = imgRenderWidth;
		canvasColor.height = imgRenderHeight;
		avgColors.forEach((color) => renderPixelColor(color));

		const arrayForPrimaryColors = formatAvgColorsList(avgColors);

		applyStyles(arrayForPrimaryColors);
	}
	// newCanvas.append(canvasColor);
};

numDivSelect.onchange = (e) => {
	showLoader(loader);
	divisionQtyState = e.target.value;
	callWorker();
};
hslColorMode.onchange = async (e) => {
	showLoader(loader);
	colorRGBstate = false;
	colorHSLstate = true;
	console.log('Cambia a modo HSL');
	callWorker();
};
rgbColorMode.onchange = async (e) => {
	showLoader(loader);
	colorRGBstate = true;
	colorHSLstate = false;
	console.log('Cambia a modo RGB');
	callWorker();
};
toleranceSelect.onchange = async (e) => {
	showLoader(loader);
	colorTolerance = e.target.value;
	console.log('Cambia la tolerancia');
	callWorker();
};
buttonChangeImage.onclick = (e) => {
	showLoader(loader);
	setNewImage = true;
	callWorker();
};

// Definicion de funcion para aplicar estilos

async function applyStyles(avgColors) {
	let primaryColor;

	if (colorRGBstate) {
		let rawPrimaryColor = await getPrimaryColor(avgColors);
		primaryColor = rawPrimaryColor[0].base.RGB;
	}
	if (colorHSLstate) {
		let rawPrimaryColor = await getPrimaryColorHSL(avgColors);
		try {
			primaryColor = rawPrimaryColor[0].base.HSL;
		} catch (error) {
			console.log('Error un applyStyles', error);
		}
	}
	// Asigno una sombra a la imagen con este color RGB
	// imgFile.style.boxShadow = `0px 0px 50px 25px rgba(${rgbColor}, 0.85)`;
	// Asigno una sombra a la imagen con este color RGB
	const stringColorStyle = colorRGBstate
		? `rgb(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]})`
		: `hsl(${primaryColor[0]}, ${primaryColor[1]}%, ${primaryColor[2]}%)`;
	// imgFile.style.boxShadow = `0px 0px 100px 55px ${stringColorStyle}`;
	hideLoader(loader);
}
