// Initialize Google API client
function initializeGAPI() {
  gapi.load('client:auth2', () => {
    gapi.auth2.init({
      client_id: '32786418383-jqgl6086k300h9n6duu3qisa8s0uvn3o.apps.googleusercontent.com', // Replace with your actual Client ID
    });
  });
}

// Function to authenticate the user and get the access token
function authenticateUser() {
  gapi.auth2.getAuthInstance().signIn().then((user) => {
    const accessToken = user.getAuthResponse().access_token;  // Get access token for Google services
    console.log('Access Token:', accessToken);  // Print the access token (for debugging)

    // You can now use the access token to call Google APIs (Drive API, etc.)
    alert('Successfully logged in!');
    
    // Redirect to another page (next screen with Photos, Videos, Download buttons)
    window.location.href = 'gallery.html';  // Redirect to next page
  });
}

// Load Google API and initialize authentication
window.onload = initializeGAPI;

// Add event listener to login button
document.getElementById('login-button').addEventListener('click', authenticateUser);
