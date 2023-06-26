import { useEffect, useState } from 'react';
import getPrimaryColor from '../utils/getPrimaryColor';
import getPrimaryColorHSL from '../utils/getPrimaryColorHSL';
import IndividualPrimaryColor from './IndividualPrimaryColor';

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
	const { avgColors, colorMode, colorTolerance, divsQty } = props;
	const [colorList, setColorList] = useState([]);

	useEffect(() => {
		const arrayForPrimaryColors = formatAvgColorsList(avgColors);
		setColorList([]);
		if (colorMode === 'RGB') {
			// let rawPrimaryColor = await getPrimaryColor(arrayForPrimaryColors);
			// setColorList(rawPrimaryColor[0].base.RGB);
			getPrimaryColor(arrayForPrimaryColors, colorTolerance).then((res) => {
				{
					setColorList(res);
				}
			});
			return;
		}
		if (colorMode === 'HSL') {
			getPrimaryColorHSL(arrayForPrimaryColors, colorTolerance).then((res) => {
				setColorList(res);
			});
		}
	}, [avgColors, colorTolerance]);

	console.log(colorList);

	return (
		<div className='my-10'>
			<h2 className='text-4xl mb-5'>Colors</h2>
			<div className='flex gap-5 flex-wrap justify-center'>
				{colorList.length > 0 &&
					colorList.map((color, idx) => (
						<IndividualPrimaryColor
							divsQty={divsQty}
							key={'C' + idx}
							colorMode={colorMode}
							color={color}
						/>
						// eslint-disable-next-line no-mixed-spaces-and-tabs
					))}
			</div>
		</div>
	);
}
