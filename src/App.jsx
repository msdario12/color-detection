import './App.css';
import React from 'react';
import ConfigSection from './components/ConfigSection';

function App() {
	return (
		<>
			<h1 className='text-3xl font-bold underline'>Detección de colores</h1>
			<React.StrictMode>
				<ConfigSection className='container mx-auto' />
			</React.StrictMode>
		</>
	);
}

export default App;
