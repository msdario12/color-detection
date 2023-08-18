// worker.js
self.importScripts('rgb-to-hsl.js', 'get-avg-color.js');
// Escuchar el evento 'message' del hilo principal
self.onmessage = async (event) => {
	const deserealizedData = JSON.parse(event.data);

	if (deserealizedData === 'off') {
		console.log('Me apago rey');
		self.close();
	}
	const dataColor = deserealizedData;
	// console.log('Mensaje recibido en el Web Worker:', message);
	let colors = [];
	let avgColors = [];
	// Simular un tiempo de procesamiento
	for (let i = 0; i < dataColor.length; i += 4) {
		const R = dataColor[i];
		const G = dataColor[i + 1];
		const B = dataColor[i + 2];
		// A: dataColor[i + 3],

		// const HSLArray = RGBToHSL([R, G, B]);

		colors.push({
			RGB: [R, G, B],
			// HSL: [HSLArray[0], HSLArray[1], HSLArray[2]],
		});
	}

	const avgColorRGB = await getAvgColor(colors, colors.length);
	let colorRGB = `${avgColorRGB.R}, ${avgColorRGB.G}, ${avgColorRGB.B}`;
	avgColors.push({
		RGB: [avgColorRGB.R, avgColorRGB.G, avgColorRGB.B],
	});

	// const avgColorHSL = await getAvgColorHSL(colors, colors.length);
	// let colorHSL = `${avgColorHSL.H}, ${avgColorHSL.S}%, ${avgColorHSL.L}%`;
	// avgColors.push({
	// 	HSL: [avgColorHSL.H, avgColorHSL.S, avgColorHSL.L],
	// });

	const response = avgColors;

	// Enviar la respuesta al hilo principal
	self.postMessage(JSON.stringify(response));
};
