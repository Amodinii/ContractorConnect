document.getElementById("paymentForm").addEventListener("submit", function(event) {
    event.preventDefault();
    // Simulating payment processing
    setTimeout(() => {
        alert("Payment Successful!");
        // Redirecting to a thank you page or perform other actions
        window.location.href = "thank-you.html";
    }, 2000);
});
