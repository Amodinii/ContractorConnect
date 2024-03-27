let AccountButton = document.getElementById("Account");
AccountButton.addEventListener("click", () => {
    var dropdown = document.getElementsByClassName("AccountDrop")[0];
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});

function toggleOptions(container) {
    var options = container.querySelector('.options');
    options.classList.toggle('show');
}

// Get all image containers
var imageContainers = document.querySelectorAll('.image-container');

// Add click event listener to each image container
imageContainers.forEach(function(container) {
    container.addEventListener('click', function() {
        toggleOptions(container);
    });
})
