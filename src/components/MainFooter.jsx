import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Footer } from 'flowbite-react';

export const MainFooter = ({ className }) => {
	return (
		<Footer className={className} container>
			<div className='mx-auto grid w-full justify-between lg:container sm:flex sm:justify-between md:flex md:grid-cols-1'>
				<Footer.Copyright
					by='by Dario Mansilla'
					href='https://github.com/msdario12'
					year={2023}
				/>
				<Footer.LinkGroup>
					<Footer.Link href='https://www.linkedin.com/in/msdario12'>
						<FontAwesomeIcon icon={faLinkedin} size='lg' />
					</Footer.Link>
					<Footer.Link href='https://github.com/msdario12/color-detection'>
						<FontAwesomeIcon icon={faGithub} size='lg' />
					</Footer.Link>
				</Footer.LinkGroup>
			</div>
		</Footer>
	);
};
