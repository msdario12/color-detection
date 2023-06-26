export default function InputDivQuantity(props) {
	const { handleChange } = props;
	return (
		<div>
			<label htmlFor='num-div'>Seleccione la cantidad de divisiones: </label>
			<select
				onChange={(e) => handleChange(e.target.value)}
				name='divsQty'
				id='num-div'>
				<option value='2'>2</option>
				<option value='5'>5</option>
				<option value='10'>10</option>
				<option value='12'>12</option>
				<option value='15'>15</option>
				<option value='20'>20</option>
				<option value='25'>25</option>
				<option value='75'>75</option>
				<option value='125'>125</option>
			</select>
		</div>
	);
}
