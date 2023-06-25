import RenderPixelColors from './RenderPixelColors';
import RenderPrimaryColors from './RenderPrimaryColors';
import FormConfig from './form/FormConfig';
import { useEffect, useRef, useState } from 'react';

export default function ConfigSection() {
	const [colorMode, setColorMode] = useState('RGB');
	const [divsQty, setDivsQty] = useState(2);
	const [colorTolerance, setColorTolerance] = useState(20);

	const [imgUrl, setImgUrl] = useState('');
	const [avgColors, setAvgColors] = useState([]);
	const [imgSizes, setImgSizes] = useState({
		naturalSize: { w: 0, h: 0 },
		renderSize: { w: 0, h: 0 },
	});

	const [isLoading, setIsLoading] = useState(false);
	// Reference for worker
	const workerRef = useRef(
		new Worker('../src/workers/worker.js', { type: 'module' })
	);

	// Get the current state of worker, and save in a variable
	const worker = workerRef.current;

	function postMessageToWorker(msg, params) {
		setIsLoading(true);
		worker.postMessage({
			msg,
			params,
		});
	}

	useEffect(() => {
		if (!imgUrl) {
			postMessageToWorker('fetch-new-image', { colorMode, divsQty });

			return;
		}
		postMessageToWorker('calculate-pixels', { colorMode, divsQty });
	}, [colorMode, divsQty]);

	function handleChangeImage() {
		// Send message to web worker to get a new image
		postMessageToWorker('fetch-new-image', { colorMode, divsQty });
	}

	worker.onmessage = (e) => {
		// Set a new image in DOM
		if (e.data.url) {
			const data = e.data;
			setImgUrl(data.url);
		}
		if (e.data.avgColors) {
			console.log(e.data.avgColors);
			setAvgColors(e.data.avgColors);
		}
		setIsLoading(false);
	};

	function handleLoadImg(e) {
		const img = e.target;
		setImgSizes({
			naturalSize: { w: img.naturalWidth, h: img.naturalHeight },
			renderSize: { w: img.width, h: img.height },
		});
	}

	return (
		<section className='config-section'>
			<h2>Cambiar de imagen</h2>
			<p>
				State {colorMode}, {divsQty}, {colorTolerance},
				{isLoading ? 'CARGANDO' : 'LISTO'},
			</p>
			<button id='change-img' onClick={handleChangeImage}>
				Cambiar imagen
			</button>

			{isLoading ? 'Cargando' : ''}

			<FormConfig
				setColorTolerance={setColorTolerance}
				setDivsQty={setDivsQty}
				colorMode={colorMode}
				setColorMode={setColorMode}
			/>

			{avgColors.length > 0 ? (
				<RenderPixelColors
					avgColors={avgColors}
					colorMode={colorMode}
					imgSizes={imgSizes}
				/>
			) : (
				'Esperando datos matriz'
			)}

			{avgColors.length > 0 ? (
				<RenderPrimaryColors
					avgColors={avgColors}
					colorMode={colorMode}
					colorTolerance={colorTolerance}
				/>
			) : (
				'Esperando datos color primario'
			)}

			<img
				id='worker-img'
				onLoad={handleLoadImg}
				src={imgUrl}
				data-src=''
				alt=''
			/>

			<div className={isLoading && 'showLoader'} id='loader'>
				Cargando...
			</div>
			<div id='toShowLoader'></div>
			<div id='showColor'></div>
			<div id='img-container'></div>
		</section>
	);
}
