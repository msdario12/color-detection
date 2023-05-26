import './App.css';

function App() {
	return (
		<>
			<h1>Detección de colores</h1>
			<section className='config-section'>
				<h2>Cambiar de imagen</h2>
				<button id='change-img'>Cambiar imagen</button>
				<h2>Seleccione el modo de color</h2>

				<form action=''>
					<label htmlFor='rgb-mode'>RGB</label>
					<input type='radio' name='color-mode' id='rgb-mode' checked />
					<label htmlFor='rgb-mode'>HSL</label>
					<input type='radio' name='color-mode' id='hsl-mode' />
				</form>
				<h2>Tolerancia de seleccion de color</h2>
				<label htmlFor='num-tol'>Seleccione el valor de tolerancia</label>
				<select name='num-tol' id='num-tol'>
					<option value='2'>2%</option>
					<option value='5'>5%</option>
					<option value='10'>10%</option>
					<option value='12'>12%</option>
					<option value='15' selected>
						15%
					</option>
					<option value='20'>20%</option>
					<option value='25'>25%</option>
					<option value='30'>30%</option>
					<option value='40'>40%</option>
				</select>
				<h2>Cantidad de divisiones</h2>

				<label htmlFor='num-div'>Seleccione la cantidad de divisiones: </label>
				<select name='num-div' id='num-div'>
					<option value='2'>2</option>
					<option value='5'>5</option>
					<option value='10'>10</option>
					<option value='12'>12</option>
					<option value='15'>15</option>
					<option value='20'>20</option>
					<option value='25'>25</option>
					<option value='75'>75</option>
				</select>
			</section>
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
