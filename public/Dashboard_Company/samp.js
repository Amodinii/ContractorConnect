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


const token = localStorage.getItem('jwtToken');

fetch('/company/companydetails')
.then(response => response.json())
.then(data => {
  console.log(data.CompanyName);
  const companyName = data.CompanyName;
  const userProfileUsername = document.querySelector('#username');
  if (userProfileUsername) {
    userProfileUsername.textContent = companyName;
  }
  const tenderIds = data.tenders;
  const userId = data.id;
  fetch(`/tender/gettenders`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(allTenders => {
      // Filter tenders based on the user ID
      const userTenders = allTenders.filter(tender => tender.company === userId);

      const dataTableBody = document.getElementById('data-table-body');

      userTenders.forEach(tender => {
          const row = document.createElement('tr');

          // Extract title, category, and status fields from tender object
          const { title, category, status } = tender;

          // Create table cells for title, category, and status
          const titleCell = document.createElement('td');
          titleCell.textContent = title;
          row.appendChild(titleCell);

          const categoryCell = document.createElement('td');
          categoryCell.textContent = category;
          row.appendChild(categoryCell);

          const statusCell = document.createElement('td');
          statusCell.textContent = status;
          row.appendChild(statusCell);

          const viewtender = document.createElement('td');
          const link = document.createElement('a');
          link.href = 'http://localhost:5000/uploads/Tenders/' + title;
          link.textContent = 'View Tender'; // Set your desired link text here
          viewtender.appendChild(link);
          row.appendChild(viewtender);
          // Append the row to the table body
          dataTableBody.appendChild(row);
      });

  })
  .catch(error => {
      console.error('Error fetching tender details:', error);
  });
})
.catch(error => {
console.error('Error fetching user details:', error);
});

fetch(`/quotation/getquotations`)
.then(response => response.json())
.then(data => {
  console.log(data.tender),
  console.log(data.contractor)
})

document.getElementById("logout1").addEventListener("click", function () {
  console.log("haoihdfioaeshjf logout");
  window.setCookie("authorization", "", (expirationDays = -1));
  window.location.href = "../Account_Creation/Sign_In/SignPage.html";
});
