export default function useLoadLocalImage(setImgBitMap, setImgUrl) {
	function loadImg(file) {
		if (typeof file === 'object') {
			createImageBitmap(file)
				.then((res) => setImgBitMap(res))
				.then(() => setImgUrl(file.src));
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const srcData = fileReader.result;
			createImageBitmap(file)
				.then((res) => setImgBitMap(res))
				.then(() => setImgUrl(srcData));
		};
		fileReader.readAsDataURL(file);
	}
	return { loadImg };
}
