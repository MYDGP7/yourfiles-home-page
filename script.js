// Replace with your Google Drive Folder ID
const folderId = '1m40vFdhPgjHj_oFYSzp9xCwgCFkdBVQ1';  // Replace with your Folder ID
const apiKey = 'AIzaSyDZNlGfRzKITltoLx2YK7epLL_MiikRyr4';      // Replace with your API Key
const clientId = '32786418383-jqgl6086k300h9n6duu3qisa8s0uvn3o.apps.googleusercontent.com';  // Replace with your Client ID
const scope = 'https://www.googleapis.com/auth/drive.readonly';

// Load Google API Client
function loadClient() {
    gapi.client.setApiKey(apiKey);
    return gapi.client.load('https://content.googleapis.com/discovery/v1/apis/drive/v3/rest');
}

// Initialize the API client
function initApi() {
    gapi.load('client:auth2', () => {
        gapi.auth2.init({ client_id: clientId }).then(() => {
            loadClient();
        });
    });
}

// Get files from Google Drive Folder
function getDriveFiles() {
    gapi.client.drive.files.list({
        'q': `'${folderId}' in parents and mimeType contains 'image/'`,
        'fields': 'files(id, name, webViewLink, thumbnailLink)'
    }).then(response => {
        const files = response.result.files;
        displayImages(files);
    });
}

// Display images in gallery
function displayImages(files) {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '';

    files.forEach(file => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const imageElement = document.createElement('img');
        imageElement.src = file.thumbnailLink;
        imageElement.alt = file.name;
        imageElement.classList.add('gallery-image');
        imageElement.onclick = () => openModal(file.webViewLink);

        imageCard.appendChild(imageElement);
        galleryContainer.appendChild(imageCard);
    });
}

// Open Modal
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImage.src = imageSrc;
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// Authenticate and load the Google Drive files
function authenticateAndFetch() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
        getDriveFiles();
    });
}

// Load Google API and trigger authentication
window.onload = () => {
    initApi();
};
// Display images in gallery
function displayImages(files) {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '';  // Clear existing content

    files.forEach(file => {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');

        const imageElement = document.createElement('img');
        imageElement.src = file.thumbnailLink;
        imageElement.alt = file.name;
        imageElement.classList.add('gallery-image');
        
        // When image is clicked, open modal
        imageElement.onclick = () => openModal(file.webViewLink);

        imageCard.appendChild(imageElement);
        galleryContainer.appendChild(imageCard);
    });
}

// Open Modal to show larger image
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'block';
    modalImage.src = imageSrc;  // Show clicked image in the modal
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';  // Hide modal when close button is clicked
}

