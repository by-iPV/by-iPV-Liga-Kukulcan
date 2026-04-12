// [REL-LSK-01][A01][NEW] Hub Sport LSK ultra light MVP
(function () {
  const config = window.HUB_SPORT_LSK_CONFIG || {};
  const IPV_LOGO = "../assets/logo-ipv-oficial.png";
  const LOADING_STEP_COUNT = 5;
  const CATEGORY_ORDER = [
    "Menores (Cachi/Mini/Micro)",
    "Infantil Menor",
    "Secundaria Femenil",
    "Secundaria Varonil",
    "Preparatoria Femenil",
    "Preparatoria Varonil",
    "3ª Fuerza Femenil",
    "3ª Fuerza Varonil",
    "2ª Fuerza Femenil",
    "2ª Fuerza Varonil",
    "2ª Fuerza Libre Femenil",
    "1ª Fuerza Varonil",
    "Mixto Libre"
  ];

  // [REL-LSK-01][A01][NEW] Snapshot base de fuentes reales verificadas
  const PRE_REGISTERED_SOURCE = [
    {
      email: "maklon@me.com",
      branches: "Femenil",
      categories: "Preparatoria",
      logos: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      lastName: "Hernandez Carrillo",
      firstName: "Miguel Alonso",
      phone: "5518529034",
      teamName: ""
    },
    {
      email: "lfrguez@hotmail.com",
      branches: "Femenil",
      categories: "Preparatoria",
      logos: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      lastName: "Rodriguez May",
      firstName: "Luis Felipe",
      phone: "9991273915",
      teamName: ""
    },
    {
      email: "miguel.merida.jet.tcl@gmail.com",
      branches: "Femenil, Varonil y Mixto",
      categories: "Menores (Cachi/Micro/Mini), Infantil Menor, Secundaria, Preparatoria, 3ª Fuerza, 2ª Fuerza, Mixto Libre",
      logos: "https://drive.google.com/open?id=1K_aJTtpwPhEVqeA4y5lW6PJ8f7IRoHx-, https://drive.google.com/open?id=1GuX0x9HJi3lyw5QBJqlKf6OFL5cL2kAi, https://drive.google.com/open?id=13sbiEkLNRKb2P6oDpzG4-FNEXuYFZ3HG",
      lastName: "Morales Koh",
      firstName: "Elias Manaces",
      phone: "9991632676",
      teamName: "Centinelas - CDK"
    }
  ];

  const TEAMS_SOURCE = [
    {
      id: "1",
      name: "Centinelas",
      branch: "Femenil",
      category: "Preparatoria",
      ownerEmail: "maklonlesama@gmail.com"
    }
  ];

  const state = {
    sourceProfiles: [],
    showcaseEntries: [],
    loggedUser: null,
    activeSourceEmail: "",
    activeCategories: [],
    activeCategoryIndex: 0,
    activeDeckOffset: 0,
    secondaryCategories: [],
    activeSectionBIndex: 0,
    activeSectionBDeckOffset: 0,
    deckCache: {},
    lastMissingLiveSignature: "",
    sponsorLogoUrls: [],
    externalLogoEntries: [],
    viewMode: "pre",
    presenceRuntime: {
      sessionId: "",
      connected: false,
      heartbeatTimer: null,
      countTimer: null
    },
    // [REL-HUB-01][A16.0.2][NEW] Config de presencia preparada para integración gradual del contador.
    presence: resolvePresenceConfig(config.presence || {}),
    glassOpacity: String((config.settings && config.settings.glassOpacity) || "0.08"),
    googleReady: false,
    tooltipHideTimer: null,
    brandTooltipHideTimer: null
  };
  const curatedFallback = buildCuratedFallbackEntries();

  const el = {
    loadingOverlay: document.getElementById("loadingOverlay"),
    loadingLabel: document.getElementById("loadingLabel"),
    loadingProgressTrack: document.getElementById("loadingProgressTrack"),
    loadingPercent: document.getElementById("loadingPercent"),
    sidebar: document.getElementById("sidebar"),
    brandMark: document.getElementById("brandMark"),
    brandMarkTooltip: document.getElementById("brandMarkTooltip"),
    sidebarToggle: document.getElementById("sidebarToggle"),
    sourceEmailSelect: document.getElementById("sourceEmailSelect"),
    sourceEmailValue: document.getElementById("sourceEmailValue"),
    sourceModeValue: document.getElementById("sourceModeValue"),
    glassOpacityRange: document.getElementById("glassOpacityRange"),
    glassOpacityValue: document.getElementById("glassOpacityValue"),
    heroLoginBtn: document.getElementById("heroLoginBtn"),
    heroLoginTooltip: document.getElementById("heroLoginTooltip"),
    heroLoginTooltipText: document.getElementById("heroLoginTooltipText"),
    heroLoginTooltipLogout: document.getElementById("heroLoginTooltipLogout"),
    loginDropdown: document.getElementById("loginDropdown"),
    authStatus: document.getElementById("authStatus"),
    googleLoginButton: document.getElementById("googleLoginButton"),
    userSession: document.getElementById("userSession"),
    userName: document.getElementById("userName"),
    userEmail: document.getElementById("userEmail"),
    logoutBtn: document.getElementById("logoutBtn"),
    sponsorsCarousel: document.getElementById("sponsorsCarousel"),
    inscribedLogosRail: document.getElementById("inscribedLogosRail"),
    preCount: document.getElementById("preCount"),
    inscribedCount: document.getElementById("inscribedCount"),
    categoryCount: document.getElementById("categoryCount"),
    onlineCount: document.getElementById("onlineCount"),
    onlineStatus: document.getElementById("onlineStatus"),
    viewModePreBtn: document.getElementById("viewModePreBtn"),
    viewModeDemoBtn: document.getElementById("viewModeDemoBtn"),
    sectionANav: document.getElementById("sectionANav"),
    sectionAPrevBtn: document.getElementById("sectionAPrevBtn"),
    sectionANextBtn: document.getElementById("sectionANextBtn"),
    sectionAEyebrow: document.getElementById("sectionAEyebrow"),
    sectionATitle: document.getElementById("sectionATitle"),
    sectionAStatus: document.getElementById("sectionAStatus"),
    sectionADescription: document.getElementById("sectionADescription"),
    activeCategoryName: document.getElementById("activeCategoryName"),
    activeCategoryMeta: document.getElementById("activeCategoryMeta"),
    sectionADeck: document.getElementById("sectionADeck"),
    sectionBTitle: document.getElementById("sectionBTitle"),
    sectionBStatus: document.getElementById("sectionBStatus"),
    sectionBNav: document.getElementById("sectionBNav"),
    sectionBPrevBtn: document.getElementById("sectionBPrevBtn"),
    sectionBNextBtn: document.getElementById("sectionBNextBtn"),
    sectionBCategoryName: document.getElementById("sectionBCategoryName"),
    sectionBCategoryMeta: document.getElementById("sectionBCategoryMeta"),
    sectionBDeck: document.getElementById("sectionBDeck")
  };

  init();

  async function init() {
    document.body.classList.add("app-loading");
    try {
      setLoadingProgress(0);
      state.loggedUser = getSessionUser();
      state.viewMode = getInitialViewMode();
      await loadShowcaseSources();
      setLoadingProgress(1);
      await hydrateLogoCatalogs();
      setLoadingProgress(2);
      await waitForFonts();
      setLoadingProgress(3);
      state.activeSourceEmail = getInitialSourceEmail();
      hydrateVisualControls();
      applyGlass();
      bindEvents();
      await loadBackgroundFromDrive();
      setLoadingProgress(4);
      renderAll();
      announcePresenceConfig();
      initPresenceLayer();
      startRotation();
      setLoadingProgress(5);
      await waitMs(140);
    } finally {
      window.requestAnimationFrame(function () {
        document.body.classList.remove("app-loading");
      });
    }
  }

  async function loadShowcaseSources() {
    if (state.viewMode === "demo" || shouldUseDemoData()) {
      const demo = buildDemoShowcaseSources();
      applyShowcaseSources(demo.preRegisteredRows, demo.teamRows, "demo-curated");
      return;
    }
    try {
      const remote = await fetchRemoteShowcaseSources();
      const preRows = remote.preRegisteredRows || [];
      const teamRows = remote.teamRows || [];
      if (!preRows.length && !teamRows.length) throw new Error("bootstrap sin filas para Hub Sport LSK");
      applyShowcaseSources(preRows, teamRows, "apps-script-bootstrap");
    } catch (error) {
      console.warn("[HubSportLSK] fallback a dataset demo por error de fuente remota:", error);
      applyShowcaseSources(PRE_REGISTERED_SOURCE, TEAMS_SOURCE, "demo-fallback");
    }
  }

  function shouldUseDemoData() {
    return Boolean(config.dataSource && config.dataSource.useDemoData);
  }

  function applyShowcaseSources(preRegisteredRows, teamRows, mode) {
    state.sourceProfiles = (preRegisteredRows || []).map(normalizePreRegisteredRecord).filter(function (item) { return item.email; });
    state.showcaseEntries = buildShowcaseEntries(state.sourceProfiles, (teamRows || []).map(normalizeTeamRecord));
    console.info("[HubSportLSKDataSource]", {
      mode: mode,
      preRegisteredCount: state.sourceProfiles.length,
      teamsCount: uniqueBy((teamRows || []).map(normalizeTeamRecord), function (team) { return String(team.id || team.name || ""); }).length,
      sheets: config.dataSource && config.dataSource.sheets ? config.dataSource.sheets : {}
    });
  }

  async function fetchRemoteShowcaseSources() {
    const url = String(config.appsScriptUrl || "").trim();
    if (!url) throw new Error("appsScriptUrl no configurado");
    const response = await fetch(url + "?action=bootstrap");
    const json = await response.json();
    const payload = unwrapResponse(json);
    const preRowsRaw = payload.preRegisteredTeams || payload.equiposInscritos || payload.preRegistered || payload.inscritos || [];
    const teamRowsRaw = payload.teams || payload.Teams || payload.teamsRows || [];
    return {
      preRegisteredRows: (preRowsRaw || []).map(normalizeIncomingPreRegisteredRow),
      teamRows: (teamRowsRaw || []).map(normalizeIncomingTeamRow)
    };
  }

  function resolvePresenceConfig(input) {
    const env = String(input.env || "local").trim() || "local";
    const endpointByEnv = input.endpointByEnv || {};
    return {
      enabled: input.enabled !== false,
      env: env,
      roomId: String(input.roomId || "hub-sport-lsk-global").trim() || "hub-sport-lsk-global",
      heartbeatMs: Number(input.heartbeatMs) || 15000,
      countRefreshMs: Number(input.countRefreshMs) || 10000,
      staleTtlMs: Number(input.staleTtlMs) || 35000,
      endpointBase: String(endpointByEnv[env] || endpointByEnv.prod || "").trim(),
      tracking: {
        enabled: !input.tracking || input.tracking.enabled !== false,
        mode: String(input.tracking && input.tracking.mode || "hash-only"),
        requireConsent: !input.tracking || input.tracking.requireConsent !== false
      }
    };
  }

  function announcePresenceConfig() {
    if (!state.presence.enabled) return;
    // [REL-HUB-01][A16.0.2][NEW] Punto estratégico: dejar visible en consola la configuración activa para pruebas.
    console.info("[HubPresenceConfig]", {
      env: state.presence.env,
      roomId: state.presence.roomId,
      endpointBase: state.presence.endpointBase || "(sin endpoint configurado)",
      tracking: state.presence.tracking
    });
  }

  function bindEvents() {
    el.sidebarToggle.addEventListener("click", toggleSidebar);
    if (el.viewModePreBtn) {
      el.viewModePreBtn.addEventListener("click", function () { setViewMode("pre"); });
    }
    if (el.viewModeDemoBtn) {
      el.viewModeDemoBtn.addEventListener("click", function () { setViewMode("demo"); });
    }
    if (el.sectionAPrevBtn) {
      el.sectionAPrevBtn.addEventListener("click", function () {
        moveSectionACategory(-1);
      });
    }
    if (el.sectionANextBtn) {
      el.sectionANextBtn.addEventListener("click", function () {
        moveSectionACategory(1);
      });
    }
    if (el.sectionBPrevBtn) {
      el.sectionBPrevBtn.addEventListener("click", function () {
        moveSectionBCategory(-1);
      });
    }
    if (el.sectionBNextBtn) {
      el.sectionBNextBtn.addEventListener("click", function () {
        moveSectionBCategory(1);
      });
    }
    el.heroLoginBtn.addEventListener("click", function () {
      toggleLoginDropdown();
    });
    if (el.brandMark && el.brandMarkTooltip) {
      el.brandMark.addEventListener("mouseenter", showBrandTooltip);
      el.brandMark.addEventListener("mouseleave", scheduleHideBrandTooltip);
      el.brandMarkTooltip.addEventListener("mouseenter", showBrandTooltip);
      el.brandMarkTooltip.addEventListener("mouseleave", scheduleHideBrandTooltip);
    }
    el.heroLoginBtn.addEventListener("mouseenter", renderLoginTooltip);
    el.heroLoginBtn.addEventListener("mouseleave", function () {
      scheduleHideLoginTooltip();
    });
    el.heroLoginTooltip.addEventListener("mouseenter", function () {
      if (state.loggedUser && state.loggedUser.email) {
        showLoginTooltip();
      }
    });
    el.heroLoginTooltip.addEventListener("mouseleave", function () {
      scheduleHideLoginTooltip();
    });
    el.heroLoginTooltipLogout.addEventListener("click", function (event) {
      event.stopPropagation();
      logout();
    });
    el.glassOpacityRange.addEventListener("input", function () {
      state.glassOpacity = String(el.glassOpacityRange.value || "0.08");
      window.localStorage.setItem("hubSportLskGlassOpacity", state.glassOpacity);
      updateOpacityValue();
      applyGlass();
    });
    el.logoutBtn.addEventListener("click", function () {
      logout();
    });
    el.sourceEmailSelect.addEventListener("change", function () {
      state.activeSourceEmail = el.sourceEmailSelect.value || "";
      state.activeCategoryIndex = 0;
      state.activeDeckOffset = 0;
      state.activeSectionBIndex = 0;
      state.activeSectionBDeckOffset = 0;
      syncUrl();
      renderAll();
    });
    document.addEventListener("click", function (event) {
      if (el.loginDropdown.classList.contains("hidden")) return;
      if (!el.loginDropdown.contains(event.target) && !el.heroLoginBtn.contains(event.target)) {
        closeLoginDropdown();
      }
    });
    window.addEventListener("beforeunload", function () {
      presenceLeaveBestEffort("beforeunload");
    });
  }

  function initPresenceLayer() {
    if (!el.onlineCount || !el.onlineStatus) return;
    if (!state.presence.enabled || !state.presence.endpointBase) {
      el.onlineCount.textContent = "--";
      el.onlineStatus.textContent = "PCL off";
      return;
    }
    state.presenceRuntime.sessionId = createId("pcl");
    presenceJoinAndStart().catch(function () {
      el.onlineCount.textContent = "--";
      el.onlineStatus.textContent = "PCL error";
    });
  }

  async function presenceJoinAndStart() {
    await presencePost("join");
    state.presenceRuntime.connected = true;
    el.onlineStatus.textContent = "conectado";
    await refreshPresenceCount();
    if (state.presenceRuntime.heartbeatTimer) window.clearInterval(state.presenceRuntime.heartbeatTimer);
    if (state.presenceRuntime.countTimer) window.clearInterval(state.presenceRuntime.countTimer);
    state.presenceRuntime.heartbeatTimer = window.setInterval(function () {
      if (document.hidden) return;
      presencePost("heartbeat").catch(function () {
        el.onlineStatus.textContent = "reintentando";
      });
    }, state.presence.heartbeatMs || 15000);
    state.presenceRuntime.countTimer = window.setInterval(function () {
      if (document.hidden) return;
      refreshPresenceCount();
    }, state.presence.countRefreshMs || 10000);
  }

  async function refreshPresenceCount() {
    try {
      const response = await fetch(buildPresenceUrl("count"));
      if (!response.ok) throw new Error("count http " + response.status);
      const data = await response.json();
      const count = Number(data.activeCount);
      el.onlineCount.textContent = Number.isFinite(count) ? String(count) : "--";
      el.onlineStatus.textContent = "en vivo";
    } catch (_) {
      el.onlineCount.textContent = "--";
      el.onlineStatus.textContent = "sin señal";
    }
  }

  async function presencePost(eventType) {
    const response = await fetch(buildPresenceUrl(eventType), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sessionId: state.presenceRuntime.sessionId,
        roomId: state.presence.roomId,
        eventType: eventType,
        sourceApp: "hub-sport-lsk-ultralight",
        processType: "hub-presence",
        now: Date.now()
      })
    });
    if (!response.ok) throw new Error(eventType + " http " + response.status);
    return response.json();
  }

  function buildPresenceUrl(eventType) {
    const base = String(state.presence.endpointBase || "").replace(/\/+$/, "");
    return base + "/presence/" + eventType + "?roomId=" + encodeURIComponent(state.presence.roomId || "hub-sport-lsk-global");
  }

  function presenceLeaveBestEffort(reason) {
    if (!state.presenceRuntime.sessionId || !state.presence.endpointBase) return;
    const payload = JSON.stringify({
      sessionId: state.presenceRuntime.sessionId,
      roomId: state.presence.roomId,
      eventType: "leave",
      sourceApp: "hub-sport-lsk-ultralight",
      processType: "hub-presence",
      reason: String(reason || "leave"),
      now: Date.now()
    });
    const url = buildPresenceUrl("leave");
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon(url, blob);
        return;
      }
    } catch (_) {
    }
  }

  function renderAll() {
    updateOpacityValue();
    renderModeSwitch();
    renderSourceSelector();
    renderAuthPanel();
    renderSummary();
    renderSponsorsCarousel();
    renderInscribedRail();
    renderSectionA();
    renderSectionB();
  }

  function renderSourceSelector() {
    const options = ["<option value=''>Catalogo general</option>"].concat(
      state.sourceProfiles.map(function (profile) {
        return "<option value='" + esc(profile.email) + "'>" + esc(profile.email) + "</option>";
      })
    );

    el.sourceEmailSelect.innerHTML = options.join("");
    el.sourceEmailSelect.value = state.activeSourceEmail;

    const sourceProfile = getActiveSourceProfile();
    el.sourceEmailValue.textContent = sourceProfile ? sourceProfile.email : "Catalogo general";
    if (state.viewMode === "demo") {
      el.sourceModeValue.textContent = "Demo curado";
    } else {
      el.sourceModeValue.textContent = sourceProfile ? "Categorias del correo origen" : "Rotacion completa";
    }
  }

  function renderModeSwitch() {
    if (!el.viewModePreBtn || !el.viewModeDemoBtn) return;
    el.viewModePreBtn.classList.toggle("is-active", state.viewMode === "pre");
    el.viewModeDemoBtn.classList.toggle("is-active", state.viewMode === "demo");
  }

  async function setViewMode(mode) {
    const next = mode === "demo" ? "demo" : "pre";
    if (state.viewMode === next) return;
    state.viewMode = next;
    window.localStorage.setItem("hubSportLskViewMode", next);
    state.activeCategoryIndex = 0;
    state.activeDeckOffset = 0;
    state.activeSectionBIndex = 0;
    state.activeSectionBDeckOffset = 0;
    state.deckCache = {};
    await loadShowcaseSources();
    state.activeSourceEmail = getInitialSourceEmail();
    renderAll();
  }

  function renderAuthPanel() {
    const saved = state.loggedUser;
    el.heroLoginBtn.classList.toggle("is-google-icon", Boolean(saved && saved.email));
    el.heroLoginBtn.innerHTML = saved && saved.email ? "<span class='google-mark' aria-hidden='true'>G</span>" : "Acceso con Google";
    el.heroLoginBtn.setAttribute("aria-label", saved && saved.email ? "Cuenta de Google" : "Acceso con Google");
    if (saved) {
      el.authStatus.textContent = "Sesion de Google activa para personalizar la experiencia del hub.";
      el.userSession.classList.remove("hidden");
      el.googleLoginButton.classList.add("hidden");
      el.userName.textContent = saved.name || "Usuario";
      el.userEmail.textContent = saved.email || "";
      renderLoginTooltip();
      return;
    }

    el.authStatus.textContent = String(config.googleClientId || "").trim() ? "Inicia sesión con Google para personalizar la categoría origen del enlace." : "Agrega tu Google Client ID en config.js.";
    el.userSession.classList.add("hidden");
    el.googleLoginButton.classList.remove("hidden");
    hideLoginTooltipImmediate();
    initGoogleAuth(false);
  }

  function renderSummary() {
    const preCount = state.showcaseEntries.filter(function (entry) { return entry.status === "Pre-inscrito"; }).length;
    const inscribedCount = state.showcaseEntries.filter(function (entry) { return entry.status === "Inscrito"; }).length;
    const categories = unique(state.showcaseEntries.map(function (entry) { return entry.categoryDisplay; }));

    el.preCount.textContent = String(preCount);
    el.inscribedCount.textContent = String(inscribedCount);
    el.categoryCount.textContent = String(categories.length);
  }

  function renderSponsorsCarousel() {
    const urls = state.sponsorLogoUrls.length
      ? state.sponsorLogoUrls
      : [
          "../assets/logo-ipv-oficial.png",
          "../assets/logo-ipv-oficial.png"
        ];

    el.sponsorsCarousel.innerHTML = renderCarousel(urls, "sponsor-logo", "Patrocinador");
  }

  function renderInscribedRail() {
    const entries = uniqueBy(state.showcaseEntries.filter(function (entry) {
      return entry.status === "Inscrito" && hasRenderableLogo(entry);
    }), function (entry) {
      return entry.teamName + "|" + entry.logoUrl + "|" + entry.categoryDisplay;
    });

    if (!entries.length) {
      el.inscribedLogosRail.innerHTML = "<div class='empty-state'>Todavia no hay logos inscritos para mostrar.</div>";
      return;
    }

    const urls = entries.slice(0, 8).map(function (entry) {
      return entry.logoUrl || IPV_LOGO;
    });
    el.inscribedLogosRail.innerHTML = renderCarousel(urls, "team-logo-item", "Logo inscrito");
  }

  function renderSectionA() {
    const categories = getSectionACategories();
    state.activeCategories = categories;
    if (state.activeCategoryIndex >= categories.length) state.activeCategoryIndex = 0;

    const activeCategory = categories[state.activeCategoryIndex] || "";
    const sourceProfile = getActiveSourceProfile();
    let entries = state.showcaseEntries.filter(function (entry) {
      return entry.categoryDisplay === activeCategory && (!sourceProfile || entry.sourceEmail === sourceProfile.email);
    });
    entries = entries.filter(hasRenderableLogo);
    if (!entries.length) entries = getRenderableCategoryEntriesFromFallback(activeCategory);
    const uniqueTeamsCount = countUniqueTeams(entries);
    const displayEntries = uniqueTeamsCount === 1 && entries.length ? [entries[0]] : entries;

    el.sectionATitle.textContent = getSectionATitle(entries);
    el.sectionAStatus.textContent = "";
    el.sectionAStatus.classList.add("hidden");
    el.sectionADescription.textContent = "";
    el.activeCategoryName.textContent = activeCategory || "Sin categoria";
    if (el.sectionAEyebrow) {
      el.sectionAEyebrow.textContent = uniqueTeamsCount === 1 ? "Mi categoría" : "Mis categorías";
    }
    el.activeCategoryMeta.textContent = uniqueTeamsCount === 1 ? "1 categoría activa" : formatCategoryCountLabel(categories.length);
    if (el.sectionANav) {
      el.sectionANav.classList.remove("hidden");
      const canNavigate = categories.length > 1;
      el.sectionANav.classList.toggle("is-disabled", !canNavigate);
      if (el.sectionAPrevBtn) el.sectionAPrevBtn.disabled = !canNavigate;
      if (el.sectionANextBtn) el.sectionANextBtn.disabled = !canNavigate;
    }

    if (!displayEntries.length) {
      el.sectionADeck.innerHTML = "<div class='empty-state'>No hay logos disponibles para la categoria activa.</div>";
      return;
    }

    el.sectionADeck.innerHTML = renderCardCarousel(displayEntries, {
      forceMarquee: true,
      minItems: uniqueTeamsCount === 1 ? 0 : 8,
      trackClass: "section-marquee-track",
      singularTravel: uniqueTeamsCount === 1 && displayEntries.length === 1
    });
  }

  function getSectionATitle(entries) {
    const list = Array.isArray(entries) ? entries : [];
    if (!list.length) return "Equipos Pre-inscritos/Inscritos";

    const uniqueTeams = collectUniqueTeams(list);

    if (uniqueTeams.size <= 1) {
      const firstStatus = String(list[0] && list[0].status || "").toLowerCase();
      if (firstStatus === "inscrito") return "Equipo inscrito";
      return "Equipo pre-inscrito";
    }

    return "Equipos Pre-inscritos/Inscritos";
  }

  function formatCategoryCountLabel(count) {
    const total = Number(count) || 0;
    if (total === 1) return "1 categoría activa";
    return total + " categorías activas";
  }

  function countUniqueTeams(entries) {
    return collectUniqueTeams(entries).size;
  }

  function collectUniqueTeams(entries) {
    const list = Array.isArray(entries) ? entries : [];
    return new Set(
      list.map(function (entry) {
        const teamName = String(entry && entry.teamName || "").trim().toLowerCase();
        const fallback = String(entry && entry.id || "").split("|")[0];
        return teamName || fallback || "equipo";
      })
    );
  }

  function renderSectionB() {
    const missingLive = CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntries(category).length === 0;
    });
    const missingSig = missingLive.join("|");
    if (missingSig !== state.lastMissingLiveSignature) {
      state.lastMissingLiveSignature = missingSig;
      if (missingLive.length) {
        console.info("[HubSportLSK] categorias sin logos en fuente activa (cubiertas por fallback curado):", missingLive);
      }
    }

    const categories = CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntries(category).length > 0 || getRenderableCategoryEntriesFromFallback(category).length > 0;
    });

    state.secondaryCategories = categories;
    if (el.sectionBNav) {
      el.sectionBNav.classList.remove("hidden");
      const canNavigate = categories.length > 1;
      el.sectionBNav.classList.toggle("is-disabled", !canNavigate);
      if (el.sectionBPrevBtn) el.sectionBPrevBtn.disabled = !canNavigate;
      if (el.sectionBNextBtn) el.sectionBNextBtn.disabled = !canNavigate;
    }
    if (!categories.length) {
      console.warn("[HubSportLSK] Seccion B sin logos. Revisar categorias:", CATEGORY_ORDER.slice());
      el.sectionBTitle.textContent = "Categorías disponibles del evento";
      el.sectionBCategoryName.textContent = "Catálogo completo";
      el.sectionBCategoryMeta.textContent = "Categorías disponibles";
      el.sectionBStatus.classList.add("hidden");
      el.sectionBDeck.innerHTML = getRenderableEntries(curatedFallback).length
        ? renderCardCarousel(getRenderableEntries(curatedFallback), {
            forceMarquee: true,
            minItems: 8,
            trackClass: "section-marquee-track"
          })
        : "<div class='empty-state'>Revisar dataset curado de logos por categoria.</div>";
      return;
    }
    if (state.activeSectionBIndex >= categories.length) state.activeSectionBIndex = 0;
    const activeSecondary = categories[state.activeSectionBIndex] || categories[0];
    const sectionBPool = getRenderableCategoryEntries(activeSecondary);
    const stablePool = sectionBPool.length ? getStableDeck("sectionB|" + activeSecondary, sectionBPool) : getRenderableCategoryEntriesFromFallback(activeSecondary);
    const entries = stablePool.length ? stablePool : getRenderableEntries(curatedFallback);

    el.sectionBTitle.textContent = "Categorías disponibles del evento";
    el.sectionBCategoryName.textContent = activeSecondary;
    el.sectionBCategoryMeta.textContent = "Categorías disponibles";
    el.sectionBStatus.textContent = "";
    el.sectionBStatus.classList.add("hidden");
    const sectionBCopy = document.querySelector("#sectionBStatus").closest(".panel").querySelector(".section-copy");
    if (sectionBCopy) sectionBCopy.textContent = "";
    el.sectionBDeck.innerHTML = renderCardCarousel(entries, {
      forceMarquee: true,
      minItems: 8,
      trackClass: "section-marquee-track"
    });
  }

  function startRotation() {
    window.setInterval(function () {
      if (document.hidden) return;
      let changedSectionA = false;
      let changedSectionB = false;
      if (state.activeCategories.length > 1) {
        state.activeCategoryIndex = (state.activeCategoryIndex + 1) % state.activeCategories.length;
        changedSectionA = true;
      }
      if (state.secondaryCategories.length > 1) {
        state.activeSectionBIndex = (state.activeSectionBIndex + 1) % state.secondaryCategories.length;
        changedSectionB = true;
      }
      if (changedSectionA) renderSectionA();
      if (changedSectionB) renderSectionB();
    }, 24000);
  }

  function moveSectionACategory(delta) {
    if (!state.activeCategories.length) return;
    state.activeCategoryIndex = (state.activeCategoryIndex + delta + state.activeCategories.length) % state.activeCategories.length;
    renderSectionA();
  }

  function moveSectionBCategory(delta) {
    if (!state.secondaryCategories.length) return;
    state.activeSectionBIndex = (state.activeSectionBIndex + delta + state.secondaryCategories.length) % state.secondaryCategories.length;
    renderSectionB();
  }

  function getStableDeck(cacheKey, entries) {
    const incoming = entries || [];
    const fingerprint = incoming.map(function (entry) { return String(entry.id || ""); }).join("|");
    const cached = state.deckCache[cacheKey];
    if (cached && cached.fingerprint === fingerprint) return cached.items.slice();
    const shuffled = shuffle(incoming.slice());
    state.deckCache[cacheKey] = {
      fingerprint: fingerprint,
      items: shuffled.slice()
    };
    return shuffled;
  }

  function buildShowcaseEntries(preRegisteredProfiles, teams) {
    const entries = [];
    const consumedTeamIds = new Set();

    preRegisteredProfiles.forEach(function (profile) {
      profile.displayCategories.forEach(function (category) {
        const teamMatch = findTeamMatch(profile, category, teams);
        const logos = profile.logoUrls.length ? profile.logoUrls : [IPV_LOGO];
        logos.forEach(function (logoUrl, index) {
          entries.push({
            id: profile.email + "|" + category + "|" + index,
            sourceEmail: profile.email,
            teamName: profile.teamName || displayNameFromProfile(profile),
            categoryDisplay: category,
            branch: inferBranchFromCategory(category),
            logoUrl: logoUrl || IPV_LOGO,
            status: teamMatch ? "Inscrito" : "Pre-inscrito",
            statusVariant: teamMatch ? "conciliado" : "pre",
            source: "preRegistered"
          });
        });
        if (teamMatch) consumedTeamIds.add(teamMatch.id);
      });
    });

    teams.forEach(function (team) {
      if (consumedTeamIds.has(team.id)) return;
      entries.push({
        id: "team|" + team.id,
        sourceEmail: team.ownerEmail || "",
        teamName: team.name || "Equipo inscrito",
        categoryDisplay: mapTeamCategory(team.branch, team.category),
        branch: team.branch,
        logoUrl: IPV_LOGO,
        status: "Inscrito",
        statusVariant: "directo",
        source: "teams"
      });
    });

    return entries.sort(function (a, b) {
      return CATEGORY_ORDER.indexOf(a.categoryDisplay) - CATEGORY_ORDER.indexOf(b.categoryDisplay);
    });
  }

  function normalizePreRegisteredRecord(record) {
    const branches = splitMultiValue(record.branches).flatMap(splitAndWord);
    const categories = splitMultiValue(record.categories);
    return {
      email: String(record.email || "").trim().toLowerCase(),
      branches: unique(branches.map(normalizeBranchLabel).filter(Boolean)),
      categories: unique(categories.map(cleanCategoryLabel).filter(Boolean)),
      logoUrls: unique(splitMultiValue(record.logos).map(toDriveThumbnail).filter(Boolean)),
      teamName: String(record.teamName || "").trim(),
      contactName: [record.firstName, record.lastName].filter(Boolean).join(" ").trim(),
      phone: String(record.phone || "").trim(),
      displayCategories: expandDisplayCategories(categories, branches)
    };
  }

  function normalizeTeamRecord(record) {
    return {
      id: String(record.id || "").trim() || createId("team"),
      name: String(record.name || "").trim(),
      branch: String(record.branch || "").trim(),
      category: String(record.category || "").trim(),
      ownerEmail: normalizeEmail(record.ownerEmail || "")
    };
  }

  function buildDemoShowcaseSources() {
    const logoPool = unique(
      PRE_REGISTERED_SOURCE
        .map(function (row) { return splitMultiValue(row.logos || ""); })
        .reduce(function (acc, list) { return acc.concat(list); }, [])
        .map(toDriveThumbnail)
        .filter(Boolean)
    );
    const safeLogos = logoPool.length ? logoPool : [IPV_LOGO];
    const shuffledCategories = shuffle(CATEGORY_ORDER.slice());
    const demoPre = [];
    const demoTeams = [];
    shuffledCategories.forEach(function (category, idx) {
      const mapping = toDemoRawCategory(category);
      const baseName = "Demo " + String(idx + 1).padStart(2, "0");
      const email = "demo" + String(idx + 1).padStart(2, "0") + "@hub-lsk.local";
      const logoA = safeLogos[idx % safeLogos.length];
      demoPre.push({
        email: email,
        branches: mapping.branch,
        categories: mapping.categoryRaw,
        logos: logoA,
        firstName: "Equipo",
        lastName: baseName,
        phone: "",
        teamName: baseName + " " + category
      });
      if (idx % 3 === 0 || idx % 5 === 0) {
        demoTeams.push({
          id: "demo-team-" + idx,
          name: baseName + " " + category,
          branch: mapping.branch,
          category: mapping.categoryRaw,
          ownerEmail: "inscrito" + idx + "@hub-lsk.local"
        });
      }
    });
    return {
      preRegisteredRows: demoPre,
      teamRows: demoTeams
    };
  }

  function toDemoRawCategory(category) {
    if (/Menores/i.test(category)) return { branch: "Femenil", categoryRaw: "Menores (Cachi/Micro/Mini)" };
    if (/Infantil Menor/i.test(category)) return { branch: "Femenil", categoryRaw: "Infantil Menor" };
    if (/Secundaria Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "Secundaria" };
    if (/Secundaria Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "Secundaria" };
    if (/Preparatoria Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "Preparatoria" };
    if (/Preparatoria Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "Preparatoria" };
    if (/3[ªa]\s*Fuerza Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "3a Fuerza" };
    if (/3[ªa]\s*Fuerza Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "3a Fuerza" };
    if (/2[ªa]\s*Fuerza Libre Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "2a Fuerza" };
    if (/2[ªa]\s*Fuerza Femenil/i.test(category)) return { branch: "Femenil", categoryRaw: "2a Fuerza" };
    if (/2[ªa]\s*Fuerza Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "2a Fuerza" };
    if (/1[ªa]\s*Fuerza Varonil/i.test(category)) return { branch: "Varonil", categoryRaw: "Libre Var" };
    if (/Mixto Libre/i.test(category)) return { branch: "Mixto", categoryRaw: "Mixto Libre" };
    return { branch: "Femenil", categoryRaw: "Preparatoria" };
  }

  function normalizeIncomingPreRegisteredRow(row) {
    return {
      email: getField(row, ["email", "Direccion de correo electronico", "Dirección de correo electrónico", "correo", "Correo"]),
      branches: getField(row, ["branches", "branch", "Rama", "Rama (si aplica)"]),
      categories: getField(row, ["categories", "category", "Categoria(s)", "Categoría(s)"]),
      logos: getField(row, ["logos", "logo", "Logo(s)", "logoUrl", "logo_url"]),
      firstName: getField(row, ["firstName", "Nombres(s)", "Nombres", "nombre"]),
      lastName: [
        getField(row, ["lastName", "A. Paterno", "Apellido paterno"]),
        getField(row, ["A. Materno", "Apellido materno"])
      ].filter(Boolean).join(" ").trim(),
      phone: getField(row, ["phone", "Telefono de contacto", "Teléfono de contacto", "telefono"]),
      teamName: getField(row, ["teamName", "Nombre(s) de equipo", "Nombre del equipo", "team"])
    };
  }

  function normalizeIncomingTeamRow(row) {
    return {
      id: getField(row, ["id", "ID", "Id"]),
      name: getField(row, ["name", "Name", "Nombre", "teamName", "team"]),
      branch: getField(row, ["branch", "Branch", "Rama"]),
      category: getField(row, ["category", "Category", "Categoria", "Categoría"]),
      ownerEmail: getField(row, ["ownerEmail", "owneremail", "email", "Correo", "Dirección de correo electrónico"])
    };
  }

  function renderCarousel(urls, itemClass, altLabel) {
    if (!urls.length) {
      return "<div class='empty-state'>Sin elementos para mostrar.</div>";
    }

    const items = urls.map(function (url, index) {
      return "<div class='" + itemClass + "'><img src='" + esc(url) + "' alt='" + esc(altLabel + " " + (index + 1)) + "' onerror=\"this.src='" + IPV_LOGO + "'\"></div>";
    }).join("");

    return "<div class='carousel-track'><div class='carousel-group'>" + items + "</div><div class='carousel-group' aria-hidden='true'>" + items + "</div></div>";
  }

  function applyGlass() {
    const value = String(state.glassOpacity || "0.08").trim();
    document.documentElement.style.setProperty("--glass-opacity", value);
  }

  function hydrateVisualControls() {
    const savedOpacity = String(window.localStorage.getItem("hubSportLskGlassOpacity") || state.glassOpacity || "0.08");
    state.glassOpacity = savedOpacity;
    if (el.glassOpacityRange) el.glassOpacityRange.value = savedOpacity;
    updateOpacityValue();
  }

  function updateOpacityValue() {
    if (!el.glassOpacityValue) return;
    el.glassOpacityValue.textContent = Number(state.glassOpacity || "0.08").toFixed(2);
  }

  function toggleSidebar() {
    if (!el.sidebar) return;
    el.sidebar.classList.toggle("is-collapsed");
    const collapsed = el.sidebar.classList.contains("is-collapsed");
    el.sidebarToggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    el.sidebarToggle.innerHTML = "<span class='sidebar-toggle-icon' aria-hidden='true'>" + (collapsed ? "❯" : "❮") + "</span>";
  }

  function toggleLoginDropdown() {
    const next = el.loginDropdown.classList.contains("hidden");
    el.loginDropdown.classList.toggle("hidden", !next);
    if (next) renderAuthPanel();
  }

  function closeLoginDropdown() {
    el.loginDropdown.classList.add("hidden");
  }

  function initGoogleAuth(promptUser) {
    const clientId = String(config.googleClientId || "").trim();
    if (!clientId || !el.googleLoginButton) return;
    waitForGoogle().then(function () {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) return;
      if (!state.googleReady) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse
        });
        state.googleReady = true;
      }
      el.googleLoginButton.innerHTML = "";
      window.google.accounts.id.renderButton(el.googleLoginButton, {
        theme: "outline",
        size: "large",
        shape: "pill",
        locale: "es"
      });
      if (promptUser) return;
    }).catch(function () {});
  }

  function handleCredentialResponse(response) {
    try {
      const payload = decodeJwt(response && response.credential);
      if (!payload || !payload.email) return;
      state.loggedUser = {
        email: String(payload.email || "").trim().toLowerCase(),
        name: payload.name || payload.email
      };
      localStorage.setItem(config.sessionStorageKey || "hub-sport-lsk-session", JSON.stringify(state.loggedUser));
      adoptLoggedUserAsSource();
      closeLoginDropdown();
      renderAll();
    } catch (_) {}
  }

  function logout() {
    state.loggedUser = null;
    localStorage.removeItem(config.sessionStorageKey || "hub-sport-lsk-session");
    state.activeSourceEmail = getInitialSourceEmail();
    hideLoginTooltipImmediate();
    closeLoginDropdown();
    renderAll();
  }

  function adoptLoggedUserAsSource() {
    const email = normalizeEmail(state.loggedUser && state.loggedUser.email);
    if (!email) return;
    if (state.sourceProfiles.some(function (profile) { return profile.email === email; })) {
      state.activeSourceEmail = email;
      syncUrl();
      return;
    }
    state.activeSourceEmail = "";
    syncUrl();
  }

  async function hydrateLogoCatalogs() {
    const sponsorsFolderId = normalizeFolderId(String((config.settings && config.settings.sponsorsFolderId) || ""));
    if (sponsorsFolderId) {
      try {
        const sponsorImages = await getImages(sponsorsFolderId);
        // Se conservan todas las imágenes entregadas por la carpeta (sin deduplicar)
        // para respetar el inventario visual completo de patrocinadores.
        state.sponsorLogoUrls = sponsorImages
          .map(function (item) { return safeImageUrl(item.url); })
          .filter(Boolean);
      } catch (error) {
        console.warn("[HubSportLSK] no se pudieron cargar logos de patrocinadores", error);
      }
    }

    const teamLogosFolderId = normalizeFolderId(String((config.settings && config.settings.teamLogosFolderId) || ""));
    if (teamLogosFolderId) {
      try {
        const teamImages = await getImages(teamLogosFolderId);
        state.externalLogoEntries = buildExternalLogoEntries(teamImages);
      } catch (error) {
        console.warn("[HubSportLSK] no se pudo cargar catálogo masivo de logos", error);
      }
    }
  }

  function buildExternalLogoEntries(images) {
    const rows = Array.isArray(images) ? images : [];
    const byCategory = {};
    CATEGORY_ORDER.forEach(function (category) { byCategory[category] = 0; });
    const entries = rows.map(function (item, index) {
      const rawName = String(item.name || "");
      const category = classifyLogoCategory(rawName, index);
      byCategory[category] = (byCategory[category] || 0) + 1;
      return {
        id: "drive|" + index + "|" + rawName,
        sourceEmail: "",
        teamName: guessTeamName(rawName),
        categoryDisplay: category,
        branch: inferBranchFromCategory(category),
        logoUrl: safeImageUrl(item.url) || IPV_LOGO,
        status: "Pre-inscrito",
        statusVariant: "drive",
        source: "driveCatalog"
      };
    }).filter(function (entry) { return Boolean(entry.logoUrl); });

    const missing = CATEGORY_ORDER.filter(function (category) {
      return !byCategory[category];
    });
    if (missing.length) {
      console.info("[HubSportLSK] categorías sin logos clasificados en catálogo masivo:", missing);
    }
    return entries;
  }

  function classifyLogoCategory(fileName, index) {
    const cleaned = String(fileName || "").toLowerCase();
    const rules = ((config.settings && config.settings.logoCategoryRules) || []);
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i] || {};
      if (!rule.pattern || !rule.category) continue;
      if (cleaned.indexOf(String(rule.pattern).toLowerCase()) >= 0 && CATEGORY_ORDER.includes(rule.category)) {
        return rule.category;
      }
    }
    return CATEGORY_ORDER[index % CATEGORY_ORDER.length];
  }

  function guessTeamName(fileName) {
    return String(fileName || "Equipo")
      .replace(/\.[a-z0-9]+$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim() || "Equipo";
  }

  function normalizeFolderId(input) {
    const raw = String(input || "").trim();
    if (!raw) return "";
    const match = raw.match(/\/folders\/([^/?#]+)/i);
    if (match && match[1]) return match[1];
    return raw;
  }

  async function loadBackgroundFromDrive() {
    const folderId = String((config.settings && config.settings.backgroundFolderId) || "").trim();
    if (!folderId) return;
    try {
      const images = await getImages(folderId);
      if (!images.length) return;
      const preferred = normalizePreferredImageName(String((config.settings && config.settings.backgroundPreferredName) || ""));
      const selected = images.find(function (item) {
        return normalizePreferredImageName(item.name || "") === preferred;
      }) || images[0];
      applyBackground(selected.url);
    } catch (error) {
      console.warn("No se pudo cargar fondo de Drive", error);
    }
  }

  function waitForFonts() {
    if (!document.fonts || !document.fonts.ready) {
      return Promise.resolve();
    }
    return document.fonts.ready.catch(function () {
      return null;
    });
  }

  function setLoadingProgress(completedSteps) {
    const safeSteps = Math.max(0, Math.min(LOADING_STEP_COUNT, Number(completedSteps) || 0));
    const percentage = Math.round((safeSteps / LOADING_STEP_COUNT) * 100);
    if (el.loadingLabel) {
      el.loadingLabel.textContent = "... by iPV";
    }
    if (el.loadingPercent) {
      el.loadingPercent.textContent = String(percentage) + "%";
    }
    if (!el.loadingProgressTrack) return;
    const slots = Array.from(el.loadingProgressTrack.querySelectorAll(".loading-progress-slot"));
    slots.forEach(function (slot, index) {
      const isFilled = index < safeSteps;
      slot.textContent = isFilled ? "π" : "";
      slot.classList.toggle("is-filled", isFilled);
    });
  }

  function waitMs(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, Number(ms) || 0);
    });
  }

  async function getImages(folderId) {
    if (!folderId) return [];
    const cacheKey = (config.imageCachePrefix || "hub_sport_lsk_cache_") + folderId;
    const ttl = Number(config.imageCacheTtlMs || 300000);
    const cache = readJson(cacheKey, null);
    if (cache && Date.now() - cache.timestamp < ttl) return cache.images || [];
    const url = String(config.appsScriptUrl || "").trim();
    if (!url) return [];
    const response = await fetch(url + "?action=getImages&folderId=" + encodeURIComponent(folderId));
    const json = await response.json();
    const payload =
      Array.isArray(json) ? json :
      Array.isArray(json.data) ? json.data :
      Array.isArray(json.images) ? json.images :
      json.data && Array.isArray(json.data.images) ? json.data.images :
      [];
    const images = payload.map(normalizeImage).filter(function (item) { return item.url; });
    window.localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), images: images }));
    return images;
  }

  function applyBackground(url) {
    const target = document.querySelector(".app-background");
    const imageUrl = safeImageUrl(url || "");
    if (!target || !imageUrl) return;
    target.style.backgroundImage =
      "linear-gradient(180deg, rgba(13, 10, 20, 0.18), rgba(13, 10, 20, 0.58)), " +
      "radial-gradient(circle at top center, rgba(251, 180, 0, 0.18), transparent 25%), " +
      "url('" + imageUrl + "')";
    target.style.backgroundSize = "cover";
    target.style.backgroundPosition = "center";
    target.style.backgroundRepeat = "no-repeat";
  }

  function renderCardCarousel(entries, options) {
      const opts = options || {};
      const forceMarquee = Boolean(opts.forceMarquee);
      const minItems = Number(opts.minItems) > 0 ? Number(opts.minItems) : 0;
      const trackClass = String(opts.trackClass || "").trim();
      const singularTravel = Boolean(opts.singularTravel);
      if (!entries || !entries.length) {
        return "<div class='empty-state'>Sin elementos para mostrar.</div>";
      }
      if (entries.length === 1 && singularTravel) {
        const travelItem = renderCardCarouselItem(entries[0]);
        return "<div class='logo-carousel-single-travel'>" + travelItem + "</div>";
      }
      if (entries.length === 1 && !forceMarquee) {
        return "<div class='logo-carousel-single'>" + renderCardCarouselItem(entries[0]) + "</div>";
      }

    const baseEntries = entries.slice();
    const renderEntries = (forceMarquee && minItems > baseEntries.length)
      ? repeatEntriesToLength(baseEntries, minItems)
      : baseEntries;

      const items = renderEntries.map(renderCardCarouselItem).join("");
      const trackClasses = ["carousel-track"];
      if (trackClass) trackClasses.push(trackClass);
      return "<div class='" + trackClasses.join(" ") + "'><div class='carousel-group'>" + items + "</div><div class='carousel-group' aria-hidden='true'>" + items + "</div></div>";
    }

  function renderCardCarouselItem(entry) {
      const isInscribed = entry.status === "Inscrito";
      const itemClass = "team-logo-item section-logo-item" + (isInscribed ? " is-inscribed" : " is-pre");
      const label = [entry.teamName, entry.categoryDisplay, entry.status].filter(Boolean).join(" · ");
      return "<div class='" + itemClass + "' title='" + esc(label) + "'><img src='" + esc(entry.logoUrl || IPV_LOGO) + "' alt='" + esc(entry.teamName || "Equipo") + "' onerror=\"this.src='" + IPV_LOGO + "'\"><span class='section-logo-badge'>" + esc(entry.status || "Pre-inscrito") + "</span></div>";
    }

  function repeatEntriesToLength(entries, targetLength) {
    const source = Array.isArray(entries) ? entries : [];
    if (!source.length) return [];
    const output = [];
    for (let i = 0; i < targetLength; i += 1) {
      output.push(source[i % source.length]);
    }
    return output;
  }

  function buildCuratedFallbackEntries() {
    const demo = buildDemoShowcaseSources();
    const normalizedPre = (demo.preRegisteredRows || []).map(normalizePreRegisteredRecord);
    const normalizedTeams = (demo.teamRows || []).map(normalizeTeamRecord);
    return buildShowcaseEntries(normalizedPre, normalizedTeams);
  }

  function findTeamMatch(profile, category, teams) {
    const sourceName = normalizeKey(profile.teamName || displayNameFromProfile(profile));
    return teams.find(function (team) {
      const teamCategory = mapTeamCategory(team.branch, team.category);
      if (teamCategory !== category) return false;
      if (!sourceName) return false;
      const teamName = normalizeKey(team.name || "");
      return sourceName.indexOf(teamName) >= 0 || teamName.indexOf(sourceName) >= 0;
    }) || null;
  }

  function expandDisplayCategories(rawCategories, rawBranches) {
    const categories = [];
    const branches = unique(rawBranches.map(normalizeBranchLabel));

    rawCategories.map(cleanCategoryLabel).forEach(function (category) {
      if (category === "Menores (Cachi/Mini/Micro)") {
        categories.push("Menores (Cachi/Mini/Micro)");
        return;
      }
      if (category === "Infantil Menor") {
        categories.push("Infantil Menor");
        return;
      }
      if (category === "Secundaria") {
        if (branches.includes("Femenil")) categories.push("Secundaria Femenil");
        if (branches.includes("Varonil")) categories.push("Secundaria Varonil");
        return;
      }
      if (category === "Preparatoria") {
        if (branches.includes("Femenil")) categories.push("Preparatoria Femenil");
        if (branches.includes("Varonil")) categories.push("Preparatoria Varonil");
        return;
      }
      if (category === "3ª Fuerza") {
        if (branches.includes("Femenil")) categories.push("3ª Fuerza Femenil");
        if (branches.includes("Varonil")) categories.push("3ª Fuerza Varonil");
        return;
      }
      if (category === "2ª Fuerza") {
        if (branches.includes("Femenil")) categories.push("2ª Fuerza Femenil");
        if (branches.includes("Varonil")) categories.push("2ª Fuerza Varonil");
        return;
      }
      if (category === "Mixto Libre") {
        categories.push("Mixto Libre");
      }
    });

    return unique(categories).filter(function (item) {
      return CATEGORY_ORDER.includes(item);
    });
  }

  function mapTeamCategory(branch, category) {
    const cleanCategory = cleanCategoryLabel(category);
    const cleanBranch = normalizeBranchLabel(branch);
    if (cleanCategory === "Preparatoria") return cleanBranch === "Femenil" ? "Preparatoria Femenil" : "Preparatoria Varonil";
    if (cleanCategory === "Secundaria") return cleanBranch === "Femenil" ? "Secundaria Femenil" : "Secundaria Varonil";
    if (cleanCategory === "3ª Fuerza") return cleanBranch === "Femenil" ? "3ª Fuerza Femenil" : "3ª Fuerza Varonil";
    if (cleanCategory === "2ª Fuerza") return cleanBranch === "Femenil" ? "2ª Fuerza Femenil" : "2ª Fuerza Varonil";
    if (cleanCategory === "Libre Var") return "1ª Fuerza Varonil";
    return cleanCategory;
  }

  function inferBranchFromCategory(category) {
    if (/Femenil/i.test(category)) return "Femenil";
    if (/Varonil/i.test(category)) return "Varonil";
    if (/Mixto/i.test(category)) return "Mixto";
    return "General";
  }

  function getSectionACategories() {
    const profile = getActiveSourceProfile();
    if (profile && profile.displayCategories.length) return profile.displayCategories;
    const fromLive = CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntries(category).length > 0;
    });
    if (fromLive.length) return fromLive;
    return CATEGORY_ORDER.filter(function (category) {
      return getRenderableCategoryEntriesFromFallback(category).length > 0;
    });
  }

  function getCategoryEntries(category) {
    return state.showcaseEntries.filter(function (entry) {
      return entry.categoryDisplay === category;
    });
  }

  function getRenderableCategoryEntries(category) {
    return getCategoryEntries(category).filter(hasRenderableLogo);
  }

  function getCategoryEntriesFromFallback(category) {
    const allFallback = curatedFallback.concat(state.externalLogoEntries || []);
    return allFallback.filter(function (entry) {
      return entry.categoryDisplay === category;
    });
  }

  function getRenderableCategoryEntriesFromFallback(category) {
    return getCategoryEntriesFromFallback(category).filter(hasRenderableLogo);
  }

  function getRenderableEntries(entries) {
    return (Array.isArray(entries) ? entries : []).filter(hasRenderableLogo);
  }

  function getActiveSourceProfile() {
    return state.sourceProfiles.find(function (profile) {
      return profile.email === state.activeSourceEmail;
    }) || null;
  }

  function getInitialSourceEmail() {
    const sessionEmail = normalizeEmail(state.loggedUser && state.loggedUser.email);
    if (sessionEmail && state.sourceProfiles.some(function (profile) { return profile.email === sessionEmail; })) {
      return sessionEmail;
    }
    const params = new URLSearchParams(window.location.search);
    const email = normalizeEmail(params.get("email") || "");
    return state.sourceProfiles.some(function (profile) { return profile.email === email; }) ? email : "";
  }

  function getInitialViewMode() {
    const saved = String(window.localStorage.getItem("hubSportLskViewMode") || "").trim().toLowerCase();
    if (saved === "pre" || saved === "demo") return saved;
    return shouldUseDemoData() ? "demo" : "pre";
  }

  function syncUrl() {
    const url = new URL(window.location.href);
    if (state.activeSourceEmail) url.searchParams.set("email", state.activeSourceEmail);
    else url.searchParams.delete("email");
    window.history.replaceState({}, "", url.toString());
  }

  function displayNameFromProfile(profile) {
    if (profile.teamName) return profile.teamName;
    if (profile.contactName) return profile.contactName;
    return profile.email.split("@")[0];
  }

  function getSessionUser() {
    return readJson(config.sessionStorageKey || "hub-sport-lsk-session", null);
  }

  function renderLoginTooltip() {
    if (!el.heroLoginTooltip) return;
    if (state.loggedUser && state.loggedUser.email) {
      el.heroLoginTooltipText.textContent = state.loggedUser.email;
      showLoginTooltip();
      return;
    }
    hideLoginTooltipImmediate();
  }

  function showLoginTooltip() {
    clearLoginTooltipTimer();
    el.heroLoginTooltip.classList.remove("hidden");
  }

  function scheduleHideLoginTooltip() {
    clearLoginTooltipTimer();
    state.tooltipHideTimer = window.setTimeout(function () {
      hideLoginTooltipImmediate();
    }, 180);
  }

  function hideLoginTooltipImmediate() {
    clearLoginTooltipTimer();
    el.heroLoginTooltip.classList.add("hidden");
  }

  function clearLoginTooltipTimer() {
    if (state.tooltipHideTimer) {
      window.clearTimeout(state.tooltipHideTimer);
      state.tooltipHideTimer = null;
    }
  }

  function showBrandTooltip() {
    clearBrandTooltipTimer();
    if (el.brandMarkTooltip) el.brandMarkTooltip.classList.remove("hidden");
  }

  function scheduleHideBrandTooltip() {
    clearBrandTooltipTimer();
    state.brandTooltipHideTimer = window.setTimeout(function () {
      if (el.brandMarkTooltip) el.brandMarkTooltip.classList.add("hidden");
    }, 180);
  }

  function clearBrandTooltipTimer() {
    if (state.brandTooltipHideTimer) {
      window.clearTimeout(state.brandTooltipHideTimer);
      state.brandTooltipHideTimer = null;
    }
  }

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
  }

  function normalizePreferredImageName(value) {
    return String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "_")
      .trim();
  }

  function cleanCategoryLabel(value) {
    const normalized = normalizeSpaces(value)
      .replace(/3ª/gi, "3a")
      .replace(/2ª/gi, "2a")
      .replace(/prepa[r]?atoria/gi, "Preparatoria")
      .replace(/menores\s*\(cachi\/micro\/mini\)/i, "Menores (Cachi/Mini/Micro)")
      .replace(/menores\s*\(cachi\/mini\/micro\)/i, "Menores (Cachi/Mini/Micro)");

    if (/menores/i.test(normalized)) return "Menores (Cachi/Mini/Micro)";
    if (/infantil\s+menor/i.test(normalized)) return "Infantil Menor";
    if (/secundaria/i.test(normalized)) return "Secundaria";
    if (/preparatoria/i.test(normalized)) return "Preparatoria";
    if (/3a\s+fuerza/i.test(normalized)) return "3ª Fuerza";
    if (/2a\s+fuerza/i.test(normalized)) return "2ª Fuerza";
    if (/1a\s+fuerza\s+var/i.test(normalized)) return "1ª Fuerza Varonil";
    if (/mixto\s+libre/i.test(normalized)) return "Mixto Libre";
    if (/libre\s+var/i.test(normalized)) return "Libre Var";
    return normalized.trim();
  }

  function normalizeBranchLabel(value) {
    const normalized = normalizeSpaces(value);
    if (/femenil/i.test(normalized)) return "Femenil";
    if (/varonil/i.test(normalized)) return "Varonil";
    if (/mixto/i.test(normalized)) return "Mixto";
    return normalized.trim();
  }

  function splitMultiValue(value) {
    return String(value || "").split(",").map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function splitAndWord(value) {
    return String(value || "").split(/\sy\s/i).map(function (item) {
      return item.trim();
    }).filter(Boolean);
  }

  function toDriveThumbnail(url) {
    const text = String(url || "").trim();
    if (!text) return "";
    const match = text.match(/id=([a-zA-Z0-9_-]+)/) || text.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[1] : "";
    return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w1000" : text;
  }

  function normalizeImage(item) {
    if (typeof item === "string") return { url: safeImageUrl(item), name: "Imagen Drive" };
    return {
      url: safeImageUrl(item.url || item.imageUrl || item.thumbnail || item.src || ""),
      name: item.name || item.title || "Imagen Drive"
    };
  }

  function safeImageUrl(url) {
    const value = String(url || "").trim();
    if (!value) return "";
    const match = value.match(/[?&]id=([a-zA-Z0-9_-]+)/) || value.match(/\/d\/([a-zA-Z0-9_-]+)/);
    const id = match ? match[1] : "";
    return id ? "https://drive.google.com/thumbnail?id=" + id + "&sz=w1600" : value;
  }

  function hasRenderableLogo(entry) {
    const logoUrl = String(entry && entry.logoUrl || "").trim();
    if (!logoUrl) return false;
    const normalized = normalizeAssetPath(logoUrl);
    const placeholder = normalizeAssetPath(IPV_LOGO);
    return normalized !== placeholder;
  }

  function normalizeAssetPath(value) {
    return String(value || "")
      .trim()
      .replace(/\\/g, "/")
      .replace(/^\.\//, "")
      .replace(/^\.\.\//, "")
      .toLowerCase();
  }

  function getField(row, aliases) {
    const source = row && typeof row === "object" ? row : {};
    const map = {};
    Object.keys(source).forEach(function (key) {
      map[normalizeKey(key)] = source[key];
    });
    for (let i = 0; i < aliases.length; i += 1) {
      const probe = normalizeKey(aliases[i]);
      if (!Object.prototype.hasOwnProperty.call(map, probe)) continue;
      const value = map[probe];
      if (value == null) continue;
      const text = String(value).trim();
      if (text) return text;
    }
    return "";
  }

  function normalizeKey(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, "");
  }

  function normalizeSpaces(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function unique(values) {
    return Array.from(new Set(values));
  }

  function uniqueBy(items, mapper) {
    const seen = new Set();
    return items.filter(function (item) {
      const key = mapper(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function rotate(items, offset) {
    if (!items.length) return [];
    const safeOffset = offset % items.length;
    return items.slice(safeOffset).concat(items.slice(0, safeOffset));
  }

  function shuffle(items) {
    const clone = items.slice();
    for (let i = clone.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = clone[i];
      clone[i] = clone[j];
      clone[j] = temp;
    }
    return clone;
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function readJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function unwrapResponse(json) {
    if (json && json.ok && json.data) return json.data;
    if (json && json.data) return json.data;
    return json || {};
  }

  function createId(prefix) {
    return String(prefix || "id") + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function decodeJwt(token) {
    try {
      const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(atob(payload).split("").map(function (char) {
        return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2);
      }).join("")));
    } catch (_) {
      return null;
    }
  }

  function waitForGoogle() {
    return new Promise(function (resolve, reject) {
      let tries = 30;
      (function check() {
        if (window.google && window.google.accounts && window.google.accounts.id) return resolve();
        tries -= 1;
        if (!tries) return reject(new Error("GIS no disponible"));
        setTimeout(check, 250);
      })();
    });
  }
})();
