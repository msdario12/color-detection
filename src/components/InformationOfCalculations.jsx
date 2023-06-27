export default function InformationOfCalculations(props) {
	const { imgSizes } = props;
	const totalPixels = (
		imgSizes.naturalSize.h * imgSizes.naturalSize.w
	).toLocaleString('es');
	return (
		<div>
			<h2>Datos de los cálculos</h2>
			<p>Ancho de imagen original: {imgSizes.naturalSize.w}px</p>
			<p>Alto de imagen original: {imgSizes.naturalSize.h}px</p>
			<p>Ancho de imagen renderizada: {imgSizes.renderSize.w}px</p>
			<p>Alto de imagen renderizada: {imgSizes.renderSize.h}px</p>
			<p>Pixeles totales reales: {totalPixels}px</p>
		</div>
	);
}
