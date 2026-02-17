// Curseur animé
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// Animation téléchargement CV
const downloadBtn = document.querySelector(".download-btn");

downloadBtn.addEventListener("click", () => {
  downloadBtn.innerText = "Téléchargement...";
  downloadBtn.style.background = "#00ff88";
  downloadBtn.style.color = "#000";

  setTimeout(() => {
    downloadBtn.innerText = "Téléchargé ✔";
  }, 1500);
});
