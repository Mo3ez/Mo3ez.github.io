// script.js - Animations, curseur, matrix, stats, terminal interactif

document.addEventListener('DOMContentLoaded', () => {
  // ----- 1. CURSEUR PERSONNALISÉ (desktop) -----
  const cursor = document.querySelector('.cursor');
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    // Effet hover sur les éléments cliquables
    const hoverables = document.querySelectorAll('a, button, .btn, .skill-card, .terminal, .nav-link');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else {
    cursor.style.display = 'none';
  }

  // ----- 2. FOND MATRIX (canvas) -----
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');

  let width, height;
  let columns, drops = [];

  function initMatrix() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    columns = Math.floor(width / 20);
    drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -height);
    }
  }

  function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 12, 15, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0f0';
    ctx.font = '15px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(0x30A0 + Math.random() * 96);
      ctx.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
  }

  window.addEventListener('resize', () => {
    initMatrix();
  });

  initMatrix();
  drawMatrix();

  // ----- 3. ANIMATION AU SCROLL (Intersection Observer) -----
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));

  // ----- 4. COMPTEUR DE STATISTIQUES ANIMÉ -----
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.getElementById('statistiques');
  let countingStarted = false;

  function startCounting() {
    if (countingStarted) return;
    countingStarted = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      const increment = target / 60; // 60 fps environ
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          stat.innerText = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          stat.innerText = target + (target === 350 ? '+' : '');
        }
      };
      updateCounter();
    });
  }

  // Observer pour déclencher le compteur quand la section stats devient visible
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);

  // ----- 5. BOUTON TÉLÉCHARGER CV AVEC ANIMATION -----
  const downloadBtn = document.getElementById('download-cv');
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadBtn.classList.add('downloading');
    setTimeout(() => {
      downloadBtn.classList.remove('downloading');
      // Simuler le téléchargement (lien réel vers assets/cv.pdf)
      const link = document.createElement('a');
      link.href = 'assets/cv.pdf';
      link.download = 'CV_Abdelmouez_Amine.pdf';
      link.click();
    }, 300);
  });

  // ----- 6. TERMINAL INTERACTIF (expériences) -----
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  // Commandes disponibles
  const commands = {
    help: () => {
      return `Commandes disponibles:
  help     → Affiche cette aide
  experience → Détail des expériences
  skills   → Liste des compétences techniques
  clear    → Efface le terminal`;
    },
    experience: () => {
      return `[Stage] Iboo-Technologies (2025)
  - Tests d'intrusion web (OWASP Top 10)
  - Rédaction de rapports pour clients
  - Développement d'outils Python (automatisation)
[Pratique] Root-Me (350+ points), HackTheBox, TryHackMe
[Home Lab] 5 VMs : Active Directory, Linux, SIEM Wazuh, pare-feu`;
    },
    skills: () => {
      return `Compétences techniques:
  Python • HTML/CSS/JS • Réseaux • Linux/Windows
  Active Directory • Pentesting • Analyse vulnérabilités • Automatisation`;
    },
    clear: () => {
      terminalBody.innerHTML = ''; // Efface tout
      return null; // pas de sortie supplémentaire
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const input = terminalInput.value.trim().toLowerCase();
      if (input === '') return;

      // Afficher la commande tapée
      const cmdLine = document.createElement('div');
      cmdLine.className = 'line';
      cmdLine.innerHTML = `<span style="color:#ff3366;">$</span> ${input}`;
      terminalBody.appendChild(cmdLine);

      // Traitement de la commande
      let output = '';
      if (commands[input]) {
        output = commands[input]();
        if (input === 'clear') {
          terminalBody.innerHTML = ''; // déjà géré
          terminalInput.value = '';
          return;
        }
      } else {
        output = `Commande inconnue: ${input}. Tapez 'help' pour la liste.`;
      }

      // Afficher la sortie
      if (output) {
        const outputLine = document.createElement('div');
        outputLine.className = 'line';
        outputLine.style.color = '#00ff9d';
        outputLine.innerText = output;
        terminalBody.appendChild(outputLine);
      }

      // Remettre l'invite de commande
      const promptLine = document.createElement('div');
      promptLine.className = 'line';
      promptLine.innerHTML = '$ <span class="cursor-blink">_</span>';
      terminalBody.appendChild(promptLine);

      // Scroll automatique vers le bas
      terminalBody.scrollTop = terminalBody.scrollHeight;

      // Effacer l'input
      terminalInput.value = '';
    }
  });

  // ----- 7. SMOOTH SCROLL POUR LA NAVIGATION -----
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1); // enlève #
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ----- 8. PETIT EFFET GLITCH SUPPLÉMENTAIRE SUR LE TITRE (optionnel) -----
  setInterval(() => {
    const glitch = document.querySelector('.glitch');
    if (glitch) {
      glitch.style.animation = 'none';
      glitch.offsetHeight; // force reflow
      glitch.style.animation = 'glitch-skew 4s infinite linear alternate-reverse';
    }
  }, 10000); // réinitialise l'animation toutes les 10s pour un effet aléatoire
});
