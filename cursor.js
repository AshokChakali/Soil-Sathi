(() => {
  const doc = document;
  const body = doc.body;
  const cursorRoot = doc.getElementById('organic-cursor');
  const seed = cursorRoot.querySelector('.seed');
  const trailCanvas = doc.getElementById('cursor-trail');
  const ctx = trailCanvas.getContext('2d', { alpha: true });

  let prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Position state
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let seedX = mouseX;
  let seedY = mouseY;
  let velocityX = 0;
  let velocityY = 0;
  const spring = 0.18; // attraction
  const damping = 0.75; // friction

  // Hover activation on interactive elements
  const interactiveSelector = 'a, button, .btn, .card, .pill, [role="button"], [tabindex="0"]';
  function setActiveGlow(isActive){
    cursorRoot.classList.toggle('cursor-active', !!isActive);
  }

  // Resize canvas
  function resize(){
    const { innerWidth:w, innerHeight:h } = window;
    trailCanvas.width = Math.floor(w * dpr);
    trailCanvas.height = Math.floor(h * dpr);
    trailCanvas.style.width = w + 'px';
    trailCanvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Mouse move
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Toggle system cursor with Alt as a quick accessibility escape
  window.addEventListener('keydown', (e) => {
    if(e.altKey){ body.setAttribute('data-system-cursor','true'); }
  });
  window.addEventListener('keyup', (e) => {
    if(!e.altKey){ body.removeAttribute('data-system-cursor'); }
  });

  // Observe hover state on interactive elements
  function bindHoverListeners(){
    doc.addEventListener('pointerover', (e) => {
      const t = e.target;
      if(!(t instanceof Element)) return;
      const isInteractive = t.closest(interactiveSelector);
      setActiveGlow(!!isInteractive);
    }, { passive: true });
    doc.addEventListener('pointerout', (e) => {
      const t = e.target;
      if(!(t instanceof Element)) return;
      const leavingInteractive = t.closest(interactiveSelector);
      if(leavingInteractive) setActiveGlow(false);
    }, { passive: true });
  }
  bindHoverListeners();

  // Particle trail system (lightweight)
  const particles = [];
  const maxParticles = 90; // perf guard
  function spawnParticle(x, y){
    // Alternate between green vine dot and brown soil speck
    const isVine = Math.random() < 0.6;
    particles.push({
      x, y,
      life: 1,
      size: isVine ? 2 + Math.random()*1.5 : 1 + Math.random()*1,
      hue: isVine ? 130 + Math.random()*20 : 30 + Math.random()*10,
      sat: isVine ? 55 + Math.random()*20 : 45 + Math.random()*15,
      light: isVine ? 42 + Math.random()*10 : 35 + Math.random()*12,
      driftX: (Math.random() - 0.5) * 0.6,
      driftY: (Math.random() - 0.5) * 0.6 + 0.2,
      rotation: Math.random()*Math.PI*2,
      type: isVine ? 'vine' : 'soil'
    });
    if(particles.length > maxParticles){ particles.shift(); }
  }

  function drawParticles(){
    for(let i=particles.length-1;i>=0;i--){
      const p = particles[i];
      p.x += p.driftX;
      p.y += p.driftY;
      p.life -= 0.02; // fade out
      if(p.life <= 0){ particles.splice(i,1); continue; }

      const alpha = Math.max(0, p.life);
      ctx.save();
      ctx.globalAlpha = alpha * 0.9;
      if(p.type === 'vine'){
        ctx.fillStyle = `hsl(${p.hue} ${p.sat}% ${p.light}%)`;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.size*1.2, p.size, p.rotation, 0, Math.PI*2);
        ctx.fill();
      } else {
        ctx.fillStyle = `hsl(${p.hue} ${p.sat}% ${p.light}%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // Motion loop
  let rafId = 0;
  function frame(){
    rafId = window.requestAnimationFrame(frame);
    if(prefersReduced) return; // honor reduced motion

    const dx = mouseX - seedX;
    const dy = mouseY - seedY;
    velocityX = velocityX * damping + dx * spring;
    velocityY = velocityY * damping + dy * spring;
    seedX += velocityX;
    seedY += velocityY;

    // Rotate leaves slightly based on velocity to suggest 3D
    const angle = Math.atan2(velocityY, velocityX);
    const tilt = Math.min(12, Math.hypot(velocityX, velocityY) * 1.2);
    seed.style.transform = `translate3d(${seedX}px, ${seedY}px, 0) rotate(${angle * 57.3}deg) skewY(${tilt * 0.1}deg)`;

    // Trail rendering
    ctx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
    spawnParticle(seedX, seedY);
    drawParticles();
  }
  rafId = window.requestAnimationFrame(frame);

  // Cleanup on unload
  window.addEventListener('pagehide', () => { cancelAnimationFrame(rafId); }, { once: true });
})();






























