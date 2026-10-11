/**
 * BIRTHDAY WEBSITE FOR ASMITA — BY ABYSS
 * Vanilla JavaScript (ES6+) — Zero external dependencies, pure static
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initTypewriter();
  initInvitation();
  initPartyPopper();
  initImageFallbacks();
  initStoryBook();
  initGalleryLightbox();
  initMusicPlayer();
  initScrollAnimations();
  initApologyButton();
  initSmoothScroll();
  initCountdown();
});

/* ==========================================================================
   NAV TOGGLE FOR MOBILE
   ========================================================================== */
function initNavToggle() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const navLinks = document.querySelector('.nav-links');
  if (!toggleBtn || !navLinks) return;
  
  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.classList.toggle('active');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });
  
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-nav') && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   0. TYPEWRITER BIRTHDAY BANNER
   ========================================================================== */
function initTypewriter() {
  const textEl = document.getElementById('typewriter-text');
  const fullText = 'Happy Birthday, Asmita ♡';
  if (!textEl) return;
  let index = 0;
  let deleting = false;

  function tick() {
    if (!deleting) {
      index++;
      textEl.textContent = fullText.slice(0, index);
      if (index >= fullText.length) {
        deleting = true;
        setTimeout(tick, 2600);
        return;
      }
      setTimeout(tick, 105);
    } else {
      index--;
      textEl.textContent = fullText.slice(0, index);
      if (index <= 0) {
        deleting = false;
        setTimeout(tick, 650);
        return;
      }
      setTimeout(tick, 55);
    }
  }

  tick();
}

/* ==========================================================================
   0.5 STORY BOOK PAGES
   ========================================================================== */
function initStoryBook() {
  const pages = Array.from(document.querySelectorAll('.book-page'));
  const indicators = Array.from(document.querySelectorAll('.page-indicators .indicator'));
  const prevBtn = document.querySelector('.prev-page');
  const nextBtn = document.querySelector('.next-page');
  if (!pages.length || !prevBtn || !nextBtn) return;

  let current = 0;

  function showPage(index) {
    current = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, i) => page.classList.toggle('active', i === current));
    indicators.forEach((indicator, i) => indicator.classList.toggle('active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === pages.length - 1;
  }

  prevBtn.addEventListener('click', () => showPage(current - 1));
  nextBtn.addEventListener('click', () => showPage(current + 1));
  indicators.forEach((indicator, i) => {
    indicator.addEventListener('click', () => showPage(i));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const story = document.querySelector('#story');
    if (!story) return;
    const rect = story.getBoundingClientRect();
    const visible = rect.top < window.innerHeight && rect.bottom > 0;
    if (!visible) return;
    if (e.key === 'ArrowLeft') showPage(current - 1);
    if (e.key === 'ArrowRight') showPage(current + 1);
  });

  showPage(0);
}

/* ==========================================================================
   1. INVITATION OVERLAY
   ========================================================================== */
function initInvitation() {
  const overlay = document.getElementById('invitation-overlay');
  const openBtn = document.getElementById('btn-open-invitation');
  const skipBtn = document.getElementById('btn-skip-invitation');
  const reopenNavBtn = document.getElementById('nav-reopen-btn');

  if (!overlay) return;

  function closeInvitation() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function openInvitation() {
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (openBtn) openBtn.focus();
  }

  // Prevent background scrolling while invitation is active
  document.body.style.overflow = 'hidden';

  let birthdayTuneStarted = false;

  function playBirthdayTune() {
    if (birthdayTuneStarted) return;
    birthdayTuneStarted = true;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const notes = [264, 264, 297, 264, 352, 330, 264, 264, 297, 264, 396, 352];
      const lengths = [0.22, 0.22, 0.45, 0.45, 0.45, 0.8, 0.22, 0.22, 0.45, 0.45, 0.45, 0.8];
      let time = ctx.currentTime + 0.05;

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.09, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, time + lengths[index]);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + lengths[index] + 0.05);
        time += lengths[index] + 0.05;
      });
    } catch (err) {
      console.warn('Birthday tune unavailable:', err);
    }
  }

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      playBirthdayTune();
      closeInvitation();
    });
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', closeInvitation);
  }

  if (reopenNavBtn) {
    reopenNavBtn.addEventListener('click', openInvitation);
  }

  // Keyboard escape closes invitation if user already saw it
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) {
      closeInvitation();
    }
  });
}

