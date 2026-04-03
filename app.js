
(function () {
  const config = window.APP_CONFIG || {};
  const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23131d42'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23fbb400' font-family='Arial' font-size='28'%3ESin imagen%3C/text%3E%3C/svg%3E";
  const SETTINGS_KEYS = {
    fondos: "backgroundFolderId",
    logos: "logosFolderId",
    patrocinador: "sponsorsFolderId",
    glassopacity: "glassOpacity",
    adminemails: "adminEmails",
    backgroundfolderid: "backgroundFolderId",
    logosfolderid: "logosFolderId",
    sponsorsfolderid: "sponsorsFolderId"
  };
  const state = {
    teams: [],
    matches: [],
    settings: normalizeSettings(config.settings || {}),
    adminConfig: normalizeAdminConfig(config.adminConfig || {}),
    capacity: normalizeCapacity(config.capacityRows || []),
    configRows: null,
    loggedUser: readJson(config.sessionStorageKey || "matchmaking-session", null),
    editingTeamId: "",
    view: "registro",
    galleries: { backgroundImage: [], teamLogo: [], sponsors: [] },
    selected: {
      background: localStorage.getItem("selected_background") || "",
      teamLogo: localStorage.getItem("selected_team_logo") || "",
      sponsors: readJson("selected_sponsors", [])
    },
    matching: { mode: "roundRobin", groupCount: 3, manual: false },
    branches: ["varonil", "femenil", "mixto"],
    categories: ["Libre"]
  };
  const el = {};

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    cacheElements();
    bindEvents();
    populateStaticOptions();
    setToday();
    hydrateVisualInputs();
    renderAuth();
    try {
      await loadBootstrap();
      await loadSettings();
      hydrateVisualInputs();
      applyBackground(state.selected.background || state.settings.backgroundImage);
      applyGlass();
      renderAll();
      await loadAllConfiguredGalleries(false);
      showMessage("Galerias cargadas", "success");
    } catch (error) {
      console.error(error);
      applyGlass();
      renderAll();
      showMessage("No se pudo cargar la configuracion inicial", "error");
    }
  }

  function cacheElements() {
    ["appBackground","sidebar","sidebarToggle","loginToggle","loginDropdown","authStatus","googleLoginButton","userSession","userName","userEmail","logoutBtn","backendBadge","backendHint","teamCount","overlapCount","matchCount","sponsorsCarousel","headerTeamLogos","teamForm","teamName","branch","category","date","startTime","endTime","unavailableDates","preferredDates","participateInMatching","teamLogoUrl","teamLogoPreview","saveTeamBtn","cancelEditBtn","messageBox","teamsTableBody","overlapsList","matchesList","viewEquiposList","viewPartidosList","backgroundFolderIdInput","logosFolderIdInput","sponsorsFolderIdInput","glassOpacityInput","enableCustomBackgroundInput","loadAllGalleriesBtn","saveVisualSettingsBtn","applyBackgroundBtn","applyTeamLogoBtn","reloadBackgroundGalleryBtn","reloadLogosGalleryBtn","reloadSponsorsGalleryBtn","backgroundGalleryStatus","backgroundGallery","logosGalleryStatus","logosGallery","sponsorsGalleryStatus","sponsorsGallery","adminForm","adminStartDate","adminEndDate","blockedDates","blockedDateInput","blockedReasonInput","matchingMode","groupCount","manualMatchingEnabled","addBlockedDateBtn","addRangeBtn","userBlockedView","blockedDatesReadable","generateMatchesBtn","resetDemoBtn"].forEach(function (id) {
      el[id] = document.getElementById(id);
    });
    el.navItems = Array.from(document.querySelectorAll(".nav-item"));
    el.views = Array.from(document.querySelectorAll(".view"));
    el.adminOnly = Array.from(document.querySelectorAll(".admin-only"));
  }

  function bindEvents() {
    el.sidebarToggle.addEventListener("click", toggleSidebar);
    el.loginToggle.addEventListener("click", toggleLoginDropdown);
    document.addEventListener("click", handleClickOutside);
    el.logoutBtn.addEventListener("click", logout);
    el.navItems.forEach(function (button) {
      button.addEventListener("click", function () { setView(button.dataset.view || "registro"); });
    });
    el.teamForm.addEventListener("submit", saveTeam);
    el.cancelEditBtn.addEventListener("click", cancelEdit);
    el.generateMatchesBtn.addEventListener("click", generateMatchesFlow);
    el.resetDemoBtn.addEventListener("click", seedDemo);
    el.loadAllGalleriesBtn.addEventListener("click", function () { loadAllConfiguredGalleries(true); });
    el.applyBackgroundBtn.addEventListener("click", applySelectedBackground);
    el.applyTeamLogoBtn.addEventListener("click", applySelectedTeamLogo);
    el.reloadBackgroundGalleryBtn.addEventListener("click", function () { loadGallery("backgroundImage", true); });
    el.reloadLogosGalleryBtn.addEventListener("click", function () { loadGallery("teamLogo", true); });
    el.reloadSponsorsGalleryBtn.addEventListener("click", function () { loadGallery("sponsors", true); });
    el.saveVisualSettingsBtn.addEventListener("click", saveVisualSettings);
    el.glassOpacityInput.addEventListener("input", function () {
      state.settings.glassOpacity = String(el.glassOpacityInput.value || "0.6");
      applyGlass();
    });
    el.enableCustomBackgroundInput.addEventListener("change", function () {
      state.settings.enableCustomBackground = Boolean(el.enableCustomBackgroundInput.checked);
      applyBackground(state.selected.background || state.settings.backgroundImage);
    });
    el.adminForm.addEventListener("submit", saveAdminConfig);
    el.addBlockedDateBtn.addEventListener("click", addBlockedDate);
    el.addRangeBtn.addEventListener("click", addBlockedRange);
    el.matchingMode.addEventListener("change", syncMatchingControls);
    el.groupCount.addEventListener("change", syncMatchingControls);
    el.manualMatchingEnabled.addEventListener("change", syncMatchingControls);
  }

  function populateStaticOptions() {
    fillSelect(el.branch, state.branches, "Selecciona una rama");
    fillSelect(el.category, state.categories, "Selecciona una categoria");
  }

  function setToday() {
    if (!el.date.value) el.date.value = formatDateInput(new Date());
  }

  async function loadBootstrap() {
    const url = String(config.appsScriptUrl || "").trim();
    if (!url) {
      const data = readJson(config.localStorageKey || "ipv-matchmaking-data", {});
      state.teams = normalizeTeams(data.teams || []);
      state.matches = normalizeMatches(data.matches || []);
      state.adminConfig = normalizeAdminConfig(data.adminConfig || state.adminConfig);
      el.backendBadge.textContent = "Modo local";
      el.backendHint.textContent = "Compatible con Live Server y GitHub Pages.";
      return;
    }
    const response = await fetch(url + "?action=bootstrap");
    const json = await response.json();
    const payload = unwrapResponse(json);
    state.teams = normalizeTeams(payload.teams || []);
    state.matches = normalizeMatches(payload.matches || []);
    state.adminConfig = normalizeAdminConfig(payload.adminConfig || state.adminConfig);
    if (Array.isArray(payload.capacity)) state.capacity = normalizeCapacity(payload.capacity);
    if (Array.isArray(payload.config)) state.configRows = payload.config;
    el.backendBadge.textContent = "Google Sheets";
    el.backendHint.textContent = "Sincronizado con el Web App actual.";
  }

  async function loadSettings() {
    state.settings = normalizeSettings(config.settings || {});
    const rows = state.configRows || await tryLoadConfigRows();
    rows.forEach(function (row) {
      const key = normalizeKey(row[0]);
      const value = row[1];
      const target = SETTINGS_KEYS[key] || key;
      if (!value && value !== false) return;
      if (target === "adminEmails") {
        const emails = parseEmails(value);
        if (emails.length) state.settings.adminEmails = emails;
        return;
      }
      if (target === "glassOpacity") {
        state.settings.glassOpacity = String(value);
        return;
      }
      if (Object.prototype.hasOwnProperty.call(state.settings, target) && String(value).trim()) {
        state.settings[target] = target === "enableCustomBackground" ? !/false/i.test(String(value)) : String(value).trim();
      }
    });
    hydrateVisualInputs();
    applyGlass();
  }

  async function tryLoadConfigRows() {
    const url = String(config.appsScriptUrl || "").trim();
    if (!url) return [];
    try {
      const response = await fetch(url);
      const json = await response.json();
      const rows = Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : Array.isArray(json.config) ? json.config : [];
      state.configRows = rows;
      return rows;
    } catch (error) {
      console.warn("No se pudieron cargar settings remotos", error);
      return [];
    }
  }

  function hydrateVisualInputs() {
    el.backgroundFolderIdInput.value = state.settings.backgroundFolderId || "";
    el.logosFolderIdInput.value = state.settings.logosFolderId || "";
    el.sponsorsFolderIdInput.value = state.settings.sponsorsFolderId || "";
    el.glassOpacityInput.value = state.settings.glassOpacity || "0.6";
    el.enableCustomBackgroundInput.checked = Boolean(state.settings.enableCustomBackground);
    el.adminStartDate.value = state.adminConfig.startDate || "";
    el.adminEndDate.value = state.adminConfig.endDate || "";
    el.blockedDates.value = serializeBlockedDates(state.adminConfig.blockedDates);
    el.matchingMode.value = state.matching.mode;
    el.groupCount.value = String(state.matching.groupCount);
    el.manualMatchingEnabled.checked = state.matching.manual;
  }

  async function getImages(folderId, forceRefresh) {
    if (!folderId) return [];
    const cacheKey = (config.imageCachePrefix || "drive_images_cache_") + folderId;
    const cache = readJson(cacheKey, null);
    const ttl = Number(config.imageCacheTtlMs || 300000);
    if (!forceRefresh && cache && Date.now() - cache.timestamp < ttl) return cache.images || [];
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
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), images: images }));
    return images;
  }

  async function loadAllConfiguredGalleries(forceRefresh) {
    await Promise.all([loadGallery("backgroundImage", forceRefresh), loadGallery("teamLogo", forceRefresh), loadGallery("sponsors", forceRefresh)]);
  }

  async function loadGallery(type, forceRefresh) {
    const map = {
      backgroundImage: { folderId: el.backgroundFolderIdInput.value.trim(), status: el.backgroundGalleryStatus, target: el.backgroundGallery },
      teamLogo: { folderId: el.logosFolderIdInput.value.trim(), status: el.logosGalleryStatus, target: el.logosGallery },
      sponsors: { folderId: el.sponsorsFolderIdInput.value.trim(), status: el.sponsorsGalleryStatus, target: el.sponsorsGallery }
    };
    const current = map[type];
    if (!current.folderId) {
      current.status.textContent = "No hay carpeta configurada";
      current.target.innerHTML = emptyGallery();
      state.galleries[type] = [];
      return;
    }
    current.status.textContent = "Cargando galeria...";
    current.target.innerHTML = skeletonGallery();
    try {
      const images = await getImages(current.folderId, forceRefresh);
      state.galleries[type] = images;
      current.status.textContent = images.length ? "Galerias cargadas" : "No hay imagenes";
      renderGallery(type);
      if (type === "backgroundImage" && !state.selected.background && images[0]) selectGalleryItem("backgroundImage", images[0].url);
    } catch (error) {
      console.error(error);
      current.status.textContent = "Error al cargar imagenes";
      current.target.innerHTML = emptyGallery("No hay imagenes disponibles en la carpeta");
    }
  }
  function renderGallery(type) {
    const targetMap = { backgroundImage: el.backgroundGallery, teamLogo: el.logosGallery, sponsors: el.sponsorsGallery };
    const target = targetMap[type];
    const items = state.galleries[type] || [];
    if (!items.length) {
      target.innerHTML = emptyGallery("No hay imagenes disponibles en la carpeta");
      return;
    }
    target.innerHTML = items.map(function (item) {
      const selected = isSelected(type, item.url) ? " is-selected" : "";
      return "<button type='button' class='card-image" + selected + "' data-type='" + esc(type) + "' data-url='" + esc(item.url) + "' data-label='" + esc(item.name || "Imagen Drive") + "'><img src='" + esc(item.url) + "' alt='" + esc(item.name || type) + "' onerror=\"this.src='" + PLACEHOLDER + "'\"></button>";
    }).join("");
    target.querySelectorAll(".card-image").forEach(function (button) {
      button.addEventListener("click", function () { selectGalleryItem(button.dataset.type, button.dataset.url); });
    });
  }

  function selectGalleryItem(type, url) {
    if (type === "backgroundImage") {
      state.selected.background = url;
      localStorage.setItem("selected_background", url);
      el.backgroundGalleryStatus.textContent = "Imagen seleccionada. Presiona Aplicar imagen para usarla como fondo";
      renderGallery("backgroundImage");
      return;
    }
    if (type === "teamLogo") {
      state.selected.teamLogo = url;
      localStorage.setItem("selected_team_logo", url);
      el.logosGalleryStatus.textContent = "Logo seleccionado. Presiona Usar como logo para asignarlo al equipo";
      renderGallery("teamLogo");
      return;
    }
    const next = new Set(state.selected.sponsors);
    if (next.has(url)) next.delete(url); else next.add(url);
    state.selected.sponsors = Array.from(next);
    localStorage.setItem("selected_sponsors", JSON.stringify(state.selected.sponsors));
    renderSponsors();
    renderGallery("sponsors");
  }

  function applySelectedBackground() {
    if (!state.selected.background) {
      showMessage("Selecciona primero una imagen de fondo", "error");
      return;
    }
    state.settings.backgroundImage = state.selected.background;
    localStorage.setItem("selected_background", state.selected.background);
    applyBackground(state.selected.background);
    el.backgroundGalleryStatus.textContent = "Fondo aplicado correctamente";
    showMessage("Imagen de fondo aplicada", "success");
  }

  function applySelectedTeamLogo() {
    if (!state.selected.teamLogo) {
      showMessage("Selecciona primero un logo de equipo", "error");
      return;
    }
    el.teamLogoUrl.value = state.selected.teamLogo;
    renderLogoPreview();
    el.logosGalleryStatus.textContent = "Logo del equipo asignado correctamente";
    renderGallery("teamLogo");
    showMessage("Logo del equipo asignado", "success");
  }

  function isSelected(type, url) {
    if (type === "backgroundImage") return state.selected.background === url;
    if (type === "teamLogo") return state.selected.teamLogo === url || el.teamLogoUrl.value === url;
    return state.selected.sponsors.indexOf(url) >= 0;
  }

  function saveVisualSettings() {
    state.settings.backgroundFolderId = el.backgroundFolderIdInput.value.trim();
    state.settings.logosFolderId = el.logosFolderIdInput.value.trim();
    state.settings.sponsorsFolderId = el.sponsorsFolderIdInput.value.trim();
    state.settings.glassOpacity = String(el.glassOpacityInput.value || "0.6");
    state.settings.enableCustomBackground = Boolean(el.enableCustomBackgroundInput.checked);
    localStorage.setItem("ipv_visual_settings", JSON.stringify(state.settings));
    applyGlass();
    applyBackground(state.selected.background || state.settings.backgroundImage);
    showMessage("Configuracion actualizada", "success");
  }

  function applyBackground(url) {
    const finalUrl = state.settings.enableCustomBackground && url ? safeImageUrl(url) : "";
    if (!finalUrl) {
      el.appBackground.style.backgroundImage = "linear-gradient(180deg, rgba(10, 14, 35, 0.22), rgba(10, 14, 35, 0.72)), radial-gradient(circle at top left, rgba(251, 180, 0, 0.18), transparent 26%), linear-gradient(135deg, #0f1738, #1f3368)";
      return;
    }
    el.appBackground.style.backgroundImage = "linear-gradient(180deg, rgba(10, 14, 35, 0.28), rgba(10, 14, 35, 0.76)), url('" + finalUrl.replace(/'/g, "%27") + "')";
  }

  function applyGlass() {
    document.documentElement.style.setProperty("--glass-opacity", String(state.settings.glassOpacity || "0.6"));
  }

  async function saveTeam(event) {
    event.preventDefault();
    if (!requireSession()) return;
    const team = {
      id: state.editingTeamId || createId("team"),
      name: el.teamName.value.trim(),
      branch: el.branch.value,
      category: el.category.value,
      date: el.date.value,
      startTime: el.startTime.value,
      endTime: el.endTime.value,
      unavailableDates: parseList(el.unavailableDates.value),
      preferredDates: parseList(el.preferredDates.value),
      logoUrl: el.teamLogoUrl.value || state.selected.teamLogo || "",
      participateInMatching: Boolean(el.participateInMatching.checked),
      ownerEmail: state.loggedUser.email,
      createdAt: new Date().toISOString()
    };
    if (!team.name || !team.branch || !team.category || !team.date) {
      showMessage("Completa los campos obligatorios", "error");
      return;
    }
    const index = state.teams.findIndex(function (item) { return item.id === team.id; });
    if (index >= 0) state.teams[index] = team; else state.teams.push(team);
    persistData();
    resetTeamForm();
    renderAll();
    showMessage("Equipo guardado correctamente", "success");
  }

  function resetTeamForm() {
    el.teamForm.reset();
    state.editingTeamId = "";
    el.cancelEditBtn.classList.add("hidden");
    setToday();
    el.teamLogoUrl.value = "";
    renderLogoPreview();
  }

  function cancelEdit() {
    resetTeamForm();
    showMessage("Edicion cancelada", "success");
  }

  function startEdit(id) {
    const team = state.teams.find(function (item) { return item.id === id; });
    if (!team || !canEditTeam(team)) return;
    state.editingTeamId = team.id;
    el.teamName.value = team.name;
    el.branch.value = team.branch;
    el.category.value = team.category;
    el.date.value = team.date;
    el.startTime.value = team.startTime;
    el.endTime.value = team.endTime;
    el.unavailableDates.value = team.unavailableDates.join(", ");
    el.preferredDates.value = team.preferredDates.join(", ");
    el.participateInMatching.checked = Boolean(team.participateInMatching);
    el.teamLogoUrl.value = team.logoUrl || "";
    el.cancelEditBtn.classList.remove("hidden");
    renderLogoPreview();
    setView("registro");
  }

  function renderAll() {
    setView(state.view);
    renderAuth();
    renderStats();
    renderLogoPreview();
    renderTeamsTable();
    renderTeamCards();
    renderOverlaps();
    renderMatches();
    renderCompactMatches();
    renderSponsors();
    renderTeamLogos();
    renderBlockedDates();
    renderAdminVisibility();
  }

  function renderAuth() {
    const isLogged = Boolean(state.loggedUser && state.loggedUser.email);
    el.loginDropdown.classList.toggle("hidden", !el.loginDropdown.dataset.open);
    if (isLogged) {
      el.authStatus.textContent = isAdmin() ? "Sesion activa como administrador." : "Sesion activa. Puedes editar tus equipos.";
      el.userSession.classList.remove("hidden");
      el.userName.textContent = state.loggedUser.name || "Usuario";
      el.userEmail.textContent = state.loggedUser.email || "";
      el.googleLoginButton.classList.add("hidden");
    } else {
      el.authStatus.textContent = String(config.googleClientId || "").trim() ? "Abre este panel para iniciar sesion." : "Agrega tu Google Client ID en config.js.";
      el.userSession.classList.add("hidden");
      el.googleLoginButton.classList.remove("hidden");
    }
    initGoogleAuth();
  }

  function renderStats() {
    const overlaps = computeOverlaps();
    el.teamCount.textContent = String(state.teams.length);
    el.overlapCount.textContent = String(overlaps.length);
    el.matchCount.textContent = String(state.matches.length);
  }

  function renderTeamsTable() {
    if (!state.teams.length) {
      el.teamsTableBody.innerHTML = "<tr><td colspan='7' class='empty-state'>Todavia no hay equipos registrados.</td></tr>";
      return;
    }
    el.teamsTableBody.innerHTML = state.teams.map(function (team) {
      const logo = team.logoUrl ? "<img class='table-logo' src='" + esc(safeImageUrl(team.logoUrl)) + "' alt='" + esc(team.name) + "' onerror=\"this.src='" + PLACEHOLDER + "'\">" : "<span class='tag'>Sin logo</span>";
      const edit = canEditTeam(team) ? "<button type='button' class='btn btn-ghost btn-small edit-team' data-id='" + esc(team.id) + "'>Editar</button>" : "<span class='small-muted'>Solo lectura</span>";
      return "<tr><td><strong>" + esc(team.name) + "</strong><span class='small-muted'>" + esc(team.participateInMatching ? "Participa en matching" : "Registro manual") + "</span></td><td>" + esc(team.branch) + "</td><td>" + esc(team.category) + "</td><td>" + esc(formatHumanDate(team.date)) + "</td><td>" + esc(team.startTime + " - " + team.endTime) + "</td><td>" + logo + "</td><td>" + edit + "</td></tr>";
    }).join("");
    el.teamsTableBody.querySelectorAll(".edit-team").forEach(function (button) {
      button.addEventListener("click", function () { startEdit(button.dataset.id); });
    });
  }

  function renderTeamCards() {
    if (!state.teams.length) {
      el.viewEquiposList.innerHTML = "<div class='empty-state'>Sin equipos registrados.</div>";
      return;
    }
    el.viewEquiposList.innerHTML = state.teams.map(function (team) {
      const logo = team.logoUrl ? "<img class='team-card-logo' src='" + esc(safeImageUrl(team.logoUrl)) + "' alt='" + esc(team.name) + "' onerror=\"this.src='" + PLACEHOLDER + "'\">" : "<div class='team-card-logo'>" + esc(initials(team.name)) + "</div>";
      return "<article class='team-card'><div class='panel-head'><div><h3>" + esc(team.name) + "</h3><p class='muted'>" + esc(team.branch + " · " + team.category) + "</p></div>" + logo + "</div><div class='small-muted'>" + esc(formatHumanDate(team.date) + " · " + team.startTime + " - " + team.endTime) + "</div></article>";
    }).join("");
  }

  function renderOverlaps() {
    const overlaps = computeOverlaps();
    if (!overlaps.length) {
      el.overlapsList.innerHTML = "<div class='empty-state'>Aun no se detectan coincidencias.</div>";
      return;
    }
    el.overlapsList.innerHTML = overlaps.map(function (item) {
      return "<article class='overlap-card'><span class='tag'>" + esc(item.branch + " · " + item.category) + "</span><h3>" + esc(item.teamA.name) + " vs " + esc(item.teamB.name) + "</h3><div>" + esc(formatHumanDate(item.date) + " · " + item.startTime + " - " + item.endTime) + "</div><div class='small-muted'>" + esc(item.venue || "Sede por confirmar") + "</div></article>";
    }).join("");
  }
  function renderMatches() {
    if (!state.matches.length) {
      el.matchesList.innerHTML = "<div class='empty-state'>Todavia no se han generado partidos.</div>";
      return;
    }
    el.matchesList.innerHTML = state.matches.map(function (match) {
      const badge = dateBadge(match.date);
      return "<article class='match-card'><div class='match-main'><div class='match-date-badge'><span class='match-date-day'>" + esc(badge.day) + "</span><span class='match-date-month'>" + esc(badge.month) + "</span></div><div class='match-team'>" + renderMatchLogo(match.teamA.logoUrl, match.teamA.name) + "<strong>" + esc(match.teamA.name) + "</strong></div><div class='match-score'>vs</div><div class='match-team'>" + renderMatchLogo(match.teamB.logoUrl, match.teamB.name) + "<strong>" + esc(match.teamB.name) + "</strong></div><div>" + esc(match.venue || "Por confirmar") + "<div class='small-muted'>" + esc(match.date) + "</div></div></div><div class='match-detail'><span class='tag'>" + esc(match.branch + " · " + match.category + (match.group ? " · " + match.group : "")) + "</span><div><strong>Alternativas:</strong></div><div class='match-alt-list'>" + renderAlternatives(match.alternatives) + "</div><label class='accept-row'><input type='checkbox' class='accept-match' data-id='" + esc(match.id) + "' " + (match.accepted ? "checked" : "") + "><span>Aceptar este partido</span></label></div></article>";
    }).join("");
    el.matchesList.querySelectorAll(".accept-match").forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        const match = state.matches.find(function (item) { return item.id === checkbox.dataset.id; });
        if (match) match.accepted = checkbox.checked;
        persistData();
        renderCompactMatches();
      });
    });
  }

  function renderCompactMatches() {
    if (!state.matches.length) {
      el.viewPartidosList.innerHTML = "<div class='empty-state'>Sin partidos sugeridos.</div>";
      return;
    }
    el.viewPartidosList.innerHTML = state.matches.map(function (match) {
      return "<article class='match-card'><h3>" + esc(match.teamA.name + " vs " + match.teamB.name) + "</h3><div>" + esc(formatHumanDate(match.date) + " · " + match.startTime + " - " + match.endTime) + "</div><div class='small-muted'>" + esc((match.venue || "Sede por confirmar") + (match.accepted ? " · Aceptado" : " · Pendiente")) + "</div></article>";
    }).join("");
  }

  function renderSponsors() {
    const urls = state.selected.sponsors.length ? state.selected.sponsors : state.galleries.sponsors.map(function (item) { return item.url; });
    if (!urls.length) {
      el.sponsorsCarousel.innerHTML = "<div class='empty-inline'>Sin sponsors registrados.</div>";
      return;
    }
    el.sponsorsCarousel.innerHTML = renderCarousel(urls, "sponsor-logo", "Patrocinador");
  }

  function renderTeamLogos() {
    const urls = state.teams.map(function (team) { return team.logoUrl; }).filter(Boolean);
    if (!urls.length) {
      el.headerTeamLogos.innerHTML = "<div class='empty-inline'>Sin logos registrados.</div>";
      return;
    }
    el.headerTeamLogos.innerHTML = renderCarousel(urls, "team-logo-item", "Logo de equipo");
  }

  function renderBlockedDates() {
    if (!state.adminConfig.blockedDates.length) {
      el.blockedDatesReadable.innerHTML = "<div class='empty-state'>Sin fechas bloqueadas configuradas.</div>";
      return;
    }
    el.blockedDatesReadable.innerHTML = state.adminConfig.blockedDates.map(function (item) {
      return "<div>" + esc(item.date + (item.reason ? " · " + item.reason : "")) + "</div>";
    }).join("");
  }

  function renderAdminVisibility() {
    const admin = isAdmin();
    el.adminOnly.forEach(function (node) { node.classList.toggle("hidden", !admin); });
    if (!admin && state.view === "config") setView("registro");
  }

  function renderLogoPreview() {
    const url = el.teamLogoUrl.value || state.selected.teamLogo;
    if (!url) {
      el.teamLogoPreview.textContent = "Sin logo seleccionado";
      return;
    }
    el.teamLogoPreview.innerHTML = "<img src='" + esc(safeImageUrl(url)) + "' alt='Logo seleccionado' onerror=\"this.src='" + PLACEHOLDER + "'\">";
  }

  function setView(view) {
    state.view = view;
    el.views.forEach(function (section) {
      section.classList.toggle("active", section.id === "view-" + view);
    });
    el.navItems.forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.view === view);
    });
  }

  function toggleSidebar() {
    el.sidebar.classList.toggle("is-collapsed");
    el.sidebarToggle.textContent = el.sidebar.classList.contains("is-collapsed") ? "Expandir" : "Colapsar";
  }

  function toggleLoginDropdown(event) {
    event.stopPropagation();
    const next = !el.loginDropdown.dataset.open;
    if (next) el.loginDropdown.dataset.open = "true"; else delete el.loginDropdown.dataset.open;
    el.loginDropdown.classList.toggle("hidden", !next);
  }

  function handleClickOutside(event) {
    if (el.loginDropdown.classList.contains("hidden")) return;
    if (!el.loginDropdown.contains(event.target) && !el.loginToggle.contains(event.target)) {
      delete el.loginDropdown.dataset.open;
      el.loginDropdown.classList.add("hidden");
    }
  }

  function initGoogleAuth() {
    const clientId = String(config.googleClientId || "").trim();
    if (!clientId || el.googleLoginButton.dataset.bound) return;
    waitForGoogle().then(function () {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) return;
      window.google.accounts.id.initialize({ client_id: clientId, callback: handleCredentialResponse });
      window.google.accounts.id.renderButton(el.googleLoginButton, { theme: "outline", size: "large", shape: "pill", locale: "es" });
      el.googleLoginButton.dataset.bound = "true";
    }).catch(function () {});
  }

  function handleCredentialResponse(response) {
    const payload = decodeJwt(response && response.credential);
    if (!payload || !payload.email) {
      showMessage("No se pudo obtener la sesion", "error");
      return;
    }
    state.loggedUser = { email: payload.email, name: payload.name || payload.email };
    localStorage.setItem(config.sessionStorageKey || "matchmaking-session", JSON.stringify(state.loggedUser));
    renderAll();
    showMessage("Sesion iniciada correctamente", "success");
  }

  function logout() {
    state.loggedUser = null;
    localStorage.removeItem(config.sessionStorageKey || "matchmaking-session");
    renderAll();
    showMessage("Sesion cerrada", "success");
  }

  async function saveAdminConfig(event) {
    event.preventDefault();
    if (!isAdmin()) return;
    state.adminConfig = {
      startDate: el.adminStartDate.value,
      endDate: el.adminEndDate.value,
      blockedDates: parseBlockedDates(el.blockedDates.value)
    };
    syncMatchingControls();
    persistData();
    renderBlockedDates();
    showMessage("Configuracion actualizada", "success");
  }

  function syncMatchingControls() {
    state.matching.mode = el.matchingMode.value;
    state.matching.groupCount = Math.max(2, Number(el.groupCount.value || 3));
    state.matching.manual = Boolean(el.manualMatchingEnabled.checked);
  }

  function addBlockedDate() {
    if (!el.blockedDateInput.value) return;
    const line = el.blockedDateInput.value + (el.blockedReasonInput.value ? " | " + el.blockedReasonInput.value : "");
    el.blockedDates.value = [el.blockedDates.value, line].filter(Boolean).join(", ");
    el.blockedDateInput.value = "";
    el.blockedReasonInput.value = "";
  }

  function addBlockedRange() {
    if (!el.adminStartDate.value || !el.adminEndDate.value) return;
    const dates = rangeDates(el.adminStartDate.value, el.adminEndDate.value);
    const current = parseBlockedDates(el.blockedDates.value);
    dates.forEach(function (date) {
      if (!current.some(function (item) { return item.date === date; })) current.push({ date: date, reason: "Rango admin" });
    });
    el.blockedDates.value = serializeBlockedDates(current);
  }

  function generateMatchesFlow() {
    syncMatchingControls();
    state.matches = generateMatches();
    persistData();
    renderAll();
    setView("partidos");
    showMessage(state.matches.length ? "Partidos generados" : "No fue posible generar partidos", state.matches.length ? "success" : "error");
  }

  function generateMatches() {
    if (state.matching.mode === "manual" || state.matching.manual) return [];
    const candidates = state.teams.filter(function (team) { return team.participateInMatching; });
    const groups = assignGroups(candidates);
    const pairs = [];
    groups.forEach(function (bucket, index) {
      for (let i = 0; i < bucket.length; i += 1) {
        for (let j = i + 1; j < bucket.length; j += 1) {
          const overlap = findOverlap(bucket[i], bucket[j]);
          if (!overlap) continue;
          pairs.push(buildMatch(bucket[i], bucket[j], overlap, groups.length > 1 ? "Grupo " + String.fromCharCode(65 + index) : ""));
        }
      }
    });
    return pairs;
  }
  function assignGroups(teams) {
    if (state.matching.mode !== "groups") return [teams];
    const count = Math.max(2, Number(state.matching.groupCount || 3));
    const buckets = Array.from({ length: count }, function () { return []; });
    teams.forEach(function (team, index) { buckets[index % count].push(team); });
    return buckets.filter(function (bucket) { return bucket.length; });
  }

  function computeOverlaps() {
    const teams = state.teams.filter(function (team) { return team.participateInMatching; });
    const results = [];
    for (let i = 0; i < teams.length; i += 1) {
      for (let j = i + 1; j < teams.length; j += 1) {
        const overlap = findOverlap(teams[i], teams[j]);
        if (overlap) results.push(overlap);
      }
    }
    return results;
  }

  function findOverlap(teamA, teamB) {
    if (teamA.branch !== teamB.branch || teamA.category !== teamB.category || teamA.date !== teamB.date) return null;
    if (isBlockedDate(teamA.date)) return null;
    const start = Math.max(toMinutes(teamA.startTime), toMinutes(teamB.startTime));
    const end = Math.min(toMinutes(teamA.endTime), toMinutes(teamB.endTime));
    if (end <= start) return null;
    const capacity = pickCapacity(teamA.date, teamA.category);
    return { teamA: teamA, teamB: teamB, branch: teamA.branch, category: teamA.category, date: teamA.date, startTime: minutesToTime(start), endTime: minutesToTime(end), venue: capacity.venue, court: capacity.court, alternatives: buildAlternatives(capacity, teamA.date) };
  }

  function buildMatch(teamA, teamB, overlap, group) {
    return { id: createId("match"), teamA: teamA, teamB: teamB, branch: overlap.branch, category: overlap.category, group: group, date: overlap.date, startTime: overlap.startTime, endTime: overlap.endTime, venue: overlap.venue || "Por confirmar", court: overlap.court || "", alternatives: overlap.alternatives, accepted: false };
  }

  function pickCapacity(date, category) {
    const day = dayName(date);
    const match = state.capacity.find(function (item) {
      return (!item.category || item.category === category) && (!item.day || normalizeKey(item.day) === normalizeKey(day));
    });
    if (!match) return { venue: "Por confirmar", court: "", startTime: "" };
    return match;
  }

  function buildAlternatives(capacity, date) {
    const alternatives = [];
    if (capacity.venue) alternatives.push({ label: capacity.venue + (capacity.court ? " · " + capacity.court : "") });
    if (capacity.startTime) alternatives.push({ label: date + " · " + capacity.startTime });
    if (!alternatives.length) alternatives.push({ label: "Sin alternativas disponibles" });
    return alternatives;
  }

  function seedDemo() {
    state.teams = normalizeTeams((config.demoTeams || []).map(function (team, index) {
      return Object.assign({}, team, { id: team.id || createId("team" + index), ownerEmail: state.loggedUser && state.loggedUser.email ? state.loggedUser.email : (team.ownerEmail || "demo@ipv.mx") });
    }));
    state.matches = [];
    persistData();
    renderAll();
    showMessage("Datos demo cargados", "success");
  }

  function persistData() {
    const payload = { teams: state.teams, matches: state.matches, adminConfig: state.adminConfig };
    localStorage.setItem(config.localStorageKey || "ipv-matchmaking-data", JSON.stringify(payload));
  }

  function renderCarousel(urls, className, altText) {
    const safeUrls = urls.filter(Boolean);
    const group = safeUrls.map(function (url, index) {
      return "<div class='" + className + "'><img src='" + esc(safeImageUrl(url)) + "' alt='" + esc((altText || "logo") + " " + String(index + 1)) + "' onerror=\"this.src='" + PLACEHOLDER + "'\"></div>";
    }).join("");
    return "<div class='carousel-track'><div class='carousel-group'>" + group + "</div><div class='carousel-group' aria-hidden='true'>" + group + "</div></div>";
  }

  function renderAlternatives(items) {
    return (items || []).map(function (item) { return "<span class='alt-chip'>" + esc(item.label) + "</span>"; }).join("");
  }

  function renderMatchLogo(url, name) {
    if (url) return "<div class='match-team-logo'><img src='" + esc(safeImageUrl(url)) + "' alt='" + esc(name) + "' onerror=\"this.src='" + PLACEHOLDER + "'\"></div>";
    return "<div class='match-team-logo'>" + esc(initials(name)) + "</div>";
  }

  function emptyGallery(text) { return "<div class='empty-shell'>" + esc(text || "No hay imagenes disponibles en la carpeta") + "</div>"; }
  function skeletonGallery() { return "<div class='skeleton-card'></div><div class='skeleton-card'></div><div class='skeleton-card'></div>"; }
  function requireSession() { if (state.loggedUser && state.loggedUser.email) return true; showMessage("Inicia sesion con Google para continuar", "error"); return false; }
  function canEditTeam(team) { return isAdmin() || (state.loggedUser && team.ownerEmail === state.loggedUser.email); }
  function isAdmin() { const email = state.loggedUser && state.loggedUser.email ? state.loggedUser.email.toLowerCase() : ""; return Boolean(email && state.settings.adminEmails.indexOf(email) >= 0); }
  function isBlockedDate(date) { return state.adminConfig.blockedDates.some(function (item) { return item.date === date; }); }

  function normalizeSettings(input) {
    const local = readJson("ipv_visual_settings", {});
    return {
      backgroundFolderId: local.backgroundFolderId || input.backgroundFolderId || "",
      logosFolderId: local.logosFolderId || input.logosFolderId || "",
      sponsorsFolderId: local.sponsorsFolderId || input.sponsorsFolderId || "",
      backgroundImage: input.backgroundImage || "",
      glassOpacity: String(local.glassOpacity || input.glassOpacity || "0.6"),
      enableCustomBackground: typeof local.enableCustomBackground === "boolean" ? local.enableCustomBackground : input.enableCustomBackground !== false,
      adminEmails: parseEmails(input.adminEmails || [])
    };
  }

  function normalizeAdminConfig(input) {
    return { startDate: input.startDate || "", endDate: input.endDate || "", blockedDates: parseBlockedDates(input.blockedDates || []) };
  }

  function normalizeTeams(input) {
    return (input || []).map(function (team) {
      return { id: team.id || createId("team"), name: team.name || "", branch: team.branch || "mixto", category: team.category || "Libre", date: team.date || "", startTime: team.startTime || "00:00", endTime: team.endTime || "00:00", unavailableDates: parseList(team.unavailableDates || []), preferredDates: parseList(team.preferredDates || []), logoUrl: safeImageUrl(team.logoUrl || team.logo || ""), participateInMatching: team.participateInMatching !== false, ownerEmail: team.ownerEmail || "", createdAt: team.createdAt || new Date().toISOString() };
    });
  }

  function normalizeMatches(input) {
    return (input || []).map(function (match) {
      return { id: match.id || createId("match"), teamA: match.teamA || { name: match.teamAName || "Equipo A", logoUrl: "" }, teamB: match.teamB || { name: match.teamBName || "Equipo B", logoUrl: "" }, branch: match.branch || "mixto", category: match.category || "Libre", group: match.group || "", date: match.date || "", startTime: match.startTime || "", endTime: match.endTime || "", venue: match.venue || "Por confirmar", court: match.court || "", alternatives: match.alternatives || [], accepted: Boolean(match.accepted) };
    });
  }

  function normalizeCapacity(input) {
    return (input || []).map(function (row) {
      if (Array.isArray(row)) return { venue: String(row[0] || ""), court: String(row[1] || ""), startTime: String(row[2] || ""), day: String(row[3] || ""), category: String(row[4] || ""), group: String(row[5] || "") };
      return { venue: String(row["Sede"] || row.venue || ""), court: String(row["Cancha"] || row.court || ""), startTime: String(row["Horario_Inicial"] || row.startTime || ""), day: String(row["Dia"] || row.day || row.date || ""), category: String(row["Categoria"] || row.category || ""), group: String(row["Grupo"] || row.group || "") };
    });
  }

  function normalizeImage(item) {
    if (typeof item === "string") return { url: safeImageUrl(item), name: "Imagen Drive" };
    const url = safeImageUrl(item.url || item.imageUrl || item.thumbnail || item.src || "");
    return { url: url, name: item.name || item.title || "Imagen Drive" };
  }
  function unwrapResponse(json) { if (json && json.ok && json.data) return json.data; if (json && json.data) return json.data; return json || {}; }

  function parseBlockedDates(input) {
    if (Array.isArray(input)) {
      return input.map(function (item) { return typeof item === "string" ? splitBlockedDate(item) : { date: item.date || "", reason: item.reason || "" }; }).filter(function (item) { return item.date; });
    }
    return String(input || "").split(",").map(splitBlockedDate).filter(function (item) { return item.date; });
  }

  function splitBlockedDate(value) {
    const parts = String(value || "").split("|");
    return { date: String(parts[0] || "").trim(), reason: String(parts.slice(1).join("|") || "").trim() };
  }

  function serializeBlockedDates(items) { return (items || []).map(function (item) { return item.date + (item.reason ? " | " + item.reason : ""); }).join(", "); }
  function parseList(value) { if (Array.isArray(value)) return value.filter(Boolean); return String(value || "").split(/[\n,]/).map(function (item) { return item.trim(); }).filter(Boolean); }
  function parseEmails(value) { if (Array.isArray(value)) return value.map(function (item) { return String(item).trim().toLowerCase(); }).filter(Boolean); return String(value || "").split(/[\n,]/).map(function (item) { return item.trim().toLowerCase(); }).filter(Boolean); }
  function fillSelect(select, items, placeholder) { select.innerHTML = "<option value=''>" + esc(placeholder) + "</option>" + items.map(function (item) { return "<option value='" + esc(item) + "'>" + esc(item) + "</option>"; }).join(""); }
  function createId(prefix) { return prefix + "-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8); }
  function normalizeKey(value) { return String(value || "").trim().toLowerCase().replace(/[_\s]/g, ""); }
  function safeImageUrl(url) {
    const value = String(url || "").trim();
    if (!value) return "";
    if (/^data:image\//i.test(value)) return value;
    const idMatch = value.match(/[?&]id=([a-zA-Z0-9_-]+)/) || value.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) return "https://drive.google.com/thumbnail?id=" + idMatch[1] + "&sz=w1600";
    return value.indexOf("http") === 0 ? value : PLACEHOLDER;
  }
  function readJson(key, fallback) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch (error) { return fallback; } }

  function decodeJwt(token) {
    try {
      const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(decodeURIComponent(atob(payload).split("").map(function (char) { return "%" + ("00" + char.charCodeAt(0).toString(16)).slice(-2); }).join("")));
    } catch (error) {
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

  function dayName(date) { return new Date(date + "T00:00:00").toLocaleDateString("es-MX", { weekday: "long" }); }
  function rangeDates(start, end) { const result = []; const current = new Date(start + "T00:00:00"); const last = new Date(end + "T00:00:00"); while (current <= last) { result.push(formatDateInput(current)); current.setDate(current.getDate() + 1); } return result; }
  function formatDateInput(date) { return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"); }
  function formatHumanDate(value) { if (!value) return ""; return new Date(value + "T00:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "short", year: "numeric" }); }
  function dateBadge(value) { const date = new Date(value + "T00:00:00"); return { day: String(date.getDate()).padStart(2, "0"), month: date.toLocaleDateString("es-MX", { month: "short" }).replace(".", "").toUpperCase() }; }
  function toMinutes(value) { const parts = String(value || "00:00").split(":"); return Number(parts[0] || 0) * 60 + Number(parts[1] || 0); }
  function minutesToTime(value) { return String(Math.floor(value / 60)).padStart(2, "0") + ":" + String(value % 60).padStart(2, "0"); }
  function initials(value) { return String(value || "EQ").split(/\s+/).filter(Boolean).slice(0, 2).map(function (part) { return part.charAt(0).toUpperCase(); }).join(""); }
  function showMessage(text, type) { el.messageBox.textContent = text; el.messageBox.className = "message-box" + (type ? " is-" + type : ""); }
  function esc(value) { return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;"); }
})();
