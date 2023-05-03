// Defino estados globales
let colorRGBstate = true;
let colorHSLstate = false;
let divisionQtyState = 10;
let avgColors = [];
let colorTolerance = 15;
let imgRenderWidth = 0;
let imgRenderHeight = 0;
let naturalWidthImg = 0;
let naturalHeightImg = 0;
let setNewImage = true;
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
const imgFile = document.getElementById('img-1');
const showColor = document.getElementById('showColor');
const newCanvas = document.getElementById('newCanvas');

console.log(imgFile);

const imgFromWorker = document.createElement('img');

const canvasColor = document.createElement('canvas');
const ctxColor = canvasColor.getContext('2d', { willReadFrequently: true });

async function asyncRenderColors(allColors, i) {
	if (colorRGBstate) {
		let arrayRGB = allColors[i].fillColor.RGBArray;
		stringRGB = allColors[i].fillColor.fillStyle;
		ctxColor.fillStyle = stringRGB;
	}
	if (colorHSLstate) {
		let arrayHSL = allColors[i].fillColor.HSLArray;
		stringHSL = allColors[i].fillColor.fillStyle;
		ctxColor.fillStyle = stringHSL;
	}

	const scaleW = naturalWidthImg / imgRenderWidth;
	const scaleH = naturalHeightImg / imgRenderHeight;

	let { wIndex, hIndex, deltaW, deltaH } = allColors[i].drawRectangle;
	deltaW /= scaleW;
	deltaH /= scaleH;
	// Insertar string del color en cada cuadrado del canvas
	ctxColor.fillRect(wIndex * deltaW, hIndex * deltaH, deltaW, deltaH);

	if (allColors[i].drawText) {
		ctxColor.font = '12px Arial';
		ctxColor.textAlign = 'center';

		ctxColor.strokeText(
			allColors[i].drawText.textColor,
			allColors[i].drawText.wPos,
			allColors[i].drawText.hPos
		);
	}
	// Montar el canvas que contiene los pixeles con colores en el DOM
	newCanvas.append(canvasColor);
}

showLoader(loader);
const worker = new Worker('./scripts/offScreenCanvas.js');

// const offScreenCanvas = canvas.transferControlToOffscreen();
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
worker.onmessage = async (event) => {
	if (event.data.avgColors) {
		const avgColors = event.data.avgColors;
		let arrayForPrimaryColors = [];

		imgRenderHeight = imgFromWorker.height;
		imgRenderWidth = imgFromWorker.width;

		canvasColor.width = imgRenderWidth;
		canvasColor.height = imgRenderHeight;

		// console.log(imgRenderHeight, imgRenderWidth);
		for (let i = 0; i < avgColors.length; i++) {
			await asyncRenderColors(avgColors, i);
			arrayForPrimaryColors.push({
				RGB: avgColors[i].fillColor.RGBArray,
				HSL: avgColors[i].fillColor.HSLArray,
			});
		}
		// console.log('inprmyari', arrayForPrimaryColors);

		await applyStyles(arrayForPrimaryColors);

		return;
	}
	// console.log('data', event.data);
	const urlImage = await event.data.urlImage;
	naturalWidthImg = event.data.w;
	naturalHeightImg = event.data.h;
	// console.log('Respuesta de canvas', urlImage);

	const modifiedDataBuffer = await event.data.data;
	const modifiedData = new Uint8ClampedArray(modifiedDataBuffer);
	const newCanvas = document.createElement('canvas');
	// Obtener el contexto 2D del canvas en el DOM
	const context = newCanvas.getContext('2d');

	newCanvas.width = naturalWidthImg;
	newCanvas.height = naturalHeightImg;

	// Crear una nueva ImageData a partir de los datos recibidos
	const newImageData = new ImageData(
		modifiedData,
		naturalWidthImg,
		naturalHeightImg
	);
	// Establecer los datos modificados en el canvas del DOM
	context.putImageData(newImageData, 0, 0);
	// Montar canvas que contiene la imagen
	// document.body.append(newCanvas);
	// const imgFromWorker = document.getElementById('worker-img');
	imgFromWorker.setAttribute('id', 'worker-img');
	imgFromWorker.setAttribute('src', urlImage);

	document.getElementById('img-container').append(imgFromWorker);
	// console.dir(imgFromWorker);
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
// Funcion a ejecutar cuando imgFile se cargue
imgFile.onload = async () => {
	// Limpieza de elementos en el DOM
	newCanvas.innerHTML = '';
	// Creo el elemento "canvas" en memoria y lo asigno a una variable
	const canvas = document.createElement('canvas');

	// Iteramos cobre el canvas para obtener el array de datos
	// ! s

	// avgColors = await iterateOverCanvasWorker(canvas, canvasColor);

	// ! s
	// Aplicamos estilos para mostrar colores
	// applyStyles(avgColors);
	// hideLoader(loader);
	// Reescaneamos el canvas sucede un cambio
};
// Definicion de funcion para aplicar estilos

async function applyStyles(avgColors) {
	let primaryColor;

	if (colorRGBstate) {
		let rawPrimaryColor = await getPrimaryColor(avgColors);
		primaryColor = rawPrimaryColor[0].base.RGB;
		// console.log('RGB value of PC', primaryColor);
	}
	if (colorHSLstate) {
		let rawPrimaryColor = await getPrimaryColorHSL(avgColors);
		try {
			primaryColor = rawPrimaryColor[0].base.HSL;
		} catch (error) {
			console.log('Error un applyStyles', error);
		}
		// console.log('HSL value of PC', primaryColor);
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
