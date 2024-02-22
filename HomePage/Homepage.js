let scrollContainer = document.querySelector(".gallery");
let backButton = document.getElementById("back");
let frontButton = document.getElementById("front");
let imageWidth = scrollContainer.querySelector("img").clientWidth;

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