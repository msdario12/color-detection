const iterateOverCanvasWorker = async (canvas, canvasColor) => {
	// Crear un nuevo Web Worker
	// const worker = new Worker('/scripts/worker.js');

	// Función para enviar un mensaje al Web Worker y recibir la respuesta como una promesa
	function sendMessageToWorker(message) {
		return new Promise((resolve, reject) => {
			// Escuchar el evento 'message' del Web Worker
			worker.onmessage = (event) => {
				const response = JSON.parse(event.data); // Deserializar la respuesta recibida
				resolve(response);
			};

			// Escuchar el evento 'error' del Web Worker
			worker.onerror = (error) => {
				reject(error); // Rechaza la promesa con el error del Web Worker
			};

			// Serializar el mensaje antes de enviarlo al Web Worker
			const serializedMessage = JSON.stringify(message);
			worker.postMessage(serializedMessage);
		});
	}

	// Uso del Web Worker y la promesa
	let promises = [];

	async function calculate() {
		let response;
		try {
			console.log('Inicio worker');
			response = await Promise.all(promises);
			console.log('terminamos');
		} catch (error) {
			console.log('Error mi king', error);
		}

		return response;
	}

	async function asyncIteration(dataColor, h, w) {
		let colors = [];
		let avgColors = [];
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
			const avgColorRGB = await getAvgColor(colors, totalPixels);
			colorRGB = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;
			avgColors.push({
				RGB: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
				stringRGB: `rgb(${colorRGB})`,
				h: h,
				w: w,
			});
			// Dibujar y pintar cada cuadrado con el color promedio
			// ctxColor.fillStyle = `rgb(${colorRGB})`;
		}
		if (colorHSLstate) {
			const avgColorHSL = await getAvgColorHSL(colors, totalPixels);
			colorHSL = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
			avgColors.push({
				HSL: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
				stringHSL: `hsl(${colorHSL})`,
				h: h,
				w: w,
			});
			// Dibujar y pintar cada cuadrado con el color promedio
			// ctxColor.fillStyle = `hsl(${colorHSL})`;
		}

		return avgColors;
	}

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
	let allColors = [];
	// Iteramos 2 veces para recorrer el nuevo canvas discretizado
	// Avance en el eje Y, vertical

	function renderColors(allColors) {
		// allColors = [..., {RGB:[r,g,b], stringRGB:'string'}, ...]
		// allColors = [..., {HSL:[r,g,b], stringHSL:'string'}, ...]
		// Calculamos la escala entre las dimensiones naturales y renderizadas
		const scaleW = canvas.width / imgFile.width;
		const scaleH = canvas.height / imgFile.height;

		const deltaWScale = deltaW / scaleW;
		const deltaHScale = deltaH / scaleH;

		let stringRGB, stringHSL;

		let renderPromises = [];

		async function asyncRenderColors(allColors, i) {
			if (colorRGBstate) {
				let arrayRGB = allColors[i][0].RGB;
				stringRGB = allColors[i][0].stringRGB;
				ctxColor.fillStyle = stringRGB;
			}
			if (colorHSLstate) {
				let arrayHSL = allColors[i][0].HSL;
				stringHSL = allColors[i][0].stringHSL;
				ctxColor.fillStyle = stringHSL;
			}

			let h = allColors[i][0].h;
			let w = allColors[i][0].w;

			// Insertar string del color en cada cuadrado del canvas
			ctxColor.fillRect(
				w * deltaWScale,
				h * deltaHScale,
				deltaWScale,
				deltaHScale
			);

			if (divisionQtyState <= 5) {
				ctxColor.font = '12px Arial';
				ctxColor.textAlign = 'center';
				ctxColor.strokeText(
					colorRGBstate ? stringRGB : stringHSL,
					w * deltaWScale + deltaWScale / 2,
					h * deltaHScale + deltaHScale / 2
				);
			}
			// Montar el canvas en el DOM
			newCanvas.append(canvasColor);
		}

		for (let i = 0; i < allColors.length; i++) {
			renderPromises.push(asyncRenderColors(allColors, i));
		}

		Promise.all(renderPromises);
	}

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

			// Obtenemos los valores de R,G,B y A de cada pixel, saltando de a 4 elementos
			// !DESDE ACA
			// console.log('push one');
			// promises.push(sendMessageToWorker(dataColor));

			// let colors = await calculate();
			// let colors = await asyncIteration(dataColor, h, w);
			promises.push(asyncIteration(dataColor, h, w));
			// allColors.push(colors);
		}
	}
	allColors = await calculate(promises);
	renderColors(allColors);

	const output = [];

	allColors.forEach((color) => {
		if (colorRGBstate) {
			output.push({ RGB: color[0].RGB });
		}
		if (colorHSLstate) {
			output.push({ HSL: color[0].HSL });
		}
	});

	return output;
	// sendMessageToWorker('off');
};
