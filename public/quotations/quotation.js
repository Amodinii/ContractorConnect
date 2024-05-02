fetch("/quotation/data")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry._id}</td>
        <td>${entry.tender}</td>
        <td>${entry.contractor}</td>
        <td>${entry.title}</td>
        <td>${entry.status}</td>
        <td><a href="http://localhost:5000/uploads/Quotations/${entry.title}">View Quotations</a></td>
      `;
      document.getElementById("quotation-table-body").appendChild(row);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
