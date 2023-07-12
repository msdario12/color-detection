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
import { Tabs } from 'flowbite-react';
import { faPercent } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { clearConfigCache } from 'prettier';

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

	const configSection = (
		<div className='sticky top-0 col-span-2 row-span-3 h-[90vh] overflow-y-auto'>
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
				className='color z-10 col-span-2 col-start-1 row-span-1 row-start-3 my-3 grid gap-4 rounded-md border border-slate-800 px-3 py-5 dark:bg-slate-900 dark:bg-opacity-80 dark:text-slate-400 dark:backdrop-blur-sm md:grid-cols-2 md:px-8'
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
	);

	const primaryColorsSection =
		avgColors.length > 0 ? (
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
		);

	const resultSection = (
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
	);

	return (
		<>
			<section className='sticky top-0 sm:hidden'>
				<Tabs.Group aria-label='Full width tabs' style='fullWidth'>
					<Tabs.Item active title='Configuración'>
						{configSection}
					</Tabs.Item>
					<Tabs.Item title='Resultado'>
						<div className='col-span-3 col-start-3 row-start-1 my-auto'>
							{primaryColorsSection}
						</div>

						<div className='p-2'>{resultSection}</div>
					</Tabs.Item>
				</Tabs.Group>
			</section>

			<section className='config-section grid-rows-[minmax(200px, 1fr)] relative mx-auto hidden grid-cols-5  px-5 lg:container sm:grid'>
				{configSection}
				<div className='col-span-3 col-start-3 row-start-1 my-auto'>
					{primaryColorsSection}
				</div>

				<div className='col-span-3 col-start-3 row-span-3 row-start-2 p-2 md:columns-1'>
					{resultSection}
				</div>
			</section>
		</>
	);
}
