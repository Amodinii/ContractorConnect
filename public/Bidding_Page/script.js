window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bidding-form');
    const paymentButton = document.getElementById('make-payment');
  
    // Simulated data for quotations
    const quotations = [
      { id: 1, vendor: 'Vendor 1', description: 'Lorem ipsum dolor sit amet.' },
      { id: 2, vendor: 'Vendor 2', description: 'Nulla facilisi. Sed euismod erat.' },
      { id: 3, vendor: 'Vendor 3', description: 'Vestibulum eu mauris a risus.' },
      { id: 4, vendor: 'Vendor 4', description: 'Lorem ipsum dolor sit amet.' },
      { id: 5, vendor: 'Vendor 5', description: 'Nulla facilisi. Sed euismod erat.' },
    ];
  
    // Function to generate HTML for quotations
    const generateQuotationHTML = (quotation) => {
      return `
        <div class="quotation">
          <h3>${quotation.vendor}</h3>
          <p><strong>Description:</strong> ${quotation.description}</p>
          <input type="radio" id="quotation${quotation.id}" name="quotation" value="${quotation.vendor}">
          <label for="quotation${quotation.id}">Select</label>
        </div>
      `;
    };
  
    // Function to display quotations
    const displayQuotations = () => {
      const quotationsContainer = document.createElement('div');
      quotations.forEach(quotation => {
        quotationsContainer.innerHTML += generateQuotationHTML(quotation);
      });
      form.insertBefore(quotationsContainer, form.children[form.children.length - 2]);
    };
  
    displayQuotations();
  
    // Function to handle payment submission
    const makePayment = () => {
      const selectedQuotation = document.querySelector('input[name="quotation"]:checked');
      const amountInput = document.getElementById('amount');
  
      if (!selectedQuotation) {
        alert('Please select a quotation.');
        return;
      }
  
      const amount = parseFloat(amountInput.value);
  
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
      }
  
      // Redirect to payment page
      window.location.href = 'payment.html'; // Replace 'payment.html' with the actual URL of your payment page
    };
  
    // Event listener for Make Payment button
    paymentButton.addEventListener('click', makePayment);
  });
  