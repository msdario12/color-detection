import ImageGallery from './ImageGallery';
import UploadImg from './UploadImg';
import { SearchInputWithButton } from './form/SearchInputWithButton';

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
	return (
		<div className={className}>
			<h2 className='text-xl font-bold underline dark:text-slate-100'>
				Selecciona una imagen
			</h2>
			<ImageGallery
				setImgUrl={setImgUrl}
				setImgBitMap={setImgBitMap}
				className=' my-5'
			/>
			<h2>Cambiar de imagen</h2>
			<p>
				State {colorMode}, {divsQty}, {colorTolerance},
				{isLoading ? 'CARGANDO' : 'LISTO'},
			</p>
			<SearchInputWithButton
				handleChangeImage={handleChangeImage}
				isLoading={isLoading}
			/>

			<UploadImg setImgUrl={setImgUrl} setImgBitMap={setImgBitMap} />
		</div>
	);
};
