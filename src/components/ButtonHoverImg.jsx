import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ButtonHoverImg = ({ icon, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='grid aspect-square w-7 place-content-center rounded-full border border-slate-400 bg-slate-200/90'>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
};
