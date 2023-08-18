import { Flowbite } from 'flowbite-react';
import { Outlet } from 'react-router-dom';
import { MainNav } from '../components/MainNav';
import { MainFooter } from '../components/MainFooter';

export const Root = () => {
	return (
		<Flowbite>
			<main className='flex min-h-screen flex-col justify-between'>
				<MainNav className={'mb-7'} />
				<Outlet />
				<MainFooter className={'mt-7'} />
			</main>
		</Flowbite>
	);
};
