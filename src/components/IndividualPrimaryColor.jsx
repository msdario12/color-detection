function createStringColor(color, colorMode) {
	if (colorMode === 'RGB') {
		return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	}
	if (colorMode === 'HSL') {
		return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
	}
}

export default function IndividualPrimaryColor(props) {
	const { color, colorMode } = props;
	const dimension = '175px';
	const divStyle = {
		height: dimension,
		width: dimension,
		backgroundColor: createStringColor(color, colorMode),
	};
	return (
		<div className='text-center'>
			<div style={divStyle} className='flex justify-center items-center'>
				<h3>{createStringColor(color, colorMode)}</h3>
			</div>
		</div>
	);
}
