function setCookie(cookieName, cookieValue, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
  
fetch('/company/userdetails')
.then(response => response.json())
.then(data => {
    console.log('User details:', data);
    fetch('/company/userdetails')
    .then(response => response.json())
    .then(data => {
      // Update each detail with the received data
      const userProfileCompanyName = document.querySelector('#companyName');
      if (userProfileCompanyName) {
        userProfileCompanyName.value = data.CompanyName;
      }
  
      const userProfileCompanyWebsite = document.querySelector('#companyWebsite');
      if (userProfileCompanyWebsite) {
        userProfileCompanyWebsite.value = data.companywebsite;
      }
  
      const userProfileCompanyPhone = document.querySelector('#companyPhone');
      if (userProfileCompanyPhone) {
        userProfileCompanyPhone.value = data.companyphone;
      }
  
      const userProfileCompanyState = document.querySelector('#companyState');
      if (userProfileCompanyState) {
        userProfileCompanyState.value = data.companystate;
      }
  
      const userProfileCompanyAddress = document.querySelector('#companyAddress');
      if (userProfileCompanyAddress) {
        userProfileCompanyAddress.value = data.companyaddress;
      }
  
      const userProfileCompanyEmail = document.querySelector('#companyEmail');
      if (userProfileCompanyEmail) {
        userProfileCompanyEmail.value = data.companymail;
      }
    })
    .catch(error => {
      console.error('Error fetching user details:', error);
    });
  
})
.catch(error => {
  console.error('Error fetching user details:', error);
});

document.getElementById("logout1").addEventListener("click", function () {
    console.log("haoihdfioaeshjf logout");
    window.setCookie("authorization", "", (expirationDays = -1));
    window.location.href = "../Account_Creation/Sign_In/SignPage.html";
  });