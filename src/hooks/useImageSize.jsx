import { useLayoutEffect, useRef, useState } from 'react';

export default function useImageSize() {
	const imgRef = useRef(null);
	const img = imgRef.current;

	const [imgSizes, setImgSizes] = useState({
		naturalSize: { w: 0, h: 0 },
		renderSize: { w: 0, h: 0 },
	});

	// For change size img when windows is resizing
	useLayoutEffect(() => {
		0;
		function updateSize() {
			setTimeout(() => {
				setImgSizes({
					naturalSize: { w: img.naturalWidth, h: img.naturalHeight },
					renderSize: { w: img.width, h: img.height },
				});
			}, 180);
		}
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, [img]);

	function handleLoadImg() {
		const currentImg = imgRef.current;
		console.log('🖖');
		setImgSizes({
			naturalSize: { w: currentImg.naturalWidth, h: currentImg.naturalHeight },
			renderSize: { w: currentImg.width, h: currentImg.height },
		});
	}

	return {
		imgSizes,
		handleLoadImg,
		imgRef,
	};
}