/* ==========================================================================
   0.7 PARTY POPPER BURST
   ========================================================================== */
function initPartyPopper() {
  const overlay = document.getElementById('invitation-overlay');
  const openBtn = document.getElementById('btn-open-invitation');
  if (!overlay || !openBtn) return;

  const colors = ['#C992A0', '#E5C3CC', '#5C1D2A', '#3F131C', '#C2A267', '#FFD166', '#EF476F', '#118AB2'];
  const shapes = ['circle', 'strip', 'star'];

  function spawnPiece(container, x, y) {
    const el = document.createElement('span');
    el.className = 'confetti-piece';
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'star') {
      el.textContent = ['✦', '✧', '♡', '★'][Math.floor(Math.random() * 4)];
      el.classList.add('star');
    } else {
      el.classList.add(shape);
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
    }
    const size = shape === 'star' ? 14 + Math.random() * 12 : 6 + Math.random() * 10;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.background = shape === 'star' ? 'none' : el.style.background;
    el.style.fontSize = shape === 'star' ? size * 0.9 + 'px' : '';
    const angle = Math.PI * 0.1 + Math.random() * Math.PI * 0.8;
    const distance = 120 + Math.random() * 200;
    const cx = Math.cos(angle) * distance * (Math.random() > 0.5 ? 1 : -1);
    const cy = -distance * (0.6 + Math.random() * 0.5);
    const cr = (Math.random() - 0.5) * 720;
    el.style.setProperty('--cx', cx + 'px');
    el.style.setProperty('--cy', cy + 'px');
    el.style.setProperty('--cr', cr + 'deg');
    el.style.animationDelay = (Math.random() * 0.15) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  }

  function triggerPopper(side) {
    const layer = overlay.querySelector('.confetti-layer');
    if (!layer) return;
    const rect = layer.getBoundingClientRect();
    const x = side === 'left' ? 10 : rect.width - 30;
    const popper = document.createElement('div');
    popper.className = 'party-popper ' + side;
    popper.textContent = '\uD83C\uDF89';
    layer.appendChild(popper);
    for (let i = 0; i < 28; i++) {
      spawnPiece(layer, x + (Math.random() - 0.5) * 20, -4);
    }
    setTimeout(() => popper.remove(), 1600);
  }

  openBtn.addEventListener('click', () => {
    setTimeout(() => triggerPopper('left'), 120);
    setTimeout(() => triggerPopper('right'), 260);
  });
}

/* ==========================================================================
   2. IMAGE FALLBACKS
   Checks if .jpg exists; if missing, falls back to .svg gracefully
   ========================================================================== */
function initImageFallbacks() {
  const mediaElements = document.querySelectorAll('img[data-fallback], video[data-fallback]');
  mediaElements.forEach((el) => {
    el.addEventListener('error', function onMediaError() {
      const fallbackSrc = this.getAttribute('data-fallback');
      if (fallbackSrc && this.src !== fallbackSrc) {
        this.src = fallbackSrc;
      }
    });
  });
}

/* ==========================================================================
   3. PHOTO GALLERY LIGHTBOX
   ========================================================================== */
