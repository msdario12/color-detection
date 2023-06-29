import useHoverAnimation from '../hooks/useHoverAnimation';
import useLoadLocalImage from '../hooks/useLoadLocalImage';

const imgPath = 'src/assets/img/';
const imgUrls = ['263', '401', '628', '659'];

export default function ImageGallery(props) {
	const { className, setImgUrl, setImgBitMap } = props;
	const { onEnter, onLeave } = useHoverAnimation();
	const { loadImg } = useLoadLocalImage(setImgBitMap, setImgUrl);

	function handleClick(e) {
		const selectedFile = e.target;
		loadImg(selectedFile);
	}
	return (
		<div className={className}>
			{imgUrls.map((img, idx) => (
				<div
					key={img + idx}
					onMouseEnter={onEnter}
					onMouseLeave={onLeave}
					className='p-2 shadow-lg border bg-white cursor-pointer'>
					<img
						onClick={handleClick}
						className='object-cover object-center aspect-video'
						src={imgPath + img + '.jpg'}
						alt={`Picture number ${img} for select`}
					/>
				</div>
			))}
		</div>
	);
}
