import ContentIndividualColor from './ContentIndividualColor';

export default function PopoverPrimaryColor(props) {
	const { style, hoverColor, colorMode, divsQty } = props;

	return (
		<div
			style={style}
			className='absolute overflow-hidden rounded-md p-2 shadow-xl dark:bg-slate-200'>
			<div
				style={{
					width: 200,
					height: 200,
				}}>
				<ContentIndividualColor
					className='rounded-md'
					colorMode={colorMode}
					color={hoverColor}
					divsQty={divsQty}
					isColorSmall={false}
				/>
			</div>
		</div>
	);
}
