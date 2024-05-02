const token = localStorage.getItem("jwtToken");
fetch(`/tender/data`,{
  headers:{
    'Authorization': `Bearer ${token}`
  }
})
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      console.log("COMPANY");
      fetch(`/company/findcompany?id=${entry.company}`)
        .then((response) => response.json())
        .then((companyData) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${entry._id}</td>
            <td>${companyData.CompanyName}</td>
            <td>${entry.title}</td>
            <td>${entry.category}</td>
            <td>${entry.status}</td>
            <td><a href="http://localhost:5000/uploads/Tenders/${entry.title}">View Tender</a></td>
            <td>
              <form id="quotationForm" method="POST" enctype="multipart/form-data" action="/quotation/postquotation">
                <input type="file" id="fileInput" name="quotationFile" required />
                <input type="hidden" name="tenderId" value="${entry._id}" />
                <button type="submit" onclick="uploadQuotation()">Upload</button>
              </form>
            </td>
          `;
          document.getElementById("data-table-body").appendChild(row);
        })
        .catch((error) => console.error("Error fetching company details:", error));
    });
  })
  .catch((error) => console.error("Error fetching tender data:", error));

document.querySelectorAll(".submit-quotation").forEach((button) => {
  button.addEventListener("click", function () {
    const fileInput = this.nextElementSibling;
    const submitBtn = this.nextElementSibling.nextElementSibling;
    const fileTitle = this.nextElementSibling.nextElementSibling.nextElementSibling;
    fileInput.click();
    fileInput.addEventListener("change", function () {
      submitBtn.style.display = "block";
      fileTitle.textContent = fileInput.files[0].name;
      fileTitle.style.display = "inline-block";
    });
  });
});

document.querySelectorAll(".submit-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const fileInput = this.previousElementSibling;
    const file = fileInput.files[0];
    if (file) {
      console.log("File selected:", file.name);
      // Add code to send the file data to the server
    } else {
      console.log("No file selected.");
    }
  });
});
