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
  // Add event listeners for other links here...
});

// Function to handle navigation
function handleNavigation() {
  const dashboardLink = document.getElementById("dashboard-link");
  const companiesLink = document.getElementById("companies-link");
  const contractorsLink = document.getElementById("contractors-link");
  const ordersLink = document.getElementById("orders-link");
  const revenueAnalyticsLink = document.getElementById(
    "revenue-analytics-link",
  );
  const messagesLink = document.getElementById("messages-link");
  const reportsLink = document.getElementById("reports-link");
  const settingsLink = document.getElementById("settings-link");

  const dashboardSection = document.getElementById("dashboard-section");
  const companiesSection = document.getElementById("companies-section");
  const contractorsSection = document.getElementById("contractors-section");
  const ordersSection = document.getElementById("orders-section");
  const revenueAnalyticsSection = document.getElementById(
    "revenue-analytics-section",
  );
  const messagesSection = document.getElementById("messages-section");
  const reportsSection = document.getElementById("reports-section");
  const settingsSection = document.getElementById("settings-section");

  // Hide all sections initially
  dashboardSection.style.display = "none";
  companiesSection.style.display = "none";
  contractorsSection.style.display = "none";
  ordersSection.style.display = "none";
  revenueAnalyticsSection.style.display = "none";
  messagesSection.style.display = "none";
  reportsSection.style.display = "none";
  settingsSection.style.display = "none";

  // Event listener for dashboard link
  dashboardLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "block";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    ordersSection.style.display = "none";
    revenueAnalyticsSection.style.display = "none";
    messagesSection.style.display = "none";
    reportsSection.style.display = "none";
    settingsSection.style.display = "none";
  });

  // Event listener for companies link
  companiesLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "block";
    contractorsSection.style.display = "none";
    ordersSection.style.display = "none";
    revenueAnalyticsSection.style.display = "none";
    messagesSection.style.display = "none";
    reportsSection.style.display = "none";
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
    ordersSection.style.display = "none";
    revenueAnalyticsSection.style.display = "none";
    messagesSection.style.display = "none";
    reportsSection.style.display = "none";
    settingsSection.style.display = "none";

    // Call function to fetch and display contractors data
    fetchContractorsData();
  });

  // Add event listeners for other links here...
  // Similar to the above listeners, adjust the section display as needed
  // Fetch data if required

  // Event listener for orders link
  ordersLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    ordersSection.style.display = "block";
    revenueAnalyticsSection.style.display = "none";
    messagesSection.style.display = "none";
    reportsSection.style.display = "none";
    settingsSection.style.display = "none";
  });
  // Event listener for revenueAnalytics link
  revenueAnalyticsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    ordersSection.style.display = "none";
    revenueAnalyticsSection.style.display = "block";
    messagesSection.style.display = "none";
    reportsSection.style.display = "none";
    settingsSection.style.display = "none";
  });
  // Event listener for messages link
  messagesLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    ordersSection.style.display = "none";
    revenueAnalyticsSection.style.display = "none";
    messagesSection.style.display = "block";
    reportsSection.style.display = "none";
    settingsSection.style.display = "none";
  });
  // Event listener for reports link
  reportsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    ordersSection.style.display = "none";
    revenueAnalyticsSection.style.display = "none";
    messagesSection.style.display = "none";
    reportsSection.style.display = "block";
    settingsSection.style.display = "none";
  });
  // Event listener for settings link
  settingsLink.addEventListener("click", function (event) {
    event.preventDefault();
    dashboardSection.style.display = "none";
    companiesSection.style.display = "none";
    contractorsSection.style.display = "none";
    ordersSection.style.display = "none";
    revenueAnalyticsSection.style.display = "none";
    messagesSection.style.display = "none";
    reportsSection.style.display = "none";
    settingsSection.style.display = "block";
  });
}

function fetchCompaniesData() {
  fetch("http://localhost:5000/companies")
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
          <div>City: ${company.City}</div>
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
  fetch("http://localhost:5000/contractors")
    .then((response) => response.json())
    .then((contractors) => {
      const contractorsSection = document.getElementById("contractors-section");
      contractorsSection.innerHTML = ""; // Clear previous content

      contractors.forEach((contractor) => {
        const contractorElement = document.createElement("div");
        contractorElement.innerHTML = `
          <div>Contractor ID: ${contractor._id}</div>
          <div>Contractor Name: ${contractor.ContractorName}</div>
          <div>Licence Number: ${contractor.LicenceNumber}</div>
          <div>Phone Number: ${contractor.PhoneNumber}</div>
          <div>Address: ${contractor.Address}</div>
          <div>City: ${contractor.City}</div>
          <div>State: ${contractor.State}</div>
          <hr>
        `;
        contractorsSection.appendChild(contractorElement);
      });

      contractorsSection.style.display = "block"; // Show the contractors section
    })
    .catch((error) => console.error("Error fetching contractors:", error));
}

// Call the handleNavigation function when the DOM is loaded
document.addEventListener("DOMContentLoaded", handleNavigation);

//functions to fetch reports(implemented later)

// Function to generate and display Order Reports
function generateOrderReports() {
  // Add code to fetch order data from backend API
  // Generate and display order reports based on fetched data
}

// Function to generate and display Contractor Performance Reports
function generateContractorPerformanceReports() {
  // Add code to fetch contractor performance data from backend API
  // Generate and display contractor performance reports based on fetched data
}

// Function to generate and display Revenue Reports
function generateRevenueReports() {
  // Add code to fetch revenue data from backend API
  // Generate and display revenue reports based on fetched data
}

// Function to generate and display Payment Reports
function generatePaymentReports() {
  // Add code to fetch payment data from backend API
  // Generate and display payment reports based on fetched data
}

// Function to generate and display Company Engagement Reports
function generateCompanyEngagementReports() {
  // Add code to fetch company engagement data from backend API
  // Generate and display company engagement reports based on fetched data
}

// Function to generate and display Contractor Engagement Reports
function generateContractorEngagementReports() {
  // Add code to fetch contractor engagement data from backend API
  // Generate and display contractor engagement reports based on fetched data
}

// Function to generate and display Service Type Reports
function generateServiceTypeReports() {
  // Add code to fetch service type data from backend API
  // Generate and display service type reports based on fetched data
}

// Function to generate and display Geographical Reports
function generateGeographicalReports() {
  // Add code to fetch geographical data from backend API
  // Generate and display geographical reports based on fetched data
}

// Function to generate and display Feedback and Rating Reports
function generateFeedbackRatingReports() {
  // Add code to fetch feedback and rating data from backend API
  // Generate and display feedback and rating reports based on fetched data
}

// Function to generate and display Financial Reports
function generateFinancialReports() {
  // Add code to fetch financial data from backend API
  // Generate and display financial reports based on fetched data
}

// Function to generate and display User Activity Reports
function generateUserActivityReports() {
  // Add code to fetch user activity data from backend API
  // Generate and display user activity reports based on fetched data
}
