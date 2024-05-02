// Sidebar functionality
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
});

// Change sidebar button icon
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

// Logout functionality
document.getElementById("log_out").addEventListener("click", function () {
  var confirmLogout = confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    window.location.href = "../Account Creation/Sign_In/SignPage.html";
  }
});

// Fetch companies and contractors data on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("companies-link")
    .addEventListener("click", fetchCompaniesData);
  document
    .getElementById("contractors-link")
    .addEventListener("click", fetchContractorsData);

  document
    .getElementById("tenders-link")
    .addEventListener("click", fetchTenderData);

  document
    .getElementById("quotations-link")
    .addEventListener("click", fetchQuotationData);
  // Add event listeners for other links here...
});

// Function to handle navigation
function handleNavigation() {
  const dashboardLink = document.getElementById("dashboard-link");
  const companiesLink = document.getElementById("companies-link");
  const contractorsLink = document.getElementById("contractors-link");
  const tendersLink = document.getElementById("tenders-link");
  const quotationsLink = document.getElementById("quotations-link");
  const signedContractsLink = document.getElementById("signed-contracts-link");
  const paymentsLink = document.getElementById("payments-link");
  const settingsLink = document.getElementById("settings-link");

  const dashboardSection = document.getElementById("dashboard-section");
  const companiesSection = document.getElementById("companies-section");
  const contractorsSection = document.getElementById("contractors-section");
  const tendersSection = document.getElementById("tenders-section");
  const quotationsSection = document.getElementById("quotations-section");
  const signedContractsSection = document.getElementById(
    "signed-contracts-section"
  );
  const paymentsSection = document.getElementById("payments-section");
  const settingsSection = document.getElementById("settings-section");

  // Hide all sections initially
  dashboardSection.style.display = "none";
  companiesSection.style.display = "none";
  contractorsSection.style.display = "none";
  tendersSection.style.display = "none";
  quotationsSection.style.display = "none";
  signedContractsSection.style.display = "none";
  paymentsSection.style.display = "none";
  settingsSection.style.display = "none";

  // Event listener for dashboard link
  dashboardLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "block";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    tendersSection.style.display = "none";
    quotationsSection.style.display = "none";
    signedContractsSection.style.display = "none";
    paymentsSection.style.display = "none";
    settingsSection.style.display = "none";
  });

  // Event listener for companies link
  companiesLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "block";
    contractorsSection.style.display = "none";
    tendersSection.style.display = "none";
    quotationsSection.style.display = "none";
    signedContractsSection.style.display = "none";
    paymentsSection.style.display = "none";
    settingsSection.style.display = "none";

    // Call function to fetch and display companies data
    fetchCompaniesData();
  });

  // Event listener for contractors link
  contractorsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "block";
    tendersSection.style.display = "none";
    quotationsSection.style.display = "none";
    signedContractsSection.style.display = "none";
    paymentsSection.style.display = "none";
    settingsSection.style.display = "none";

    // Call function to fetch and display contractors data
    fetchContractorsData();
  });

  // Add event listeners for other links here...

  // Event listener for tenders link
  tendersLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    tendersSection.style.display = "block";
    quotationsSection.style.display = "none";
    signedContractsSection.style.display = "none";
    paymentsSection.style.display = "none";
    settingsSection.style.display = "none";

    fetchTenderData();
  });

  // Event listener for quotations link
  quotationsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    tendersSection.style.display = "none";
    quotationsSection.style.display = "block";
    signedContractsSection.style.display = "none";
    paymentsSection.style.display = "none";
    settingsSection.style.display = "none";

    fetchQuotationData();
  });

  // Event listener for signed contracts link
  signedContractsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    tendersSection.style.display = "none";
    quotationsSection.style.display = "none";
    signedContractsSection.style.display = "block";
    paymentsSection.style.display = "none";
    settingsSection.style.display = "none";
  });

  // Event listener for payments link
  paymentsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    tendersSection.style.display = "none";
    quotationsSection.style.display = "none";
    signedContractsSection.style.display = "none";
    paymentsSection.style.display = "block";
    settingsSection.style.display = "none";
  });

  // Event listener for settings link
  settingsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    tendersSection.style.display = "none";
    quotationsSection.style.display = "none";
    signedContractsSection.style.display = "none";
    paymentsSection.style.display = "none";
    settingsSection.style.display = "block";
  });
}

