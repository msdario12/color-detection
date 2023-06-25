function createStringColor(color, colorMode) {
	if (colorMode === 'RGB') {
		return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
	}
}

export default function IndividualPrimaryColor(props) {
	const { color, colorMode } = props;
	const stringColor =
		colorMode === 'RGB' ? `RGB: ${color[0]} ${color[1]} ${color[2]}` : 'Nop';
	const divStyle = {
		width: '100px',
		height: '100px',
		backgroundColor: createStringColor(color, colorMode),
	};
	return (
		<div>
			<h3>{stringColor}</h3>
			<div style={divStyle}></div>
		</div>
	);
}
