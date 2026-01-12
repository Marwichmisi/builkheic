# BulkHEIC - Convertisseur HEIC Local-First

**BulkHEIC** est une application web moderne permettant de convertir des images HEIC (High Efficiency Image Container) en formats JPG ou PNG universels.

La particularité de BulkHEIC est son architecture **"Local-First"** : toutes les conversions sont effectuées directement dans le navigateur de l'utilisateur grâce à WebAssembly (WASM) et aux Web Workers. **Aucune image n'est jamais envoyée vers un serveur**, garantissant une confidentialité totale et des coûts d'infrastructure nuls.

![BulkHEIC Interface](https://via.placeholder.com/800x400?text=BulkHEIC+Interface)

## 🚀 Fonctionnalités Clés

*   **Conversion de Masse** : Glissez-déposez des dossiers entiers d'images.
*   **Support Dossiers** : Scanne récursivement les dossiers pour trouver les fichiers `.heic`.
*   **Privacy First** : Traitement 100% client-side (pas d'upload).
*   **Haute Performance** : Utilise `@imagemagick/magick-wasm` dans un Web Worker dédié pour ne pas bloquer l'interface.
*   **Export ZIP** : Téléchargement groupé de toutes les images converties en un seul clic.
*   **Design Premium** : Interface soignée, animations, mode sombre/élégant.

## 🛠️ Stack Technique

*   **Framework** : React + TypeScript (Vite)
*   **Style** : Tailwind CSS (v3) + PostCSS
*   **Core** : `@imagemagick/magick-wasm` (Conversion)
*   **Utilitaire** : `jszip` (Création d'archive)

## 📦 Installation & Développement

### Pré-requis
*   Node.js (v18 ou supérieur recommandé)
*   npm

### 1. Installation des dépendances
\`\`\`bash
npm install
\`\`\`

### 2. Lancer en mode développement
\`\`\`bash
npm run dev
\`\`\`
L'application sera accessible sur `http://localhost:5173`.

### 3. Build pour la production
\`\`\`bash
npm run build
\`\`\`
Les fichiers optimisés seront générés dans le dossier `dist/`.

## ⚙️ Configuration (Runtime)

Le fichier `public/config.js` permet de modifier certains paramètres sans avoir à recompiler l'application (idéal pour le SEO ou l'affiliation post-déploiement).

\`\`\`javascript
window.AppConfig = {
  ads: { ... }, // Configuration Ads
  seo: {
    footerText: "Texte SEO modifiable ici...",
    footerCopyright: "BulkHEIC ©"
  }
};
\`\`\`

## 🌍 Déploiement

Ce projet est une **Static Web App**. Le dossier `dist/` généré peut être hébergé sur n'importe quel serveur statique :
*   Vercel
*   Netlify
*   GitHub Pages
*   Apache/Nginx

**Note importante pour le déploiement** : Assurez-vous que le serveur sert correctement les fichiers `.wasm` avec le type MIME `application/wasm`.

---
*Développé avec ❤️ par l'équipe BulkHEIC.*
