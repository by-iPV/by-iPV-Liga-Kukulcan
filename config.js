window.APP_CONFIG = {
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbyzw6In__9bHpthCfB56bcxQTkKOgeCiRkBCXIXmT6jWzvEgtJQ7usmf7vAtlwgshib/exec",
  googleClientId: "909480777075-4l5osf38lc6vl5b6ji42do0lemtl8qla.apps.googleusercontent.com",
  timezone: "America/Mexico_City",
  localStorageKey: "ipv-matchmaking-data",
  sessionStorageKey: "ipv-matchmaking-session",
  imageCachePrefix: "drive_images_cache_",
  imageCacheTtlMs: 300000,
  settings: {
    backgroundFolderId: "17J5JDagGIwX3Zdei_WjD1jbB63k7LF-e",
    logosFolderId: "1-BZvUvJMDqC0zaEyRBjFeI-R2h69BZbU6q1LYJKnbS0RerlXzV860o8KAhWQE58_lb0oIywS",
    sponsorsFolderId: "1MvG59spxK9cQGzDPl4mqS3MdIq0TgOrL",
    glassOpacity: "0.2",
    enableCustomBackground: true,
    adminEmails: [],
    backgroundImage: ""
  },
  sheetNames: {
    teams: "Teams",
    matches: "Matches",
    settings: "Settings",
    blockedDates: "BlockedDates",
    capacity: "Capacidad",
    pricingConfig: "PricingConfig",
    categoryPricing: "CategoryPricing"
  },
  pricingConfig: {
    inscription: 1250,
    deposit: 200,
    credentials: 360,
    refereeGamesRequired: 5
  },
  categoryPricing: [
    { category: "Cachi", refereeCash: 175, refereeInvoice: 225 },
    { category: "Micro", refereeCash: 175, refereeInvoice: 225 },
    { category: "Infantil Menor", refereeCash: 175, refereeInvoice: 225 },
    { category: "Secundaria Femenil", refereeCash: 185, refereeInvoice: 235 },
    { category: "Secundaria Varonil", refereeCash: 185, refereeInvoice: 235 },
    { category: "Prepa Femenil", refereeCash: 220, refereeInvoice: 275 },
    { category: "Prepa Varonil", refereeCash: 220, refereeInvoice: 275 },
    { category: "3a Fuerza Femenil", refereeCash: 220, refereeInvoice: 275 },
    { category: "3a Fuerza Varonil", refereeCash: 220, refereeInvoice: 275 },
    { category: "2a Fuerza Femenil", refereeCash: 230, refereeInvoice: 285 },
    { category: "2a Fuerza Varonil", refereeCash: 230, refereeInvoice: 285 },
    { category: "2a Fuerza Libre Femenil", refereeCash: 230, refereeInvoice: 285 },
    { category: "1a Fuerza Varonil", refereeCash: 230, refereeInvoice: 285 },
    { category: "Mixto Libre", refereeCash: 220, refereeInvoice: 275 }
  ],
  adminConfig: {
    startDate: "",
    endDate: "",
    blockedDates: []
  },
  capacityRows: [
    {
      venue: "Cancha Palacio Municipal - Municipio Tixkokob",
      court: "Cancha principal",
      startTime: "16:00",
      day: "sábado",
      category: "Preparatoria",
      group: "Cuadrangular"
    },
    {
      venue: "CDK Cancha 3 (Complejo Deportivo Kukulcán)",
      court: "Cancha 3",
      startTime: "17:00",
      day: "domingo",
      category: "Mixto",
      group: "Comunidad"
    },
    {
      venue: "CDK Cancha 2 (Complejo Deportivo Kukulcán)",
      court: "Cancha 2",
      startTime: "09:00",
      day: "sábado",
      category: "3ª Fuerza Varonil",
      group: "Conmemorativo"
    },
    {
      venue: "Parque 7 de Agosto - Cancha 1",
      court: "Cancha 1",
      startTime: "08:00",
      day: "sábado",
      category: "Fem - Inf. Menor 11-12",
      group: "CIVOLSUR"
    },
    {
      venue: "Arena Anáhuac - Universidad Anáhuac Mayab",
      court: "Arena principal",
      startTime: "19:00",
      day: "viernes",
      category: "Libre",
      group: "Final"
    }
  ],
  demoTeams: [
    {
      id: "demo-prepa-1",
      name: "Felipinos Preparatoria",
      branch: "femenil",
      category: "Preparatoria",
      date: "2026-04-11",
      startTime: "16:00",
      endTime: "20:00",
      unavailableDates: [],
      preferredDates: ["2026-04-11", "2026-04-18"],
      overrideBlockedDates: [],
      ownerEmail: "demo1@example.com",
      createdAt: "2026-04-05T10:00:00.000Z",
      logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      participateInMatching: true
    },
    {
      id: "demo-prepa-2",
      name: "Centinelas/Pretorianas by iPV",
      branch: "femenil",
      category: "Preparatoria",
      date: "2026-04-11",
      startTime: "17:00",
      endTime: "21:00",
      unavailableDates: [],
      preferredDates: ["2026-04-11"],
      overrideBlockedDates: [],
      ownerEmail: "demo2@example.com",
      createdAt: "2026-04-05T10:02:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    },
    {
      id: "demo-prepa-3",
      name: "Benjis Infantil",
      branch: "femenil",
      category: "Preparatoria",
      date: "2026-04-11",
      startTime: "16:30",
      endTime: "19:30",
      unavailableDates: [],
      preferredDates: ["2026-04-11"],
      overrideBlockedDates: [],
      ownerEmail: "demo3@example.com",
      createdAt: "2026-04-05T10:04:00.000Z",
      logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      participateInMatching: true
    },
    {
      id: "demo-prepa-4",
      name: "Legacy",
      branch: "femenil",
      category: "Preparatoria",
      date: "2026-04-11",
      startTime: "18:30",
      endTime: "20:00",
      unavailableDates: [],
      preferredDates: ["2026-04-11"],
      overrideBlockedDates: [],
      ownerEmail: "demo4@example.com",
      createdAt: "2026-04-05T10:06:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    },
    {
      id: "demo-mixto-1",
      name: "Centinelas/Mensajero",
      branch: "mixto",
      category: "Mixto",
      date: "2026-04-12",
      startTime: "17:00",
      endTime: "21:00",
      unavailableDates: [],
      preferredDates: ["2026-04-12"],
      overrideBlockedDates: [],
      ownerEmail: "demo5@example.com",
      createdAt: "2026-04-05T10:08:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    },
    {
      id: "demo-mixto-2",
      name: "Gacelobos",
      branch: "mixto",
      category: "Mixto",
      date: "2026-04-12",
      startTime: "17:30",
      endTime: "20:30",
      unavailableDates: [],
      preferredDates: ["2026-04-12"],
      overrideBlockedDates: [],
      ownerEmail: "demo6@example.com",
      createdAt: "2026-04-05T10:10:00.000Z",
      logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      participateInMatching: true
    },
    {
      id: "demo-mixto-3",
      name: "Gladiadores",
      branch: "mixto",
      category: "Mixto",
      date: "2026-04-12",
      startTime: "18:00",
      endTime: "21:00",
      unavailableDates: [],
      preferredDates: ["2026-04-12"],
      overrideBlockedDates: [],
      ownerEmail: "demo7@example.com",
      createdAt: "2026-04-05T10:12:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    },
    {
      id: "demo-mixto-4",
      name: "FUNADOS ALB",
      branch: "mixto",
      category: "Mixto",
      date: "2026-04-12",
      startTime: "18:30",
      endTime: "21:30",
      unavailableDates: [],
      preferredDates: ["2026-04-12"],
      overrideBlockedDates: [],
      ownerEmail: "demo8@example.com",
      createdAt: "2026-04-05T10:14:00.000Z",
      logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      participateInMatching: true
    },
    {
      id: "demo-3f-1",
      name: "π Pretorianos (3ª Fuerza) VARONIL",
      branch: "varonil",
      category: "3ª Fuerza Varonil",
      date: "2026-04-18",
      startTime: "09:00",
      endTime: "13:00",
      unavailableDates: [],
      preferredDates: ["2026-04-18"],
      overrideBlockedDates: [],
      ownerEmail: "demo9@example.com",
      createdAt: "2026-04-05T10:16:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    },
    {
      id: "demo-3f-2",
      name: "Bats '07 - '08 (3ª Fuerza) VARONIL",
      branch: "varonil",
      category: "3ª Fuerza Varonil",
      date: "2026-04-18",
      startTime: "09:30",
      endTime: "12:30",
      unavailableDates: [],
      preferredDates: ["2026-04-18"],
      overrideBlockedDates: [],
      ownerEmail: "demo10@example.com",
      createdAt: "2026-04-05T10:18:00.000Z",
      logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      participateInMatching: true
    },
    {
      id: "demo-3f-3",
      name: "Zorros CAHAD (3ª Fuerza) VARONIL",
      branch: "varonil",
      category: "3ª Fuerza Varonil",
      date: "2026-04-18",
      startTime: "10:00",
      endTime: "13:00",
      unavailableDates: [],
      preferredDates: ["2026-04-18"],
      overrideBlockedDates: [],
      ownerEmail: "demo11@example.com",
      createdAt: "2026-04-05T10:20:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    },
    {
      id: "demo-3f-4",
      name: "AXOLOTS (3°Fuerza) VARONIL",
      branch: "varonil",
      category: "3ª Fuerza Varonil",
      date: "2026-04-18",
      startTime: "10:30",
      endTime: "12:30",
      unavailableDates: [],
      preferredDates: ["2026-04-18"],
      overrideBlockedDates: [],
      ownerEmail: "demo12@example.com",
      createdAt: "2026-04-05T10:22:00.000Z",
      logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      participateInMatching: true
    }
  ],
  demoMatches: [
    {
      id: "demo-match-tix-1",
      teamA: { name: "Felipinos Preparatoria", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Centinelas/Pretorianas by iPV", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "femenil",
      category: "Preparatoria",
      group: "Tixkokob 1",
      date: "2026-01-24",
      startTime: "17:00",
      endTime: "18:00",
      venue: "Cancha Palacio Municipal - Municipio Tixkokob",
      court: "Cancha principal",
      alternatives: [{ label: "Evento concluido · Cuadrangular Tixkokob" }],
      accepted: true
    },
    {
      id: "demo-match-tix-2",
      teamA: { name: "Felipinos Secundaria", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Centinelas Prepa - CDK", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "femenil",
      category: "Secundaria",
      group: "Tixkokob 1",
      date: "2026-01-24",
      startTime: "18:00",
      endTime: "19:00",
      venue: "Cancha Palacio Municipal - Municipio Tixkokob",
      court: "Cancha principal",
      alternatives: [{ label: "Evento concluido · Cuadrangular Tixkokob" }],
      accepted: true
    },
    {
      id: "demo-match-tix-3",
      teamA: { name: "Felipinos Secundaria", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Centinelas/Pretorianas by iPV", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "femenil",
      category: "Secundaria",
      group: "Tixkokob 1",
      date: "2026-01-24",
      startTime: "19:00",
      endTime: "20:00",
      venue: "Cancha Palacio Municipal - Municipio Tixkokob",
      court: "Cancha principal",
      alternatives: [{ label: "Evento concluido · Cuadrangular Tixkokob" }],
      accepted: true
    },
    {
      id: "demo-match-tix-4",
      teamA: { name: "Felipinos Preparatoria", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Centinelas Prepa - CDK", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "femenil",
      category: "Preparatoria",
      group: "Tixkokob 1",
      date: "2026-01-24",
      startTime: "20:00",
      endTime: "21:00",
      venue: "Cancha Palacio Municipal - Municipio Tixkokob",
      court: "Cancha principal",
      alternatives: [{ label: "Evento concluido · Cuadrangular Tixkokob" }],
      accepted: true
    },
    {
      id: "demo-match-tix2-1",
      teamA: { name: "Felipinos Preparatoria", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Benjis Infantil", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      branch: "femenil",
      category: "Preparatoria",
      group: "Tixkokob 2",
      date: "2026-01-31",
      startTime: "17:00",
      endTime: "18:00",
      venue: "Cancha Palacio Municipal - Municipio Tixkokob",
      court: "Cancha principal",
      alternatives: [{ label: "Evento concluido · 2° Cuadrangular Tixkokob" }],
      accepted: true
    },
    {
      id: "demo-match-tix2-2",
      teamA: { name: "Benjis", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Legacy", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "femenil",
      category: "Preparatoria",
      group: "Tixkokob 2",
      date: "2026-01-31",
      startTime: "18:00",
      endTime: "19:00",
      venue: "Cancha Palacio Municipal - Municipio Tixkokob",
      court: "Cancha principal",
      alternatives: [{ label: "Evento concluido · 2° Cuadrangular Tixkokob" }],
      accepted: true
    },
    {
      id: "demo-match-mixto-1",
      teamA: { name: "Centinelas/Mensajero", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      teamB: { name: "Gacelobos", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      branch: "mixto",
      category: "Mixto",
      group: "Conmemorativo",
      date: "2025-12-28",
      startTime: "09:00",
      endTime: "10:00",
      venue: "CDK Cancha 3 (Complejo Deportivo Kukulcán)",
      court: "Cancha 3",
      alternatives: [{ label: "Evento concluido · Juegos Conmemorativos" }],
      accepted: true
    },
    {
      id: "demo-match-mixto-2",
      teamA: { name: "Águilas", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Gladiadores", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "mixto",
      category: "Mixto",
      group: "Conmemorativo",
      date: "2025-12-28",
      startTime: "11:00",
      endTime: "12:00",
      venue: "CDK Cancha 3 (Complejo Deportivo Kukulcán)",
      court: "Cancha 3",
      alternatives: [{ label: "Evento concluido · Juegos Conmemorativos" }],
      accepted: true
    },
    {
      id: "demo-match-3f-1",
      teamA: { name: "AXOLOTS (Promocional/Preparatoria) VARONIL", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Zorros CAHAD (3ª Fuerza) VARONIL", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "varonil",
      category: "3ª Fuerza Varonil",
      group: "Conmemorativo",
      date: "2025-12-28",
      startTime: "09:00",
      endTime: "10:00",
      venue: "CDK Cancha 2 (Complejo Deportivo Kukulcán)",
      court: "Cancha 2",
      alternatives: [{ label: "Evento concluido · 3ª Fuerza" }],
      accepted: true
    },
    {
      id: "demo-match-3f-2",
      teamA: { name: "π Pretorianos (3ª Fuerza) VARONIL", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      teamB: { name: "Bats '07 - '08 (3ª Fuerza) VARONIL", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      branch: "varonil",
      category: "3ª Fuerza Varonil",
      group: "Conmemorativo",
      date: "2025-12-28",
      startTime: "14:00",
      endTime: "15:00",
      venue: "CDK Cancha 2 (Complejo Deportivo Kukulcán)",
      court: "Cancha 2",
      alternatives: [{ label: "Evento concluido · 3ª Fuerza" }],
      accepted: true
    },
    {
      id: "demo-match-civolsur-1",
      teamA: { name: "L'Eglise Fefran", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Cuervitas Novatas", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "femenil",
      category: "Fem - Inf. Menor 11-12",
      group: "CIVOLSUR",
      date: "2026-01-10",
      startTime: "22:00",
      endTime: "23:00",
      venue: "U. Dep. 20 Noviembre - Cancha 1",
      court: "Cancha 1",
      alternatives: [{ label: "Programado · CIVOLSUR" }],
      accepted: false
    },
    {
      id: "demo-match-civolsur-2",
      teamA: { name: "Caribeñitas B", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      teamB: { name: "Centinelas (Secundaria)", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      branch: "femenil",
      category: "Fem - Inf. Menor 11-12",
      group: "CIVOLSUR",
      date: "2026-01-11",
      startTime: "08:00",
      endTime: "09:00",
      venue: "Parque 7 de Agosto - Cancha 1",
      court: "Cancha 1",
      alternatives: [{ label: "Programado · CIVOLSUR" }],
      accepted: false
    },
    {
      id: "demo-match-rogers-1",
      teamA: { name: "Centinelas by iPV - CDK", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      teamB: { name: "Anáhuac (Prepa)", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      branch: "femenil",
      category: "Preparatoria",
      group: "Rogers",
      date: "2026-03-18",
      startTime: "19:00",
      endTime: "20:00",
      venue: "Prepa Anáhuac Mérida",
      court: "Cancha principal",
      alternatives: [{ label: "Programado · Rogers" }],
      accepted: false
    },
    {
      id: "demo-match-rogers-2",
      teamA: { name: "Centinelas by iPV - CDK", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      teamB: { name: "L'Eglise (Yamil)", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      branch: "femenil",
      category: "Preparatoria",
      group: "Rogers",
      date: "2026-03-21",
      startTime: "10:00",
      endTime: "11:00",
      venue: "Deportivo Rogers Hall - Cancha 2",
      court: "Cancha 2",
      alternatives: [{ label: "Programado · Rogers" }],
      accepted: false
    },
    {
      id: "demo-match-anahuac-1",
      teamA: { name: "Centinelas - CDK", logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl" },
      teamB: { name: "Tigres", logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs" },
      branch: "varonil",
      category: "Libre",
      group: "Final",
      date: "2026-03-13",
      startTime: "19:00",
      endTime: "20:00",
      venue: "Arena Anáhuac - Universidad Anáhuac Mayab",
      court: "Arena principal",
      alternatives: [{ label: "Evento concluido · Final" }],
      accepted: true
    }
  ],
  demoEvents: [
    {
      id: "all",
      label: "Base demo completa",
      description: "Carga la mezcla actual de demos futuros e historicos."
    },
    {
      id: "quick-campus",
      label: "Demo rapida · Campus y prepas",
      matchIds: ["demo-match-rogers-1", "demo-match-rogers-2", "demo-match-anahuac-1"],
      description: "Preset pequeno para validar sedes educativas, logos y detalle de partido."
    },
    {
      id: "quick-comunidad",
      label: "Demo rapida · Comunidad con logos",
      matchIds: ["demo-match-mixto-1", "demo-match-mixto-2", "demo-match-3f-1", "demo-match-3f-2"],
      description: "Preset pequeno con equipos comunitarios y logos mas distintivos."
    },
    {
      id: "quick-tixkokob",
      label: "Demo rapida · Tixkokob",
      matchIds: ["demo-match-tix-1", "demo-match-tix-2", "demo-match-tix-3", "demo-match-tix-4"],
      description: "Preset pequeno para revisar evento concluido con partidos, logos y bracket.",
      bracketUrl: "https://by-ipv.github.io/cuadrangular-by-iPV/index.html?event=by-iPV-2026-TIX-CUAD-v1",
      podiums: [
        {
          category: "Preparatoria",
          places: [
            { rank: 1, team: "Felipinos Preparatoria" },
            { rank: 2, team: "Centinelas Prepa - CDK" },
            { rank: 3, team: "Centinelas/Pretorianas by iPV" }
          ]
        }
      ]
    },
    {
      id: "future-prepa",
      label: "Demo futura · Preparatoria",
      teamIds: ["demo-prepa-1", "demo-prepa-2", "demo-prepa-3", "demo-prepa-4"],
      description: "Equipos futuros para generar partidos de Preparatoria."
    },
    {
      id: "future-mixto",
      label: "Demo futura · Mixto",
      teamIds: ["demo-mixto-1", "demo-mixto-2", "demo-mixto-3", "demo-mixto-4"],
      description: "Equipos futuros para generar partidos mixtos."
    },
    {
      id: "future-3f",
      label: "Demo futura · 3ª Fuerza Varonil",
      teamIds: ["demo-3f-1", "demo-3f-2", "demo-3f-3", "demo-3f-4"],
      description: "Equipos futuros para generar partidos de 3ª Fuerza."
    },
    {
      id: "tixkokob-1",
      label: "Evento · Tixkokob 1",
      matchIds: ["demo-match-tix-1", "demo-match-tix-2", "demo-match-tix-3", "demo-match-tix-4"],
      description: "1er Cuadrangular Voleibol Tixkokob 2026.",
      bracketUrl: "https://by-ipv.github.io/cuadrangular-by-iPV/index.html?event=by-iPV-2026-TIX-CUAD-v1",
      podiums: [
        {
          category: "Preparatoria",
          places: [
            { rank: 1, team: "Felipinos Preparatoria" },
            { rank: 2, team: "Centinelas Prepa - CDK" },
            { rank: 3, team: "Centinelas/Pretorianas by iPV" }
          ]
        }
      ]
    },
    {
      id: "tixkokob-2",
      label: "Evento · Tixkokob 2",
      matchIds: ["demo-match-tix2-1", "demo-match-tix2-2"],
      description: "2° Cuadrangular Voleibol Tixkokob 2026.",
      bracketUrl: "https://by-ipv.github.io/cuadrangular-by-iPV/index.html?event=by-iPV-2026-TIX-CUAD-v2"
    },
    {
      id: "conmemorativo-mixto",
      label: "Evento · Conmemorativo Mixto",
      matchIds: ["demo-match-mixto-1", "demo-match-mixto-2"],
      description: "Juegos Conmemorativos Mixto."
    },
    {
      id: "conmemorativo-3f",
      label: "Evento · Conmemorativo 3ª Fuerza",
      matchIds: ["demo-match-3f-1", "demo-match-3f-2"],
      description: "Juegos Conmemorativos 3ª Fuerza Varonil."
    },
    {
      id: "civolsur",
      label: "Evento · CIVOLSUR",
      matchIds: ["demo-match-civolsur-1", "demo-match-civolsur-2"],
      description: "Demo base CIVOLSUR.",
      podiums: [
        {
          category: "Minivoleibol 2015 y menores Varonil / Mix",
          places: [
            { rank: 1, team: "TALENTOS" },
            { rank: 2, team: "CLUB LECHUZAS CHETUMAL" },
            { rank: 3, team: "MONKEYS" }
          ]
        },
        {
          category: "Juv Menor 2009-10 Fem",
          places: [
            { rank: 1, team: "LEGLISE JULIO" },
            { rank: 2, team: "LEGLISE ALE" },
            { rank: 3, team: "CUERVITAS" }
          ]
        },
        {
          category: "Libre Var",
          places: [
            { rank: 1, team: "UADY" },
            { rank: 2, team: "CARIBUES" },
            { rank: 3, team: "MEDUSAS TABASCO" }
          ]
        }
      ],
      standings: [
        {
          category: "Juv Menor 2009-10 Fem",
          group: "Grupo A",
          rows: [
            { team: "LEGLISE JULIO", jj: 4, jg: 4, jp: 0, sf: 8, sc: 1, pf: 213, pc: 144, pctPoints: "1,479", pctSets: "88,9" },
            { team: "SAN FRANCISCO", jj: 4, jg: 3, jp: 1, sf: 7, sc: 3, pf: 210, pc: 190, pctPoints: "1,105", pctSets: "70,0" },
            { team: "MONKEYS CANCUN", jj: 4, jg: 2, jp: 2, sf: 5, sc: 4, pf: 190, pc: 152, pctPoints: "1,250", pctSets: "55,6" },
            { team: "CLUB FININI", jj: 4, jg: 1, jp: 3, sf: 2, sc: 7, pf: 167, pc: 199, pctPoints: "0,839", pctSets: "22,2" },
            { team: "ALLSTAR", jj: 4, jg: 0, jp: 4, sf: 1, sc: 8, pf: 130, pc: 225, pctPoints: "0,578", pctSets: "11,1" }
          ]
        },
        {
          category: "Juv Menor 2009-10 Fem",
          group: "Grupo B",
          rows: [
            { team: "LEGLISE ALE", jj: 4, jg: 4, jp: 0, sf: 8, sc: 0, pf: 200, pc: 121, pctPoints: "1,653", pctSets: "100,0" },
            { team: "LECHUZAS COZUMEL", jj: 4, jg: 3, jp: 1, sf: 6, sc: 4, pf: 206, pc: 203, pctPoints: "1,015", pctSets: "60,0" },
            { team: "RINOS", jj: 4, jg: 2, jp: 2, sf: 4, sc: 5, pf: 183, pc: 185, pctPoints: "0,989", pctSets: "44,4" },
            { team: "ALBATROS", jj: 4, jg: 1, jp: 3, sf: 4, sc: 6, pf: 203, pc: 198, pctPoints: "1,025", pctSets: "40,0" },
            { team: "CENTINELAS", jj: 4, jg: 0, jp: 4, sf: 1, sc: 8, pf: 129, pc: 214, pctPoints: "0,603", pctSets: "11,1" }
          ]
        },
        {
          category: "Juv Menor 2009-10 Fem",
          group: "Grupo C",
          rows: [
            { team: "CUERVITAS", jj: 4, jg: 4, jp: 0, sf: 8, sc: 1, pf: 215, pc: 133, pctPoints: "1,617", pctSets: "88,9" },
            { team: "PROGRESO", jj: 4, jg: 3, jp: 1, sf: 7, sc: 4, pf: 223, pc: 219, pctPoints: "1,018", pctSets: "63,6" },
            { team: "YUCATECOS ISAI", jj: 4, jg: 2, jp: 2, sf: 5, sc: 6, pf: 183, pc: 225, pctPoints: "0,813", pctSets: "45,5" },
            { team: "FENIX QROO", jj: 4, jg: 1, jp: 3, sf: 4, sc: 7, pf: 202, pc: 233, pctPoints: "0,867", pctSets: "36,4" },
            { team: "COLIBRIS CALKINI", jj: 4, jg: 0, jp: 4, sf: 2, sc: 8, pf: 196, pc: 209, pctPoints: "0,938", pctSets: "20,0" }
          ]
        },
        {
          category: "Juv Menor 2009-10 Fem",
          group: "Grupo D",
          rows: [
            { team: "GACELAS", jj: 4, jg: 4, jp: 0, sf: 8, sc: 0, pf: 200, pc: 103, pctPoints: "1,942", pctSets: "100,0" },
            { team: "JUPLAV", jj: 4, jg: 3, jp: 1, sf: 6, sc: 3, pf: 192, pc: 149, pctPoints: "1,289", pctSets: "66,7" },
            { team: "DELFINES 2008", jj: 4, jg: 2, jp: 2, sf: 4, sc: 5, pf: 169, pc: 191, pctPoints: "0,885", pctSets: "44,4" },
            { team: "GUERRERAS", jj: 4, jg: 1, jp: 3, sf: 4, sc: 6, pf: 178, pc: 194, pctPoints: "0,918", pctSets: "40,0" },
            { team: "DEPORTIVO DEL PARQUE", jj: 4, jg: 0, jp: 4, sf: 0, sc: 8, pf: 98, pc: 200, pctPoints: "0,490", pctSets: "0,0" }
          ]
        }
      ]
    },
    {
      id: "rogers",
      label: "Evento · Rogers",
      matchIds: ["demo-match-rogers-1", "demo-match-rogers-2"],
      description: "Torneo Rita Cicero."
    },
    {
      id: "anahuac",
      label: "Evento · Anáhuac Mayab",
      matchIds: ["demo-match-anahuac-1"],
      description: "Final en Arena Anáhuac."
    }
  ],
  demoAdminConfig: {
    startDate: "2026-04-10",
    endDate: "2026-04-30",
    blockedDates: [
      { date: "2026-04-19", reason: "Torneo estatal" }
    ]
  }
};
