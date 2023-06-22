// Function to fetch a random img from web
async function fetchRandomImg() {
	const response = await fetch('https://source.unsplash.com/random/?$cat');
	const arrayBuffer = await response.arrayBuffer();
	const blob = new Blob([arrayBuffer]);
	return { img: createImageBitmap(blob), res: response };
}
// Register a callback to process messages from the parent
self.onmessage = (event) => {
	// Do some computation with the data from the parent
	fetchRandomImg().then(({ res }) => self.postMessage({ url: res.url }));
};
