import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export const ButtonHoverImg = ({ icon, onClick }) => {
	return (
		<motion.button
			onClick={onClick}
			whileHover={{ scale: 1.2, backgroundColor: 'rgb(28 100 242)' }}
			className='grid aspect-square w-7  place-content-center rounded-full border border-slate-400/80 bg-slate-200/90 focus:ring-4  focus:ring-blue-300 dark:border-slate-900/80 dark:bg-slate-600/90  dark:focus:ring-blue-800 md:w-7 lg:w-9'>
			<FontAwesomeIcon icon={icon} />
		</motion.button>
	);
};
