import { useLayoutEffect, useRef, useState } from 'react';

export default function useImageSize() {
	const imgRef = useRef(null);
	const img = imgRef.current;

	const [imgSizes, setImgSizes] = useState({
		naturalSize: { w: 0, h: 0 },
		renderSize: { w: 0, h: 0 },
	});
	function updateSize(time = 250) {
		console.log('Actualizando tamaño 🉐');
		setTimeout(() => {
			setImgSizes({
				naturalSize: { w: img.naturalWidth, h: img.naturalHeight },
				renderSize: { w: img.width, h: img.height },
			});
		}, time);
	}

	// For change size img when windows is resizing
	useLayoutEffect(() => {
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, [img]);

	function handleLoadImg() {
		console.dir(img);
		console.log('🖖');

		updateSize(775);
	}

	return {
		imgSizes,
		handleLoadImg,
		imgRef,
	};
}
