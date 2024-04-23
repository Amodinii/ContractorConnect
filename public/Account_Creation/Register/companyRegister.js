document.getElementById("sig").addEventListener("click", async function (e) {
  const email = localStorage.getItem("email");
  const userData = {
    Email: email,
    CompanyName: document.getElementById("yourname").value,
    WebsiteLink: document.getElementById("mailu").value,
    PhoneNumber: document.getElementById("phno").value,
    AlternatePhoneNumber: document.getElementById("addr").value,
    Address: document.getElementById("address").value,
    State: document.getElementById("state").value,
    Password: document.getElementById("password").value,
    ConfirmPassword: document.getElementById("password-confirm").value,
  };

  if (userData.Password !== userData.ConfirmPassword) {
    alert("Passwords do not match! Please re-enter your password.");
    return;
  }
  console.log("ppohuch");
  await fetch("/auth/companyRegister", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location.href = "../../Dashboard_Company/samp.html"; // Replace this URL with your desired destination
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
