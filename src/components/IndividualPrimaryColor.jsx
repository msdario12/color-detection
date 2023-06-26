function createStringColor(color, colorMode) {
	if (colorMode === 'RGB' && color.base.RGB) {
		return `rgb(${color.base.RGB[0]}, ${color.base.RGB[1]}, ${color.base.RGB[2]})`;
	}
	if (colorMode === 'HSL' && color.base.HSL) {
		return `hsl(${color.base.HSL[0]}, ${color.base.HSL[1]}%, ${color.base.HSL[2]}%)`;
	}
}

export default function IndividualPrimaryColor(props) {
	const { color, colorMode, divsQty } = props;
	const dimension = '175px';
	const divStyle = {
		height: dimension,
		width: dimension,
		backgroundColor: createStringColor(color, colorMode),
	};
	const percentage = Math.round(
		(Number(color.similarColors.length) / Number(divsQty ** 2)) * 100
	);
	return (
		<div className='text-center'>
			<div
				style={divStyle}
				className='flex justify-center items-center flex-col'>
				<h3>{createStringColor(color, colorMode)}</h3>
				<p>Participación {percentage}%</p>
			</div>
		</div>
	);
}
