const jwtToken = localStorage.getItem('jwtToken');

// Store the JWT token in localStorage
localStorage.setItem('jwtToken', jwtToken);

fetch('/company/companydetails')
.then(response => response.json())
.then(data => {
  console.log(data.CompanyName);
  const companyName = data.CompanyName;
  const userProfileUsername = document.querySelector('#username');
  if (userProfileUsername) {
    userProfileUsername.textContent = companyName;
  }
  const tenderIds = data.tenders;
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

            // Create table cells for title, category, and status

            const categoryCell = document.createElement('td');
            categoryCell.textContent = _id;
            row.appendChild(categoryCell);


            const titleCell = document.createElement('td');
            titleCell.textContent = title;
            row.appendChild(titleCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = status;
            row.appendChild(statusCell);

            const viewtender = document.createElement('td');
            const link = document.createElement('a');
            link.href = `http://localhost:5000/BiddingPage/index2.html?tenderid=${_id}`;
            link.textContent = 'View all Quotations'; // Set your desired link text here
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
