import RenderPixelColors from './RenderPixelColors';
import RenderPrimaryColors from './RenderPrimaryColors';
import FormConfig from './form/FormConfig';
import useImageSize from '../hooks/useImageSize';
import useWorkerAvgColors from '../hooks/useWorkerAvgColors';
import { useEffect, useState } from 'react';
import InformationOfCalculations from './InformationOfCalculations';
import createStringColor from '../utils/createStringColor';
import UploadImg from './UploadImg';
import ImageGallery from './ImageGallery';
import Button from './Button';
import SkeletonImg from './SkeletonImg';
import { ImgConfig } from './ImgConfig';

export default function ConfigSection() {
	const [colorMode, setColorMode] = useState('RGB');
	const [divsQty, setDivsQty] = useState(2);
	const [colorTolerance, setColorTolerance] = useState(20);

	const [timeColorPrimary, setTimeColorPrimary] = useState({
		start: 0,
		end: 0,
	});
	const [colorPrimaryList, setColorPrimaryList] = useState([]);
	const [imgStyle, setImgStyle] = useState({});

	const { imgSizes, handleLoadImg, imgRef } = useImageSize();
	const {
		avgColors,
		isLoading,
		handleChangeImage,
		imgUrl,
		setImgUrl,
		time,
		setImgBitMap,
	} = useWorkerAvgColors(colorMode, divsQty, imgSizes);

	useEffect(() => {
		if (colorPrimaryList.length > 0) {
			const color = createStringColor(colorPrimaryList[0], colorMode);
			const imgStyle = {
				boxShadow: `0px 0px 75px 15px ${color}`,
			};
			setImgStyle(imgStyle);
		}
	}, [colorPrimaryList]);

	return (
		<section className='config-section relative mx-auto px-4 lg:container'>
			<ImgConfig
				className='rounded-md border border-slate-800 px-8 py-5'
				setImgUrl={setImgUrl}
				setImgBitMap={setImgBitMap}
				colorMode={colorMode}
				divsQty={divsQty}
				colorTolerance={colorTolerance}
				isLoading={isLoading}
				handleChangeImage={handleChangeImage}
			/>
			<FormConfig
				className='color z-10 my-3 grid gap-4 rounded-md border border-slate-800 px-8 py-5 dark:bg-slate-900 dark:bg-opacity-80 dark:text-slate-400 dark:backdrop-blur-sm md:sticky md:top-0 md:grid-cols-2'
				setColorTolerance={setColorTolerance}
				setDivsQty={setDivsQty}
				colorMode={colorMode}
				setColorMode={setColorMode}
			/>

			<InformationOfCalculations
				timeColorPrimary={timeColorPrimary}
				imgSizes={imgSizes}
				divsQty={divsQty}
				time={time}
			/>

			{avgColors.length > 0 ? (
				<RenderPrimaryColors
					divsQty={divsQty}
					avgColors={avgColors}
					colorMode={colorMode}
					colorTolerance={colorTolerance}
					setTimeColorPrimary={setTimeColorPrimary}
					setColorPrimaryList={setColorPrimaryList}
				/>
			) : (
				'Esperando datos color primario'
			)}

			<div style={imgStyle} className='p-2 md:columns-2'>
				{!isLoading ? (
					<RenderPixelColors
						avgColors={avgColors}
						colorMode={colorMode}
						imgSizes={imgSizes}
						isLoading={isLoading}
					/>
				) : (
					<SkeletonImg
						style={{
							width: imgSizes.renderSize.w,
							height: imgSizes.renderSize.h,
						}}
					/>
				)}
				{avgColors.length > 0 ? (
					<img
						onLoad={handleLoadImg}
						src={imgUrl}
						ref={imgRef}
						alt='Img to get analize'
					/>
				) : (
					<SkeletonImg />
				)}
			</div>

			<div className={isLoading ? 'showLoader' : undefined} id='loader'>
				Cargando...
			</div>
			<div id='toShowLoader'></div>
			<div id='showColor'></div>
			<div id='img-container'></div>
		</section>
	);
}
