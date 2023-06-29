export default function InputModeColor(props) {
	const { handleChange, colorMode, className } = props;

	return (
		<div className={className}>
			<label htmlFor='rgb-mode'>RGB</label>
			<input
				onChange={(e) => handleChange(e.target.value)}
				type='radio'
				value='RGB'
				name='colorMode'
				id='rgb-mode'
				checked={colorMode === 'RGB'}
			/>
			<label htmlFor='hsl-mode'>HSL</label>
			<input
				onChange={(e) => handleChange(e.target.value)}
				type='radio'
				value='HSL'
				name='colorMode'
				id='hsl-mode'
				checked={colorMode === 'HSL'}
			/>
		</div>
	);
}
