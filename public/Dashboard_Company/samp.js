function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

// Function to get the value of a cookie by name
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

// Function to check if the welcome message should be displayed
function checkWelcomeCookie() {
  var welcomeMessageCookie = getCookie("welcome_message");
  if (welcomeMessageCookie != "") {
    alert("Welcome back to our page!");
  } else {
    setCookie("welcome_message", "shown", 1); // Cookie expires in 1 day
  }
}

// Call the checkWelcomeCookie function when the page loads
window.onload = checkWelcomeCookie;

const uploadLink = document.getElementById("uploadLink");
const mainContent = document.querySelector(".app-body-main-content");
const uploadFormSection = document.getElementById("uploadFormSection");
const dropdownContent = document.querySelector(".dropdown-content");
const userProfile = document.querySelector(".user-profile");
const otherCheckbox = document.getElementById("otherCheckbox");
const otherField = document.querySelector(".other-field");

// This is to make the content disappear when i clock 'UPLOAD YOUR TENDER'

document.addEventListener("DOMContentLoaded", function () {
  // this is to switch to the upload your tender side, when selected
  uploadLink.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    uploadFormSection.style.display = "block";
  });
});
//this is used to show the dropdown, when we hover over the profile side.
/*userProfile.addEventListener('mouseenter', function(event) {
      dropdownContent.style.display = 'block';
    });
    userProfile.addEventListener('mouseleave', function(event) {
      dropdownContent.style.display = 'none';
    });*/

//this is used to show the dropdown, when we click on the profile side.
function toggleDropdown() {
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
}
userProfile.addEventListener("click", function (event) {
  toggleDropdown();
});
// Toggle the visibility of the "Other" field based on the checkbox's checked state
otherCheckbox.addEventListener("click", function () {
  otherField.style.display = this.checked ? "block" : "none";
});

document.getElementById("logout1").addEventListener("click", function () {
  console.log("haoihdfioaeshjf logout");
  window.setCookie("authorization", "", (expirationDays = -1));
  window.location.href = "../Account_Creation/Sign_In/SignPage.html";
});
