export default function UploadImg(props) {
	const { setImgUrl, setImgBitMap } = props;
	const handleChange = (e) => {
		const selectedFile = e.target.files;
		if (selectedFile.length > 0) {
			const [imageFile] = selectedFile;
			const fileReader = new FileReader();
			fileReader.onload = () => {
				const srcData = fileReader.result;
				createImageBitmap(imageFile)
					.then((res) => setImgBitMap(res))
					.then(() => setImgUrl(srcData));
			};
			fileReader.readAsDataURL(imageFile);
		}
	};

	return (
		<div>
			<h2 className='text-xl font-bold'>Subir una imagen</h2>
			<input type='file' name='imgFile' id='imgFile' onChange={handleChange} />
		</div>
	);
}
