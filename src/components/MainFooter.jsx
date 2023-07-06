import { Footer } from 'flowbite-react';

export const MainFooter = () => {
	return (
		<Footer container>
			<div className='mx-auto grid w-full justify-between lg:container sm:flex sm:justify-between md:flex md:grid-cols-1'>
				<Footer.Copyright by='Flowbite™' href='#' year={2022} />
				<Footer.LinkGroup>
					<Footer.Link href='#'>About</Footer.Link>
					<Footer.Link href='#'>Privacy Policy</Footer.Link>
					<Footer.Link href='#'>Licensing</Footer.Link>
					<Footer.Link href='#'>Contact</Footer.Link>
				</Footer.LinkGroup>
			</div>
		</Footer>
	);
};
