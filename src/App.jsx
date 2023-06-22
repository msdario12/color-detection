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
			
		</>
	);
}

export default App;
