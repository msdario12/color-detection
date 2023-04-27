// Color detection

// Obtener elementos del dom
const imgFile = document.getElementById("img-1");
const showColor = document.getElementById("showColor");
const newCanvas = document.getElementById("newCanvas");
const src = imgFile.src;

console.log(imgFile);

// Creo el objeto imagen
const img = new Image();

// Funcion a ejecutar cuando imgFile se cargue
imgFile.onload = () => {
	showColor.innerHTML = "";
	newCanvas.innerHTML = "";
	// Creo el elemento "canvas" en memoria y lo asigno a una variable
	const canvas = document.createElement("canvas");
	canvas.width = imgFile.width;
	canvas.height = imgFile.height;
	// Creo el contexto para canvas
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	// Montamos la imagen en canvas
	ctx.drawImage(imgFile, 0, 0);

	// ! CANVA PARA MOSTRAR COLORES
	const canvasColor = document.createElement("canvas");
	canvasColor.width = imgFile.width;
	canvasColor.height = imgFile.height;
	// Creo el contexto para canvas
	const ctxColor = canvasColor.getContext("2d", { willReadFrequently: true });
	// !FIN CANVA COLORES

	// Definimos la cantidad de divisiones en cada eje
	const numDiv = 10;
	const deltaW = canvas.width / numDiv;
	const deltaH = canvas.height / numDiv;
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
				colors.push({
					R: dataColor[i],
					G: dataColor[i + 1],
					B: dataColor[i + 2],
					A: dataColor[i + 3],
				});
			}
			const totalPixels = deltaW * deltaH;
			// Llamamos a la funcion encargada de obtener el color promedio de la imagen
			const avgColor = getAvgColor(colors, totalPixels);

			// Asignamos el color al div para mostrar el color promedio
			const colorRGB = `${avgColor.R}, ${avgColor.G}, ${avgColor.B}`;
			// showColor.style.backgroundColor = `rgb(${colorRGB})`;

			// !COLOR CANVA

			ctxColor.font = "12px Arial";
			ctxColor.strokeText(colorRGB, w * deltaW, h * deltaH - deltaH / 2);

			ctxColor.fillStyle = `rgb(${colorRGB})`;
			ctxColor.fillRect(w * deltaW, h * deltaH, deltaW, deltaH);
			newCanvas.appendChild(canvasColor);

			// !COLOR CANVA
		}
	}
	// Asigno una sombra a la imagen con este color
	// imgFile.style.boxShadow = `0px 0px 50px 25px rgba(${colorRGB}, 0.85)`;
};

// Funcion que se encarga de obtener el color promedio
const getAvgColor = (colors, totalPixels) => {
	let result = {
		R: 0,
		G: 0,
		B: 0,
	};
	// Obtenemos el valor promedio de color de toda la imagen
	for (let i = 0; i < colors.length; i++) {
		result.R += colors[i].R ** 2;
		result.G += colors[i].G ** 2;
		result.B += colors[i].B ** 2;
	}
	// Obtenemos el promedio de cada uno de los canales
	result.R = Math.round(Math.sqrt(result.R / totalPixels));
	result.G = Math.round(Math.sqrt(result.G / totalPixels));
	result.B = Math.round(Math.sqrt(result.B / totalPixels));

	console.log(`AvgColor: ${result.R}, ${result.G}, ${result.B}`);
	return result;
};
