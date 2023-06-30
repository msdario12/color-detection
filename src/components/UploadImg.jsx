import useLoadLocalImage from '../hooks/useLoadLocalImage';
import FileInput from './FileInput';

export default function UploadImg(props) {
	const { setImgUrl, setImgBitMap } = props;
	const { loadImg } = useLoadLocalImage(setImgBitMap, setImgUrl);
	const handleChange = (e) => {
		const selectedFile = e.target.files;
		if (selectedFile.length > 0) {
			const [imageFile] = selectedFile;
			loadImg(imageFile);
		}
	};

	return (
		<div>
			<h2 className='text-xl font-bold'>Subir una imagen</h2>
			<FileInput onChange={handleChange} />
		</div>
	);
}
