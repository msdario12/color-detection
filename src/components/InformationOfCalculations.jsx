function calculateElapsedTimeInMs(time1, time2) {
	const date = new Date(time2 - time1);
	return date.getTime();
}

export default function InformationOfCalculations(props) {
	const { imgSizes, divsQty, time, timeColorPrimary, className } = props;
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
		<div className={className}>
			<h2 className='col-span-2 mb-3 text-xl font-bold dark:text-slate-200'>
				Tiempos de cálculo
			</h2>
			<div>
				<p>
					Tiempo en obtener la imagen:
					<span className='text-lg font-bold dark:text-slate-200'>
						{elapsedTimeFetch.toLocaleString('es')}ms
					</span>
				</p>
				<p>
					Tiempo en calcular los colores promedios:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{elapsedTimeAvgColors.toLocaleString('es')}ms
					</span>
				</p>
				<p>
					Tiempo en calcular los colores primarios:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{elapsedTimePrimaryColors.toLocaleString('es')}ms
					</span>
				</p>
			</div>
			<div>
				<h2 className='my-3 mt-5  text-xl font-bold dark:text-slate-200'>
					Datos de los cálculos
				</h2>
				<p>
					Ancho de imagen original:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{imgSizes.naturalSize.w}px
					</span>
				</p>
				<p>
					Alto de imagen original:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{imgSizes.naturalSize.h}px
					</span>
				</p>
				<p>
					Ancho de imagen renderizada:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{imgSizes.renderSize.w}px
					</span>
				</p>
				<p>
					Alto de imagen renderizada:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{imgSizes.renderSize.h}px
					</span>
				</p>
				<p>
					Pixeles totales reales:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{totalPixels.toLocaleString('es')}px
					</span>
				</p>
				<p>
					Pixeles por color:{' '}
					<span className='text-lg font-bold dark:text-slate-200'>
						{colorPixels.toLocaleString('es')}px
					</span>
				</p>
			</div>
		</div>
	);
}
