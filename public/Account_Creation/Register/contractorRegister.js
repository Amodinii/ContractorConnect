document.getElementById("sig").addEventListener("click", function (e) {
  const email = localStorage.getItem("email"); // Retrieve email from localStorage
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("password-confirm").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match! Please re-enter your password.");
    return; // Prevent form submission if passwords don't match
  }

  const userData = {
    Email: email,
    ContractorName: document.getElementById("yourname").value,
    PhoneNumber: document.getElementById("phno").value,
    //attachments ka socho (handle attachments as needed)
    Address: document.getElementById("address").value,
    City: document.getElementById("city").value,
    State: document.getElementById("state").value,
    Password: password,
    ConfirmPassword: confirmPassword,
  };

  fetch("/auth/contractorRegister", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the response data
      window.location.href = "../../HomePage_Vendor/index.html"; // Redirect to the homepage
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
