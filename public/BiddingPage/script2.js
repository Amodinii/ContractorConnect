const urlParams = new URLSearchParams(window.location.search);
const tenderId = urlParams.get('tenderid');

fetch(`/quotation/getquotations`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(allQuotations => {
        const dataTableBody = document.getElementById('data-table-body');

        allQuotations.forEach(quotation => {
            if (quotation.tender === tenderId) {
                const row = document.createElement('tr');
                const { title, _id, status, contractor } = quotation;

                fetch(`/contractors/findcontractor?id=${contractor}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(contractorInfo => {
                        const idCell = document.createElement('td');
                        idCell.textContent = _id;
                        row.appendChild(idCell);

                        const titleCell = document.createElement('td');
                        titleCell.textContent = title;
                        row.appendChild(titleCell);

                        const statusCell = document.createElement('td');
                        statusCell.textContent = status;
                        row.appendChild(statusCell);

                        const contractorCell = document.createElement('td');
                        contractorCell.textContent = contractorInfo.CompanyName;
                        row.appendChild(contractorCell);

                        const viewQuotationCell = document.createElement('td');
                        const link = document.createElement('a');
                        link.href = `http://localhost:5000/uploads/Quotations/${title}`;
                        link.textContent = 'View Quotation';
                        viewQuotationCell.appendChild(link);
                        row.appendChild(viewQuotationCell);

                        dataTableBody.appendChild(row);
                    })
                    .catch(error => {
                        console.error('Error fetching contractor info:', error);
                        // Handle the error here, e.g., display an error message to the user
                    });
            }
        });
    })
    .catch(error => {
        console.error('Error fetching quotations:', error);
        // Handle the error here, e.g., display an error message to the user
    });
