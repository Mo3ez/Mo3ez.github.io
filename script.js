// Curseur custom seulement sur desktop
if (window.innerWidth > 768) {
  const cursor = document.querySelector(".cursor");

  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
} else {
  document.querySelector(".cursor").style.display = "none";
}

// Animation bouton CV
const btn = document.querySelector(".download-btn");

btn.addEventListener("click", () => {
  btn.innerText = "Téléchargement...";
  setTimeout(() => {
    btn.innerText = "Téléchargé ✔";
  }, 1500);
});