let currentLightboxIndex = 0;
const galleryData = [
  {
    src: 'assets/images/photo-1.mp4',
    fallback: 'assets/images/photo-1.svg',
    title: 'A Rare Smile',
    note: 'The kind of warmth that stays with you long after the conversation ends.',
    isVideo: true
  },
  {
    src: 'assets/images/photo-2.jpg',
    fallback: 'assets/images/photo-2.svg',
    title: 'Sunlight & Quiet Thoughts',
    note: 'In the middle of the noise, you always had a grace that was entirely your own.'
  },
  {
    src: 'assets/images/photo-3.jpg',
    fallback: 'assets/images/photo-3.svg',
    title: 'Just Asmita',
    note: 'A favorite little glimpse of you — simple, soft, and completely yours.'
  },
  {
    src: 'assets/images/photo-4.jpg',
    fallback: 'assets/images/photo-4.svg',
    title: 'Across the Miles',
    note: 'Phone calls, late hours, and a connection that felt close despite every kilometer.'
  },
  {
    src: 'assets/images/photo-5.jpg',
    fallback: 'assets/images/photo-5.svg',
    title: 'When Words Were Everything',
    note: 'We learned how to understand each other through screens and voices alone.'
  },
  {
    src: 'assets/images/photo-6.jpg',
    fallback: 'assets/images/photo-6.svg',
    title: 'The Day We Finally Met',
    note: 'Not when we originally planned, but real nonetheless. A day I will always keep gently.'
  },
  {
    src: 'assets/images/photo-7.jpg',
    fallback: 'assets/images/photo-7.svg',
    title: 'Quiet Grace & Strength',
    note: 'You carry so much resilience inside you, even on the days you don’t give yourself credit.'
  },
  {
    src: 'assets/images/photo-8.jpg',
    fallback: 'assets/images/photo-8.svg',
    title: 'A Brighter Horizon',
    note: 'May every step forward this year bring you closer to all you have ever hoped for.'
  }
];

function initGalleryLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const imgElement = document.getElementById('lightbox-img');
  const titleElement = document.getElementById('lightbox-title');
  const noteElement = document.getElementById('lightbox-note');
  const counterElement = document.getElementById('lightbox-counter');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const closeBtn = document.getElementById('lightbox-close');
  const cards = document.querySelectorAll('.polaroid-card');

  if (!modal || !imgElement) return;

  function updateLightbox(index) {
    if (index < 0) index = galleryData.length - 1;
    if (index >= galleryData.length) index = 0;
    currentLightboxIndex = index;

    const item = galleryData[currentLightboxIndex];
    const currentCard = cards[currentLightboxIndex];
    const cardMedia = currentCard ? currentCard.querySelector('img, video') : null;

    const isCardVideo = cardMedia ? (cardMedia.tagName === 'VIDEO' || /\.(mp4|webm|ogg|mov)$/i.test(cardMedia.currentSrc || cardMedia.getAttribute('src') || '')) : false;
    const isVideo = item.isVideo || isCardVideo;
    const mediaSrc = (cardMedia && (cardMedia.getAttribute('src') || cardMedia.src)) || item.src;
    const fallbackSrc = (cardMedia && cardMedia.getAttribute('data-fallback')) || item.fallback;

    const imgElement = document.getElementById('lightbox-img');
    const videoElement = document.getElementById('lightbox-video');

    if (isVideo) {
      // Hide image, configure and play video
      if (imgElement) {
        imgElement.style.display = 'none';
        imgElement.src = '';
      }
      if (videoElement) {
        videoElement.pause();
        videoElement.src = mediaSrc;
        videoElement.setAttribute('data-fallback', fallbackSrc);
        videoElement.style.display = 'block';
        videoElement.currentTime = 0;
        videoElement.muted = true;
        videoElement.load();
        videoElement.play().catch(() => {
          // Autoplay blocked fallback
        });
      }
    } else {
      // Pause and hide video, show image
      if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
        videoElement.style.display = 'none';
        videoElement.src = '';
      }
      if (imgElement) {
        imgElement.src = mediaSrc;
        imgElement.setAttribute('data-fallback', fallbackSrc);
        imgElement.alt = item.title;
        imgElement.style.display = 'block';
      }
    }

    if (titleElement) titleElement.textContent = item.title;
    if (noteElement) noteElement.textContent = item.note;
    if (counterElement) counterElement.textContent = `${currentLightboxIndex + 1} / ${galleryData.length}`;
  }

  function openLightbox(index) {
    updateLightbox(index);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const videoElement = document.getElementById('lightbox-video');
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => openLightbox(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentLightboxIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentLightboxIndex + 1);
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  const videoElement = document.getElementById('lightbox-video');
  if (videoElement) {
    videoElement.addEventListener('click', (e) => {
      e.stopPropagation();
      if (videoElement.paused) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') updateLightbox(currentLightboxIndex - 1);
    else if (e.key === 'ArrowRight') updateLightbox(currentLightboxIndex + 1);
  });
}

/* ==========================================================================
   4. MUSIC PLAYER WITH WEBAUDIO AMBIENT SYNTHESIS FALLBACK
   ========================================================================== */
function initMusicPlayer() {
  const audio = document.getElementById('bg-audio');
  const toggleBtn = document.getElementById('music-toggle-btn');
  const playerBar = document.getElementById('music-player-bar');
  const musicTitle = document.getElementById('music-title');
  const musicStatus = document.getElementById('music-status');
  const audioNotice = document.getElementById('audio-notice');

  let isPlaying = false;
  let audioCtx = null;

  if (!toggleBtn) return;

  // Happy Birthday tune synthesis via Web Audio API (fallback when no song.mp3)
  function playBirthdayTune() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // Happy Birthday notes: C4 C4 D4 C4 F4 E4 | C4 C4 D4 C4 G4 F4 | C4 C4 C5 A4 F4 E4 D4 | A#4 A#4 A4 F4 G4 F4
      const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63, 261.63, 261.63, 293.66, 261.63, 392.00, 349.23, 261.63, 261.63, 523.25, 440.00, 349.23, 329.63, 293.66, 466.16, 466.16, 440.00, 349.23, 392.00, 349.23];
      const lengths = [0.2, 0.2, 0.4, 0.4, 0.4, 0.8, 0.2, 0.2, 0.4, 0.4, 0.4, 0.8, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 0.8, 0.2, 0.2, 0.4, 0.4, 0.4, 0.8];
      let time = audioCtx.currentTime + 0.05;

      notes.forEach((freq, index) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        // Increased volume from 0.1 to 0.25 for louder tune
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.25, time + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, time + lengths[index]);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + lengths[index] + 0.05);
        time += lengths[index] + 0.05;
      });
    } catch (err) {
      console.warn('Birthday tune unavailable:', err);
    }
  }

  function stopBirthdayTune() {
    // No loop to stop; tune plays once
  }

  function setPlayingState(playing, statusText = '') {
    isPlaying = playing;
    if (playing) {
      playerBar.classList.add('playing');
      toggleBtn.innerHTML = '&#10074;&#10074;'; // Pause icon
      toggleBtn.setAttribute('aria-label', 'Pause music');
      if (musicStatus) musicStatus.textContent = statusText || 'Playing';
    } else {
      playerBar.classList.remove('playing');
      toggleBtn.innerHTML = '&#9654;'; // Play icon
      toggleBtn.setAttribute('aria-label', 'Play music');
      if (musicStatus) musicStatus.textContent = statusText || 'Paused';
    }
  }

  function showToastNotice(text) {
    if (!audioNotice) return;
    audioNotice.textContent = text;
    audioNotice.classList.add('visible');
    setTimeout(() => {
      audioNotice.classList.remove('visible');
    }, 4500);
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      if (audio && audio.src) {
        audio.play().then(() => {
          setPlayingState(true, 'Now playing');
        }).catch((err) => {
          // If local mp3 is not yet placed, play Happy Birthday tune
          playBirthdayTune();
          setPlayingState(true, 'Happy Birthday ♡');
          showToastNotice('Add your song.mp3 in assets/music/ to play your custom track.');
        });
      } else {
        playBirthdayTune();
        setPlayingState(true, 'Happy Birthday ♡');
      }
    } else {
      if (audio) audio.pause();
      stopBirthdayTune();
      setPlayingState(false, 'Paused');
    }
  });

  if (audio) {
    audio.addEventListener('ended', () => {
      setPlayingState(false, 'Finished');
    });
    audio.addEventListener('error', () => {
      // Graceful handling of missing audio file
      console.log('Local audio file assets/music/song.mp3 not found; ready for fallback.');
    });
  }
}

