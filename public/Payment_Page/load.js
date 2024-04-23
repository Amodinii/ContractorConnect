// Simulate payment processing for 3 seconds
setTimeout(() => {
  // Redirect to the thank-you page after payment processing is done
  window.location.href = "thank-you.html";
}, 3000);
