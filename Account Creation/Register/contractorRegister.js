document.getElementById('sig').addEventListener('click', function(e) {
  const email = localStorage.getItem("email"); // Retrieve email from localStorage
    const userData = {
      Email: email,
      ContractorName: document.getElementById('yourname').value,
      LicenceNumber: document.getElementById('mailu').value,
      PhoneNumber: document.getElementById('phno').value,
      //attachments ka socho
      Address: document.getElementById('address').value,
      City: document.getElementById('city').value,
      State: document.getElementById('state').value,
      Password: document.getElementById('password').value,
      ConfirmPassword: document.getElementById('password-confirm').value
    };
  
    fetch('http://localhost:5000/contractorRegister', {
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
  
