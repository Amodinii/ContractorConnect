document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Simulating payment processing
    setTimeout(() => {
        alert("Payment Successful!");
        // Redirecting to a thank you page or perform other actions
        window.location.href = "thank-you.html";
    }, 2000);
});

// Show the loading overlay
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex'; // Change display to flex
}

// Hide the loading overlay
function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Simulate a payment submission (replace with your actual payment submission code)
function submitPayment() {
    showLoading(); // Show loading animation
    setTimeout(() => {
        // Simulate a delay before going to the thank you page
        hideLoading(); // Hide loading animation
        window.location.href = 'thank-you.html'; // Redirect to thank you page
    }, 2000); // Simulate a 2-second delay (replace with actual payment submission logic)
}

// Call the submitPayment function when the payment form is submitted
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    submitPayment(); // Call the submitPayment function
});

