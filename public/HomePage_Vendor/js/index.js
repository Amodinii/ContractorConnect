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

// Retrieve JWT token from localStorage
const token = localStorage.getItem('jwtToken');

// Check if token exists
if (token) {
    // Fetch user details with JWT token
    fetch('/contactor/userdetails', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.ContractorName);
        const contractorName = data.ContractorName;
        const userProfileUsername = document.querySelector('#username');
        if (userProfileUsername) {
            userProfileUsername.textContent = contractorName;
        }
        const tenderIds = data.tenders;
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });
} else {
    console.error('JWT token not found in localStorage');
}

// Logout event listener
document.getElementById("logout1").addEventListener("click", function () {
    console.log("Logging out");
    // Clear JWT token from localStorage
    localStorage.removeItem('jwtToken');
    // Redirect to sign-in page
    window.location.href = "../Account_Creation/Sign_In/SignPage.html";
});
