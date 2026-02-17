function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    if(section.id === sectionId) {
      section.classList.remove('hidden');
      section.scrollIntoView({behavior: 'smooth'});
    } else {
      section.classList.add('hidden');
    }
  });
}

// Reset tout
function resetPortfolio() {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => section.classList.add('hidden'));
  window.scrollTo({top: 0, behavior: 'smooth'});
}
