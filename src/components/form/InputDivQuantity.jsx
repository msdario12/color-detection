export default function InputDivQuantity(props) {
	const { handleChange, className } = props;
	return (
		<div className={className}>
			<label
				className='mb-2 block text-sm font-medium text-gray-900 dark:text-slate-200'
				htmlFor='num-div'>
				Seleccione la cantidad de divisiones:{' '}
			</label>
			<select
				className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-slate-200 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
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
