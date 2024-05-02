
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userID');
console.log(userID);

fetch("/quotation/data")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      if (entry.contractor === userID) {
        fetch(`/tender/gettenders`)
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(allTenders => {
            // Filter tenders based on the user ID
            const userTenders = allTenders.filter(tender => tender._id === entry.tender);
            userTenders.forEach(tender => {
              const { company } = tender;
              fetch(`/company/findcompany?id=${company}`)
                .then((response) => response.json())
                .then((companyData) => {
                  const row = document.createElement("tr");
                  row.innerHTML = `
                    <td>${entry._id}</td>
                    <td>${entry.tender}</td>
                    <td>${entry.title}</td>
                    <td>${companyData.CompanyName}</td>
                    <td>${entry.status}</td>
                    <td><a href="http://localhost:5000/uploads/Quotations/${entry.title}">View Quotations</a></td>
                  `;
                  document.getElementById("quotation-table-body").appendChild(row);
                })
                .catch((error) => console.error("Error fetching company data:", error));
            });
          })
          .catch((error) => console.error("Error fetching tenders:", error));
      }
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
