(() => {
  'use strict';
  const viewport = document.getElementById('model-viewport');
  const prism = document.getElementById('soil-prism');
  if (!viewport || !prism) return;
  const slabs = [...prism.querySelectorAll('.soil-slab')];
  slabs.forEach(slab => {
    const back = document.createElement('div');
    back.className = 'prism-face face-back';
    slab.append(back);
  });
  const explodeButton = document.getElementById('model-explode');
  const orbitButton = document.getElementById('model-orbit');
  const hint = document.getElementById('model-interaction-hint');
  let profile = 1, layer = 0, yaw = -25, pitch = -10, scale = .86;
  let exploded = false, auto = false, raf = 0, lastTime = 0, gesture = null;
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const sequence = () => profile === 1 ? ['A', 'AB', 'B'] : ['A', 'BA', 'B'];
  function render() { prism.style.transform = `rotateX(${pitch}deg) rotateY(${yaw}deg) scale(${scale})`; }
  function setLabel(button, label) {
    const icon = button.querySelector('svg, .orbit-icon');
    button.replaceChildren(...(icon ? [icon, document.createTextNode(' ' + label)] : [document.createTextNode(label)]));
  }
  function animate(now) {
    if (!auto) return;
    if (lastTime) yaw += Math.min(now - lastTime, 50) * .009;
    lastTime = now;
    render(); raf = requestAnimationFrame(animate);
  }
  function setAutoRotate(value) {
    auto = Boolean(value); cancelAnimationFrame(raf); lastTime = 0;
    orbitButton?.setAttribute('aria-pressed', String(auto));
    if (orbitButton) setLabel(orbitButton, auto ? 'Pausar rotação' : 'Rotação automática');
    if (auto) raf = requestAnimationFrame(animate);
  }
  function setExploded(value) {
    exploded = Boolean(value); prism.classList.toggle('is-exploded', exploded);
    explodeButton?.setAttribute('aria-pressed', String(exploded));
    if (explodeButton) setLabel(explodeButton, exploded ? 'Reunir camadas' : 'Separar camadas');
  }
  function setLayer(index) {
    layer = clamp(Math.round(Number(index) || 0), 0, 2);
    slabs.forEach((slab, i) => {
      slab.classList.toggle('is-selected', layer === i);
      slab.setAttribute('aria-pressed', String(layer === i));
      slab.setAttribute('aria-label', `Investigar horizonte ${sequence()[i]} do Perfil ${profile}`);
    });
    const label = document.getElementById('model-layer-label');
    if (label) label.textContent = sequence()[layer];
  }
  function setProfile(number) {
    profile = Number(number) === 2 ? 2 : 1;
    prism.style.setProperty('--photo', `url("assets/perfil-${profile}.webp")`);
    setLayer(layer);
  }
  function setSlice(fraction) {
    const part = clamp(Number(fraction) || 0, 0, 1);
    const local = clamp(part * 3 - layer, 0, 1);
    slabs[layer].style.setProperty('--scan', `${local * 100}%`);
  }
  function zoom(delta) { scale = clamp(scale + Number(delta), .52, 1.25); render(); }
  function reset() {
    yaw = -25; pitch = -10; scale = .86;
    setAutoRotate(false); setExploded(false); render();
    if (hint) hint.textContent = 'Arraste para girar o perfil';
  }
  function selectSlab(index) {
    window.dispatchEvent(new CustomEvent('soil-layer-select', { detail: { index } }));
  }
  viewport.addEventListener('pointerdown', event => {
    if (event.target.closest('.model-scale') || event.button > 0) return;
    setAutoRotate(false);
    gesture = { id:event.pointerId, x:event.clientX, y:event.clientY, yaw, pitch, moved:false, slab:event.target.closest('.soil-slab') };
    viewport.setPointerCapture(event.pointerId);
    viewport.focus({preventScroll:true});
  });
  viewport.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const dx = event.clientX - gesture.x, dy = event.clientY - gesture.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) gesture.moved = true;
    yaw = gesture.yaw + dx * .38;
    pitch = clamp(gesture.pitch - dy * .22, -35, 25);
    render();
    if (gesture.moved && hint) hint.textContent = 'Explore os horizontes ou separe as camadas';
  });
  viewport.addEventListener('pointerup', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const previous = gesture; gesture = null;
    if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (!previous.moved && previous.slab) selectSlab(Number(previous.slab.dataset.slab));
  });
  viewport.addEventListener('pointercancel', () => { gesture = null; });
  viewport.addEventListener('wheel', event => {
    event.preventDefault(); setAutoRotate(false);
    zoom(event.deltaY < 0 ? .045 : -.045);
  }, { passive:false });
  viewport.addEventListener('keydown', event => {
    if (event.target !== viewport) return;
    let handled = true;
    if (event.key === 'ArrowLeft') yaw -= 10;
    else if (event.key === 'ArrowRight') yaw += 10;
    else if (event.key === 'ArrowUp') pitch = clamp(pitch - 7, -35, 25);
    else if (event.key === 'ArrowDown') pitch = clamp(pitch + 7, -35, 25);
    else if (['+', '='].includes(event.key)) zoom(.08);
    else if (event.key === '-') zoom(-.08);
    else if (event.key.toLowerCase() === 'r') reset();
    else handled = false;
    if (handled) { event.preventDefault(); event.stopPropagation(); setAutoRotate(false); render(); }
  });
  slabs.forEach((slab, index) => slab.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); event.stopPropagation(); selectSlab(index);
    }
  }));
  document.getElementById('model-zoom-in')?.addEventListener('click', () => zoom(.08));
  document.getElementById('model-zoom-out')?.addEventListener('click', () => zoom(-.08));
  document.getElementById('model-reset')?.addEventListener('click', reset);
  explodeButton?.addEventListener('click', () => setExploded(!exploded));
  orbitButton?.addEventListener('click', () => setAutoRotate(!auto));
  document.addEventListener('visibilitychange', () => { if (document.hidden) setAutoRotate(false); });
  window.soilModel = { setProfile, setLayer, setSlice, reset, setAutoRotate, zoom };
  reset(); setProfile(1); setLayer(0); setSlice(.15);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setAutoRotate(true);
  window.dispatchEvent(new Event('soil-model-ready'));
})();
