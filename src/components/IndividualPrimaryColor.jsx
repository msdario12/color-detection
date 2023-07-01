import createStringColor from '../utils/createStringColor';
import getColorTextBasedInBackground from '../utils/getColorTextBasedInBackground';

export default function IndividualPrimaryColor(props) {
	const {
		color,
		colorMode,
		divsQty,
		onEnter,
		onLeave,
		className,
		style,
		isColorSmall,
	} = props;
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
			style={style}
			onMouseEnter={onEnter}
			onMouseLeave={onLeave}
			className={className}>
			<div
				style={divStyle}
				className='flex flex-col items-center justify-center font-semibold'>
				{!isColorSmall ? (
					<div>
						<h3>{createStringColor(color, colorMode)}</h3>
						<p>Participación {percentage}%</p>
					</div>
				) : (
					''
				)}
			</div>
		</div>
	);
}
