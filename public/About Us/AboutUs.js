document.querySelectorAll(".image-container").forEach((container) => {
  container.addEventListener("click", () => {
    const options = container.nextElementSibling;
    options.classList.toggle("show");
  });
});
