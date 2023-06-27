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
		if (colorMode === 'RGB') {
			// let rawPrimaryColor = await getPrimaryColor(arrayForPrimaryColors);
			// setColorList(rawPrimaryColor[0].base.RGB);
			getPrimaryColor(arrayForPrimaryColors, colorTolerance).then((res) =>
				self.postMessage({ primaryColor: res })
			);
			return;
		}

		if (colorMode === 'HSL') {
			getPrimaryColorHSL(arrayForPrimaryColors, colorTolerance).then((res) =>
				self.postMessage({ primaryColor: res })
			);
			return;
		}
	}
};
