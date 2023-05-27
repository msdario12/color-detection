import { useState } from 'react';
import './App.css';
import ConfigSection from './components/ConfigSection';

function App() {
	const [colorMode, setColorMode] = useState('RGB');
	const [divsQty, setDivsQty] = useState(2);
	const [colorTolerance, setColorTolerance] = useState(20);
	return (
		<>
			<h1>Detección de colores</h1>
			<p>
				State {colorMode}, {divsQty}, {colorTolerance}
			</p>
			<ConfigSection
				setColorMode={setColorMode}
				setDivsQty={setDivsQty}
				setColorTolerance={setColorTolerance}
				hola={'god'}
			/>
			<div id='loader'>Cargando Imagen...</div>
			<div id='toShowLoader'></div>
			<div id='showColor'></div>
			<div id='img-container'></div>
			<img id='worker-img' data-src='' alt='' />
			<div id='newCanvas'>
				<canvas id='canvas-color'></canvas>
			</div>
		</>
	);
}

export default App;
