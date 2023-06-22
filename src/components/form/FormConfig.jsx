function FormConfig(props) {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<h2>Seleccione el modo de color</h2>
			<label htmlFor='rgb-mode'>RGB</label>
			<input type='radio' value='RGB' name='colorMode' id='rgb-mode' />
			<label htmlFor='rgb-mode'>HSL</label>
			<input type='radio' value='HSL' name='colorMode' id='hsl-mode' />
			<h2>Tolerancia de selección de color</h2>
			<label htmlFor='num-tol'>Seleccione el valor de tolerancia</label>
			<select name='colorTolerance' id='num-tol'>
				<option value='2'>2%</option>
				<option value='5'>5%</option>
				<option value='10'>10%</option>
				<option value='12'>12%</option>
				<option value='15'>15%</option>
				<option value='20'>20%</option>
				<option value='25'>25%</option>
				<option value='30'>30%</option>
				<option value='40'>40%</option>
			</select>
			<h2>Cantidad de divisiones</h2>

			<label htmlFor='num-div'>Seleccione la cantidad de divisiones: </label>
			<select name='divsQty' id='num-div'>
				<option value='2'>2</option>
				<option value='5'>5</option>
				<option value='10'>10</option>
				<option value='12'>12</option>
				<option value='15'>15</option>
				<option value='20'>20</option>
				<option value='25'>25</option>
				<option value='75'>75</option>
			</select>
			<button>Confirmar Cambios</button>
		</form>
	);
}

export default FormConfig;
