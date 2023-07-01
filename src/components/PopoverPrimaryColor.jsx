import ContentIndividualColor from './ContentIndividualColor';

export default function PopoverPrimaryColor(props) {
	const { style, hoverColor, colorMode, divsQty } = props;

	return (
		<div
			style={style}
			className='absolute rounded-md p-2 shadow-xl dark:bg-slate-200'>
			<div
				className=' rounded-md'
				style={{
					width: 200,
					height: 200,
				}}>
				<ContentIndividualColor
					colorMode={colorMode}
					color={hoverColor}
					divsQty={divsQty}
					isColorSmall={false}
				/>
			</div>
		</div>
	);
}
