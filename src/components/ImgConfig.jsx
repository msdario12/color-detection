import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ButtonHoverImg } from './ButtonHoverImg';
import ImageGallery from './ImageGallery';
import UploadImg from './UploadImg';
import { SearchInputWithButton } from './form/SearchInputWithButton';
import { useState } from 'react';

export const ImgConfig = ({
	setImgUrl,
	setImgBitMap,
	colorMode,
	divsQty,
	colorTolerance,
	isLoading,
	handleChangeImage,
	className,
}) => {
	const [imageList, setImageList] = useState([]);
	const cleanLocalStorage = () => {
		localStorage.clear();
		setImageList([]);
	};
	return (
		<div className={className}>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl font-bold dark:text-slate-100'>Galería</h2>
				<ButtonHoverImg icon={faTrash} onClick={cleanLocalStorage} />
			</div>
			<ImageGallery
				setImageList={setImageList}
				imageList={imageList}
				isLoading={isLoading}
				setImgUrl={setImgUrl}
				setImgBitMap={setImgBitMap}
				className=' my-5'
			/>
			<h2 className='mb-3 text-2xl font-bold dark:text-slate-100'>
				Busca una imagen online
			</h2>
			<SearchInputWithButton
				handleChangeImage={handleChangeImage}
				isLoading={isLoading}
			/>

			<UploadImg setImgUrl={setImgUrl} setImgBitMap={setImgBitMap} />
		</div>
	);
};
