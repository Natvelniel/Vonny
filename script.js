/**
 * VONNY'S LOVE SURPRISE - CLIENT APPLICATION
 * Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------
  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const screen3 = document.getElementById('screen3');

  const btnS1Yes = document.getElementById('btnS1Yes');
  const btnS1No = document.getElementById('btnS1No');

  const btnS2Yes = document.getElementById('btnS2Yes');
  const btnS2No = document.getElementById('btnS2No');
  const escapeContainer = document.getElementById('escapeContainer');
  const escapeA11yMessage = document.getElementById('escapeA11yMessage');

  const balloonCanvas = document.getElementById('balloonCanvas');
  const giftStage = document.getElementById('giftStage');
  const giftBox = document.getElementById('giftBox');
  const scrapbookGallery = document.getElementById('scrapbookGallery');
  const polaroidItems = document.querySelectorAll('.polaroid-item');
  const loveMessageContainer = document.getElementById('loveMessageContainer');
  const btnReplay = document.getElementById('btnReplay');

  const photoModal = document.getElementById('photoModal');
  const modalImg = document.getElementById('modalImg');
  const modalCaption = document.getElementById('modalCaption');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const ambientBg = document.getElementById('ambientBg');
  const audioToggle = document.getElementById('audioToggle');

  // Evasion phrases to cycle through
  const evasionPhrases = [
    "Choose wisely, hehe.",
    "Oops! Too slow! 😜",
    "Nope, can't click me! 💕",
    "Are you sure? Try YES! ❤️",
    "Nice try, hehe! ✨",
    "Still not an option! 🥰",
    "Almost had it... not! 🏃‍♀️",
    "YES is right there! 👉💖"
  ];
  let evasionCount = 0;
  let isEvadingDetached = false;

  // -------------------------------------------------------------
  // Ambient Particle Background (Hearts & Sparkles)
  // -------------------------------------------------------------
  function createAmbientParticles(count = 18) {
    if (!ambientBg) return;
    ambientBg.innerHTML = '';
    const symbols = ['♡', '♥', '✨', '🌸', '🌷', '✧'];
    const colors = ['#F4B8C5', '#C46D82', '#BE185D', '#FCD5CE', '#E87A90'];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'ambient-particle';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      
      const left = Math.random() * 96;
      const duration = 10 + Math.random() * 14;
      const delay = Math.random() * 12;
      const size = 0.9 + Math.random() * 1.1;
      const drift = -40 + Math.random() * 80;
      const rot = -45 + Math.random() * 90;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.left = `${left}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.fontSize = `${size}rem`;
      particle.style.color = color;
      particle.style.setProperty('--drift-x', `${drift}px`);
      particle.style.setProperty('--rot', `${rot}deg`);

      ambientBg.appendChild(particle);
    }
  }

  createAmbientParticles(20);

  // -------------------------------------------------------------
  // Screen 1: Interactions
  // -------------------------------------------------------------
  btnS1Yes.addEventListener('click', () => {
    transitionScreens(screen1, screen2);
  });

  btnS1No.addEventListener('click', () => {
    // Exact redirect destination required by specifications
    window.location.href = 'https://youtu.be/ZRQImzbEnPU';
  });

  // -------------------------------------------------------------
  // Screen Transition Helper
  // -------------------------------------------------------------
  function transitionScreens(fromScreen, toScreen, callback) {
    fromScreen.classList.remove('active');
    fromScreen.classList.add('hidden');

    setTimeout(() => {
      toScreen.classList.remove('hidden');
      toScreen.classList.add('active');
      if (typeof callback === 'function') {
        callback();
      }
    }, 450);
  }

  // -------------------------------------------------------------
  // Screen 2: Evasive "NO" Button Logic
  // -------------------------------------------------------------
  function moveNoButton(event) {
    const noBtn = btnS2No;
    const yesBtn = btnS2Yes;
    const card = screen2.querySelector('.card');
    if (!noBtn || !yesBtn || !card) return;

    evasionCount++;
    const phraseIndex = evasionCount % evasionPhrases.length;
    if (escapeA11yMessage) {
      escapeA11yMessage.textContent = evasionPhrases[phraseIndex];
    }

    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    const btnRect = noBtn.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const padding = 24;
    const btnW = btnRect.width || 120;
    const btnH = btnRect.height || 50;

    const minX = padding;
    const maxX = Math.max(minX, viewportW - btnW - padding);
    const minY = padding;
    const maxY = Math.max(minY, viewportH - btnH - padding);

    // Detach to document.body on first evasion to break free from card's backdrop-filter containing block
    if (!isEvadingDetached) {
      const curX = btnRect.left;
      const curY = btnRect.top;
      document.body.appendChild(noBtn);
      noBtn.classList.add('is-evading');
      noBtn.style.position = 'fixed';
      noBtn.style.left = `${curX}px`;
      noBtn.style.top = `${curY}px`;
      isEvadingDetached = true;
      void noBtn.offsetWidth; // Force reflow
    }

    // Pointer coordinates
    let ptrX = viewportW / 2;
    let ptrY = viewportH / 2;
    if (event && (event.clientX || event.touches)) {
      if (event.touches && event.touches.length > 0) {
        ptrX = event.touches[0].clientX;
        ptrY = event.touches[0].clientY;
      } else if (typeof event.clientX === 'number') {
        ptrX = event.clientX;
        ptrY = event.clientY;
      }
    }

    // Find a target location that avoids overlapping the card and stays away from the pointer
    let targetX = minX;
    let targetY = minY;
    let found = false;
    let attempts = 0;

    // Check if external screen space exists
    const hasSpace = (cardRect.left > btnW + 40) || ((viewportW - cardRect.right) > btnW + 40) ||
                     (cardRect.top > btnH + 40) || ((viewportH - cardRect.bottom) > btnH + 40);

    while (!found && attempts < 30) {
      attempts++;
      targetX = minX + Math.random() * (maxX - minX);
      targetY = minY + Math.random() * (maxY - minY);

      const distToPtr = Math.hypot(targetX - ptrX, targetY - ptrY);

      if (hasSpace) {
        // Do not overlap the card
        const overlapsCard = (
          targetX < cardRect.right + 20 &&
          targetX + btnW > cardRect.left - 20 &&
          targetY < cardRect.bottom + 20 &&
          targetY + btnH > cardRect.top - 20
        );
        if (!overlapsCard && distToPtr > 100) {
          found = true;
        }
      } else {
        // Fallback for compact viewports: avoid YES button
        const yesRect = yesBtn.getBoundingClientRect();
        const overlapsYes = (
          targetX < yesRect.right + 25 &&
          targetX + btnW > yesRect.left - 25 &&
          targetY < yesRect.bottom + 25 &&
          targetY + btnH > yesRect.top - 25
        );
        if (!overlapsYes && distToPtr > 75) {
          found = true;
        }
      }
    }

    // Apply new position with slight playful tilt
    const tilt = -12 + Math.random() * 24;
    noBtn.style.left = `${Math.round(targetX)}px`;
    noBtn.style.top = `${Math.round(targetY)}px`;
    noBtn.style.transform = `rotate(${tilt}deg) scale(0.96)`;

    setTimeout(() => {
      noBtn.style.transform = `rotate(${tilt * 0.4}deg) scale(1)`;
    }, 320);
  }

  // Pointer approach / hover triggers
  btnS2No.addEventListener('mouseenter', (e) => {
    moveNoButton(e);
  });

  // Track proximity on mousemove within 75px
  document.addEventListener('mousemove', (e) => {
    if (!screen2.classList.contains('active')) return;
    const rect = btnS2No.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    if (distance < 75) {
      moveNoButton(e);
    }
  });

  // Touch triggers
  btnS2No.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton(e);
  }, { passive: false });

  btnS2No.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton(e);
  });

  // Accessible keyboard navigation: avoid keyboard traps
  btnS2No.addEventListener('focus', () => {
    if (escapeA11yMessage) {
      escapeA11yMessage.textContent = "Sneaky! But Nathaniel's love is inescapable 😉";
    }
  });

  btnS2No.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (escapeA11yMessage) {
        escapeA11yMessage.textContent = "Error 404: 'No' is impossible! Focusing on YES... ❤️";
      }
      moveNoButton();
      btnS2Yes.focus();
    }
  });

  // -------------------------------------------------------------
  // Screen 2 -> Screen 3: Start Surprise Sequence
  // -------------------------------------------------------------
  btnS2Yes.addEventListener('click', () => {
    // Hide evasive NO button completely when advancing
    if (btnS2No) {
      btnS2No.style.display = 'none';
    }

    transitionScreens(screen2, screen3, () => {
      launchCelebrationSequence();
    });
  });

  // -------------------------------------------------------------
  // Scene A: Pastel Balloon Generator (Continuous Gentle Ascent)
  // -------------------------------------------------------------
  function spawnBalloons(count = 22) {
    if (!balloonCanvas) return;
    balloonCanvas.innerHTML = '';

    const colors = [
      '#F4B8C5', // blush pink
      '#C46D82', // dusty rose
      '#FFF3E3', // soft cream
      '#E05A70', // muted red
      '#FCD5CE', // peach rose
      '#E899A8'  // soft berry
    ];

    for (let i = 0; i < count; i++) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon-element';

      const color = colors[i % colors.length];
      const width = 56 + Math.floor(Math.random() * 24);
      const height = Math.round(width * 1.25);
      const stringLen = 75 + Math.floor(Math.random() * 40);
      const left = 2 + Math.random() * 95;
      const duration = 7 + Math.random() * 6;
      const delay = (i * 0.4) + (Math.random() * 1.5);
      const driftMid = -35 + Math.random() * 70;
      const driftEnd = -45 + Math.random() * 90;
      const tilt = 3 + Math.random() * 7;

      balloon.style.left = `${left}%`;
      balloon.style.animationDuration = `${duration}s`;
      balloon.style.animationDelay = `${delay}s`;
      balloon.style.setProperty('--drift-mid', `${driftMid}px`);
      balloon.style.setProperty('--drift-end', `${driftEnd}px`);
      balloon.style.setProperty('--tilt', `${tilt}deg`);
      balloon.style.setProperty('--i', `${i}`);

      balloon.innerHTML = `
        <div class="balloon-shape" style="background-color: ${color}; width: ${width}px; height: ${height}px;"></div>
        <div class="balloon-knot" style="background-color: ${color};"></div>
        <div class="balloon-string" style="height: ${stringLen}px;"></div>
      `;

      balloonCanvas.appendChild(balloon);
    }
  }

  // -------------------------------------------------------------
  // Phase Four: Full Surprise Celebration Choreography
  // -------------------------------------------------------------
  let celebrationTimeouts = [];

  function clearCelebrationTimeouts() {
    celebrationTimeouts.forEach(t => clearTimeout(t));
    celebrationTimeouts = [];
  }

  function launchCelebrationSequence() {
    clearCelebrationTimeouts();

    // Reset initial states
    if (giftBox) giftBox.classList.remove('opened');
    if (giftStage) giftStage.classList.remove('fade-down');
    if (loveMessageContainer) loveMessageContainer.classList.remove('revealed');
    polaroidItems.forEach(item => {
      item.classList.remove('emerged', 'floating');
    });

    // STEP 1: Launch Balloons (Scene A)
    spawnBalloons(24);

    // STEP 2: Gift Box Lid Opens (Scene B)
    celebrationTimeouts.push(setTimeout(() => {
      if (giftBox) giftBox.classList.add('opened');
    }, 800));

    // STEP 3: Reveal and Float 5 Photographs with Staggered Delays
    polaroidItems.forEach((item, idx) => {
      celebrationTimeouts.push(setTimeout(() => {
        item.classList.add('emerged');
        setTimeout(() => {
          item.classList.add('floating');
        }, 800);
      }, 1400 + (idx * 280)));
    });

    // STEP 4: Soften gift box stage & reveal central "I LOVE YOU" (Scene C)
    celebrationTimeouts.push(setTimeout(() => {
      if (giftStage) giftStage.classList.add('fade-down');
      if (loveMessageContainer) loveMessageContainer.classList.add('revealed');
    }, 3200));
  }

  // Replay Celebration
  if (btnReplay) {
    btnReplay.addEventListener('click', () => {
      launchCelebrationSequence();
    });
  }

  // -------------------------------------------------------------
  // Interactive Photo Lightbox Modal
  // -------------------------------------------------------------
  polaroidItems.forEach(item => {
    const handlePhotoOpen = () => {
      const img = item.querySelector('.scrapbook-img');
      const caption = item.querySelector('.polaroid-caption');
      if (!img || !photoModal) return;

      modalImg.src = img.src;
      modalImg.alt = img.alt || "Vonny's Photo";
      modalCaption.textContent = caption ? caption.textContent : "My Love ♡";

      if (typeof photoModal.showModal === 'function') {
        photoModal.showModal();
      } else {
        photoModal.setAttribute('open', '');
      }
    };

    item.addEventListener('click', handlePhotoOpen);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePhotoOpen();
      }
    });
  });

  function closeModal() {
    if (photoModal) {
      if (typeof photoModal.close === 'function') {
        photoModal.close();
      } else {
        photoModal.removeAttribute('open');
      }
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (photoModal) {
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        closeModal();
      }
    });
  }

  // -------------------------------------------------------------
  // Non-autoplay Sweet Ambient Music (Web Audio API Synthesizer)
  // Zero external audio files required, purely user-initiated!
  // -------------------------------------------------------------
  let audioCtx = null;
  let isPlayingMusic = false;
  let musicInterval = null;

  const notes = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    392.00, // G4
    440.00, // A4
    523.25, // C5
    587.33, // D5
    659.25  // E5
  ];

  const romanticMelody = [
    { note: 2, dur: 0.6 }, // E4
    { note: 3, dur: 0.6 }, // G4
    { note: 4, dur: 0.8 }, // A4
    { note: 5, dur: 1.2 }, // C5
    { note: 4, dur: 0.6 }, // A4
    { note: 3, dur: 0.8 }, // G4
    { note: 2, dur: 1.4 }, // E4
    { note: 1, dur: 0.6 }, // D4
    { note: 0, dur: 1.6 }, // C4
    { note: 2, dur: 0.8 }, // E4
    { note: 4, dur: 1.0 }, // A4
    { note: 3, dur: 1.4 }  // G4
  ];

  let melodyStep = 0;

  function playTone(freq, duration = 0.8) {
    if (!audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Warm, bell-like / music box envelope
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  function startChimes() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlayingMusic = true;
    audioToggle.classList.add('playing');
    audioToggle.setAttribute('aria-label', 'Mute ambient chimes');

    function step() {
      if (!isPlayingMusic) return;
      const current = romanticMelody[melodyStep % romanticMelody.length];
      playTone(notes[current.note], current.dur * 1.5);
      melodyStep++;
      musicInterval = setTimeout(step, current.dur * 1000);
    }
    step();
  }

  function stopChimes() {
    isPlayingMusic = false;
    audioToggle.classList.remove('playing');
    audioToggle.setAttribute('aria-label', 'Play ambient chimes');
    if (musicInterval) {
      clearTimeout(musicInterval);
      musicInterval = null;
    }
  }

  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      if (!isPlayingMusic) {
        startChimes();
      } else {
        stopChimes();
      }
    });
  }
});
