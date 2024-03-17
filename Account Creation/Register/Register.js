document.addEventListener("DOMContentLoaded", function() {
    var nextButton = document.getElementById("signInButton"); 
    var emailInput = document.getElementById("email");
    var userTypeDropdown = document.getElementById("userType");

    // Add click event listener to the Next button
    nextButton.addEventListener("click", function() {
        // Get the email and user type
        var email = emailInput.value;
        var userType = userTypeDropdown.value;

        // Store email and user type in localStorage to pass to the next page
        localStorage.setItem("email", email);
        localStorage.setItem("userType", userType);

        // Redirect based on the selected option
        if (userType === "contractor") {
            window.location.href = "../Register/contractorRegister.html";
        } else if (userType === "company") {
            window.location.href = "../Register/companyRegister.html";
        }
    });

    // to handle sign-in link
    var signInLink = document.getElementById("a"); // Updated ID for sign-in link
    signInLink.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default behavior
        // Redirect to sign-in page
        window.location.href = "../Sign_In/SignPage.html";
    });
});
