function createStringColor(color, colorMode) {
	if (colorMode === 'RGB' && color.base.RGB) {
		const rgb = color.base.RGB;
		return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
	}
	if (colorMode === 'HSL' && color.base.HSL) {
		const hsl = color.base.HSL;
		return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
	}
}

function getColorTextBasedInBackground(color, colorMode) {
	if (colorMode === 'RGB') {
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
}

export default function IndividualPrimaryColor(props) {
	const { color, colorMode, divsQty } = props;
	const dimension = '175px';
	const divStyle = {
		height: dimension,
		width: dimension,
		backgroundColor: createStringColor(color, colorMode),
		color: getColorTextBasedInBackground(color, colorMode),
	};
	const percentage = Math.round(
		(Number(color.similarColors.length) / Number(divsQty ** 2)) * 100
	);
	return (
		<div className='text-center'>
			<div
				style={divStyle}
				className='flex justify-center items-center flex-col font-semibold'>
				<h3>{createStringColor(color, colorMode)}</h3>
				<p>Participación {percentage}%</p>
			</div>
		</div>
	);
}
