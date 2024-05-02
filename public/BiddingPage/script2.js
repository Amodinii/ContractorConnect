// Retrieve JWT token from localStorage
const token = localStorage.getItem('jwtToken');
console.log('Retrieved JWT token:', token);

// Check if token exists
if (!token) {
    console.error('JWT token not found in localStorage');
} else {
    // Fetch quotations with JWT token included in the request headers
    fetch('/quotation/getquotations', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(allQuotations => {
            // Filter quotations based on the tender ID
            // Retrieve the tenderid from local storage
            console.log("Idhar amodini ap hai");
            const tenderId = localStorage.getItem('tenderid');
            const quotations = allQuotations.filter(quotation => quotation.tenderid === tenderId);

            // Array to hold promises for fetching contractor names
            const contractorPromises = [];

            quotations.forEach(quotation => {
                // Fetch contractor details for each quotation
                const userId = quotation.contractorId;
                const contractorPromise = fetch('/contractors/vendordetails?id=' + userId, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        return { quotation: quotation, contractorName: data.CompanyName };
                    })
                    .catch(error => {
                        console.error('Error fetching contractor details:', error);
                    });
                contractorPromises.push(contractorPromise);
            });

            // Resolve all promises for fetching contractor names
            Promise.all(contractorPromises)
                .then(results => {
                    const dataTableBody = document.getElementById('data-table-body');
                    results.forEach(result => {
                        const { quotation, contractorName } = result;

                        const row = document.createElement('tr');

                        // Append contractor name to the table
                        const contractorNameCell = document.createElement('td');
                        contractorNameCell.textContent = contractorName;
                        row.appendChild(contractorNameCell);

                        // Extract fields from quotation object
                        const { _id, title } = quotation;

                        // Create table cells for ID and title
                        const idCell = document.createElement('td');
                        idCell.textContent = _id;
                        row.appendChild(idCell);

                        const titleCell = document.createElement('td');
                        titleCell.textContent = title;
                        row.appendChild(titleCell);

                        // Create link to view quotation
                        const viewQuotationCell = document.createElement('td');
                        const link = document.createElement('a');
                        link.href = 'http://localhost:5000/uploads/Quotations/' + title;
                        link.textContent = 'View Quotation';
                        viewQuotationCell.appendChild(link);
                        row.appendChild(viewQuotationCell);

                        // Append the row to the table body
                        dataTableBody.appendChild(row);
                    });
                })
                .catch(error => {
                    console.error('Error fetching contractor details:', error);
                });
        })
        .catch(error => {
            console.error('Error fetching quotation details:', error);
        });
}
