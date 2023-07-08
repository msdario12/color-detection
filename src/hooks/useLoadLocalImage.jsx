export default function useLoadLocalImage(setImgBitMap, setImgUrl) {
	function loadImg(file) {
		console.log(file);
		async function loadImg() {
			const newImg = new Image();
			newImg.src = await file.src;
			console.dir(newImg.width);
			if (newImg.width > 0) {
				createImageBitmap(newImg)
					.then((res) => setImgBitMap(res))
					.then(() => setImgUrl(file.src))
					.catch((e) => console.log(e));
				return;
			}
			return;
		}

		if (file.id) {
			loadImg();
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
