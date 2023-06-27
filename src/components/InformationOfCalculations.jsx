function calculateElapsedTimeInMs(time1, time2) {
	const date = new Date(time2 - time1);
	return date.getTime();
}

export default function InformationOfCalculations(props) {
	const { imgSizes, divsQty, time, timeColorPrimary } = props;
	const totalPixels = imgSizes.naturalSize.h * imgSizes.naturalSize.w;
	const colorPixels = parseFloat(divsQty * divsQty);
	const elapsedTimeFetch = calculateElapsedTimeInMs(
		time.fetchImg.start,
		time.fetchImg.end
	);
	const elapsedTimeAvgColors = calculateElapsedTimeInMs(
		time.getAvgColors.start,
		time.getAvgColors.end
	);
	const elapsedTimePrimaryColors = calculateElapsedTimeInMs(
		timeColorPrimary.start,
		timeColorPrimary.end
	);

	return (
		<div>
			<h2 className='text-xl font-bold'>Tiempos de cálculo</h2>
			<p>
				Tiempo en obtener la imagen: {elapsedTimeFetch.toLocaleString('es')}ms
			</p>
			<p>
				Tiempo en calcular los colors:{' '}
				{elapsedTimeAvgColors.toLocaleString('es')}ms
			</p>
			<p>
				Tiempo en calcular los colores primarios:{' '}
				{elapsedTimePrimaryColors.toLocaleString('es')}ms
			</p>
			<h2 className='text-xl font-bold'>Datos de los cálculos</h2>
			<p>Ancho de imagen original: {imgSizes.naturalSize.w}px</p>
			<p>Alto de imagen original: {imgSizes.naturalSize.h}px</p>
			<p>Ancho de imagen renderizada: {imgSizes.renderSize.w}px</p>
			<p>Alto de imagen renderizada: {imgSizes.renderSize.h}px</p>
			<p>Pixeles totales reales: {totalPixels.toLocaleString('es')}px</p>
			<p>Pixeles por color: {colorPixels.toLocaleString('es')}px</p>
		</div>
	);
}
