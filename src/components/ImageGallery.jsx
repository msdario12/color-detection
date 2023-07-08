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
import { SlideImg } from './SlideImg';

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

	return (
		<div className={className}>
			<Swiper
				// install Swiper modules
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={10}
				slidesPerView={2}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				breakpoints={{
					// when window width is >= 640px
					640: {
						width: 640,
						slidesPerView: 3,
					},
					// when window width is >= 768px
					768: {
						width: 768,
						slidesPerView: 2,
					},
				}}>
				{imageList.map((img) => (
					<SwiperSlide key={img.id}>
						<SlideImg
							isLoading={isLoading}
							loadImg={loadImg}
							img={img}
							setImageList={setImageList}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
