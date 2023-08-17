export default function FileInput(props) {
	const { className, onChange } = props;
	return (
		<div className={className}>
			<label
				className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
				htmlFor='file_input'>
				Carga una imagen para analizarla.
			</label>
			<input
				onChange={onChange}
				className='text-grey-900 file:text-grey-700 h-18 block
            w-full cursor-pointer rounded-lg
            border border-gray-300 bg-gray-50 px-5
            text-sm text-gray-300
            file:m-2
			file:rounded-lg
 			file:border-0  file:bg-blue-50 file:px-3 file:py-2 file:text-sm hover:file:cursor-pointer  hover:file:bg-blue-50 hover:file:text-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400 md:h-auto file:md:font-medium'
				aria-describedby='file_input_help'
				id='file_input'
				type='file'
				accept='image/*'
			/>
			<p
				className='mt-1 text-sm text-gray-500 dark:text-gray-300'
				id='file_input_help'>
				{' '}
				PNG, JPG or JPEG (MAX. 1920x1080px).
			</p>
		</div>
	);
}
