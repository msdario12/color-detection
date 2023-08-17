import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Footer } from 'flowbite-react';

export const MainFooter = ({ className }) => {
	return (
		<Footer className={className} container>
			<div className='mx-auto grid w-full justify-between lg:container sm:flex sm:justify-between md:flex md:grid-cols-1'>
				<Footer.Copyright by='by Dario Mansilla' href='#' year={2023} />
				<Footer.LinkGroup>
					<Footer.Link href='#'>
						<FontAwesomeIcon icon={faLinkedin} size='lg' />
					</Footer.Link>
					<Footer.Link href='#'>
						<FontAwesomeIcon icon={faGithub} size='lg' />
					</Footer.Link>
				</Footer.LinkGroup>
			</div>
		</Footer>
	);
};
