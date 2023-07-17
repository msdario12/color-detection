export const TabsConfig = ({ sectionActive, setSectionActive }) => {
	const activeClass =
		'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500 active border-b-2';
	return (
		<div className='sticky top-0 z-40 rounded-b-lg bg-white shadow-lg dark:bg-slate-900 dark:text-slate-200 sm:hidden'>
			<ul className=' mb-4 grid grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700'>
				<li className='mr-2 '>
					<button
						className={`inline-block rounded-t-lg p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
							sectionActive === 'config' ? activeClass : ''
						}`}
						onClick={() => setSectionActive('config')}>
						Configuración
					</button>
				</li>

				<li className='mr-2'>
					<button
						className={`inline-block rounded-t-lg p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 ${
							sectionActive === 'results' ? activeClass : ''
						}`}
						aria-current='page'
						onClick={() => setSectionActive('results')}>
						Resultados
					</button>
				</li>
			</ul>
		</div>
	);
};
