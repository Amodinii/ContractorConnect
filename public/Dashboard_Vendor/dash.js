// This is to make the content disappear when i clock 'UPLOAD YOUR TENDER'

document.addEventListener("DOMContentLoaded", function () {
  const uploadLink = document.getElementById("uploadLink");
  const mainContent = document.querySelector(".app-body-main-content");
  const uploadFormSection = document.getElementById("uploadFormSection");

  const userProfile = document.getElementsByClassName(".user-profile");
  const dropdownContent = document.getElementsByClassName(".dropdown-content");

  uploadLink.addEventListener("click", function (event) {
    event.preventDefault();

    // Toggle the visibility of the main content and the upload form section
    mainContent.style.display = "none";
    uploadFormSection.style.display = "block";
  });

  const uploadForm = document.getElementById("uploadForm");
  uploadForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput").files[0];
    const tagsInput = document.getElementById("tagsInput").value;
    console.log("Selected file:", fileInput);
    console.log("Tags:", tagsInput);
  });
});