/* ==========================================================================
   5. SMOOTH SCROLLING
   ========================================================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ==========================================================================
   SCROLL-TRIGGERED ANIMATIONS
   Makes every section reveal with surprise as user scrolls
   ========================================================================== */
function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Hero content
  const heroContent = document.querySelector('.hero-content');
  const heroPortrait = document.querySelector('.hero-portrait-wrapper');
  
  if (heroContent) {
    heroContent.classList.add('scroll-reveal');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateX(-50px)';
    heroContent.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
  }
  
  if (heroPortrait) {
    heroPortrait.classList.add('scroll-reveal');
    heroPortrait.style.opacity = '0';
    heroPortrait.style.transform = 'translateX(50px) scale(0.9)';
    heroPortrait.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s';
  }

  // Story book pages
  const storyBody = document.querySelector('.story-body');
  const bookPages = document.querySelectorAll('.book-page');
  
  if (storyBody) {
    storyBody.classList.add('scroll-reveal');
    storyBody.style.opacity = '0';
    storyBody.style.transform = 'translateY(50px) rotate(-2deg)';
    storyBody.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
  }
  
  bookPages.forEach((page, i) => {
    page.classList.add('scroll-reveal');
    page.style.opacity = '0';
    page.style.transform = `translateY(30px) rotate(${i % 2 === 0 ? -3 : 3}deg)`;
    page.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`;
  });

  // Gallery items with stagger
  const posterItems = document.querySelectorAll('.poster-item');
  posterItems.forEach((item, i) => {
    item.classList.add('scroll-reveal');
    item.style.opacity = '0';
    item.style.transform = `translateY(40px) rotate(${(i % 4 - 1.5) * 2}deg) scale(0.9)`;
    item.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
  });

  // Wish cards with bounce effect
  const wishCards = document.querySelectorAll('.wish-card');
  wishCards.forEach((card, i) => {
    card.classList.add('scroll-reveal');
    card.style.opacity = '0';
    card.style.transform = `translateY(60px) scale(0.8)`;
    card.style.transition = `opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.12}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.12}s`;
  });

  // Letter section
  const letterPaper = document.querySelector('.letter-paper');
  if (letterPaper) {
    letterPaper.classList.add('scroll-reveal');
    letterPaper.style.opacity = '0';
    letterPaper.style.transform = 'perspective(1000px) rotateY(-15deg) translateY(40px)';
    letterPaper.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
  }

  // Ending section
  const endingPortrait = document.querySelector('.ending-portrait-wrap');
  const endingMessage = document.querySelector('.ending-message');
  
  if (endingPortrait) {
    endingPortrait.classList.add('scroll-reveal');
    endingPortrait.style.opacity = '0';
    endingPortrait.style.transform = 'scale(0.8) rotate(3deg)';
    endingPortrait.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
  }
  
  if (endingMessage) {
    endingMessage.classList.add('scroll-reveal');
    endingMessage.style.opacity = '0';
    endingMessage.style.transform = 'translateY(30px)';
    endingMessage.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s';
  }

  // Observer for all revealed elements with celebration bursts
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) rotate(0deg) scale(1)';
        observer.unobserve(el);
        
        // Trigger celebration burst for each section
        const section = el.closest('section');
        if (section && !section.dataset.burstTriggered) {
          section.dataset.burstTriggered = 'true';
          createSectionBurst(section);
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
  
  // Create celebration burst for any section
  function createSectionBurst(section) {
    const symbols = ['♡', '♥', '✦', '✧', '🌸', '✿', '❀', '⭐', '✨'];
    const rect = section.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const el = document.createElement('div');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        const angle = (i / 25) * Math.PI * 2;
        const distance = 100 + Math.random() * 150;
        const startX = centerX + Math.cos(angle) * distance * 0.3;
        const startY = centerY + Math.sin(angle) * distance * 0.3;
        el.style.cssText = `
          position: fixed;
          left: ${startX}px;
          top: ${startY}px;
          font-size: ${Math.random() * 24 + 16}px;
          color: var(--accent-rose-soft);
          pointer-events: none;
          z-index: 9998;
          animation: sectionBurst ${1.5 + Math.random() * 0.5}s ease-out forwards;
          --tx: ${(Math.random() - 0.5) * 200}px;
          --ty: ${-100 - Math.random() * 150}px;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 2000);
      }, i * 50);
    }
  }
}

