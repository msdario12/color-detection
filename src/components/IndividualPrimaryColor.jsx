import createStringColor from '../utils/createStringColor';
import getColorTextBasedInBackground from '../utils/getColorTextBasedInBackground';

export default function IndividualPrimaryColor(props) {
	const { color, colorMode, divsQty, onEnter, onLeave } = props;
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
		<div
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			className='text-center p-2 border bg-white shadow-xl'>
			<div
				style={divStyle}
				className='flex justify-center items-center flex-col font-semibold'>
				<h3>{createStringColor(color, colorMode)}</h3>
				<p>Participación {percentage}%</p>
			</div>
		</div>
	);
}
