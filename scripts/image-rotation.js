// Creamos un array para mostrar imagenes aleatorias desde uplash cada 15 seg
const searches = [
	'beach sunset',
	'mountain landscape',
	'city skyline',
	'abstract art',
	'minimalist design',
	'vintage car',
	'food photography',
	'animal portraits',
	'flower arrangements',
	'candid street photography',
	'office workspace',
	'technology gadgets',
	'ocean waves',
	'forest trail',
	'colorful abstract',
	'architecture detail',
	'fashion editorial',
	'black and white portrait',
	'travel destinations',
	'celestial objects',
	'tropical paradise',
	'pet photography',
	'modern interior design',
	'wildlife nature',
	'macro photography',
	'product mockups',
	'music instruments',
	'urban graffiti',
	'waterfall landscapes',
	'vintage objects',
];
// Tiempo en que cambia la imagen
const time = 6 * 1000;
// Obtenemos el boton para cambiar imagenes del dom
const buttonChangeImage = document.getElementById('change-img');
// Cambiamos cada cierto tiempo

buttonChangeImage.onclick = () => {
	showLoader(loader);

	// Generamos un indice aleatorio del array de busquedas
	const index = Math.floor(Math.random() * searches.length);
	// Asignamos esa url como atributo al elemento img
	imgFile.setAttribute(
		'src',
		`https://source.unsplash.com/random/?${searches[index]}`
	);
};
