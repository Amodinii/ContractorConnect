 document.getElementById('sig').addEventListener('click', function(e) {
  const email = localStorage.getItem("email");
  const userData = {
    Email: email,
    CompanyName: document.getElementById('yourname').value,
    WebsiteLink: document.getElementById('mailu').value,
    PhoneNumber: document.getElementById('phno').value,
    AlternatePhoneNumber: document.getElementById('addr').value,
    Address: document.getElementById('address').value,
    City: document.getElementById('city').value,
    State: document.getElementById('state').value,
    Password: document.getElementById('password').value,
    ConfirmPassword: document.getElementById('password-confirm').value
  };

  fetch('http://localhost:5000/companyRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
});
