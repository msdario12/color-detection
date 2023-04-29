// Defino estados globales
let colorRGBstate = true;
let colorHSLstate = false;
let divisionQtyState = 2;
let avgColors = [];
let colorTolerance = 15;
// Guardo los elementos radio del dom
const rgbColorMode = document.getElementById("rgb-mode");
const hslColorMode = document.getElementById("hsl-mode");
const numDivSelect = document.getElementById("num-div");
const toleranceSelect = document.getElementById("num-tol");

// Cambio de estado al modo RGB
rgbColorMode.addEventListener("change", (e) => {
	colorRGBstate = true;
	colorHSLstate = false;
	console.log(colorRGBstate, colorHSLstate);
});
// Cambio de estado al modo HSL
hslColorMode.addEventListener("change", (e) => {
	colorRGBstate = false;
	colorHSLstate = true;
	console.log(colorRGBstate, colorHSLstate);
});
// Cambio la cantidad de divisiones
numDivSelect.addEventListener("change", (e) => {
	divisionQtyState = e.target.value;
	console.log(divisionQtyState);
});
toleranceSelect.addEventListener("change", (e) => {
	colorTolerance = e.target.value;
});

// Color detection

// Obtener elementos del dom
const imgFile = document.getElementById("img-1");
const showColor = document.getElementById("showColor");
const newCanvas = document.getElementById("newCanvas");

console.log(imgFile);

// Funcion a ejecutar cuando imgFile se cargue
imgFile.onload = () => {
	// Limpieza de elementos en el DOM
	showColor.innerHTML = "";
	newCanvas.innerHTML = "";
	// Creo el elemento "canvas" en memoria y lo asigno a una variable
	const canvas = document.createElement("canvas");

	// ! CANVA PARA MOSTRAR COLORES
	const canvasColor = document.createElement("canvas");

	// Creo el contexto para canvas
	// !FIN CANVA COLORES
	// Para la primera ejecucion se realiza la ejecucion con valores inciales del estado
	avgColors = iterateOverCanvas(canvas, canvasColor);
	applyStyles(avgColors);

	// Reescaneamos el canvas sucede un cambio
	numDivSelect.onchange = () => {
		console.log("Cambia la cantidad de divisiones");
		avgColors = iterateOverCanvas(canvas, canvasColor);
		applyStyles(avgColors);
	};
	hslColorMode.onchange = () => {
		console.log("Cambia la cantidad de divisiones");
		avgColors = iterateOverCanvas(canvas, canvasColor);
		applyStyles(avgColors);
	};
	rgbColorMode.onchange = () => {
		console.log("Cambia la cantidad de divisiones");
		avgColors = iterateOverCanvas(canvas, canvasColor);
		applyStyles(avgColors);
	};
	toleranceSelect.onchange = () => {
		console.log("Cambia la cantidad de divisiones");
		avgColors = iterateOverCanvas(canvas, canvasColor);
		applyStyles(avgColors);
	};
};

const applyStyles = (avgColors) => {
	let primaryColor;
	if (colorRGBstate) {
		let rawPrimaryColor = getPrimaryColor(avgColors);
		primaryColor = rawPrimaryColor[0].base.RGB;
		console.log("RGB value of PC", primaryColor);
	}
	if (colorHSLstate) {
		let rawPrimaryColor = getPrimaryColorHSL(avgColors);
		primaryColor = rawPrimaryColor[0].base.HSL;
		console.log("HSL value of PC", primaryColor);
	}

	// Asigno una sombra a la imagen con este color RGB
	// imgFile.style.boxShadow = `0px 0px 50px 25px rgba(${rgbColor}, 0.85)`;
	// Asigno una sombra a la imagen con este color RGB
	const stringColorStyle = colorRGBstate
		? `rgb(${primaryColor[0]}, ${primaryColor[1]}, ${primaryColor[2]})`
		: `hsl(${primaryColor[0]}, ${primaryColor[1]}%, ${primaryColor[2]}%)`;
	imgFile.style.boxShadow = `0px 0px 100px 55px ${stringColorStyle}`;
};
