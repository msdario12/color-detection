import { DarkThemeToggle, Navbar } from 'flowbite-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const MainNav = ({ className }) => {
	const [clickedLink, setClickedLink] = useState();
	return (
		<Navbar className={className} rounded>
			<Navbar.Brand href='https://flowbite-react.com'>
				{/* <img
					alt='Flowbite React Logo'
					className='mr-3 h-6 sm:h-9'
					src='/favicon.svg'
				/> */}
				<span className='my-auto mr-3 grid aspect-square h-6 place-content-center rounded-full border p-6 text-center sm:h-9'>
					DM
				</span>
				<span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
					Detección de colores
				</span>
			</Navbar.Brand>
			<div className='flex justify-end gap-3'>
				<DarkThemeToggle className='lg:hidden' />
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse className='relative'>
				<DarkThemeToggle className='absolute -left-6 -top-2 hidden lg:block' />

				<Navbar.Link
					onClick={() => setClickedLink('home')}
					as={Link}
					to={'/'}
					active={clickedLink === 'home'}
					href='#'>
					Aplicación
				</Navbar.Link>
				<Navbar.Link
					as={Link}
					onClick={() => setClickedLink('about-project')}
					active={clickedLink === 'about-project'}
					to={'/about-project'}
					href='#'>
					Acerca del proyecto
				</Navbar.Link>
				<Navbar.Link href='#'>Contacto</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};
