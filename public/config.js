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
    footerCopyright: "bulkheic - Le standard de la conversion locale.",
    descriptionTitle: "Convertir HEIC en JPG en ligne - Gratuit, Illimité et Sécurisé",
    descriptionText: `Pourquoi utiliser bulkheic ?
Contrairement aux autres convertisseurs, bulkheic fonctionne entièrement sur votre ordinateur. Vos photos personnelles ne sont jamais envoyées sur un serveur (Cloud). Tout se passe dans votre navigateur, ce qui garantit une confidentialité totale et une vitesse de conversion maximale.

Comment ça marche ?
1. Glissez vos fichiers .heic (iPhone/iPad).
2. Le convertisseur transforme instantanément les images en JPG ou PNG.
3. Téléchargez un fichier ZIP unique contenant toutes vos photos.

Est-ce gratuit ?
Oui, l'outil est 100% gratuit et sans limite de nombre. Vous pouvez convertir 50 ou 500 photos d'un coup.`
  }
};
