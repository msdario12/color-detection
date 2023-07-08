import { Swiper, SwiperSlide } from 'swiper/react';
import useLoadLocalImage from '../hooks/useLoadLocalImage';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { faBolt, faRemove } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';
import {
	getFromLocalStorage,
	getImageLocalStorageById,
	removeImageLocalStorage,
} from '../utils/localStorageOperations';
import { ButtonHoverImg } from './ButtonHoverImg';

const imgPath = 'src/assets/img/';
const imgUrls = ['263', '401', '628', '659'];

export default function ImageGallery(props) {
	const { className, setImgUrl, setImgBitMap, isLoading } = props;
	const [imageList, setImageList] = useState([]);
	const { loadImg } = useLoadLocalImage(setImgBitMap, setImgUrl);

	useEffect(() => {
		let localImg = getFromLocalStorage('image-list');
		setImageList(localImg);
	}, [isLoading]);

	function handleClickButtonImg(e, id) {
		// const selectedFile = e.target;
		const foundImg = getImageLocalStorageById(id);
		console.log(foundImg);
		loadImg(foundImg);
	}
	function handleClickOnImg(e) {
		const selectedFile = e.target;
		loadImg(selectedFile);
	}
	function handleDeleteImg(id) {
		removeImageLocalStorage(id);
		setImageList((prev) => prev.filter((img) => img.id !== id));
	}
	return (
		<div className={className}>
			<Swiper
				// install Swiper modules
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={10}
				slidesPerView={2}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}>
				{imageList.map((img) => (
					<SwiperSlide key={img.id}>
						<div className='relative'>
							<img
								className='w-42 aspect-video h-full object-cover object-center'
								src={img.src}
								alt={`Picture number ${img} for select`}
							/>
							<div className='absolute left-1/2 top-1/2 flex  -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-3'>
								<ButtonHoverImg
									icon={faBolt}
									onClick={(e) => handleClickButtonImg(e, img.id)}
								/>
								<ButtonHoverImg
									icon={faRemove}
									onClick={() => handleDeleteImg(img.id)}
								/>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
