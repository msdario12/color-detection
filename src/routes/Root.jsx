import { Flowbite } from 'flowbite-react';
import { Outlet } from 'react-router-dom';
import { MainNav } from '../components/MainNav';
import { MainFooter } from '../components/MainFooter';

export const Root = () => {
	return (
		<Flowbite>
			<MainNav className={'mb-7'} />
			<Outlet />
			<MainFooter className={'mt-7'} />
		</Flowbite>
	);
};
