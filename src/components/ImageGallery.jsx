import { Swiper, SwiperSlide } from 'swiper/react';
import useLoadLocalImage from '../hooks/useLoadLocalImage';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const imgPath = 'src/assets/img/';
const imgUrls = ['263', '401', '628', '659'];

export default function ImageGallery(props) {
	const { className, setImgUrl, setImgBitMap } = props;
	const { loadImg } = useLoadLocalImage(setImgBitMap, setImgUrl);

	function handleClick(e) {
		const selectedFile = e.target;
		loadImg(selectedFile);
	}
	return (
		<div className={className}>
			<Swiper
				// install Swiper modules
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={5}
				slidesPerView={2}
				navigation
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}>
				{imgUrls.map((img, idx) => (
					<SwiperSlide key={img + idx}>
						<img
							onClick={handleClick}
							className='w-50 aspect-video h-full object-cover object-center'
							src={imgPath + img + '.jpg'}
							alt={`Picture number ${img} for select`}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
