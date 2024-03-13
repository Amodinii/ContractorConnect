document.addEventListener("DOMContentLoaded", function() {
    
    var signInButton = document.getElementById("signInButton");
    
    var userTypeDropdown = document.getElementById("userType");

    // Add click event listener to the Sign In button
    signInButton.addEventListener("click", function() {
        // Redirect based on the selected option
        if (userTypeDropdown.value === "contractor") {
            window.location.href = "../Register/contractorRegister.html";
        } else if (userTypeDropdown.value === "company") {
            window.location.href = "../Register/companyRegister.html";
        }
    });
});