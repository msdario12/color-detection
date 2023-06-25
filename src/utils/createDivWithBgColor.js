import RGBToHSL from '../utils/RGBToHSL'

const createDivWithBgColor = async (baseColor) => {
	// Creamos el div encargado de mostrar el color
	const divColor = document.createElement('div');
	// Div que contiene el texto dentro del color
	const textDiv = document.createElement('div');
	// Abreviatura de codigo para estilos del divColor y text
	const style = divColor.style;
	const textStyle = textDiv.style;

	let R, G, B;
	let H, S, L;
	if (colorRGBstate) {
		[R, G, B] = baseColor.RGB;
		// Obtenemos los valores en HSL del color base
		[H, S, L] = RGBToHSL(baseColor.RGB);
		// Definimos el texto del textDiv
		textDiv.innerHTML = `rgb[${baseColor.RGB}]`;
		style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
	}
	if (colorHSLstate) {
		// Obtenemos los valores en HSL del color base
		[H, S, L] = baseColor.HSL;
		// Definimos el texto del textDiv
		// Definimos el texto del textDiv
		textDiv.innerHTML = `hsl[${[H, S, L]}]`;
		style.backgroundColor = `hsl(${H}, ${S}%, ${L}%)`;
	}

	// Condicion para definir si el texto es oscuro o claro en funcion de la L
	L > 50 ? (textStyle.color = 'black') : (textStyle.color = 'white');
	// Definicion de estilos del div de color
	style.textAlign = 'center';
	style.display = 'flex';
	style.justifyContent = 'center';
	style.alignItems = 'center';
	divColor.appendChild(textDiv);
	style.width = style.height = '100px';

	showColor.insertBefore(divColor, null);

	return divColor;
};

export default createDivWithBgColor;
