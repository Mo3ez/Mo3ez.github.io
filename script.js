// script.js - Animations, curseur, matrix binaire, stats, terminal interactif enrichi
console.log("✅ script.js chargé");
console.log("terminalInput :", document.getElementById('terminal-input'));
console.log("terminalBody :", document.getElementById('terminal-body'));
document.addEventListener('DOMContentLoaded', () => {
  // ----- 1. CURSEUR PERSONNALISÉ (desktop) -----
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

  // ----- 2. FOND BINAIRE (0 et 1) -----
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
      // Remplacer les caractères par des 0 et 1 aléatoires
      const text = Math.random() > 0.5 ? '0' : '1';
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

  // ----- 5. BOUTON TÉLÉCHARGER CV AVEC ANIMATION -----
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

// ----- 6. TERMINAL INTERACTIF AVANCÉ (VERSION FINALE CORRIGÉE) -----
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body'); // <-- correction ici

// Donne le focus à l'input au chargement
terminalInput.focus();

// Structure du système de fichiers (root)
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

// Pile pour gérer le chemin courant (on commence à la racine)
let pathStack = [root];
let currentDir = root;

// Fonction pour afficher une ligne dans le terminal
function printLine(text, color = '#00ff9d') {
  const line = document.createElement('div');
  line.className = 'line';
  line.style.color = color;
  line.innerText = text;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Fonction pour afficher du HTML
function printHTML(html) {
  const line = document.createElement('div');
  line.className = 'line';
  line.innerHTML = html;
  terminalBody.appendChild(line);
  terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Fonction pour obtenir le chemin sous forme de chaîne (pour pwd)
function getPathString() {
  if (pathStack.length === 1) return '/';
  let path = '';
  for (let i = 1; i < pathStack.length; i++) {
    // retrouver le nom du dossier à partir du parent
    const parent = pathStack[i-1];
    const child = pathStack[i];
    const name = Object.keys(parent.content).find(key => parent.content[key] === child);
    path += '/' + name;
  }
  return path;
}

// Traitement des commandes
function processCommand(cmd) {
  const parts = cmd.trim().split(' ');
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  // Commande secrète
  if (cmd.trim() === '13/06/2006') {
    printLine("La meilleur date au monde !!! #Twin's", '#ff69b4');
    return;
  }

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
      printLine('  13/06/2006               - Commande secrète ;)');
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
        // Retour à la racine
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
          printLine(`Vous êtes maintenant dans ${getPathString()}`);
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
      printLine('Abdelmouez Amine - Aspiring Pentester / Red Team');
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

// Écouteur d'événement pour l'input
terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = terminalInput.value.trim();
    if (input === '') return;

    // Afficher la commande tapée
    const cmdLine = document.createElement('div');
    cmdLine.className = 'line';
    cmdLine.innerHTML = `<span style="color:#ff3366;">$</span> ${input}`;
    terminalBody.appendChild(cmdLine);

    // Traiter la commande
    processCommand(input);

    // Ajouter une nouvelle invite (même après clear, car clear vide tout et on veut une invite)
    const promptLine = document.createElement('div');
    promptLine.className = 'line';
    promptLine.innerHTML = '$ <span class="cursor-blink">_</span>';
    terminalBody.appendChild(promptLine);

    // Scroll auto
    terminalBody.scrollTop = terminalBody.scrollHeight;

    // Effacer l'input
    terminalInput.value = '';
  }
});

// Pour éviter la perte de focus, on le remet si on clique ailleurs
terminalInput.addEventListener('blur', () => {
  setTimeout(() => terminalInput.focus(), 10);
});
