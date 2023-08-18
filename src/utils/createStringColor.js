export default function createStringColor(color, colorMode) {
	if (colorMode === 'RGB' && color.base.RGB) {
		const rgb = color.base.RGB;
		return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	}
	if (colorMode === 'HSL' && color.base.HSL) {
		const hsl = color.base.HSL;
		return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
	}
}
