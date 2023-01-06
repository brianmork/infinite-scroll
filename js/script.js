// Unsplash API
const count = 30;
const apiKey = '3MTe6FDy4oYTMBahvI4Y_GLbwY9g_8boyOvikcm6Mjc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from Unsplash API
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		// Catch error here
	}
};

// On load
getPhotos();