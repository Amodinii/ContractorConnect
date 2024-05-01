// Check if token exists
if (token) {
    // Fetch user details with JWT token
    fetch('/contactor/userdetails', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Set cookie here
        setCookie("jwtToken", token, 1); // Set expiration to 1 day
        return response.json();
    })
    .then(data => {
        console.log(data.ContractorName);
        const contractorName = data.ContractorName;
        const userProfileUsername = document.querySelector('#username');
        if (userProfileUsername) {
            userProfileUsername.textContent = contractorName;
        }
        const tenderIds = data.tenders;
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });
} else {
    console.error('JWT token not found in localStorage');
}