function fetchCompaniesData() {
  fetch("/company/userdetails")
    .then((response) => response.json())
    .then((companies) => {
      const companiesSection = document.getElementById("companies-section");
      companiesSection.innerHTML = ""; // Clear previous content

      companies.forEach((company) => {
        const companyElement = document.createElement("div");
        companyElement.innerHTML = `
          <div>Company ID: ${company._id}</div>
          <div>Company Name: ${company.CompanyName}</div>
          <div>Website: ${company.WebsiteLink}</div>
          <div>Phone Number: ${company.PhoneNumber}</div>
          <div>Alternate Phone Number: ${company.AlternatePhoneNumber}</div>
          <div>Address: ${company.Address}</div>
          <div>Email: ${company.Email}</div>
          <div>State: ${company.State}</div>
          <hr>
        `;
        companiesSection.appendChild(companyElement);
      });

      companiesSection.style.display = "block"; // Show the companies section
    })
    .catch((error) => console.error("Error fetching companies:", error));
}

function fetchContractorsData() {
  fetch("/contractor/allUsers")
    .then((response) => response.json())
    .then((contractors) => {
      const contractorsSection = document.getElementById("contractors-section");
      contractorsSection.innerHTML = ""; // Clear previous content

      contractors.forEach((contractor) => {
        const contractorElement = document.createElement("div");
        contractorElement.innerHTML = `
          <div>Contractor ID: ${contractor._id}</div>
          <div>Contractor Name: ${contractor.ContractorName}</div>
          <div>Phone Number: ${contractor.PhoneNumber}</div>
          <div>Address: ${contractor.Address}</div>
          <div>City: ${contractor.City}</div>
          <div>State: ${contractor.State}</div>
          <div>Email: ${contractor.Email}</div>
          <hr>
        `;
        contractorsSection.appendChild(contractorElement);
      });

      contractorsSection.style.display = "block"; // Show the contractors section
    })
    .catch((error) => console.error("Error fetching contractors:", error));
}

function fetchTenderData() {
  fetch("/tender/data")
    .then((response) => response.json())
    .then((tenders) => {
      const tendersSection = document.getElementById("tenders-section");
      tendersSection.innerHTML = ""; // Clear previous content

      tenders.forEach((tender) => {
        const tenderElement = document.createElement("div");
        tenderElement.innerHTML = `
        <div>Tender ID: ${tender._id}</div>
        <div>Company ID: ${tender.company}</div>
        <div>Tender title: ${tender.title}</div>
        <div>Category: ${tender.category}</div>
        <div>Status: ${tender.status}</div>
        <hr>
      `;
        tendersSection.appendChild(tenderElement);
      });

      tendersSection.style.display = "block"; // Show the contractors section
    })
    .catch((error) => console.error("Error fetching tenders:", error));
}

function fetchQuotationData() {
  fetch("/quotation/data")
    .then((response) => response.json())
    .then((quotations) => {
      const quotationsSection = document.getElementById("quotations-section");
      quotationsSection.innerHTML = ""; // Clear previous content

      quotations.forEach((quotation) => {
        const quotationElement = document.createElement("div");
        quotationElement.innerHTML = `
        <div>Quotation ID: ${quotation._id}</div>
        <div>Tender ID: ${quotation.tender}</div>
        <div>Contractor ID: ${quotation.contractor}</div>
        <div>Title: ${quotation.title}</div>
        <hr>
      `;
        quotationsSection.appendChild(quotationElement);
      });

      quotationsSection.style.display = "block"; // Show the contractors section
    })
    .catch((error) => console.error("Error fetching quotations:", error));
}

// Call the handleNavigation function when the DOM is loaded
document.addEventListener("DOMContentLoaded", handleNavigation);

