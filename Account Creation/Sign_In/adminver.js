document.getElementById("signInButton").addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    if (email === "admin" && password === "secretkey") {
        // Redirect to admin dashboard page
        window.location.href = "../../Admin/admin.html";
    } else {
        alert("Invalid email or password. Please try again.");
    }
});
