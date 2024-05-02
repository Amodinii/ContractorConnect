
const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get('userID');
console.log(userID);

fetch("/tender/data")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((entry) => {
      if (entry.company === userID && entry.status === 'closed') {
        console.log(entry._id);
        fetch(`/quotation/getquotations`)
          .then(res => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then(allquotationss => {
            // Filter quotationss based on the user ID
            const userquotationss = allquotationss.filter(quotations => (quotations.status === "Accepted") && (quotations.tender === entry._id));
            userquotationss.forEach(quotations => {
              const { contractor } = quotations;
              console.log(contractor);
              fetch(`/contractors/findcontractor?id=${contractor}`)
                .then((response) => response.json())
                .then((companyData) => {
                  console.log(quotations.quotations)
                  fetch(`/quotation/findquotation?id=${quotations._id}`)
                  .then((response) => response.json())
                  .then((quotations) => {
                    const row = document.createElement("tr");
                  row.innerHTML = `
                    <td>${companyData.CompanyName}</td>
                    <td><a href="http://localhost:5000/uploads/quotationss/${entry.title}">Tender</a></td>
                    <td><a href="http://localhost:5000/uploads/Quotations/${quotations.title}">Quotation</a></td>
                    <td><a href="http://localhost:5000/Payment_Page/pay.html">Make Payment</a></td>
                  `;
                  document.getElementById("quotation-table-body").appendChild(row);
                })
                  })
                .catch((error) => console.error("Error fetching company data:", error));
            });
          })
          .catch((error) => console.error("Error fetching quotationss:", error));
      }
    });
  })
  .catch((error) => console.error("Error fetching data:", error));
