import { DarkThemeToggle, Navbar } from 'flowbite-react';

export const MainNav = () => {
	return (
		<Navbar rounded>
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
					Flowbite React
				</span>
			</Navbar.Brand>
			<div className='flex justify-end gap-3'>
				<DarkThemeToggle className='lg:hidden' />
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse className='relative'>
				<DarkThemeToggle className='absolute -left-6 -top-2 hidden lg:block' />

				<Navbar.Link active href='#'>
					<p>Home</p>
				</Navbar.Link>
				<Navbar.Link href='#'>
					<p>About</p>
				</Navbar.Link>
				<Navbar.Link href='#'>Services</Navbar.Link>
				<Navbar.Link href='#'>Pricing</Navbar.Link>
				<Navbar.Link href='#'>Contact</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	);
};
