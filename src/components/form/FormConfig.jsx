import InputDivQuantity from './InputDivQuantity';
import InputModeColor from './InputModeColor';
import InputToleranceColor from './InputToleranceColor';

function FormConfig(props) {
	const { setColorMode, setDivsQty, setColorTolerance, colorMode, className } =
		props;
	return (
		<form className={className}>
			<h2>Seleccione el modo de color</h2>
			<InputModeColor handleChange={setColorMode} colorMode={colorMode} />

			<h2>Tolerancia de selección de color</h2>
			<InputToleranceColor handleChange={setColorTolerance} />

			<h2>Cantidad de divisiones</h2>
			<InputDivQuantity handleChange={setDivsQty} />
		</form>
	);
}

export default FormConfig;
