import PropTypes from 'prop-types';
import FormConfig from './form/FormConfig';

export default function ConfigSection(props) {
	const { setColorMode, setColorTolerance, setDivsQty } = props;

	function handleSubmit(e) {
		e.preventDefault();
		console.log('submit!');
		const form = Object.fromEntries(new FormData(e.target));
		setColorMode(form.colorMode);
		setDivsQty(form.divsQty);
		setColorTolerance(form.colorTolerance);
	}

	return (
		<section className='config-section'>
			<h2>Cambiar de imagen</h2>
			<button id='change-img'>Cambiar imagen</button>
			<h2>Seleccione el modo de color</h2>

			<FormConfig handleSubmit={handleSubmit} />
		</section>
	);
}

ConfigSection.propTypes = {
	setColorMode: PropTypes.func,
	setColorTolerance: PropTypes.func,
	setDivsQty: PropTypes.func,
};
