let AccountButton = document.getElementById("Account");
AccountButton.addEventListener("click", () => {
  var dropdown = document.getElementsByClassName("AccountDrop")[0];
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});

// AUTOMATIC NAVIGATION OF IMAGE SLIDER
let counter = 1;

setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  console.log("Counter: " + counter);
  counter++;
  if (counter > 5) {
    counter = 1; //Reset counter
  }
}, 5000);

//POP UP CARD FOR REGISTERING/SIGNING IN
// Function to show the pop-up
function showPopup() {
  document.getElementById("popup").style.display = "block";
}

// Function to close the pop-up
function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// Setting timeout to show the pop-up after 1 minute
setTimeout(showPopup, 60000); // 1 minute in milliseconds
