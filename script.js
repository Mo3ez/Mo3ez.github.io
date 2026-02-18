// script.js - Portfolio cyber d'Abdelmouez Amine

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

  // ----- 6. TERMINAL INTERACTIF (CORRIGÉ) -----
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (!terminalInput || !terminalBody) {
    console.error('Terminal elements not found!');
    return;
  }

  terminalInput.focus();

  // Structure du système de fichiers
  const root = {
    type: 'dir',
    content: {
      'README.md': { type: 'file', content: `# Abdelmouez Amine - Portfolio Cyber

Bienvenue dans mon terminal interactif. Il retrace mon parcours en cybersécurité.

Commandes utiles : help, ls, cd <dossier>, cat <fichier>, pwd, clear, date, whoami, tree` },
      'college': { type: 'dir', content: {
        'snt.txt': { type: 'file', content: 'Collège : spécialité SNT (Sciences Numériques et Technologie). Initiation à Scratch, logique algorithmique, premiers pas en programmation.' }
      } },
      'lycee': { type: 'dir', content: {
        'specialites.md': { type: 'file', content: 'Lycée : spécialités NSI (Numérique et Sciences Informatiques) et Mathématiques.\n- NSI : Python avancé (POO), SQL, HTML/CSS, algorithmique.\n- Maths : raisonnement logique, probabilités, modélisation.' }
      } },
      'bts': { type: 'dir', content: {
        'ciel_ir.txt': { type: 'file', content: `BTS CIEL option IR (Informatique et Réseaux) - Chemillé-en-Anjou (2024-2026)
- Python procédural et orienté objet
- HTML, CSS, JavaScript
- Administration Linux/Windows
- Supervision réseau, sécurité équipements Cisco (VLAN, routage, SSH, VPN)
- Bases de données : requêtes SQL, traitement Python` }
      } },
      'autodidacte': { type: 'dir', content: {
        'pentest.txt': { type: 'file', content: `Apprentissage autodidacte en cybersécurité (2025-)
- Mentorat avec ingénieur cybersécurité : pentesting, défense réseau, analyse de vulnérabilités
- Pratique Root-Me (350+ points) et CTF
- Home Lab (5 VMs) : Kali Linux, Metasploit, Nmap, Burp Suite, Wireshark, Gobuster, SQLMap, Hydra, Hashcat, Active Directory` }
      } },
      'esiea': { type: 'dir', content: {
        'cycle_ingenieur.txt': { type: 'file', content: 'École d\'ingénieurs ESIEA - Cycle ingénieur, 3e année (à partir de sept 2026)\nCampus de Paris - Spécialisation cybersécurité\nApproche projet et professionnalisation en alternance.' }
      } },
      'stage': { type: 'dir', content: {
        'iboo_technologies.txt': { type: 'file', content: `Stage Technicien Informatique et Réseaux - Iboo-Technologies (Mai 2025 – Juillet 2025)
- Configuration machines/environnements sécurisés (Intune, Azure, Windows)
- Audit sécurité réseau/système : détection vulnérabilités, analyse trafic
- Création campagne de phishing (Gophish)
- Développement scripts d'automatisation (PowerShell)
Environnement : Microsoft Intune, Azure, Windows Server, AD, Wireshark, Nmap, Burp Suite, Gobuster.` }
      } },
      'projets': { type: 'dir', content: {
        'sites_vitrines.txt': { type: 'file', content: 'Réalisation de sites vitrines pour des associations et petits commerces (HTML/CSS/JS).' },
        'passe_ton_hack.txt': { type: 'file', content: 'Participation à l\'événement "Passe ton hack d’abord" – initiation au hacking éthique.' }
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

    if (cmd.trim() === '13/06/2006') {
      printLine("La meilleur date au monde !!! #Twin's", '#ff69b4');
      return;
    }

    switch (command) {
      case 'help':
        printLine('Commandes disponibles :', '#ff3366');
        printLine('  ls                      - Liste le contenu');
        printLine('  cd <dossier>            - Change de dossier');
        printLine('  cat <fichier>           - Affiche un fichier');
        printLine('  pwd                     - Chemin courant');
        printLine('  clear                   - Efface le terminal');
        printLine('  whoami                   - Identité');
        printLine('  date                     - Date actuelle');
        printLine('  tree                     - Arborescence');
        printLine('  help                     - Cette aide');
        printLine('  13/06/2006               - Commande secrète');
        break;
      case 'ls':
        if (currentDir.type !== 'dir') {
          printLine('Erreur : pas un dossier.', '#ff3366');
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
            printLine('Erreur : pas un dossier.', '#ff3366');
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
          printLine('cat : manque fichier.', '#ff3366');
        } else {
          const filename = args[0];
          if (currentDir.type !== 'dir') {
            printLine('Erreur : pas un dossier.', '#ff3366');
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
        printLine('Abdelmouez Amine - Pentester / Red Team');
        break;
      case 'date':
        printLine(new Date().toString());
        break;
      case 'tree':
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
        printLine(`Commande inconnue: ${command}`, '#ff3366');
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
});
