document.getElementById('sig').addEventListener('click', function(e) {
  // Prevent default form submission
  e.preventDefault();

  // Call the combined validation function
  if (!validateForm()) {
    return; // Exit if validation fails
  }

  // Continue with form submission
  const email = localStorage.getItem("email");
  const userData = {
    Email: email,
    CompanyName: document.getElementById('yourname').value,
    WebsiteLink: document.getElementById('mailu').value,
    PhoneNumber: document.getElementById('phno').value,
    AlternatePhoneNumber: document.getElementById('addr').value,
    Address: document.getElementById('address').value,
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

  // Redirect after successful submission (optional)
  window.location.href = "../../Dashboard - Company/samp.html"; // Replace with your desired destination
});

function validatePhoneNumber() {
  const phoneNumber = document.getElementById('phno').value.trim();
  const phonePattern = /^\d{10}$/;
  const isValid = phonePattern.test(phoneNumber);
  const errorElement = document.getElementById('phone-error');

  if (!isValid) {
    errorElement.textContent = 'Please enter a valid 10-digit phone number';
    errorElement.style.display = 'block';
    errorElement.classList.add('error');
    return false; // Return false if phone number is not valid
  } else {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    errorElement.classList.remove('error');
    return true; // Return true if phone number is valid
  }
}

function validateForm() {
  const name = document.getElementById('yourname').value.trim();
  const website = document.getElementById('mailu').value.trim();
  const phone = document.getElementById('phno').value.trim();
  const altPhone = document.getElementById('addr').value.trim();

  let isValid = true;

  // Validation for name
  const nameError = document.getElementById('name-error');
  if (name === '') {
    nameError.textContent = 'Please enter your company name';
    nameError.style.display = 'block';
    nameError.classList.add('error');
    isValid = false;
  } else {
    nameError.textContent = '';
    nameError.style.display = 'none';
    nameError.classList.remove('error');
  }

  // Similar validation for website, phone (calling validatePhoneNumber()), and altPhone
  const websiteError = document.getElementById('website-error');
  if (website === '') {
    websiteError.textContent = 'Please enter your website';
    websiteError.style.display = 'block';
    websiteError.classList.add('error');
    isValid = false;
  } else {
    websiteError.textContent = '';
    websiteError.style.display = 'none';
    websiteError.classList.remove('error');
  }

  isValid = isValid && validatePhoneNumber(phone); // Combine validation results

  const altPhoneError = document.getElementById('alt-phone-error');
  if (altPhone === '') {
    altPhoneError.textContent = 'Please enter your alternate phone number';
    altPhoneError.style.display = 'block';
    altPhoneError.classList.add('error');
    isValid = false;
  } else {
    altPhoneError.textContent = '';
    altPhoneError.style.display = 'none';
    altPhoneError.classList.remove('error');
  }

  return isValid;
}
