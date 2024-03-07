let AccountButton = document.getElementById("Account");
AccountButton.addEventListener("click", () => {
    var dropdown = document.getElementsByClassName("AccountDrop")[0];
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});

// AUTOMATIC NAVIGATION OF IMAGE SLIDER
let counter = 1;

setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    console.log('Counter: ' + counter);
    counter++;
    if(counter > 5) {
        counter = 1; //Reset counter
    }
}, 5000);

