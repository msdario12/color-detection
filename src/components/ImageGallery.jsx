import { Swiper, SwiperSlide } from 'swiper/react';
import useLoadLocalImage from '../hooks/useLoadLocalImage';
import { Navigation, Pagination, Scrollbar, A11y, Grid } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css/grid';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './swiper-style.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { getFromLocalStorage } from '../utils/localStorageOperations';
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
				className='select-none'
				modules={[Navigation, Pagination, Scrollbar, A11y, Grid]}
				spaceBetween={10}
				grid={{
					rows: 2,
					fill: 'row',
				}}
				navigation
				breakpoints={{
					// when window width is >= 640px
					640: {
						slidesPerColumn: 1,
						slidesPerGroup: 1,
						slidesPerView: 1,
						grid: {
							rows: 2,
							fill: 'row',
						},
					},
					// when window width is >= 768px
					768: {
						slidesPerView: 3,
						grid: {
							rows: 2,
							fill: 'row',
						},
					},
				}}
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}>
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
