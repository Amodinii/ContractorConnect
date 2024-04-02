document.getElementById('sig').addEventListener('click', function(e) {
  const email = localStorage.getItem("email");
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('password-confirm').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match! Please re-enter your password.");
    return;
  }

  const userData = {
    Email: email,
    CompanyName: document.getElementById('yourname').value,
    WebsiteLink: document.getElementById('mailu').value,
    PhoneNumber: document.getElementById('phno').value,
    AlternatePhoneNumber: document.getElementById('addr').value,
    Address: document.getElementById('address').value,
    State: document.getElementById('state').value,
    Password: password,
    ConfirmPassword: confirmPassword
  };

  fetch('http://localhost:5000/companyRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the response data
    window.location.href = "../../Dashboard - Company/samp.html"; // Redirect to the dashboard
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});
