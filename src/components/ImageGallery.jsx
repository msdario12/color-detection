const imgPath = 'src/assets/img/';
const imgUrls = ['263', '401', '628', '659'];

export default function ImageGallery(props) {
	const { className } = props;
	return (
		<div className={className}>
			{imgUrls.map((img, idx) => (
				<div key={img + idx} className='p-2 shadow-lg border'>
					<img
						className='object-cover object-center aspect-video'
						src={imgPath + img + '.jpg'}
						alt={`Picture number ${img} for select`}
					/>
				</div>
			))}
		</div>
	);
}
