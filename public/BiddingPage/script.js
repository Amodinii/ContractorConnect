const jwtToken = localStorage.getItem('jwtToken');

// Store the JWT token in localStorage
localStorage.setItem('jwtToken', jwtToken);

fetch('/company/userdetails')
    .then(response => response.json())
    .then(data => {
        const userId = data.id;
        fetch(`/tender/gettenders`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(allTenders => {
                // Filter tenders based on the user ID
                const userTenders = allTenders.filter(tender => tender.company === userId);

                const dataTableBody = document.getElementById('data-table-body');

                userTenders.forEach(tender => {
                    const row = document.createElement('tr');

                    // Extract title, category, and status fields from tender object
                    const { title, _id, status } = tender;

                    // Create table cells 
                    const idCell = document.createElement('td');
                    idCell.textContent = _id;
                    row.appendChild(idCell);
                    // Store the tenderid in local storage
                    const tenderId = _id; // Replace with the actual tender id
                    localStorage.setItem('tenderid', tenderId);


                    const titleCell = document.createElement('td');
                    titleCell.textContent = title;
                    row.appendChild(titleCell);

                    const statusCell = document.createElement('td');
                    statusCell.textContent = status;
                    row.appendChild(statusCell);

                    const viewtender = document.createElement('td');
                    const link = document.createElement('a');
                    link.href = 'http://localhost:5000/BiddingPage/index2.html';
                    link.textContent = 'View More'; // Set your desired link text here
                    viewtender.appendChild(link);
                    row.appendChild(viewtender);
                    // Append the row to the table body
                    dataTableBody.appendChild(row);
                });

            })
            .catch(error => {
                console.error('Error fetching tender details:', error);
            });
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });
