(() => {
  'use strict';

  const ready = () => {
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
    const put = (selector, value) => { const element = $(selector); if (element) element.textContent = value; };
    const clamp = (value, min, max) => Math.max(min, Math.min(max, Number(value) || 0));
    const modelCall = (method, ...args) => {
      const model = globalThis.soilModel;
      if (model && typeof model[method] === 'function') model[method](...args);
    };
    const announce = message => put('#lab-status', message);

    const profiles = {
      1: {
        name: 'Latossolo Vermelho-Amarelo',
        classification: 'Latossolo Vermelho-Amarelo Distrófico típico',
        sequence: ['A', 'AB', 'B'],
        coordinates: '11°44′10.61″S · 49°02′47.68″W',
        altitude: '291,93 m',
        mapCoordinates: '11°44′09.0″S · 49°02′53.6″W',
        mapDocument: 'https://www.google.com/maps?q=-11.7358333,-49.0482222',
        earth: 'https://earth.google.com/web/@-11.7364986,-49.04672826,292.62800521a,590.4664024d,35y,12.12122999h,0t,0r/data=CgRCAggBMikKJwolCiExTHFXeHJudXJvSmk4Q2VRZWhnU0EyNlBILXc3cXlRcXggAToDCgEwQgIIAEoICOSp5eoEEAE?authuser=0',
        interpretation: 'Os autores relacionam a cor aos óxidos de ferro e a estrutura granular à consistência friável. Essas observações fundamentam a classificação apresentada no estudo.',
        management: {
          terrain: 'O relatório descreve relevo plano, favorável ao uso agrícola intensivo e associado a menor escoamento superficial e risco de erosão hídrica.',
          water: 'A estrutura granular pequena e moderada é associada pelos autores à boa porosidade, à alta infiltração e à drenagem eficiente, favorecendo a aeração das raízes.',
          retention: 'A textura franco-argilosa é relacionada a uma retenção equilibrada de água, com armazenamento de umidade para o desenvolvimento das plantas durante veranicos.',
          machinery: 'O relevo plano e a consistência macia em solo seco e friável em solo úmido facilitam a mecanização, com menor esforço de tração e desgaste dos implementos.',
          care: 'Quando molhado, o solo é plástico e pegajoso. O trabalho orienta evitar o tráfego logo após chuvas intensas para reduzir o embuchamento dos equipamentos e a compactação superficial.',
          pages: 'Características do Perfil 1 · página 8 do PDF'
        },
        layers: [
          { symbol: 'A', depth: '0–20 cm', code: '10 YR 3/4', color: 'Bruno-amarelado', grade: 'Forte', dry: 'Macio', swatch: '#6b4a28' },
          { symbol: 'AB', depth: '20–43 cm', code: '7.5 YR 5/6', color: 'Bruno-forte', grade: 'Moderada', dry: 'Macio', swatch: '#a36c36' },
          { symbol: 'B', depth: '43–67 cm', code: '7.5 YR 5/8', color: 'Bruno-forte', grade: 'Moderada', dry: 'Macio', swatch: '#ad652c', note: 'O esquema da página 4 chama a camada inferior de C; a descrição e a tabela usam B. O explorador segue a descrição e a tabela.' }
        ]
      },
      2: {
        name: 'Latossolo Amarelo',
        classification: 'Latossolo Amarelo Distrófico típico',
        sequence: ['A', 'BA', 'B'],
        coordinates: '11°44′13.36″S · 49°01′44.10″W',
        altitude: '291,27 m',
        mapCoordinates: '11°44′14.0″S · 49°01′44.6″W',
        mapDocument: 'https://www.google.com/maps?q=-11.7372222,-49.0290556',
        earth: 'https://earth.google.com/web/@-11.73703906,-49.02901764,290.88661042a,177.64289085d,35y,11.36742558h,0t,0r/data=CgRCAggBMikKJwolCiExTHFXeHJudXJvSmk4Q2VRZWhnU0EyNlBILXc3cXlRcXggAToDCgEwQgIIAEoICNPf2McGEAE?authuser=0',
        interpretation: 'O estudo destaca o matiz 10 YR no horizonte B, a estrutura granular e a consistência macia e friável como observações associadas à classificação apresentada de Latossolo Amarelo.',
        management: {
          terrain: 'O relatório descreve relevo plano, favorável ao aproveitamento agrícola em larga escala e associado a menor escoamento superficial e risco de erosão hídrica.',
          water: 'A estrutura granular pequena e moderadamente desenvolvida é associada à boa infiltração e à drenagem interna eficiente ao longo do perfil, com aeração para o desenvolvimento radicular.',
          retention: 'Segundo os autores, a textura franco-argilosa favorece o equilíbrio entre a retenção de água disponível às culturas e a circulação de ar no solo.',
          machinery: 'O trabalho associa o relevo plano, a profundidade efetiva e as consistências macia e friável à facilidade de preparo da área e à menor exigência de tração das máquinas.',
          care: 'Em condição molhada, a consistência é plástica e pegajosa. O trabalho orienta evitar o tráfego com umidade excessiva para prevenir a compactação superficial e preservar a qualidade física do solo.',
          pages: 'Características do Perfil 2 · página 15 do PDF'
        },
        layers: [
          { symbol: 'A', depth: '0–22 cm', code: '7.5 YR 5/6', color: 'Bruno-forte', grade: 'Moderada', dry: 'Ligeiramente duro', swatch: '#a36c36' },
          { symbol: 'BA', depth: '22–50 cm', code: '10 YR 5/6', color: 'Bruno-amarelado', grade: 'Moderada', dry: 'Macio', swatch: '#aa7f38', note: 'O esquema e a descrição identificam esta camada como BA (páginas 11 e 13). A tabela da página 16 registra AB para a mesma profundidade; aqui foi mantido BA.' },
          { symbol: 'B', depth: '50–95 cm', code: '10 YR 5/8', color: 'Bruno-amarelado', grade: 'Moderada', dry: 'Macio', swatch: '#b7862f' }
        ]
      }
    };

    const viewNames = {
      explore: 'Explorador de horizontes',
      compare: 'Comparação dos perfis',
      field: 'Localização do estudo',
      management: 'Manejo e comportamento do solo',
      study: 'O estudo, autores e relatório'
    };
    const viewActions = $$('.view-tab[data-view]');
    const viewTabs = $$('.view-navigation .view-tab[data-view]');
    const views = $$('.app-view[data-view]');
    let activeProfile = 1;
    let activeLayer = 0;
    let slicePosition = 15;
    let fieldProfile = 1;
    let fieldMapSource = 'earth';
    let managementProfile = 1;
    let comparisonKey = 'A';
    let touring = false;
    let tourIndex = 0;
    let ownedFullscreen = false;

    function syncComparisonImageWidth() {
      const frame = $('.comparison-frame');
      if (frame && frame.clientWidth > 0) frame.style.setProperty('--compare-width', `${frame.clientWidth}px`);
    }

    function setView(name, options = {}) {
      if (!(name in viewNames)) return;
      if (name !== 'explore') modelCall('setAutoRotate', false);
      views.forEach(view => {
        const active = view.dataset.view === name;
        view.hidden = !active;
        view.classList.toggle('is-active', active);
      });
      viewTabs.forEach(tab => {
        const active = tab.dataset.view === name;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        tab.classList.toggle('is-active', active);
      });
      put('#view-heading', viewNames[name]);
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (name === 'compare') requestAnimationFrame(syncComparisonImageWidth);
      if (options.focus) {
        const view = views.find(item => item.dataset.view === name);
        if (view) {
          if (!view.hasAttribute('tabindex')) view.tabIndex = -1;
          view.focus({ preventScroll: true });
        }
      }
    }

    viewActions.forEach(action => action.addEventListener('click', () => {
      setView(action.dataset.view);
      if (action.dataset.profile) setProfile(action.dataset.profile);
    }));
    viewTabs.forEach((tab, index) => {
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % viewTabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + viewTabs.length) % viewTabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = viewTabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        event.stopPropagation();
        setView(viewTabs[next].dataset.view);
        viewTabs[next].focus();
      });
    });
    $('#brand')?.addEventListener('click', event => {
      event.preventDefault();
      setView('explore');
    });

    function selectLayer(index, options = {}) {
      const nextIndex = clamp(index, 0, 2);
      const changed = nextIndex !== activeLayer;
      activeLayer = nextIndex;
      const profile = profiles[activeProfile];
      const layer = profile.layers[activeLayer];
      const slider = $('#layer-slider');
      slicePosition = options.slice === undefined ? [15, 50, 85][activeLayer] : clamp(options.slice, 0, 100);
      if (slider) {
        slider.value = String(slicePosition);
        slider.setAttribute('aria-valuetext', `Posição esquemática ${Math.round(slicePosition)}%; horizonte ${layer.symbol}`);
      }
      $$('.layer-button[data-layer]').forEach(button => {
        const selected = Number(button.dataset.layer) === activeLayer;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-pressed', String(selected));
        if (button.getAttribute('role') === 'tab') button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
        if (selected && options.focus) button.focus({ preventScroll: true });
      });
      put('#current-horizon', layer.symbol);
      put('#current-depth', layer.depth);
      put('#current-color-code', layer.code);
      put('#current-color-name', layer.color);
      put('#current-structure', `${layer.grade} · pequena · granular`);
      put('#current-dry', layer.dry);
      put('#current-wet', 'Friável');
      put('#current-soaked', 'Plástico e pegajoso');
      put('#current-transition', 'Gradual');
      put('#current-note', layer.note || '');
      const note = $('#current-note');
      if (note) note.hidden = !layer.note;
      const swatch = $('#current-swatch');
      if (swatch) {
        swatch.style.backgroundColor = layer.swatch;
        swatch.setAttribute('aria-label', `Amostra cromática ilustrativa: ${layer.color}, ${layer.code}`);
      }
      put('#layer-position', `Camada ${layer.symbol} — ${layer.depth}`);
      put('#model-caption', `Perfil ${String(activeProfile).padStart(2, '0')} • ${profile.sequence.join(' / ')}`);
      const detailSource = `assets/perfil-${activeProfile}-${layer.symbol.toLowerCase()}.webp`;
      const detailPhoto = $('#detail-photo img');
      if (detailPhoto) {
        detailPhoto.src = detailSource;
        detailPhoto.alt = `Detalhe do horizonte ${layer.symbol} do Perfil ${activeProfile} registrado em campo`;
      }
      const photoLink = $('#detail-photo-link');
      if (photoLink) {
        photoLink.href = detailSource;
        photoLink.setAttribute('aria-label', `Ampliar fotografia do horizonte ${layer.symbol} do Perfil ${activeProfile}`);
      }
      modelCall('setLayer', activeLayer);
      modelCall('setSlice', slicePosition / 100);
      if (options.announce !== false && (changed || options.forceAnnouncement || options.slice === undefined)) {
        announce(`Perfil ${activeProfile}, horizonte ${layer.symbol}: ${layer.depth}, ${layer.color.toLowerCase()}. ${layer.note || ''}`.trim());
      }
    }

    function setProfile(number, options = {}) {
      const profileNumber = Number(number);
      if (!profiles[profileNumber]) return;
      activeProfile = profileNumber;
      const profile = profiles[activeProfile];
      $$('.profile-choice[data-profile]').forEach(button => {
        const active = Number(button.dataset.profile) === activeProfile;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('is-active', active);
      });
      put('#active-profile-index', String(activeProfile).padStart(2, '0'));
      put('#profile-name', profile.name);
      put('#profile-classification', 'Distrófico típico · classificação proposta no trabalho');
      put('#profile-sequence', profile.sequence.join(' · '));
      put('#profile-location', profile.coordinates);
      put('#interpretation', profile.interpretation);
      $$('.layer-button[data-layer]').forEach(button => {
        const index = clamp(button.dataset.layer, 0, 2);
        const layer = profile.layers[index];
        const symbol = $('[data-layer-symbol]', button);
        const depth = $('[data-layer-depth]', button);
        if (symbol) symbol.textContent = layer.symbol;
        if (depth) depth.textContent = layer.depth;
        button.setAttribute('aria-label', `Horizonte ${layer.symbol}, ${layer.depth}`);
      });
      modelCall('setProfile', activeProfile);
      selectLayer(options.layer ?? 0, { announce: options.announce !== false, forceAnnouncement: true });
    }

    $$('.profile-choice[data-profile]').forEach(button => button.addEventListener('click', () => setProfile(button.dataset.profile)));
    $$('.layer-button[data-layer]').forEach(button => {
      button.addEventListener('click', () => selectLayer(button.dataset.layer));
      button.addEventListener('keydown', event => {
        const index = Number(button.dataset.layer);
        let next;
        if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % 3;
        if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index + 2) % 3;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = 2;
        if (next === undefined) return;
        event.preventDefault();
        event.stopPropagation();
        selectLayer(next, { focus: true });
      });
    });
    $('#layer-slider')?.addEventListener('input', event => {
      const value = clamp(event.target.value, 0, 100);
      const layer = value < 33 ? 0 : value < 67 ? 1 : 2;
      selectLayer(layer, { slice: value });
    });
    window.addEventListener('soil-layer-select', event => {
      const index = Number(event.detail?.index);
      if (Number.isInteger(index) && index >= 0 && index <= 2) selectLayer(index);
    });
    $('#reset-explorer')?.addEventListener('click', () => {
      modelCall('reset');
      setView('explore');
      setProfile(1, { layer: 0 });
      announce('Explorador reiniciado. Perfil 1, horizonte A selecionado.');
    });

    function setComparisonReveal(value) {
      const percent = clamp(value, 0, 100);
      const reveal = $('#compare-reveal');
      const divider = $('#compare-divider');
      if (reveal) reveal.style.width = `${percent}%`;
      if (divider) divider.style.left = `${percent}%`;
      put('#compare-percent', `${Math.round(percent)}%`);
      const slider = $('#compare-slider');
      if (slider) {
        slider.value = String(percent);
        slider.setAttribute('aria-valuetext', `${Math.round(percent)}% do Perfil 01 revelado`);
      }
    }
    $('#compare-slider')?.addEventListener('input', event => setComparisonReveal(event.target.value));

    function renderComparison(key = comparisonKey) {
      comparisonKey = ['A', 'transition', 'B'].includes(key) ? key : 'A';
      const layerIndex = { A: 0, transition: 1, B: 2 }[comparisonKey];
      const first = profiles[1].layers[layerIndex];
      const second = profiles[2].layers[layerIndex];
      $$('.compare-horizon[data-key]').forEach(button => {
        const active = button.dataset.key === comparisonKey;
        button.setAttribute('aria-pressed', String(active));
        button.classList.toggle('is-active', active);
      });
      const rows = [
        ['Profundidade', first.depth, second.depth],
        ['Cor Munsell', `${first.code} · ${first.color.toLowerCase()}`, `${second.code} · ${second.color.toLowerCase()}`],
        ['Grau da estrutura', first.grade, second.grade],
        ['Consistência seca', first.dry, second.dry],
        ['Consistência úmida', 'Friável', 'Friável'],
        ['Consistência molhada', 'Plástico e pegajoso', 'Plástico e pegajoso'],
        ['Textura', 'Franco-argilosa', 'Franco-argilosa'],
        ['Transição', 'Gradual', 'Gradual']
      ];
      const body = $('#compare-data');
      if (body) {
        const fragment = document.createDocumentFragment();
        rows.forEach(([label, ...values]) => {
          const row = document.createElement('tr');
          const heading = document.createElement('th');
          heading.scope = 'row';
          heading.textContent = label;
          row.append(heading);
          values.forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.append(cell);
          });
          fragment.append(row);
        });
        body.replaceChildren(fragment);
      }
      put('#compare-summary', comparisonKey === 'transition'
        ? 'Transição: AB no Perfil 01 e BA no Perfil 02. A tabela da página 16 usa AB para o Perfil 02, enquanto o esquema e a descrição usam BA.'
        : comparisonKey === 'B'
          ? `Horizontes B: ${first.depth} no Perfil 01 e ${second.depth} no Perfil 02.`
          : 'Horizontes A: camadas superficiais dos dois perfis.');
    }
    $$('.compare-horizon[data-key]').forEach(button => button.addEventListener('click', () => renderComparison(button.dataset.key)));

    function setFieldProfile(number, options = {}) {
      const nextProfile = Number(number);
      if (!profiles[nextProfile]) return;
      fieldProfile = nextProfile;
      const profile = profiles[fieldProfile];
      $$('.field-point[data-profile], .field-list-item[data-profile]').forEach(button => {
        const active = Number(button.dataset.profile) === fieldProfile;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      const isEarth = fieldMapSource === 'earth';
      $$('.field-map-choice[data-source]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.source === fieldMapSource));
      });
      const photo = $('#field-photo');
      if (photo) {
        photo.src = `assets/${isEarth ? 'local' : 'mapa'}-perfil-${fieldProfile}.webp`;
        photo.alt = `Localização do Perfil ${fieldProfile} no ${isEarth ? 'Google Earth' : 'Google Maps'}, reproduzida do PDF.`;
      }
      put('#field-title', `Perfil ${String(fieldProfile).padStart(2, '0')} — ${profile.name}`);
      put('#field-coordinates', isEarth ? profile.coordinates : profile.mapCoordinates);
      put('#field-altitude', isEarth ? profile.altitude : 'Não informada neste registro');
      put('#field-coordinate-source', `PONTO REGISTRADO NO ${isEarth ? 'GOOGLE EARTH' : 'GOOGLE MAPS'}`);
      put('#field-attribution', `Imagem do relatório · ${isEarth ? 'Google Earth' : 'Google Maps'} · página ${fieldProfile === 1 ? '3' : '10'}`);
      const mapLink = $('#field-map-link');
      if (mapLink) {
        mapLink.href = isEarth ? profile.earth : profile.mapDocument;
        mapLink.textContent = `Abrir ${isEarth ? 'Google Earth' : 'Google Maps'}`;
        mapLink.setAttribute('aria-label', `Ver registro do Perfil ${fieldProfile} no ${isEarth ? 'Google Earth' : 'Google Maps'}`);
      }
      if (options.announce !== false) announce(`Perfil ${fieldProfile}, ${isEarth ? 'Google Earth' : 'Google Maps'}: ${isEarth ? profile.coordinates : profile.mapCoordinates}.`);
    }
    $$('.field-point[data-profile], .field-list-item[data-profile]').forEach(button => button.addEventListener('click', () => setFieldProfile(button.dataset.profile)));
    $$('.field-map-choice[data-source]').forEach(button => button.addEventListener('click', () => {
      fieldMapSource = button.dataset.source === 'maps' ? 'maps' : 'earth';
      setFieldProfile(fieldProfile);
    }));

    function setManagementProfile(number, options = {}) {
      const nextProfile = Number(number);
      if (!profiles[nextProfile]) return;
      managementProfile = nextProfile;
      const profile = profiles[managementProfile];
      $$('.management-choice[data-profile]').forEach(button => {
        button.setAttribute('aria-pressed', String(Number(button.dataset.profile) === managementProfile));
      });
      put('#management-profile-title', profile.classification);
      Object.entries(profile.management).forEach(([key, value]) => put(`#management-${key}`, value));
      if (options.announce !== false) announce(`Manejo do Perfil ${managementProfile}. ${profile.classification}.`);
    }
    $$('.management-choice[data-profile]').forEach(button => button.addEventListener('click', () => setManagementProfile(button.dataset.profile)));

    const tour = [
      { view: 'explore', profile: 1, layer: 0, title: 'Perfil 01 · Horizonte A', description: 'Comece pela superfície: 0–20 cm, cor 10 YR 3/4 e estrutura forte, pequena e granular. Arraste o modelo para observar suas faces.' },
      { view: 'explore', profile: 1, layer: 1, title: 'Perfil 01 · Horizonte AB', description: 'Na transição de 20–43 cm, o registro apresenta cor 7.5 YR 5/6 e grau de estrutura moderado. Compare a amostra com a fotografia de campo.' },
      { view: 'explore', profile: 1, layer: 2, title: 'Perfil 01 · Horizonte B', description: 'De 43 a 67 cm, a cor passa para 7.5 YR 5/8. O horizonte apresenta estrutura moderada, pequena e granular, com consistência macia quando seco e friável quando úmido.' },
      { view: 'explore', profile: 2, layer: 0, title: 'Perfil 02 · Horizonte A', description: 'O segundo perfil começa em 0–22 cm. A consistência seca é ligeiramente dura, enquanto a consistência úmida continua friável.' },
      { view: 'explore', profile: 2, layer: 1, title: 'Perfil 02 · Horizonte BA', description: 'Entre 22 e 50 cm, a camada de transição apresenta matiz 10 YR 5/6, bruno-amarelado, com estrutura moderada, pequena e granular.' },
      { view: 'explore', profile: 2, layer: 2, title: 'Perfil 02 · Horizonte B', description: 'De 50 a 95 cm, observe o registro 10 YR 5/8. O estudo apresenta este perfil como Latossolo Amarelo.' },
      { view: 'compare', comparison: 'B', title: 'Comparar as camadas subsuperficiais', description: 'Mova o divisor para confrontar as fotografias dos perfis completos. A tabela compara os horizontes B; o modelo e o divisor são recursos visuais, não escalas métricas.' },
      { view: 'field', title: 'Localização dos registros', description: 'Os dois perfis estão em Gurupi. Alterne entre os pontos e entre Google Earth e Google Maps para consultar os registros de localização apresentados no PDF.' },
      { view: 'management', title: 'Do perfil ao manejo', description: 'O trabalho relaciona relevo plano, estrutura granular e textura franco-argilosa à infiltração, à retenção de água e à mecanização. A distrofia foi presumida pelos autores, sem análise química. Compare as observações dos dois perfis.' },
      { view: 'study', title: 'Da observação à interpretação', description: 'Consulte os fundamentos da morfologia, as classificações propostas, a equipe e o docente. As descrições e interpretações dos perfis estão reunidas nesta seção, junto das notas sobre os registros divergentes.' }
    ];

    function applyTourStep(index) {
      tourIndex = clamp(index, 0, tour.length - 1);
      const step = tour[tourIndex];
      setView(step.view, { focus: true });
      if (step.profile) setProfile(step.profile, { layer: step.layer, announce: false });
      if (step.comparison) renderComparison(step.comparison);
      put('#tour-step', `${String(tourIndex + 1).padStart(2, '0')} / ${String(tour.length).padStart(2, '0')}`);
      put('#tour-title', step.title);
      put('#tour-description', step.description);
      const previous = $('#tour-prev');
      const next = $('#tour-next');
      if (previous) previous.disabled = tourIndex === 0;
      if (next) next.disabled = tourIndex === tour.length - 1;
      announce(`Passo ${tourIndex + 1} de ${tour.length}. ${step.title}. ${step.description}`);
    }

    async function exitTour(options = {}) {
      if (!touring) return;
      touring = false;
      document.body.classList.remove('touring');
      const bar = $('#tour-bar');
      if (bar) bar.hidden = true;
      $('#present-mode')?.setAttribute('aria-pressed', 'false');
      const exitOwnedFullscreen = ownedFullscreen && document.fullscreenElement;
      ownedFullscreen = false;
      if (exitOwnedFullscreen && typeof document.exitFullscreen === 'function') {
        try { await document.exitFullscreen(); } catch (_) { /* The guided tour has already ended. */ }
      }
      announce('Roteiro encerrado. A exploração livre continua disponível.');
      if (options.focus !== false) $('#present-mode')?.focus({ preventScroll: true });
    }

    async function startTour() {
      touring = true;
      document.body.classList.add('touring');
      const bar = $('#tour-bar');
      if (bar) bar.hidden = false;
      $('#present-mode')?.setAttribute('aria-pressed', 'true');
      applyTourStep(0);
      if (!document.fullscreenElement && typeof document.documentElement.requestFullscreen === 'function') {
        try {
          await document.documentElement.requestFullscreen();
          ownedFullscreen = true;
        } catch (_) { /* The full guided experience remains available in the browser window. */ }
      }
    }
    $('#present-mode')?.addEventListener('click', () => { if (touring) void exitTour(); else void startTour(); });
    $('#tour-prev')?.addEventListener('click', () => applyTourStep(tourIndex - 1));
    $('#tour-next')?.addEventListener('click', () => applyTourStep(tourIndex + 1));
    $('#tour-exit')?.addEventListener('click', () => void exitTour());
    document.addEventListener('fullscreenchange', () => {
      if (ownedFullscreen && !document.fullscreenElement) {
        ownedFullscreen = false;
        if (touring) void exitTour();
      }
    });

    const helpDialog = $('#help-dialog');
    const helpOpen = () => Boolean(helpDialog?.hasAttribute('open'));
    const closeHelp = () => {
      if (!helpDialog || !helpOpen()) return;
      if (typeof helpDialog.close === 'function') helpDialog.close();
      else helpDialog.removeAttribute('open');
      $('#help-button')?.setAttribute('aria-expanded', 'false');
    };
    $('#help-button')?.addEventListener('click', () => {
      if (!helpDialog) return;
      if (helpOpen()) { closeHelp(); return; }
      if (typeof helpDialog.showModal === 'function') helpDialog.showModal();
      else helpDialog.setAttribute('open', '');
      $('#help-button')?.setAttribute('aria-expanded', 'true');
    });
    $('#help-close')?.addEventListener('click', closeHelp);
    helpDialog?.addEventListener('close', () => $('#help-button')?.setAttribute('aria-expanded', 'false'));
    helpDialog?.addEventListener('click', event => {
      if (event.target !== helpDialog) return;
      const box = helpDialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeHelp();
    });

    document.addEventListener('keydown', event => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
      if (helpOpen()) {
        if (event.key === 'Escape' && typeof helpDialog.close !== 'function') {
          event.preventDefault();
          closeHelp();
        }
        return;
      }
      if (!touring) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        void exitTour();
        return;
      }
      if (event.target instanceof Element && event.target.closest('input, textarea, select, button, a, [role="tab"], [contenteditable="true"]')) return;
      let index;
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) index = tourIndex + 1;
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) index = tourIndex - 1;
      if (event.key === 'Home') index = 0;
      if (event.key === 'End') index = tour.length - 1;
      if (index !== undefined) {
        event.preventDefault();
        applyTourStep(index);
      }
    });

    const syncModel = () => {
      modelCall('setProfile', activeProfile);
      modelCall('setLayer', activeLayer);
      modelCall('setSlice', slicePosition / 100);
    };
    window.addEventListener('soil-model-ready', syncModel);
    window.addEventListener('model-ready', syncModel);
    const comparisonFrame = $('.comparison-frame');
    if (comparisonFrame && 'ResizeObserver' in window) {
      const comparisonObserver = new ResizeObserver(syncComparisonImageWidth);
      comparisonObserver.observe(comparisonFrame);
    } else window.addEventListener('resize', syncComparisonImageWidth);
    setView('explore');
    setProfile(1, { layer: 0, announce: false });
    renderComparison('A');
    setComparisonReveal($('#compare-slider')?.value ?? 50);
    setFieldProfile(1, { announce: false });
    setManagementProfile(1, { announce: false });
    const tourBar = $('#tour-bar');
    if (tourBar) tourBar.hidden = true;
    $('#present-mode')?.setAttribute('aria-pressed', 'false');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, { once: true });
  else ready();
})();
