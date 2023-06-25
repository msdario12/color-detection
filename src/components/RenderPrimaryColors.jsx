import { useEffect, useState } from 'react';
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

export default function RenderPrimaryColors(props) {
	const { avgColors, colorMode, colorTolerance } = props;
	const [colorList, setColorList] = useState([]);
	const arrayForPrimaryColors = formatAvgColorsList(avgColors);

	useEffect(() => {
		if (colorMode === 'RGB') {
			// let rawPrimaryColor = await getPrimaryColor(arrayForPrimaryColors);
			// setColorList(rawPrimaryColor[0].base.RGB);
			getPrimaryColor(arrayForPrimaryColors, colorTolerance).then((res) =>
				setColorList(res)
			);
		}
		if (colorMode === 'HSL') {
			getPrimaryColorHSL(arrayForPrimaryColors, colorTolerance).then((res) =>
				setColorList(res)
			);
		}
	}, [avgColors]);
	console.log(colorList);

	return (
		<div>Colors</div>
	);
}
