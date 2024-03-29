import { useState } from 'react';
import { Button } from 'flowbite-react';

export const SearchInputWithButton = ({
	className,
	handleChangeImage,
	isLoading,
}) => {
	const [searchTerm, setSearchTerm] = useState('');
	const handleSubmit = (e) => {
		e.preventDefault();
		handleChangeImage.func(searchTerm);
	};

	return (
		<form className={className} onSubmit={handleSubmit}>
			<label
				htmlFor='default-search'
				className='sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white'>
				Search
			</label>
			<div className='relative'>
				<div className='pointer-events-none absolute top-4 flex items-center pl-3 lg:inset-y-0 lg:left-0'>
					<svg
						className='h-4 w-4 text-gray-500 dark:text-gray-400'
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 20 20'>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
						/>
					</svg>
				</div>
				<input
					onChange={(e) => setSearchTerm(e.target.value)}
					value={searchTerm}
					type='search'
					id='default-search'
					className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 lg:py-4 mb-4'
					placeholder='Busca imágenes...'
				/>
				<Button
					isProcessing={isLoading}
					disabled={searchTerm ? false : true}
					className='mx-auto my-3 h-10 w-32 rounded-lg bg-blue-700 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 lg:absolute lg:bottom-1.5 lg:right-2.5 lg:my-0'
					type='submit'>
					Buscar
				</Button>
			</div>
		</form>
	);
};
