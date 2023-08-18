export default function getColorTextBasedInBackground(color, colorMode) {
	if (colorMode === 'RGB' && color.base.RGB) {
		const rgb = color.base.RGB;
		const umbral = 125;
		const contrastColor = Math.round(
			(299 * rgb[0] + 587 * rgb[1] + 114 * rgb[2]) / 1000
		);
		if (contrastColor <= umbral) {
			return 'white';
		} else {
			return 'black';
		}
	}
	if (colorMode === 'HSL' && color.base.HSL) {
		const hsl = color.base.HSL;
		const umbral = 60;
		if (hsl[2] >= umbral) {
			return 'black';
		} else {
			return 'white';
		}
	}
}
