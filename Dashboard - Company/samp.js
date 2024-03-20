// This is to make the content disappear when i clock 'UPLOAD YOUR TENDER'

document.addEventListener("DOMContentLoaded", function() {
    const uploadLink = document.getElementById('uploadLink');
    const mainContent = document.querySelector('.app-body-main-content');
    uploadLink.addEventListener('click', function(event) {
        event.preventDefault();
        mainContent.style.display = 'none';
    });
});