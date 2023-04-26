// Color detection

// Obtener elementos del dom
const imgFile = document.getElementById("img-1");
const showColor = document.getElementById("showColor");
const src = imgFile.src;

console.log(imgFile);

// Creo el objeto imagen
const img = new Image();

// Funcion a ejecutar cuando imgFile se cargue
imgFile.onload = () => {
	console.log("dentro");
	// Creo el elemento "canvas" en memoria y lo asigno a una variable
	const canvas = document.createElement("canvas");
	canvas.width = imgFile.width;
	canvas.height = imgFile.height;
	// Creo el contexto para canvas
	const ctx = canvas.getContext("2d");
	// Montamos la imagen en canvas
	ctx.drawImage(imgFile, 0, 0);
	// Obtenemos la informacion de cada pixel de la imagen
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
	// console.log(imageData);
	// Obtenemos los valores de R,G,B y A de cada pixel, saltando de a 4 elementos
	const dataColor = imageData.data;
	let colors = [];
	for (let i = 0; i <= dataColor.length; i += 4) {
		colors.push({
			R: dataColor[i],
			G: dataColor[i + 1],
			B: dataColor[i + 2],
			A: dataColor[i + 3],
		});
	}
	console.log(colors[0].R);

	let avgColor = {
		R: 0,
		G: 0,
		B: 0,
	};
	// Obtenemos el valor promedio de color de toda la imagen
	for (let i = 0; i < colors.length - 1; i++) {
		avgColor.R += colors[i].R ** 2;
		avgColor.G += colors[i].G ** 2;
		avgColor.B += colors[i].B ** 2;
	}
	// Cantidad total de pixeles
	const totalPixels = canvas.width * canvas.height;
	// Obtenemos el promedio de cada uno de los canales
	avgColor.R = Math.round(Math.sqrt(avgColor.R / totalPixels));
	avgColor.G = Math.round(Math.sqrt(avgColor.G / totalPixels));
	avgColor.B = Math.round(Math.sqrt(avgColor.B / totalPixels));
	// Asignamos el color al div para mostrar el color promedio
	const colorRGB = `${avgColor.R}, ${avgColor.G}, ${avgColor.B}`;
	showColor.style.backgroundColor = `rgb(${colorRGB})`;
	// Asigno una sombra a la imagen con este color
	imgFile.style.boxShadow = `0px 0px 50px 25px rgba(${colorRGB}, 0.95)`;
};

// Creamos un array para mostrar imagenes aleatorias desde uplash cada 15 seg
const searches = [
	"beach sunset",
	"mountain landscape",
	"city skyline",
	"abstract art",
	"minimalist design",
	"vintage car",
	"food photography",
	"animal portraits",
	"flower arrangements",
	"candid street photography",
	"office workspace",
	"technology gadgets",
	"ocean waves",
	"forest trail",
	"colorful abstract",
	"architecture detail",
	"fashion editorial",
	"black and white portrait",
	"travel destinations",
	"celestial objects",
	"tropical paradise",
	"pet photography",
	"modern interior design",
	"wildlife nature",
	"macro photography",
	"product mockups",
	"music instruments",
	"urban graffiti",
	"waterfall landscapes",
	"vintage objects",
];
// Tiempo en que cambia la imagen
const time = 5 * 1000;
// Cambiamos cada cierto tiempo
const intervalId = setInterval(() => {
	// Generamos un indice aleatorio del array de busquedas
	const index = Math.floor(Math.random() * searches.length);
	// Asignamos esa url como atributo al elemento img
	imgFile.setAttribute(
		"src",
		`https://source.unsplash.com/random/?${searches[index]}`
	);
}, time);
