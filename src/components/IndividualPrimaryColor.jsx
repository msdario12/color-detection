import ContentIndividualColor from './ContentIndividualColor';

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

	return (
		<div
			style={style}
			className={className}
			onMouseEnter={() => onEnter(color)}
			onMouseLeave={() => onLeave()}>
			<ContentIndividualColor
				isColorSmall={isColorSmall}
				color={color}
				divsQty={divsQty}
				colorMode={colorMode}
			/>
		</div>
	);
}
