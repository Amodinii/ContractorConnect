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

          // Create table cells for title, category, and status
          const idCell = document.createElement('td');
          idCell.textContent = _id;
          row.appendChild(idCell);

          const titleCell = document.createElement('td');
          titleCell.textContent = title;
          row.appendChild(titleCell);


          const statusCell = document.createElement('td');
          statusCell.textContent = status;
          row.appendChild(statusCell);

          const viewtender = document.createElement('td');
          const link = document.createElement('a');
          link.href = '#';
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