// Create celebration burst effect
function createCelebrationBurst() {
  const symbols = ['♡', '♥', '✦', '✧', '🌸', '✿', '❀', '⭐', '✨'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.cssText = `
        position: fixed;
        top: ${Math.random() * 100}vh;
        left: ${Math.random() * 100}vw;
        font-size: ${Math.random() * 20 + 15}px;
        color: var(--accent-rose-soft);
        pointer-events: none;
        z-index: 9998;
        animation: celebrationBurst 2s ease-out forwards;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }, i * 100);
  }
}

/* ==========================================================================
   SECRET APOLOGY BUTTON
   ========================================================================== */
function initApologyButton() {
  const forbiddenBtn = document.getElementById('forbidden-btn');
  const overlay = document.getElementById('apology-overlay');
  const closeBtn = document.getElementById('apology-close');

  if (!forbiddenBtn || !overlay) return;

  function openApology() {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeApology() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  forbiddenBtn.addEventListener('click', openApology);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeApology);
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('apology-backdrop')) {
      closeApology();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeApology();
    }
  });
}

/* ==========================================================================
   COUNTDOWN LOCK SCREEN
   Unlocks on October 28, 2026 12:00 AM NPT (UTC+05:45)
   Release timestamp: 2026-10-27T18:15:00Z
   ========================================================================== */

// Release timestamp (October 28, 2026 12:00 AM Nepal Time = 18:15 UTC previous day)
const RELEASE_TIMESTAMP = 1793124900000; // 2026-10-27T18:15:00Z in milliseconds

// Enable testing mode by setting this to true (resets after page reload)
const TESTING_MODE = true; // SET TO FALSE BEFORE DEPLOYING

function initCountdown() {
  const overlay = document.getElementById('countdown-overlay');
  if (!overlay) return;

  const daysEl = document.getElementById('countdown-days');
  const hoursEl = document.getElementById('countdown-hours');
  const minutesEl = document.getElementById('countdown-minutes');
  const secondsEl = document.getElementById('countdown-seconds');

  function getReleaseTime() {
    if (TESTING_MODE) {
      // In testing mode, release is 30 seconds from now
      return Date.now() + 30000;
    }
    return RELEASE_TIMESTAMP;
  }

  let releaseTime = getReleaseTime();
  let countdownInterval = null;

  function padZero(num) {
    return num.toString().padStart(2, '0');
  }

  function updateCountdown() {
    const now = Date.now();
    const diff = releaseTime - now;

    if (diff <= 0) {
      // Release time reached - unlock the website
      if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
      }
      revealBirthdaySite();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = padZero(days);
    if (hoursEl) hoursEl.textContent = padZero(hours);
    if (minutesEl) minutesEl.textContent = padZero(minutes);
    if (secondsEl) secondsEl.textContent = padZero(seconds);
  }

  function revealBirthdaySite() {
    overlay.classList.add('hidden');
    // Clean up after transition
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 800);
  }

  // Check if release time has already passed
  const now = Date.now();
  if (now >= releaseTime) {
    revealBirthdaySite();
    return;
  }

  // Start countdown
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);

  // Store interval reference for cleanup
  window.__countdownInterval = countdownInterval;
}
