import { motion } from 'framer-motion';
import { useState } from 'react';
import {
	getImageLocalStorageById,
	removeImageLocalStorage,
} from '../utils/localStorageOperations';
import { ButtonHoverImg } from './ButtonHoverImg';
import { faBolt, faRemove } from '@fortawesome/free-solid-svg-icons';

export const SlideImg = ({ img, setImageList, loadImg }) => {
	const [isHover, setIsHover] = useState(false);
	const [isTap, setIsTap] = useState(false);

	function handleClickButtonImg(e, id) {
		// const selectedFile = e.target;
		const foundImg = getImageLocalStorageById(id);
		loadImg(foundImg);
	}

	function handleDeleteImg(id) {
		removeImageLocalStorage(id);
		setImageList((prev) => prev.filter((img) => img.id !== id));
	}
	function handleTap() {
		setIsTap(true);
		setInterval(() => setIsTap(false), 1250);
	}

	const variants = {
		hover: { opacity: 1 },
		not: { opacity: 0 },
	};

	return (
		<motion.div
			className='relative'
			onHoverStart={() => {
				setIsHover(true);
			}}
			onTap={handleTap}
			onHoverEnd={() => {
				setIsHover(false);
			}}>
			<img
				className='w-42 aspect-video h-full object-cover object-center'
				src={img.src}
				alt={`Picture number ${img} for select`}
			/>
			<motion.div
				animate={isHover || isTap ? 'hover' : 'not'}
				variants={variants}
				className='absolute left-1/2 top-1/2 flex h-full  w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-1.5 bg-slate-800/60 md:gap-3 lg:gap-4'>
				<ButtonHoverImg
					icon={faBolt}
					onClick={(e) => handleClickButtonImg(e, img.id)}
				/>
				<ButtonHoverImg
					icon={faRemove}
					onClick={() => handleDeleteImg(img.id)}
				/>
			</motion.div>
		</motion.div>
	);
};
