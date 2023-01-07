const imageContainer = document.querySelector('.image__container');
const loader = document.querySelector('.loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
let imageCount = 30;
const apiKey = '3MTe6FDy4oYTMBahvI4Y_GLbwY9g_8boyOvikcm6Mjc';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}`;


function updateAPIWithNewCount (picCount) {
	apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images are loaded
function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

// Attributes function
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create elements for links and photos
	function displayPhotos() {
		imagesLoaded = 0;
		totalImages = photosArray.length;
		// Run function for each object
		photosArray.forEach((photo) => {
		// Create link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		})
		// Create image
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// Checks when images are done loading
		img.addEventListener('load', imageLoaded);
		// Add image to a into container
		item.appendChild(img);
		imageContainer.appendChild(item);
	})
}

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		if (initialLoad) {
			updateAPIWithNewCount(30);
			initialLoad = false;
		}
	} catch (error) {
		// Catch error here
	}
};

// If scroll is close to bottom, load photos
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotos();
	}
})

// On load
getPhotos();