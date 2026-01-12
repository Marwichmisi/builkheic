/**
 * Global Configuration for the HEIC Converter Application
 * This file is loaded at runtime and allows configuration changes without recompilation.
 */
window.AppConfig = {
  // Advertisements / Affiliate Links
  ads: {
    enabled: true,
    provider: 'google', // example
    clientId: 'ca-pub-XXXXXXXXXXXXXXXX'
  },
  affiliate: {
    enabled: true,
    links: {
      toolA: 'https://example.com/ref/toolA'
    }
  },
  // Application specific settings
  app: {
    maxConcurrentConversions: 4, // Default fallback
    debug: false
  },
  // SEO & Text Content
  seo: {
    footerText: "Ce convertisseur HEIC fonctionne 100% dans votre navigateur. Aucune image n'est envoyée vers un serveur cloud. Vos données restent privées.",
    footerCopyright: "BulkHEIC - Le standard de la conversion locale."
  }
};
