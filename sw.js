/* Pensum : service worker. Code généré par Claude.ai.
   Sert l'application depuis le cache du téléphone, y compris hors ligne.
   Le code de l'application n'est jamais remplacé en tâche de fond : seulement sur
   le bouton « Mettre à jour l'application » du menu. Les données (todos) ne passent
   jamais par ce fichier et ne quittent pas le téléphone. */
"use strict";
const APP = "pensum-app";
const FONTS = "pensum-fonts";
const FILES = ["./", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

// Première installation : on remplit le cache. S'il existe déjà, on n'y touche pas.
self.addEventListener("install", e => e.waitUntil((async () => {
  const c = await caches.open(APP);
  if (!(await c.match("./"))) await c.addAll(FILES.map(f => new Request(f, {cache: "no-store"})));
})()));

self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("message", e => {
  const d = e.data || {};
  if (d.type === "pensum-activate") self.skipWaiting();
  if (d.type === "pensum-update" && e.ports[0]) e.waitUntil(update().then(r => e.ports[0].postMessage(r)));
});

// Mise à jour explicite : tout est téléchargé et vérifié avant de remplacer quoi que ce soit.
async function update() {
  try {
    const got = [];
    for (const f of FILES) {
      const res = await fetch(f, {cache: "no-store"});
      if (!res.ok) return {ok: false, error: `${f} : erreur ${res.status}`};
      got.push([f, res]);
    }
    const page = await got[0][1].clone().text();
    const m = page.match(/const APP_VERSION = "([^"]+)"/);
    if (!m || !page.includes("<title>Pensum</title>")) return {ok: false, error: "la page reçue n'est pas Pensum"};
    const c = await caches.open(APP);
    for (const [f, res] of got) await c.put(f, res);
    return {ok: true, version: m[1]};
  } catch (err) {
    return {ok: false, error: "réseau indisponible"};
  }
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    if (req.mode === "navigate") e.respondWith(caches.match("./").then(r => r || fetch(req)));
    else e.respondWith(caches.match(req, {ignoreSearch: true}).then(r => r || fetch(req)));
  } else if (FONT_HOSTS.includes(url.hostname)) {
    // Polices : copiées au premier affichage pour rester disponibles hors ligne.
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    }));
  }
});
