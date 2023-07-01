import createStringColor from '../utils/createStringColor';
import getColorTextBasedInBackground from '../utils/getColorTextBasedInBackground';

export default function ContentIndividualColor(props) {
	const { isColorSmall, color, colorMode, divsQty, className } = props;
	const dimension = '175px';
	const divStyle = {
		height: dimension,
		backgroundColor: createStringColor(color, colorMode),
		color: getColorTextBasedInBackground(color, colorMode),
	};
	const percentage = Math.round(
		(Number(color.similarColors.length) / Number(divsQty ** 2)) * 100
	);
	return (
		<div
			style={divStyle}
			className={
				'flex flex-col items-center justify-center font-semibold ' + className
			}>
			{!isColorSmall ? (
				<>
					<h3>{createStringColor(color, colorMode)}</h3>
					<p>Participación {percentage}%</p>
				</>
			) : (
				''
			)}
		</div>
	);
}
