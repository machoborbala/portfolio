const images = ["img/branding.svg", "img/logos.svg", "img/social_media.svg"];
const backgrounds = ["#DCD0C4", "#E7E7E7", "#F9F5C6"];

let current = 0;

function showImage(idx) {
  const img = new Image();
  img.onload = function() {
    document.getElementById("gallery-img").src = images[idx];
    document.getElementById("gallery-container").style.backgroundColor = backgrounds[idx];
  };
  img.src = images[idx];

  document.querySelectorAll(".circle").forEach((circle, i) => {
    circle.classList.toggle("active", i === idx);
  });
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  showImage(current);
}

function nextImage() {
  current = (current + 1) % images.length;
  showImage(current);
}

document.querySelectorAll(".circle").forEach(circle => {
  circle.addEventListener("click", () => {
    current = parseInt(circle.dataset.index);
    showImage(current);
  });
});

showImage(current);