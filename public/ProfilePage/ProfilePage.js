function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + expirationDays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

fetch("/company/companydetails")
  .then((response) => response.json())
  .then((data) => {
    console.log("User details:", data);
    fetch("/company/companydetails")
      .then((response) => response.json())
      .then((data) => {
        // Update each detail with the received data
        const userProfileCompanyName = document.querySelector("#companyName");
        if (userProfileCompanyName) {
          userProfileCompanyName.value = data.CompanyName;
        }

        const userProfileCompanyWebsite =
          document.querySelector("#companyWebsite");
        if (userProfileCompanyWebsite) {
          userProfileCompanyWebsite.value = data.companywebsite;
        }

        const userProfileCompanyPhone = document.querySelector("#companyPhone");
        if (userProfileCompanyPhone) {
          userProfileCompanyPhone.value = data.companyphone;
        }

        const userProfileCompanyState = document.querySelector("#companyState");
        if (userProfileCompanyState) {
          userProfileCompanyState.value = data.companystate;
        }

        const userProfileCompanyAddress =
          document.querySelector("#companyAddress");
        if (userProfileCompanyAddress) {
          userProfileCompanyAddress.value = data.companyaddress;
        }

        const userProfileCompanyEmail = document.querySelector("#companyEmail");
        if (userProfileCompanyEmail) {
          userProfileCompanyEmail.value = data.companymail;
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  })
  .catch((error) => {
    console.error("Error fetching user details:", error);
  });

function updateUserDetails() {
  try {
    console.log("It is coming in the function.");
    // Extract current user information from the profile page
    const companyName = document.getElementById("companyName").value;
    const websiteLink = document.getElementById("companyWebsite").value;
    const phoneNumber = document.getElementById("companyPhone").value;
    const address = document.getElementById("companyAddress").value;
    const email = document.getElementById("companyEmail").value;
    const state = document.getElementById("companyState").value;

    const updatedData = {
      CompanyName: companyName,
      WebsiteLink: websiteLink,
      PhoneNumber: phoneNumber,
      Address: address,
      State: state,
      Email: email,
    };
    console.log(updatedData);
    fetch("/company/updateuserdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      console.log("Profile updated successfully");
    } else {
      console.error("Failed to update profile:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
}

document.getElementById("logout1").addEventListener("click", function () {
  console.log("haoihdfioaeshjf logout");
  window.setCookie("authorization", "", (expirationDays = -1));
  window.location.href = "../Account_Creation/Sign_In/SignPage.html";
});
