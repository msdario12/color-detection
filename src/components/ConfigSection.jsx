import RenderPixelColors from './RenderPixelColors';
import RenderPrimaryColors from './RenderPrimaryColors';
import FormConfig from './form/FormConfig';
import useImageSize from '../hooks/useImageSize';
import useWorkerAvgColors from '../hooks/useWorkerAvgColors';
import { useEffect, useState } from 'react';
import InformationOfCalculations from './InformationOfCalculations';
import createStringColor from '../utils/createStringColor';

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
	const { avgColors, isLoading, handleChangeImage, imgUrl, time } =
		useWorkerAvgColors(colorMode, divsQty, imgSizes);

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
		<section className='config-section lg:container mx-auto px-4'>
			<h2>Cambiar de imagen</h2>
			<p>
				State {colorMode}, {divsQty}, {colorTolerance},
				{isLoading ? 'CARGANDO' : 'LISTO'},
			</p>
			<button id='change-img' onClick={handleChangeImage.func}>
				Cambiar imagen
			</button>

			{isLoading ? 'Cargando...' : ''}

			<FormConfig
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

			<div style={imgStyle} className='md:columns-2 p-2'>
				{avgColors.length > 0 ? (
					<RenderPixelColors
						avgColors={avgColors}
						colorMode={colorMode}
						imgSizes={imgSizes}
					/>
				) : (
					'Esperando datos matriz...'
				)}
				<img
					onLoad={handleLoadImg}
					src={imgUrl}
					ref={imgRef}
					alt='Img to get analize'
				/>
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
