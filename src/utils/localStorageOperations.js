import { v4 as uuidv4 } from 'uuid';

function addToLocalStorage(key, list) {
	const JSONItem = JSON.stringify(list);
	localStorage.setItem(key, JSONItem);
	const db = getFromLocalStorage(key);
	return db;
}

export function getFromLocalStorage(key) {
	let JSONItem = localStorage.getItem(key);
	if (!JSONItem) {
		addToLocalStorage(key, []);
		return [];
	}
	return JSON.parse(JSONItem);
}

// Convert img to base64

function convertImgToBase94(img) {
	return new Promise((res, reject) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => {
			// Base64 Data URL 👇
			res(reader.result);
		});

		reader.readAsDataURL(img);
	});
}

// Image slider

export function addImageLocalStorage(img) {
	
	let imageListCopy = getFromLocalStorage('image-list');
	convertImgToBase94(img).then((res) => {
		const newImg = { id: uuidv4(), src: res };
		imageListCopy.unshift(newImg);
		const db = addToLocalStorage('image-list', imageListCopy);
		return db;
	});
}

export function removeImageLocalStorage(id) {
	let imageListCopy = getFromLocalStorage('image-list');

	const newList = imageListCopy.filter((img) => img.id !== id);
	const db = addToLocalStorage('image-list', newList);
	return db;
}
export function getImageLocalStorageById(id) {
	let imageListCopy = getFromLocalStorage('image-list');
	const findImg = imageListCopy.find((img) => img.id === id);
	return findImg;
}
