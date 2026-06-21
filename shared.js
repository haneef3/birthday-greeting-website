/* ─── DEFAULT CONFIGURATION ────────────────── */
const DEFAULT_CONFIG = {
  name: "hannu",
  age: 11,
  ageSuffix: "st",
  birthdayDate: "11-06-2015",
  heroSubtext: "Today the world became a brighter place — because you're in it. Wishing you the most magical birthday! 🌟",
  message: `Every memory we've made together is a treasure I keep close to my heart.
You light up every room you walk into, and the world is genuinely better because you're in it.

On this very special day, I want you to feel every ounce of love and joy that you deserve. Happy Birthday — here's to you, and to all the beautiful things still to come.`,
  messageSig: "-- With all my love 🌹",
  musicTitle: "Happy Birthday Chimes",
  musicArtist: "Synthesized Music Box",
  theme: "rose",
  wishes: [
    { icon: "🌸", text: "To my amazing sister: May your smile shine brighter than ever this year. Happy Birthday! ❤️", author: "— By Ishaan", color: "black" },
    { icon: "🌊", text: "Watching you grow has been the greatest gift of my life. Wishing you endless happiness, success, and love on your special day.", author: "— By Dad", color: "#4169E1" },
    { icon: "🍀", text: "You are my greatest blessing and my biggest source of happiness. I love you more than words can ever express. Have a beautiful birthday!", author: "— By Mom", color: "#DC143C" },
    { icon: "✨", text: "Happy Birthday to my precious granddaughter! You bring so much joy, love, and happiness into our lives. May your day be filled with laughter, fun, and all your favorite things", author: "— By GrandPa&GrandMa ❤️", color: "gold" },
    { icon: "🎯", text: "I am lucky to have a sister like you. Thank you for always being kind to me. I love you and hope you have the best birthday ever!", author: "— By Arhaan", color: "pink" },
    { icon: "🎊", text: "Celebrate your special day with joy and laughter!", author: "— By Tulya", color: "#4B0082" },
    { icon: "", text: "May your birthday be the beginning of a year filled with success, love, and happiness!", author: "— By Atta", color: "#4B0082" }
  ],
  timeline: [
  { year: "2015", icon: "🎂", title: "The First Chapter Begins", desc: "The day everything changed — you arrived and stole everyone's hearts." },

  { year: "2018", icon: "🎒", title: "First Day of School", desc: "Armed with a tiny backpack and even tinier shoes — ready to conquer." },

  { year: "2020", icon: "🧸", title: "Sweet Childhood Days", desc: "Days filled with toys, giggles, bedtime stories, and endless cuddles." },

  { year: "2022", icon: "🌈", title: "Spreading Smiles", desc: "Your laughter became the sunshine that brightened every family gathering." },

  { year: "2024", icon: "💖", title: "A Heart Full of Kindness", desc: "Growing into a thoughtful and caring young girl who makes everyone proud." },

  { year: "2026", icon: "✨", title: "11 & Amazing", desc: "Today we celebrate 11 years of joy, love, and countless precious memories. Happy Birthday! 🎉" }
],
  photos: [
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg",
    "pic6.jpg",
    "pic7.jpg",
    "pic77.jpg",
    "pic8.jpg"
  ]
};

// Load saved config from localStorage when available so uploads persist across pages
let activeConfig;
try {
  activeConfig = JSON.parse(localStorage.getItem('bday_config')) || DEFAULT_CONFIG;
} catch (err) {
  activeConfig = DEFAULT_CONFIG;
}

// Ensure there is a photos array; don't overwrite existing user photos
if (!activeConfig.photos || !Array.isArray(activeConfig.photos) || activeConfig.photos.length === 0) {
  activeConfig.photos = DEFAULT_CONFIG.photos.slice();
}

// Ensure wishes are populated — merge defaults if saved config has empty or missing entries
if (!activeConfig.wishes || !Array.isArray(activeConfig.wishes) || activeConfig.wishes.length === 0) {
  activeConfig.wishes = DEFAULT_CONFIG.wishes.map(w => Object.assign({}, w));
} else {
  DEFAULT_CONFIG.wishes.forEach((w, i) => {
    if (!activeConfig.wishes[i]) {
      activeConfig.wishes[i] = Object.assign({}, w);
    } else {
      if (!activeConfig.wishes[i].text || activeConfig.wishes[i].text.trim() === "") {
        activeConfig.wishes[i].text = w.text;
      }
      if (!activeConfig.wishes[i].icon) activeConfig.wishes[i].icon = w.icon;
      if (!activeConfig.wishes[i].author) activeConfig.wishes[i].author = w.author;
      if (!activeConfig.wishes[i].color) activeConfig.wishes[i].color = w.color;
    }
  });
  // Persist merged changes so the UI reflects them immediately
  try { localStorage.setItem('bday_config', JSON.stringify(activeConfig)); } catch (e) { /* ignore storage errors */ }
}

function saveConfig() {
  localStorage.setItem('bday_config', JSON.stringify(activeConfig));
}

function applyTheme(themeName) {
  document.documentElement.setAttribute('data-theme', themeName || 'rose');
}

// Apply theme instantly on load
applyTheme(activeConfig.theme);

/* ─────────────────────────────────────
   SMOOTH CURSOR LERP
   ───────────────────────────────────── */
