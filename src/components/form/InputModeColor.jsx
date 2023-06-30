export default function InputModeColor(props) {
	const { handleChange, colorMode, className } = props;

	return (
		<div className={className}>
			<h2 className='mb-2 text-sm font-medium dark:text-slate-200'>
				Seleccione el modo de color
			</h2>
			<div className='mb-3 flex cursor-pointer items-center rounded border border-gray-200 pl-4 dark:border-gray-700'>
				<input
					onChange={(e) => handleChange(e.target.value)}
					type='radio'
					value='RGB'
					name='colorMode'
					id='rgb-mode'
					checked={colorMode === 'RGB'}
					className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
				/>
				<label
					htmlFor='rgb-mode'
					className='ml-2 w-full cursor-pointer py-4 text-sm font-medium text-gray-900 dark:text-gray-300'>
					RGB Mode
				</label>
			</div>
			<div className='flex cursor-pointer items-center rounded border border-gray-200 pl-4 dark:border-gray-700'>
				<input
					onChange={(e) => handleChange(e.target.value)}
					type='radio'
					value='HSL'
					name='colorMode'
					id='hsl-mode'
					checked={colorMode === 'HSL'}
					className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
				/>
				<label
					htmlFor='hsl-mode'
					className='ml-2 w-full cursor-pointer py-4 text-sm font-medium text-gray-900 dark:text-gray-300'>
					HSL Mode
				</label>
			</div>
		</div>
	);
}
