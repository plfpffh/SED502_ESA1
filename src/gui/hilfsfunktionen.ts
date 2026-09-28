/**
 * hilfsfunktionen.ts – Hilfsfunktionen der Darstellung (GUI-Schicht)
 *
 * Gemeinsame Hilfsfunktionen für DOM-Zugriff und Zahlen-/Datumsformatierung.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 1: Seen im Klimawandel
 * @author   Peter Luckmann
 */

export const zahl = new Intl.NumberFormat('de-AT', { maximumFractionDigits: 2 });
export const datumZeit = new Intl.DateTimeFormat('de-AT', { dateStyle: 'medium', timeStyle: 'short' });

/** Sucht ein Element und bricht ab, wenn es im HTML fehlt. */
export function element<T extends HTMLElement>(selektor: string): T {
  const gefunden = document.querySelector<T>(selektor);
  if (!gefunden) {
    throw new Error(`Element ${selektor} fehlt im HTML`);
  }
  return gefunden;
}

/**
 * Erzeugt ein Element mit reinem Text-Inhalt.
 * Text wird über textContent gesetzt und nie als HTML interpretiert (Schutz vor XSS).
 */
export function neu<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  text?: string,
  klasse?: string,
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (klasse !== undefined) el.className = klasse;
  return el;
}
