import getPrimaryColor from '../utils/getPrimaryColor';
import getPrimaryColorHSL from '../utils/getPrimaryColorHSL';

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

self.onmessage = (e) => {
	if (e.data.msg === 'get-primary-colors') {
		const { avgColors, colorMode, colorTolerance } = e.data;
		const arrayForPrimaryColors = formatAvgColorsList(avgColors);
		const start = new Date();
		if (colorMode === 'RGB') {
			// let rawPrimaryColor = await getPrimaryColor(arrayForPrimaryColors);
			// setColorList(rawPrimaryColor[0].base.RGB);
			getPrimaryColor(arrayForPrimaryColors, colorTolerance).then((res) => {
				const end = new Date();
				self.postMessage({ primaryColor: res, time: { start, end } });
			});
			return;
		}

		if (colorMode === 'HSL') {
			getPrimaryColorHSL(arrayForPrimaryColors, colorTolerance).then((res) => {
				const end = new Date();
				self.postMessage({ primaryColor: res, time: { start, end } });
			});
			return;
		}
	}
};
