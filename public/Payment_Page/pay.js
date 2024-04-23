document
  .getElementById("paymentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Redirect to the loading page
    window.location.href = "load.html";

    // Simulating payment processing (commented out for clarity)
    // setTimeout(() => {
    //     alert("Payment Successful!");
    //     // Redirecting to a thank you page or perform other actions
    //     window.location.href = "thank-you.html";
    // }, 2000);
  });
