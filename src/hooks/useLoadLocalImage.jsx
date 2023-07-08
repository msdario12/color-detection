export default function useLoadLocalImage(setImgBitMap, setImgUrl) {
	function loadImg(file) {
		console.log(file);

		if (file.id) {
			const newImg = new Image();
			newImg.src = file.src;
			createImageBitmap(newImg)
				.then((res) => setImgBitMap(res))
				.then(() => setImgUrl(file.src));
			return;
		}
		if (file.localName === 'img') {
			console.log('Es imagen');
			console.log(file);
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
