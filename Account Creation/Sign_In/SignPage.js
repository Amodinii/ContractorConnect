const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})

document.getElementById("loginForm").addEventListener("submit", function(event) {
    var emailInput = document.getElementById("login-email");
    var email = emailInput.value.trim();

    var passwordInput = document.getElementById("login-password");
    var password = passwordInput.value.trim();

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

// Add eye icon dynamically for password input field
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