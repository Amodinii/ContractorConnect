document.addEventListener("DOMContentLoaded", function(){

    // Switcher Buttons Event Listener
    var switchers = document.querySelectorAll('.switcher');
    switchers.forEach(item => {
        item.addEventListener('click', function() {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'))
            this.parentElement.classList.add('is-active')
        })
    });

    // Form Submission Event Listener for Login Form
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Login form submitted");
        var emailInput = document.getElementById("login-email");
        var email = emailInput.value.trim();

        // Email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            event.preventDefault(); // Prevent form submission
            return false;
        }

        // If email is valid, continue with form submission
        return true;
    });

    // Form Submission Event Listener for Signup Form
    document.getElementById("signupForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var emailInput = document.getElementById("signup-email");
        var email = emailInput.value.trim();

        // Email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            event.preventDefault(); // Prevent form submission
            return false;
        }

        // If email is valid, continue with form submission
        return true;
    });

    // Password Toggle Event Listener
    var passwordInput = document.getElementById("login-password");
    var passwordToggle = document.createElement("span");
    passwordToggle.innerHTML = "&#x1F441;";
    passwordToggle.className = "password-toggle";
    passwordInput.parentNode.appendChild(passwordToggle);

    // Function to toggle password visibility
    passwordToggle.addEventListener("click", function() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
        } else {
            passwordInput.type = "password";
        }
    });

    // Continue Button Event Listener
    var continueButton = document.getElementById("Registerbutt");
    continueButton.addEventListener("click", function(){
        var emailInput = document.getElementById("signup-email");
        var userTypeDropdown = document.getElementById("userType");

        var email = emailInput.value;
        var userType = userTypeDropdown.value;

        localStorage.setItem("email", email);
        localStorage.setItem("userType", userType);

        if(userType === "contractor"){
            window.location.href = "../Register/contractorRegister.html";
        }
        else if(userType === "company"){
            window.location.href = "../Register/companyRegister.html";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var signInButton = document.getElementById("signInButton");

    // Add click event listener to the Sign In button
    signInButton.addEventListener("click", async function() {
        // Get user input (email and password)
        var email = document.getElementById("login-email").value;
        var password = document.getElementById("login-password").value;
        

        // Construct the request body
        var requestBody = {
            email: email,
            password: password
        };

        try {
            // Send a POST request to the server
            var response = await fetch('http://localhost:5000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            // Parse the response JSON
            var responseData = await response.json();

            // Check if the response was successful (200)
            if (response.ok) {
                // Sign-in successful, handle accordingly (redirecting to the user profile)
                console.log(responseData.message);
                console.log(responseData.user);
            } else {
                // Sign-in failed- error message
                console.error(responseData.message);
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
        }
    });
});

document.getElementById("signInButton").addEventListener("click", function() {
    if(userType === "company"){
    // Redirect to a different page
    window.location.href = "../../Dashboard - Company/samp.html"; // Replace this URL with your desired destination
    }else if(userType === "contractor"){
    window.location.href = "../../HomePage - Vendor/index.html"; // Replace this URL with your desired destination
    }
});
