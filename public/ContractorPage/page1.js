let AccountButton = document.getElementById("Account");
AccountButton.addEventListener("click", () => {
  var dropdown = document.getElementsByClassName("AccountDrop")[0];
  dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});
