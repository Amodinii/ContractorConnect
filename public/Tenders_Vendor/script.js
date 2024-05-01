fetch("/tender/data")
  .then((response) => response.json())
  .then((data) => {
    // Loop through each entry and generate table rows
    data.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${entry.company}</td>
                    <td>${entry.title}</td>
                    <td>${entry.category}</td>
                    <td>${entry.status}</td>
                    <td><a href="http://localhost:5000/uploads/Tenders/${entry.title}">View Tender</a></td>
                    <td><form id="quotationForm" method="POST" enctype="multipart/form-data" action="/quotation/postquotation">
    <button class="submit-quotation" style="background-color:#222831; border-radius:2px;color:#eeeeee;">Upload Quotation</button>
    <input type="file" name="quotationFile" style="display: none;" onchange="document.querySelector('.file-title').innerText = this.files[0].name;">
    <button type="submit" class="submit-btn" style="display: none;background-color:#222831; border-radius:2px;color:#eeeeee;margin-top:5px;">Submit</button>
    <span class="file-title" style="display: none;"></span></td>
</form>

                `;
      document.getElementById("data-table-body").appendChild(row);
    });

    // Event listener for Submit Quotation button
    document.querySelectorAll(".submit-quotation").forEach((button) => {
      button.addEventListener("click", function () {
        const fileInput = this.nextElementSibling; // Get the input element next to the button
        const submitBtn = this.nextElementSibling.nextElementSibling; // Get the submit button
        const fileTitle =
          this.nextElementSibling.nextElementSibling.nextElementSibling; // Get the file title span
        fileInput.click(); // Trigger click on the file input
        fileInput.addEventListener("change", function () {
          submitBtn.style.display = "block"; // Display the submit button
          fileTitle.textContent = fileInput.files[0].name; // Display the file name
          fileTitle.style.display = "inline-block"; // Display the file title span
        });
      });
    });

    // Event listener for Submit button
    document.querySelectorAll(".submit-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const fileInput = this.previousElementSibling; // Get the file input
        const file = fileInput.files[0]; // Get the selected file
        if (file) {
          // You can now send the file to the server for processing
          console.log("File selected:", file.name);
          // Here you can add code to send the file data to the server using fetch or other methods
        } else {
          console.log("No file selected.");
        }
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
