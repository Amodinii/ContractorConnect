let AccountButton = document.getElementById("Account");
let joinNowBtn = document.getElementById("joinNowBtn");
let joinDropdown = document.getElementById("joinDropdown");

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

//POP UP CARD FOR REGISTERING/SIGNING IN
// Function to show the pop-up
function showPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Function to close the pop-up
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Setting timeout to show the pop-up after 1 minute
setTimeout(showPopup, 60000); // 1 minute in milliseconds

// Add this JavaScript function to toggle the dropdown
function toggleJoinDropdown() {
    var dropdown = document.getElementById("joinDropdown");
    dropdown.classList.toggle("show");
}

// Add this JavaScript to close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('#joinNowBtn')) {
        var dropdowns = document.getElementsByClassName("joinDropdown");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
window.onscroll = function() {
    var joinNowBtn = document.getElementById("joinNowBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        joinNowBtn.style.display = "none";
    } else {
        joinNowBtn.style.display = "block";
    }
}

// Add this JavaScript to show/hide the dropdown on hover


joinNowBtn.addEventListener("mouseover", function() {
    joinDropdown.classList.add("show");
});

joinNowBtn.addEventListener("mouseout", function() {
    joinDropdown.classList.remove("show");
});

joinDropdown.addEventListener("mouseover", function() {
    joinDropdown.classList.add("show");
});

joinDropdown.addEventListener("mouseout", function() {
    joinDropdown.classList.remove("show");
});


