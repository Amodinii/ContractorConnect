const urlParams = new URLSearchParams(window.location.search);
const tenderId = urlParams.get('tenderid');
const quotationsStatusMap = new Map();

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
                const { title, _id, status, contractor, tender } = quotation;
                quotationsStatusMap.set(_id,status);

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

                        const actionCell = document.createElement('td');
                        const form = document.createElement('form');
                        const select = document.createElement('select');
                        const defaultOption = document.createElement('option');
                        defaultOption.textContent = 'Select status';
                        defaultOption.disabled = true;
                        defaultOption.selected = true;
                        defaultOption.value=' ';
                        const acceptOption = document.createElement('option');
                        acceptOption.value = 'Accepted';
                        acceptOption.textContent = 'Accept';
                        const rejectOption = document.createElement('option');
                        rejectOption.value = 'Rejected';
                        rejectOption.textContent = 'Reject';
                        select.appendChild(defaultOption);
                        select.appendChild(acceptOption);
                        select.appendChild(rejectOption);
                        const submitButton = document.createElement('button');
                        submitButton.type = 'submit';
                        submitButton.textContent = 'Submit';
                        form.appendChild(select);
                        form.appendChild(submitButton);
                        actionCell.appendChild(form);
                        row.appendChild(actionCell);

                        dataTableBody.appendChild(row);

                        if(quotationsStatusMap.get(_id) === 'Pending'){
                            select.disabled=false;
                            submitButton.disabled=false;
                        }
                        else{
                            select.disabled=true;
                            submitButton.disabled=true;
                        }
                        form.addEventListener('submit', function(event) {
                            event.preventDefault();
                            const selectedOption = select.options[select.selectedIndex].value;
                            fetch(`/quotation/updatestatus?id=${_id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ optionValue: selectedOption }), // Fixed variable name
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(data => {
                                console.log(data); // You can handle the response data here if needed
                            })
                            .catch(error => {
                                console.error('There was a problem with the fetch operation:', error);
                            });

                            select.disabled=true;
                            submitButton.disabled=true;
                            quotationsStatusMap.set(_id,selectedOption);

                            if(selectedOption === 'Accepted'){
                                fetch(`/tender/updatestatus?id=${tender}`,{
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ status: 'closed' }),
                                })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    console.log(data); // You can handle the response data here if needed
                                })
                                .catch(error => {
                                    console.error('There was a problem with the fetch operation:', error);
                                });
                            }
                        });
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            }
        })
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
