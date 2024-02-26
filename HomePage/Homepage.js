let scrollContainer = document.querySelector(".gallery");
let backButton = document.getElementById("back");
let frontButton = document.getElementById("front");
let imageWidth = scrollContainer.querySelector("img").clientWidth;
let AccountButton = document.getElementById("Account");

scrollContainer.addEventListener("wheel",(evt)=>{
    evt.preventDefault();
    let scrollAmount = evt.deltaY > 0 ? imageWidth : -imageWidth;
    scrollContainer.scrollLeft += scrollAmount;
});

frontButton.addEventListener("click",()=>{
    scrollContainer.scrollLeft+= imageWidth;
});

backButton.addEventListener("click",()=>{
    scrollContainer.scrollLeft-= imageWidth;
});
AccountButton.addEventListener("click", () => {
    var dropdown = document.getElementsByClassName("AccountDrop")[0];
    dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});