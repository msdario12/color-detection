export default function InputToleranceColor() {
	return (
		<div>
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
		</div>
	);
}
