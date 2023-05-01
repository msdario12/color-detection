// Defino estados globales
let colorRGBstate = true;
let colorHSLstate = false;
let divisionQtyState = 2;
let avgColors = [];
let colorTolerance = 15;
// Guardo los elementos radio del dom
const rgbColorMode = document.getElementById('rgb-mode');
const hslColorMode = document.getElementById('hsl-mode');
const numDivSelect = document.getElementById('num-div');
const toleranceSelect = document.getElementById('num-tol');
const loader = document.getElementById('loader');

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

showLoader(loader);
// Funcion a ejecutar cuando imgFile se cargue
imgFile.onload = async () => {
	// Limpieza de elementos en el DOM
	newCanvas.innerHTML = '';
	// Creo el elemento "canvas" en memoria y lo asigno a una variable
	const canvas = document.createElement('canvas');
	const canvasColor = document.createElement('canvas');
	// Iteramos cobre el canvas para obtener el array de datos
	avgColors = await iterateOverCanvasWorker(canvas, canvasColor);
	// Aplicamos estilos para mostrar colores
	applyStyles(avgColors);
	hideLoader(loader);
	// Reescaneamos el canvas sucede un cambio

	numDivSelect.onchange = (e) => {
		showLoader(loader);
		requestAnimationFrame(async () => {
			divisionQtyState = e.target.value;
			avgColors = await iterateOverCanvasWorker(canvas, canvasColor);
			console.log('Cambia la cantidad de divisiones');
			requestAnimationFrame(async () => {
				await applyStyles(avgColors);
			});
		});
	};
	hslColorMode.onchange = async (e) => {
		showLoader(loader);
		colorRGBstate = false;
		colorHSLstate = true;
		console.log('Cambia a modo HSL');

		requestAnimationFrame(async () => {
			avgColors = await iterateOverCanvasWorker(canvas, canvasColor);
			applyStyles(avgColors);
		});
	};
	rgbColorMode.onchange = async (e) => {
		showLoader(loader);

		colorRGBstate = true;
		colorHSLstate = false;
		console.log('Cambia a modo RGB');
		avgColors = await iterateOverCanvasWorker(canvas, canvasColor);
		applyStyles(avgColors);
	};
	toleranceSelect.onchange = async (e) => {
		colorTolerance = e.target.value;
		console.log('Cambia la tolerancia');
		avgColors = await iterateOverCanvasWorker(canvas, canvasColor);
		applyStyles(avgColors);
	};
};
// Definicion de funcion para aplicar estilos
const applyStyles = async (avgColors) => {
	let primaryColor;
	if (colorRGBstate) {
		let rawPrimaryColor = await getPrimaryColor(avgColors);
		primaryColor = await rawPrimaryColor[0].base.RGB;
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
	hideLoader(loader);
	// Asigno una sombra a la imagen con este color RGB
	// imgFile.style.boxShadow = `0px 0px 50px 25px rgba(${rgbColor}, 0.85)`;
	// Asigno una sombra a la imagen con este color RGB
	const stringColorStyle = colorRGBstate
		? `rgb(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]})`
		: `hsl(${primaryColor[0]}, ${primaryColor[1]}%, ${primaryColor[2]}%)`;
	imgFile.style.boxShadow = `0px 0px 100px 55px ${stringColorStyle}`;
};
