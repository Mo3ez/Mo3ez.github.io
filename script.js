// script.js - Portfolio cyber d'Abdelmouez Amine (version finale)
document.addEventListener('DOMContentLoaded', () => {
  // ----- 1. CURSEUR PERSONNALISÉ -----
  const cursor = document.querySelector('.cursor');
  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
    const hoverables = document.querySelectorAll('a, button, .btn, .skill-card, .terminal, .nav-link');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else {
    cursor.style.display = 'none';
  }

  // ----- 2. FOND BINAIRE -----
  const canvas = document.getElementById('matrix');
  const ctx = canvas.getContext('2d');
  let width, height, columns, drops = [];
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
      const text = Math.random() > 0.5 ? '0' : '1';
      ctx.fillText(text, i * 20, drops[i] * 20);
      if (drops[i] * 20 > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(drawMatrix);
  }
  window.addEventListener('resize', initMatrix);
  initMatrix();
  drawMatrix();

  // ----- 3. ANIMATION AU SCROLL -----
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => observer.observe(section));

  // ----- 4. COMPTEUR DE STATISTIQUES -----
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsSection = document.getElementById('statistiques');
  let countingStarted = false;
  function startCounting() {
    if (countingStarted) return;
    countingStarted = true;
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      let current = 0;
      const increment = target / 60;
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
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounting();
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);

  // ----- 5. BOUTON TÉLÉCHARGER CV -----
  const downloadBtn = document.getElementById('download-cv');
  downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadBtn.classList.add('downloading');
    setTimeout(() => {
      downloadBtn.classList.remove('downloading');
      const link = document.createElement('a');
      link.href = 'assets/cv.pdf';
      link.download = 'CV_Abdelmouez_Amine.pdf';
      link.click();
    }, 300);
  });

  // ----- 6. TERMINAL INTERACTIF -----
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  if (!terminalInput || !terminalBody) {
    console.error('Terminal elements not found');
    return;
  }
  terminalInput.focus();

  // Structure du système de fichiers (simplifiée, tu pourras modifier les textes plus tard)
  const root = {
    type: 'dir',
    content: {
      'README.md': { type: 'file', content: `# Abdelmouez Amine - Portfolio Cyber

Bienvenue dans mon terminal interactif. Explore mon parcours avec les commandes ci-dessous.

Commandes de base :
- ls : lister le contenu du dossier courant
- cd <dossier> : changer de dossier
- cat <fichier> : afficher le contenu d'un fichier
- pwd : chemin courant
- clear : effacer le terminal
- whoami : afficher mon identité
- date : date actuelle
- tree : arborescence simplifiée

Pour remonter d'un dossier, utilise "cd ..".` },
      'college': { type: 'dir', content: {
        'snt.txt': { type: 'file', content: 'Au collège, j\'ai découvert l\'informatique avec la spécialité SNT. J\'ai appris les bases de la programmation avec Scratch et la logique algorithmique. Ça a éveillé ma curiosité pour le numérique.' }
      } },
      'lycee': { type: 'dir', content: {
        'specialites.md': { type: 'file', content: 'Au lycée, j\'ai choisi les spécialités NSI et Mathématiques. En NSI, j\'ai approfondi Python (POO), SQL, HTML/CSS et les algorithmes. Les maths m\'ont apporté une rigueur logique essentielle.' }
      } },
      'bts': { type: 'dir', content: {
        'ciel_ir.txt': { type: 'file', content: 'Mon BTS CIEL option IR à Chemillé-en-Anjou m\'a formé aux réseaux et à la cybersécurité. J\'y ai appris l\'administration Linux/Windows, la configuration Cisco, la supervision, et le développement Python.' }
      } },
      'autodidacte': { type: 'dir', content: {
        'pentest.txt': { type: 'file', content: 'En parallèle, je me forme en autodidacte avec un mentor ingénieur en cybersécurité. Je pratique sur Root-Me (350+ pts), participe à des CTF et monte un Home Lab avec Kali, Metasploit, Burp Suite, etc.' }
      } },
      'esiea': { type: 'dir', content: {
        'cycle_ingenieur.txt': { type: 'file', content: 'À partir de septembre 2026, j\'intégrerai l\'ESIEA à Paris pour un cycle ingénieur spécialisé en cybersécurité. Une formation par alternance qui me permettra de devenir pentester.' }
      } },
      'stage': { type: 'dir', content: {
        'iboo_technologies.txt': { type: 'file', content: 'Stage chez Iboo-Technologies (2025) : configuration d\'environnements sécurisés (Intune, Azure), audit réseau, création de campagne de phishing, scripts PowerShell. Une expérience concrète en entreprise.' }
      } },
      'projets': { type: 'dir', content: {
        'sites_vitrines.txt': { type: 'file', content: 'J\'ai réalisé des sites vitrines pour des associations et petits commerces en HTML/CSS/JS. Ça m\'a permis de comprendre les besoins clients et de livrer des projets concrets.' },
        'passe_ton_hack.txt': { type: 'file', content: 'Participation à l\'événement "Passe ton hack d’abord" : initiation au hacking éthique, premiers pas en cybersécurité offensive.' }
      } }
    }
  };

  let pathStack = [root];
  let currentDir = root;

  function printLine(text, color = '#00ff9d') {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.color = color;
    line.innerText = text;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function getPathString() {
    if (pathStack.length === 1) return '/';
    let path = '';
    for (let i = 1; i < pathStack.length; i++) {
      const parent = pathStack[i-1];
      const child = pathStack[i];
      const name = Object.keys(parent.content).find(key => parent.content[key] === child);
      path += '/' + name;
    }
    return path;
  }

  function processCommand(cmd) {
    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (command) {
      case 'help':
        printLine('Commandes disponibles :', '#ff3366');
        printLine('  ls                      - Liste le contenu du dossier courant');
        printLine('  cd <dossier>            - Change de dossier (ex: cd college)');
        printLine('  cat <fichier>           - Affiche le contenu d\'un fichier');
        printLine('  pwd                     - Affiche le chemin courant');
        printLine('  clear                   - Efface le terminal');
        printLine('  whoami                   - Affiche ton identité');
        printLine('  date                     - Affiche la date actuelle');
        printLine('  tree                     - Affiche l\'arborescence simplifiée');
        printLine('  help                     - Affiche cette aide');
        printLine('  Pour remonter : cd ..    - Retour au dossier parent');
        break;
      case 'ls':
        if (currentDir.type !== 'dir') {
          printLine('Erreur : ce n\'est pas un dossier.', '#ff3366');
        } else {
          const items = Object.keys(currentDir.content || {}).sort();
          if (items.length === 0) {
            printLine('(dossier vide)');
          } else {
            let output = '';
            items.forEach(item => {
              const type = currentDir.content[item].type;
              output += (type === 'dir' ? '📁 ' : '📄 ') + item + '   ';
            });
            printLine(output);
          }
        }
        break;
      case 'cd':
        if (args.length === 0) {
          pathStack = [root];
          currentDir = root;
          printLine('Retour à la racine.');
        } else if (args[0] === '..') {
          if (pathStack.length > 1) {
            pathStack.pop();
            currentDir = pathStack[pathStack.length - 1];
            printLine('Dossier parent.');
          } else {
            printLine('Déjà à la racine.');
          }
        } else {
          const target = args[0];
          if (currentDir.type !== 'dir') {
            printLine('Erreur : ce n\'est pas un dossier.', '#ff3366');
          } else if (currentDir.content[target] && currentDir.content[target].type === 'dir') {
            currentDir = currentDir.content[target];
            pathStack.push(currentDir);
            printLine(`Vous êtes dans ${getPathString()}`);
          } else {
            printLine(`Dossier '${target}' introuvable.`, '#ff3366');
          }
        }
        break;
      case 'cat':
        if (args.length === 0) {
          printLine('cat : argument manquant. Utilisation : cat <fichier>', '#ff3366');
        } else {
          const filename = args[0];
          if (currentDir.type !== 'dir') {
            printLine('Erreur : impossible de lire dans un fichier.', '#ff3366');
          } else if (currentDir.content[filename] && currentDir.content[filename].type === 'file') {
            printLine(currentDir.content[filename].content);
          } else {
            printLine(`Fichier '${filename}' introuvable.`, '#ff3366');
          }
        }
        break;
      case 'pwd':
        printLine(getPathString());
        break;
      case 'whoami':
        printLine('Abdelmouez Amine - Étudiant en cybersécurité, futur pentester Red Team');
        break;
      case 'date':
        printLine(new Date().toString());
        break;
      case 'tree':
        printLine('Arborescence simplifiée :');
        printLine('/');
        printLine('  ├── college/');
        printLine('  ├── lycee/');
        printLine('  ├── bts/');
        printLine('  ├── autodidacte/');
        printLine('  ├── esiea/');
        printLine('  ├── stage/');
        printLine('  ├── projets/');
        printLine('  └── README.md');
        break;
      case 'clear':
        terminalBody.innerHTML = '';
        break;
      default:
        printLine(`Commande inconnue : ${command}. Tapez 'help' pour la liste.`, '#ff3366');
    }
  }

  // Message d'accueil
  printLine('Bienvenue dans le terminal interactif d\'Abdelmouez.', '#00ff9d');
  printLine('Tapez "help" pour voir les commandes disponibles.', '#00ff9d');
  printLine('$ _', '#00ff9d');

  // Gestion de l'entrée
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const input = terminalInput.value.trim();
      if (input === '') return;

      const cmdLine = document.createElement('div');
      cmdLine.className = 'line';
      cmdLine.innerHTML = `<span style="color:#ff3366;">$</span> ${input}`;
      terminalBody.appendChild(cmdLine);

      processCommand(input);

      const promptLine = document.createElement('div');
      promptLine.className = 'line';
      promptLine.innerHTML = '$ <span class="cursor-blink">_</span>';
      terminalBody.appendChild(promptLine);

      terminalBody.scrollTop = terminalBody.scrollHeight;
      terminalInput.value = '';
    }
  });

  terminalInput.addEventListener('blur', () => {
    setTimeout(() => terminalInput.focus(), 10);
  });

  // ----- 7. SMOOTH SCROLL -----
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // S'assurer que la page est en haut au chargement (si jamais il y a un fragment dans l'URL)
  if (window.location.hash) {
    window.scrollTo(0, 0);
  }
});
