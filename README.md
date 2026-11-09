# Pensum

Todo list par projets, pensée pour le téléphone. Une page web installable, sans compte, sans serveur, qui fonctionne hors ligne.

**Application : https://coupventdesgraviers.github.io/pensum/**

## Principes

- **Saisie minimale** : un titre suffit. Le todo va dans le projet actif.
- **Compartimentage** : l'accueil liste les projets et sous-projets. Le projet actif ne change que sur votre action.
- **Statuts simples** : ouvert, en cours, fait. Priorité basse ou haute en option, horizon « plus tard » pour les tâches de fond.
- **Notes libres** : description, réflexions, étapes. Une ligne `- [ ] étape` devient une case à cocher.

## Vos données restent sur votre téléphone

Ce dépôt ne contient que le code. Les todos sont stockés dans le navigateur du téléphone et ne sont jamais envoyés nulle part, ni à GitHub ni ailleurs.
Pensez à les exporter de temps en temps : accueil > ⋯ > Télécharger le fichier (ou Copier).

## Installer

- **Android (Chrome)** : ouvrir l'adresse ci-dessus, puis « Installer » dans le bandeau, ou menu ⋮ > Installer l'application.
- **iPhone (Safari)** : Partager > Sur l'écran d'accueil. Sur iPhone, l'appli installée a ses propres données, distinctes de Safari : installez-la avant
  de saisir vos todos.

## Mises à jour

L'application ne change jamais de code en tâche de fond. 
Une nouvelle version publiée ici n'est installée que lorsque vous touchez accueil > ⋯ > Mettre à jour l'application. Vos todos ne sont pas affectés.

## Contenu

| Fichier | Rôle |
|---|---|
| `index.html` | l'application (une seule page) |
| `sw.js` | fonctionnement hors ligne et mises à jour contrôlées |
| `manifest.webmanifest` | nom, icône et couleurs de l'appli installée |
| `icon*.png`, `icon.svg`, `apple-touch-icon.png` | icônes |

## Contributions

Projet personnel : les contributions et pull requests ne sont pas acceptées.
Vous pouvez librement forker le dépôt pour votre propre usage.

---
Code généré par Claude.ai.
