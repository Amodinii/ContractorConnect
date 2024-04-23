//This is the region to upload the file in upload page

document.addEventListener("DOMContentLoaded", function () {
  const uploadButton = document.querySelector(".upload-area");

  // Dynamically create file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.style.display = "none"; // Hide the file input initially
  uploadButton.appendChild(fileInput); // Append file input to the button

  // Adding a click event listener to the upload button
  uploadButton.addEventListener("click", function () {
    fileInput.click(); // Triggering the click event on file input
  });

  // Adding a change event listener to the file input
  fileInput.addEventListener("change", function () {
    // Handle file upload here
    const selectedFile = fileInput.files[0];
    console.log("Selected file:", selectedFile.name);
    // You can perform further actions like uploading the file to a server or processing it.
  });
});
