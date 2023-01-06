const imageContainer = document.querySelector('.image__container');
const loader = document.querySelector('.loader');

let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = '3MTe6FDy4oYTMBahvI4Y_GLbwY9g_8boyOvikcm6Mjc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Create elements for links and photos
	function displayPhotos() {
		// Run function for each object
		photosArray.forEach((photo) => {
		// Create link to Unsplash
		const item = document.createElement('a');
		item.setAttribute('href', photo.links.html);
		item.setAttribute('target', '_blank');
		// Create image
		const img = document.createElement('img');
		img.setAttribute('src', photo.urls.regular);
		img.setAttribute('alt', photo.alt_description);
		img.setAttribute('title', photo.alt_description);
		// Add image to a into container
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		console.log(photosArray);
		displayPhotos();
	} catch (error) {
		// Catch error here
	}
};

// On load
getPhotos();