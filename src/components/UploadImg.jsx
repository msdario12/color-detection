import useLoadLocalImage from '../hooks/useLoadLocalImage';
import { addImageLocalStorage } from '../utils/localStorageOperations';
import FileInput from './FileInput';

export default function UploadImg(props) {
	const { setImgUrl, setImgBitMap } = props;
	const { loadImg } = useLoadLocalImage(setImgBitMap, setImgUrl);
	const handleChange = (e) => {
		const selectedFile = e.target.files;
		if (selectedFile.length > 0) {
			const [imageFile] = selectedFile;
			loadImg(imageFile);
			addImageLocalStorage(imageFile);
		}
	};

	return (
		<div>
			<h2 className='mb-3 text-2xl font-bold dark:text-slate-100'>
				Subir una imagen
			</h2>
			<FileInput onChange={handleChange} />
		</div>
	);
}
