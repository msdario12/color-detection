import InputDivQuantity from './InputDivQuantity';
import InputModeColor from './InputModeColor';
import InputToleranceColor from './InputToleranceColor';

function FormConfig(props) {
	const { setColorMode, setDivsQty, setColorTolerance, colorMode, className } =
		props;
	return (
		<form className={className}>
			<InputModeColor
				className='mb-3'
				handleChange={setColorMode}
				colorMode={colorMode}
			/>

			<div>
				<InputToleranceColor
					className='mb-3'
					handleChange={setColorTolerance}
				/>

				<InputDivQuantity className='mb-3' handleChange={setDivsQty} />
			</div>
		</form>
	);
}

export default FormConfig;
