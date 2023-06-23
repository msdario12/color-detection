import RenderPixelColors from './RenderPixelColors';
import FormConfig from './form/FormConfig';
import { useRef, useState } from 'react';

export default function ConfigSection() {
	const [colorMode, setColorMode] = useState('RGB');
	const [divsQty, setDivsQty] = useState(2);
	const [colorTolerance, setColorTolerance] = useState(20);

	const [imgUrl, setImgUrl] = useState(
		'https://source.unsplash.com/random/?$cat'
	);
	const [avgColors, setAvgColors] = useState([]);
	const [imgSizes, setImgSizes] = useState({
		naturalSize: { w: 0, h: 0 },
		renderSize: { w: 0, h: 0 },
	});
	// Reference for worker
	const workerRef = useRef(
		new Worker('../src/workers/worker.js', { type: 'module' })
	);

	// Get the current state of worker, and save in a variable
	const worker = workerRef.current;

	function handleSubmit(e) {
		e.preventDefault();
		console.log('submit!');
		const form = Object.fromEntries(new FormData(e.target));
		setColorMode(form.colorMode);
		setDivsQty(form.divsQty);
		setColorTolerance(form.colorTolerance);
	}

	function handleChangeImage() {
		// Send message to web worker to get a new image
		worker.postMessage({
			msg: 'fetch-new-image',
			params: {
				colorMode,
				divsQty,
				colorTolerance,
			},
		});
		// Await response from worker
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
		};
	}

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
				State {colorMode}, {divsQty}, {colorTolerance}
			</p>
			<button id='change-img' onClick={handleChangeImage}>
				Cambiar imagen
			</button>

			<FormConfig handleSubmit={handleSubmit} />

			{avgColors ? (
				<RenderPixelColors
					avgColors={avgColors}
					colorMode={colorMode}
					imgSizes={imgSizes}
				/>
			) : (
				'Esperando datos'
			)}

			<div id='loader'>Cargando Imagen...</div>
			<div id='toShowLoader'></div>
			<div id='showColor'></div>
			<div id='img-container'></div>
			<img
				id='worker-img'
				onLoad={handleLoadImg}
				src={imgUrl}
				data-src=''
				alt=''
			/>
		</section>
	);
}