function initCursor() {
  const cur = document.getElementById("cursor");
  const trail = document.getElementById("cursor-trail");
  if (!cur || !trail) return;

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let curX = mouseX, curY = mouseY;
  let trailX = mouseX, trailY = mouseY;

  document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function tickCursor() {
    curX += (mouseX - curX) * 0.25;
    curY += (mouseY - curY) * 0.25;
    trailX += (mouseX - trailX) * 0.08;
    trailY += (mouseY - trailY) * 0.08;

    cur.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
    trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(tickCursor);
  }
  requestAnimationFrame(tickCursor);

  // Hover effects
  document.addEventListener('mouseover', e => {
    if (e.target.closest('button, a, .wish-card, .polaroid-card, .cake, .gift-box, .ctrl-btn, .theme-opt, .color-btn, .icon-btn, .customizer-toggle, .digit-input, input, textarea, select')) {
      trail.style.width = '52px';
      trail.style.height = '52px';
      trail.style.borderColor = 'var(--primary)';
      trail.style.background = 'rgba(255, 79, 123, 0.08)';
      cur.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }
  });

  document.addEventListener('mouseout', e => {
    if (e.target.closest('button, a, .wish-card, .polaroid-card, .cake, .gift-box, .ctrl-btn, .theme-opt, .color-btn, .icon-btn, .customizer-toggle, .digit-input, input, textarea, select')) {
      trail.style.width = '36px';
      trail.style.height = '36px';
      trail.style.borderColor = 'var(--secondary)';
      trail.style.background = 'none';
      cur.style.transform = 'translate(-50%, -50%) scale(1)';
    }
  });

  document.addEventListener("mouseleave", () => {
    cur.style.opacity = 0;
    trail.style.opacity = 0;
  });
  document.addEventListener("mouseenter", () => {
    cur.style.opacity = 1;
    trail.style.opacity = 0.6;
  });
}

/* ─────────────────────────────────────
   BACKGROUND CANVAS PARTICLES
   ───────────────────────────────────── */
function initBackgroundCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  let fireworks = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  function Particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.r = Math.random() * 2.5 + .5;
    this.vx = (Math.random() - .5) * .3;
    this.vy = (Math.random() - .5) * .3;
    this.c = ["#ff4f7b", "#ffd166", "#c77dff", "#ff9b6a"][Math.floor(Math.random() * 4)];
    this.a = Math.random() * .5 + .1;
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  window.createFirework = function (x, y) {
    const count = 60;
    const colors = ["#ff4f7b", "#ffd166", "#ff9b6a", "#c77dff", "#00ffff", "#ff007f", "#39ff14"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      fireworks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: color,
        r: Math.random() * 2 + 1
      });
    }
  };

  (function animBG() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background particles
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c; ctx.globalAlpha = p.a; ctx.fill();
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });

    // Active fireworks particles
    fireworks.forEach((f, idx) => {
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = f.color; ctx.globalAlpha = f.alpha; ctx.fill();
      f.x += f.vx;
      f.y += f.vy;
      f.vy += 0.04; // gravity
      f.alpha -= 0.012;

      if (f.alpha <= 0) {
        fireworks.splice(idx, 1);
      }
    });

    requestAnimationFrame(animBG);
  })();
}

/* ─────────────────────────────────────
   CONFETTI BURST EFFECT
   ───────────────────────────────────── */
function launchConfetti() {
  const colors = ["#ff4f7b", "#ffd166", "#c77dff", "#ff9b6a", "#fff", "#7dd3fc", "#52b788", "#ff007f"];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement("div");
    p.className = "confetti-piece";
    p.style.cssText = `
      left: ${Math.random() * 100}vw;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      --tx: ${(Math.random() - 0.5) * 350}px;
      animation-duration: ${1.2 + Math.random() * 1.6}s;
      animation-delay: ${Math.random() * .3}s;
      transform: rotate(${Math.random() * 360}deg);
      width: ${4 + Math.random() * 6}px;
      height: ${7 + Math.random() * 9}px;
    `;
    document.body.appendChild(p);
    p.addEventListener("animationend", () => p.remove());
  }
}

/* ─────────────────────────────────────
   WEB AUDIO API SYNTHESIZER
   ───────────────────────────────────── */
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playBlowSound() {
  initAudio();
  if (!audioCtx) return;
  const startTime = audioCtx.currentTime;

  // White noise blast for puff sound
  const bufferSize = audioCtx.sampleRate * 0.12;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = buffer;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(450, startTime);
  filter.Q.setValueAtTime(2.5, startTime);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.08, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.11);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  noise.start(startTime);
  noise.stop(startTime + 0.12);
}

function playSuccessChime() {
  initAudio();
  if (!audioCtx) return;
  const startTime = audioCtx.currentTime;

  // Success Arpeggio: C5 -> E5 -> G5 -> C6
  const tones = [523.25, 659.25, 783.99, 1046.50];
  tones.forEach((freq, idx) => {
    const time = startTime + idx * 0.12;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(time);
    osc.stop(time + 0.35);
  });
}

// Initial calls on DOM content loaded
document.addEventListener("DOMContentLoaded", () => {
  initCursor();
  initBackgroundCanvas();
});
