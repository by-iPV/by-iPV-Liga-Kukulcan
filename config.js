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
    capacity: "Capacidad"
  },
  adminConfig: {
    startDate: "",
    endDate: "",
    blockedDates: []
  },
  demoTeams: [
    {
      id: "demo-1",
      name: "Centinelas Pretorianas",
      branch: "femenil",
      category: "Libre",
      date: "2026-04-04",
      startTime: "18:00",
      endTime: "20:00",
      unavailableDates: [],
      preferredDates: ["2026-04-04", "2026-04-05"],
      overrideBlockedDates: [],
      ownerEmail: "demo1@example.com",
      createdAt: "2026-04-01T10:00:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    },
    {
      id: "demo-2",
      name: "Felipinos Preparatoria",
      branch: "femenil",
      category: "Libre",
      date: "2026-04-04",
      startTime: "19:00",
      endTime: "21:00",
      unavailableDates: [],
      preferredDates: ["2026-04-04"],
      overrideBlockedDates: [],
      ownerEmail: "demo2@example.com",
      createdAt: "2026-04-01T10:02:00.000Z",
      logoUrl: "https://drive.google.com/open?id=15x5qLfJ9GfeYPJBCEqNLNFUl7gVmTiqs",
      participateInMatching: true
    },
    {
      id: "demo-3",
      name: "Centinelas CDK",
      branch: "varonil",
      category: "Juvenil",
      date: "2026-04-05",
      startTime: "09:00",
      endTime: "11:00",
      unavailableDates: [],
      preferredDates: ["2026-04-05"],
      overrideBlockedDates: [],
      ownerEmail: "demo3@example.com",
      createdAt: "2026-04-01T10:03:00.000Z",
      logoUrl: "https://drive.google.com/open?id=1POrPyQPEmetVsDhwXFMInfDTcAfiACcl",
      participateInMatching: true
    }
  ],
  demoAdminConfig: {
    startDate: "2026-04-03",
    endDate: "2026-04-30",
    blockedDates: [
      { date: "2026-04-12", reason: "Torneo estatal" }
    ]
  }
};
