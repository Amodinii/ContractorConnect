function fetchCompaniesData() {
    fetch('http://localhost:5000/companies')
      .then(response => response.json())
      .then(companies => {
        const companiesSection = document.getElementById('companies-section');
        companiesSection.innerHTML = ''; // Clear previous content
  
        companies.forEach(company => {
          const companyElement = document.createElement('div');
          companyElement.innerHTML = `
            <div>Company ID: ${company._id}</div>
            <div>Company Name: ${company.CompanyName}</div>
            <div>Website: ${company.WebsiteLink}</div>
            <div>Phone Number: ${company.PhoneNumber}</div>
            <div>Alternate Phone Number: ${company.AlternatePhoneNumber}</div>
            <div>Address: ${company.Address}</div>
            <div>City: ${company.City}</div>
            <div>State: ${company.State}</div>
            <hr>
          `;
          companiesSection.appendChild(companyElement);
        });
  
        companiesSection.style.display = 'block'; // Show the companies section
      })
      .catch(error => console.error('Error fetching companies:', error));
  }
  
  function fetchContractorsData() {
    fetch('http://localhost:5000/contractors')
      .then(response => response.json())
      .then(contractors => {
        const contractorsSection = document.getElementById('contractors-section');
        contractorsSection.innerHTML = ''; // Clear previous content
  
        contractors.forEach(contractor => {
          const contractorElement = document.createElement('div');
          contractorElement.innerHTML = `
            <div>Contractor ID: ${contractor._id}</div>
            <div>Contractor Name: ${contractor.ContractorName}</div>
            <div>Licence Number: ${contractor.LicenceNumber}</div>
            <div>Phone Number: ${contractor.PhoneNumber}</div>
            <div>Address: ${contractor.Address}</div>
            <div>City: ${contractor.City}</div>
            <div>State: ${contractor.State}</div>
            <hr>
          `;
          contractorsSection.appendChild(contractorElement);
        });
  
        contractorsSection.style.display = 'block'; // Show the contractors section
      })
      .catch(error => console.error('Error fetching contractors:', error));
  }
  