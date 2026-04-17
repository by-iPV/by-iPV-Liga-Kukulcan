window.HUB_SPORT_LSK_CONFIG = {
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbyzw6In__9bHpthCfB56bcxQTkKOgeCiRkBCXIXmT6jWzvEgtJQ7usmf7vAtlwgshib/exec",
  googleClientId: "909480777075-4l5osf38lc6vl5b6ji42do0lemtl8qla.apps.googleusercontent.com",
  sessionStorageKey: "hub-sport-session",
  imageCachePrefix: "hub_sport_cache_",
  imageCacheTtlMs: 300000,
  dataSource: {
    // `false` = consumir fuente real desde Apps Script / Sheet.
    // `true` = forzar dataset embebido de demo.
    useDemoData: false,
    sheets: {
      preRegistered: "Equipos_Inscritos",
      teams: "Teams"
    },
    fields: {
      preRegistered: {
        email: "Direccion de correo electronico",
        branches: "Rama",
        categories: "Categoria(s)",
        logos: "Logo(s)",
        firstName: "Nombres(s)",
        lastNamePaternal: "A. Paterno",
        lastNameMaternal: "A. Materno",
        phone: "Telefono de contacto",
        teamName: "Nombre(s) de equipo"
      },
      teams: {
        id: "id",
        name: "name",
        branch: "branch",
        category: "category",
        ownerEmail: "ownerEmail"
      }
    }
  },
  events: {
    defaultEventAlias: "ipv",
    spreadsheetId: "1TNg4Ogygzq9PF3OEzliCI5BGRveutwYADNB5LInKzPU",
    settingsSheet: "Settings",
    logosFolderId: "",
    fallbackLogo: "../assets/logo-ipv-oficial.png",
    namesByAlias: {
      ipv: "iPV"
    },
    logosByAlias: {}
  },
  // [REL-HUB-01][A16.0.2][NEW] Lecciones replicadas: configuracion de presencia por entorno (local/staging/prod).
  presence: {
    enabled: true,
    // `auto`, `local`, `staging` o `prod`
    env: "auto",
    roomId: "	",
    heartbeatMs: 15000,
    countRefreshMs: 10000,
    staleTtlMs: 35000,
    endpointByEnv: {
      local: "http://127.0.0.1:8787",
      staging: "https://hub-sport-lsk-presence-staging.hsxjxdv5d8.workers.dev",
      prod: "https://hub-sport-lsk-presence.hsxjxdv5d8.workers.dev"
    },
    tracking: {
      enabled: true,
      mode: "hash-only",
      // Requisito de gobernanza: no guardar correo plano sin consentimiento explicito.
      requireConsent: true
    }
  },
  settings: {
    backgroundFolderId: "17J5JDagGIwX3Zdei_WjD1jbB63k7LF-e",
    sponsorsFolderId: "https://drive.google.com/drive/u/0/folders/1MvG59spxK9cQGzDPl4mqS3MdIq0TgOrL",
    teamLogosFolderId: "https://drive.google.com/drive/folders/1-BZvUvJMDqC0zaEyRBjFeI-R2h69BZbU6q1LYJKnbS0RerlXzV860o8KAhWQE58_lb0oIywS",
    logoCategoryRules: [],
    backgroundPreferredName: "Remate_Formulario_Balon_LSK.png",
    glassOpacity: "0.08"
  }
};