// Function to display the form for creating a new company user
function showCreateCompanyUserForm() {
  const companyUserForm = document.createElement("form");
  companyUserForm.id = "createCompanyUserForm";

  // Company Name input
  const companyNameLabel = document.createElement("label");
  companyNameLabel.textContent = "Company Name:";
  const companyNameInput = document.createElement("input");
  companyNameInput.type = "text";
  companyNameInput.id = "companyNameInput";
  companyUserForm.appendChild(companyNameLabel);
  companyUserForm.appendChild(companyNameInput);

  // Website input
  const websiteLabel = document.createElement("label");
  websiteLabel.textContent = "Website:";
  const websiteInput = document.createElement("input");
  websiteInput.type = "text";
  websiteInput.id = "websiteInput";
  companyUserForm.appendChild(websiteLabel);
  companyUserForm.appendChild(websiteInput);

  // Phone Number input
  const phoneLabel = document.createElement("label");
  phoneLabel.textContent = "Phone Number:";
  const phoneInput = document.createElement("input");
  phoneInput.type = "text";
  phoneInput.id = "phoneInput";
  companyUserForm.appendChild(phoneLabel);
  companyUserForm.appendChild(phoneInput);

  // Alternate Phone Number input
  const alternatePhoneLabel = document.createElement("label");
  alternatePhoneLabel.textContent = "Alternate Phone Number:";
  const alternatePhoneInput = document.createElement("input");
  alternatePhoneInput.type = "text";
  alternatePhoneInput.id = "alternatePhoneInput";
  companyUserForm.appendChild(alternatePhoneLabel);
  companyUserForm.appendChild(alternatePhoneInput);

  // Address input
  const addressLabel = document.createElement("label");
  addressLabel.textContent = "Address:";
  const addressInput = document.createElement("input");
  addressInput.type = "text";
  addressInput.id = "addressInput";
  companyUserForm.appendChild(addressLabel);
  companyUserForm.appendChild(addressInput);

  // Email input
  const emailLabel = document.createElement("label");
  emailLabel.textContent = "Email:";
  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "emailInput";
  companyUserForm.appendChild(emailLabel);
  companyUserForm.appendChild(emailInput);

  // State input
  const stateLabel = document.createElement("label");
  stateLabel.textContent = "State:";
  const stateInput = document.createElement("input");
  stateInput.type = "text";
  stateInput.id = "stateInput";
  companyUserForm.appendChild(stateLabel);
  companyUserForm.appendChild(stateInput);

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Create Company User";
  companyUserForm.appendChild(submitButton);

  // Add form to the companyUsers section
  const companyUsersSection = document.getElementById("companyUsers");
  companyUsersSection.appendChild(companyUserForm);

  // Add event listener for form submission
  companyUserForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
    // Call function to handle creation of company user with form data
    createCompanyUser();
  });
}

// Function to handle creation of a new company user
function createCompanyUser() {
  // Get form input values
  const companyName = document.getElementById("companyNameInput").value;
  const website = document.getElementById("websiteInput").value;
  const phoneNumber = document.getElementById("phoneInput").value;
  const alternatePhoneNumber = document.getElementById(
    "alternatePhoneInput"
  ).value;
  const address = document.getElementById("addressInput").value;
  const email = document.getElementById("emailInput").value;
  const state = document.getElementById("stateInput").value;

  // Create an object with the user data
  const userData = {
    CompanyName: companyName,
    WebsiteLink: website,
    PhoneNumber: phoneNumber,
    AlternatePhoneNumber: alternatePhoneNumber,
    Address: address,
    Email: email,
    State: state,
  };

  // Send POST request to backend API to create the user
  fetch("/company/userdetails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (response.ok) {
        // If user creation is successful, refresh the list of users
        fetchCompaniesData(); // Assuming you have a function to fetch and display company users
        // Optionally, clear the form input fields
        document.getElementById("createCompanyUserForm").reset();
      } else {
        // If user creation fails, display an error message
        console.error("Failed to create company user");
      }
    })
    .catch((error) => console.error("Error creating company user:", error));
}
