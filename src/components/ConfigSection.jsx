import FormConfig from './form/FormConfig';
import { useRef } from 'react';

export default function ConfigSection(props) {
	const { setColorMode, setColorTolerance, setDivsQty } = props;

	const workerRef = useRef(new Worker('../src/workers/worker.js'));
	const worker = workerRef.current;

	worker.postMessage(10);

	worker.onmessage = (e) => {
		console.log('en react' + e.data);
	};

	function handleSubmit(e) {
		e.preventDefault();
		console.log('submit!');
		const form = Object.fromEntries(new FormData(e.target));
		setColorMode(form.colorMode);
		setDivsQty(form.divsQty);
		setColorTolerance(form.colorTolerance);
	}

	function handleChangeImage() {
		// Send msg to webworker with req
		// Await response from worker
	}

	return (
		<section className='config-section'>
			<h2>Cambiar de imagen</h2>
			<button id='change-img' onClick={handleChangeImage}>
				Cambiar imagen
			</button>

			<FormConfig handleSubmit={handleSubmit} />

			<div id='loader'>Cargando Imagen...</div>
			<div id='toShowLoader'></div>
			<div id='showColor'></div>
			<div id='img-container'></div>
			<img id='worker-img' data-src='' alt='' />
			<div id='newCanvas'>
				<canvas id='canvas-color'></canvas>
			</div>
		</section>
	);
}
