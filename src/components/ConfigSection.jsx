import RenderPixelColors from './RenderPixelColors';
import RenderPrimaryColors from './RenderPrimaryColors';
import FormConfig from './form/FormConfig';
import useImageSize from '../hooks/useImageSize';
import useWorkerAvgColors from '../hooks/useWorkerAvgColors';
import { useEffect, useState } from 'react';
import InformationOfCalculations from './InformationOfCalculations';
import createStringColor from '../utils/createStringColor';
import SkeletonImg from './SkeletonImg';
import { ImgConfig } from './ImgConfig';
import { TabsConfig } from './TabsConfig';

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
	const [sectionActive, setSectionActive] = useState('config');

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
		<>
			<TabsConfig
				sectionActive={sectionActive}
				setSectionActive={setSectionActive}
			/>
			{/* Desktop design */}
			<section className='config-section grid-rows-[minmax(200px, 1fr)] relative mx-auto grid grid-cols-5 px-5 lg:container'>
				<div
					className={`col-start-0 sticky top-0 col-span-5 row-span-3 h-[90vh] overflow-y-auto sm:col-span-2 ${
						sectionActive === 'config' ? 'max-sm:block' : 'max-sm:hidden'
					}`}>
					<ImgConfig
						className='col-span-2 col-start-1 row-span-2 row-start-1 rounded-md border border-slate-800 px-3 py-5 md:px-8'
						setImgUrl={setImgUrl}
						setImgBitMap={setImgBitMap}
						colorMode={colorMode}
						divsQty={divsQty}
						colorTolerance={colorTolerance}
						isLoading={isLoading}
						handleChangeImage={handleChangeImage}
					/>
					<FormConfig
						className='color z-10 col-span-2 col-start-1 row-span-1 row-start-3 my-3 grid gap-4 rounded-md border border-slate-800 px-3 py-5 dark:bg-slate-900 dark:bg-opacity-80 dark:text-slate-400 dark:backdrop-blur-sm lg:grid-cols-2 lg:px-8'
						setColorTolerance={setColorTolerance}
						setDivsQty={setDivsQty}
						colorMode={colorMode}
						setColorMode={setColorMode}
					/>
					<InformationOfCalculations
						className='col-span-2 col-start-1 row-span-1 row-start-4 mb-10 rounded-md border border-slate-800 px-3 py-5 md:px-8'
						timeColorPrimary={timeColorPrimary}
						imgSizes={imgSizes}
						divsQty={divsQty}
						time={time}
					/>
				</div>
				<div
					className={`col-start-0 col-span-5 row-start-1 my-auto sm:col-span-3 sm:col-start-3 ${
						sectionActive === 'results' ? 'max-sm:block' : 'max-sm:hidden'
					}`}>
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
				</div>

				<div
					className={`col-start-0 col-span-5 row-span-3 row-start-2 p-2 sm:col-span-3 sm:col-start-3 md:columns-1 ${
						sectionActive === 'results' ? 'max-sm:block' : 'max-sm:hidden'
					}`}>
					<div style={imgStyle} className='my-auto md:px-3'>
						{avgColors.length > 0 ? (
							<img
								onLoad={handleLoadImg}
								className='h-auto max-h-screen w-full'
								src={imgUrl}
								ref={imgRef}
								alt='Img to get analyze'
							/>
						) : (
							<SkeletonImg />
						)}
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
					</div>
				</div>
			</section>
		</>
	);
}
