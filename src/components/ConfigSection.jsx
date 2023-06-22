import FormConfig from './form/FormConfig';
import { useRef, useState } from 'react';

export default function ConfigSection() {
	const [colorMode, setColorMode] = useState('RGB');
	const [divsQty, setDivsQty] = useState(2);
	const [colorTolerance, setColorTolerance] = useState(20);

	const [imgUrl, setImgUrl] = useState('');
	const workerRef = useRef(
		new Worker('../src/workers/worker.js', { type: 'module' })
	);
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
				setImgUrl(e.data.url);
			}
			if (e.data.avgColors) {
				console.log(e.data.avgColors);
			}
		};
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

			<div id='loader'>Cargando Imagen...</div>
			<div id='toShowLoader'></div>
			<div id='showColor'></div>
			<div id='img-container'></div>
			<img id='worker-img' src={imgUrl} data-src='' alt='' />
			<div id='newCanvas'>
				<canvas id='canvas-color'></canvas>
			</div>
		</section>
	);
}
