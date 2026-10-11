/**
 * BIRTHDAY WEBSITE FOR ASMITA — BY ABYSS
 * Vanilla JavaScript (ES6+) — Zero external dependencies, pure static
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initInvitation();
  initImageFallbacks();
  initStoryBook();
  initGalleryLightbox();
  initMusicPlayer();
  initSmoothScroll();
});

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
        gain.gain.setValueAtTime(0.001, time);
        gain.gain.exponentialRampToValueAtTime(0.1, time + 0.03);
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
