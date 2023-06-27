import { useLayoutEffect, useRef, useState } from 'react';

export default function useImageSize() {
	const imgRef = useRef();
	const img = imgRef.current;

	const [imgSizes, setImgSizes] = useState({
		naturalSize: { w: 0, h: 0 },
		renderSize: { w: 0, h: 0 },
	});

	// For change size img when windows is resizing
	useLayoutEffect(() => {
		function updateSize() {
			setTimeout(() => {
				setImgSizes({
					naturalSize: { w: img.naturalWidth, h: img.naturalHeight },
					renderSize: { w: img.width, h: img.height },
				});
			}, 275);
		}
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, [img]);

	function handleLoadImg() {
		setImgSizes({
			naturalSize: { w: img.naturalWidth, h: img.naturalHeight },
			renderSize: { w: img.width, h: img.height },
		});
	}

	return {
		imgSizes,
		handleLoadImg,
		imgRef,
	};
}
