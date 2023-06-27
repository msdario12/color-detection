import RenderPixelColors from './RenderPixelColors';
import RenderPrimaryColors from './RenderPrimaryColors';
import FormConfig from './form/FormConfig';
import useImageSize from '../hooks/useImageSize';
import useWorkerAvgColors from '../hooks/useWorkerAvgColors';
import { useState } from 'react';
import InformationOfCalculations from './InformationOfCalculations';

export default function ConfigSection() {
	const [colorMode, setColorMode] = useState('RGB');
	const [divsQty, setDivsQty] = useState(2);
	const [colorTolerance, setColorTolerance] = useState(20);

	const { imgSizes, handleLoadImg, imgRef } = useImageSize();
	const { avgColors, isLoading, handleChangeImage, imgUrl } =
		useWorkerAvgColors(colorMode, divsQty, imgSizes);

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

			{!isLoading && <InformationOfCalculations imgSizes={imgSizes} />}

			{avgColors.length > 0 ? (
				<RenderPrimaryColors
					divsQty={divsQty}
					avgColors={avgColors}
					colorMode={colorMode}
					colorTolerance={colorTolerance}
				/>
			) : (
				'Esperando datos color primario'
			)}

			<div className='md:columns-2'>
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
