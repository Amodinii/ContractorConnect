fetch('/tender/data')
            .then(response => response.json())
            .then(data => {
                // Loop through each entry and generate table rows
                data.forEach(entry => {
                    const row = document.createElement('tr');
                    row.innerHTML = `   
                        <td>${entry.company}</td>
                        <td>${entry.title}</td>
                        <td>${entry.category}</td>
                        <td>${entry.status}</td>
                        <td>><a href="http://localhost:5000/uploads/${entry.title}">View Tender</a></td>
                        <td><button>Submit Quotation</button></td>
                    `;
                    document.getElementById('data-table-body').appendChild(row);
                });
            })
            .catch(error => console.error('Error fetching data:', error));