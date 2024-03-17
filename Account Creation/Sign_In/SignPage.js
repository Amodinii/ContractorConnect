document.getElementById("signInButton").addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if (email === "admin" && password === "secretkey") {
        // Redirect to admin dashboard page
        window.location.href = "../../Admin/admin.html";
    } 
});

document.addEventListener("DOMContentLoaded", function() {
    var signInButton = document.getElementById("signInButton");

    // Add click event listener to the Sign In button
    signInButton.addEventListener("click", async function() {
        // Get user input (email and password)
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

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
