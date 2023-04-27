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
	// Asigno las dimensiones del canvas en funcion de las dimensiones de la imagen
	canvas.width = imgFile.naturalWidth;
	canvas.height = imgFile.naturalHeight;
	// Creo el contexto para canvas
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	// Montamos la imagen en canvas
	ctx.drawImage(imgFile, 0, 0);

	// ! CANVA PARA MOSTRAR COLORES
	const canvasColor = document.createElement("canvas");
	canvasColor.width = canvas.width;
	canvasColor.height = canvas.height;
	// Creo el contexto para canvas
	const ctxColor = canvasColor.getContext("2d", { willReadFrequently: true });
	// !FIN CANVA COLORES
	// Array para almacenar los resultados de avg-color en cada sector
	const avgColors = [];

	// Definimos la cantidad de divisiones en cada eje
	const numDiv = 5;
	const deltaW = canvas.width / numDiv;
	const deltaH = canvas.height / numDiv;
	// Calculamos la escala entre las dimensiones naturales y renderizadas
	const scale = imgFile.width / canvas.width;

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
					// A: dataColor[i + 3],
				});
			}
			const totalPixels = deltaW * deltaH;
			// Llamamos a la funcion encargada de obtener el color promedio de la imagen
			const avgColor = getAvgColor(colors, totalPixels);
			// Color promedio en HSL
			const avgColorHSL = getAvgColorHSL(colors, totalPixels);

			// Color promedio del sector que se esta analizando - (h, w)
			const colorRGB = `${avgColor.R}, ${avgColor.G}, ${avgColor.B}`;
			const colorHSL = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
			// Guardamos este valor en el array
			avgColors.push({
				x: w,
				y: h,
				HSL: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
			});
			// showColor.style.backgroundColor = `rgb(${colorRGB})`;

			// !COLOR CANVA

			// Dibujar y pintar cada cuadrado con el color promedio
			ctxColor.fillStyle = `hsl(${colorHSL})`;
			ctxColor.fillRect(w * deltaW, h * deltaH, deltaW, deltaH);
			// Insertar string del color en cada cuadrado del canvas
			ctxColor.font = "12px Arial";
			ctxColor.textAlign = "center";
			ctxColor.strokeText(
				colorHSL,
				w * deltaW + deltaW / 2,
				h * deltaH + deltaH / 2
			);
			// Montar el canvas en el DOM

			canvasColor.style.scale = scale;
			newCanvas.append(canvasColor);

			// !COLOR CANVA
		}
	}
	// console.log(avgColors);
	const primaryColor = getPrimaryColorHSL(avgColors)[0].base.HSL;
	console.log("HSL value of PC", primaryColor);

	// Asigno una sombra a la imagen con este color RGB
	// imgFile.style.boxShadow = `0px 0px 50px 25px rgba(${rgbColor}, 0.85)`;
	// Asigno una sombra a la imagen con este color RGB
	imgFile.style.boxShadow = `0px 0px 100px 55px hsl(${primaryColor[0]}, ${primaryColor[1]}%, ${primaryColor[2]}%)`;
};
