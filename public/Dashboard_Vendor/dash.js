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


const token = localStorage.getItem('jwtToken');

fetch('/contractors/vendordetails')
.then(response => response.json())
.then(data => {
    const contractorName = data.CompanyName;
    const userProfileUsername = document.querySelector('#username');
    if (userProfileUsername) {
      userProfileUsername.textContent = contractorName;
    }
    const quotationIds = data.quotations;

    fetch('/quotation/getquotations?quotationIds=' + JSON.stringify(quotationIds))
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(quotations => {
              const dataTableBody = document.getElementById('data-table-body');

              quotations.forEach(quotations => {
                  const row = document.createElement('tr');

                  // Extract title, category, and status fields from tender object
                  const { title, tender, status } = quotations;

                  // Create table cells for title, category, and status
                  const titleCell = document.createElement('td');
                  titleCell.textContent = title;
                  row.appendChild(titleCell);

                  const statusCell = document.createElement('td');
                  statusCell.textContent = status;
                  row.appendChild(statusCell);

                  const tendercell = document.createElement('td');
                  tendercell.textContent = tender;
                  row.appendChild(tendercell);

                  const viewquotation = document.createElement('td');
                  const link = document.createElement('a');
                  link.href = 'http://localhost:5000/uploads/Quotations/' + title;
                  link.textContent = 'View Quotation'; // Set your desired link text here
                  viewquotation.appendChild(link);
                  row.appendChild(viewquotation);
                  
                  // Append the row to the table body
                  dataTableBody.appendChild(row);
              });

      })
      .catch(error => {
          console.error('Error fetching tender details:', error);
      })
  })

document.getElementById("logout1").addEventListener("click", function () {
  console.log("haoihdfioaeshjf logout");
  window.setCookie("authorization", "", (expirationDays = -1));
  window.location.href = "../Account_Creation/Sign_In/SignPage.html";
});