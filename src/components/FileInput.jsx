export default function FileInput(props) {
	const { className, onChange } = props;
	return (
		<div className={className}>
			<label
				className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
				htmlFor='file_input'>
				Upload file
			</label>
			<input
				onChange={onChange}
				className='text-grey-900 file:text-grey-700  block
            w-full cursor-pointer rounded-lg
            border border-gray-300 bg-gray-50 text-sm
            text-gray-300 file:mx-2
            file:my-2 file:mr-5
            file:rounded-lg file:border-0
             file:bg-blue-50 file:px-6  file:py-2 file:text-sm file:font-medium hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700  focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:placeholder-gray-400'
				aria-describedby='file_input_help'
				id='file_input'
				type='file'
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
