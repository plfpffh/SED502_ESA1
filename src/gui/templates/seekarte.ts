/**
 * seekarte.ts – Einzelne Seekarte (Template)
 *
 * Baut die Karte (article) für einen See.
 * Reine Darstellung: alle Werte sind bereits in SeeAnsicht berechnet.
 * Kein innerHTML – alle Texte werden über textContent gesetzt.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 1: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import type { MessstelleAnsicht, SeeAnsicht } from '../../logic/typen';
import { neu, zahl } from '../hilfsfunktionen';

function erstelleKopf(see: SeeAnsicht): HTMLElement {
  const temperaturText =
    see.temperatur === null
      ? 'Wert aktuell nicht vorhanden'
      : `${zahl.format(see.temperatur)} °C · ${see.badeEinschaetzung}`;

  const titel = neu('h3', see.name);
  titel.id = `see-${see.id}`;

  const kopf = neu('header');
  kopf.append(titel, neu('p', temperaturText, 'see__temperatur'));
  return kopf;
}

function erstelleFakten(see: SeeAnsicht): HTMLDListElement {
  const fakten: [string, string][] = [
    ['Bundesland', see.bundeslaender.join(' / ')],
    ['Fläche', `${zahl.format(see.flaecheKm2)} km²`],
    ['Max. Tiefe', `${zahl.format(see.maxTiefeM)} m (${see.tiefenkategorie})`],
    ['Seehöhe', `${see.seehoeheM} m ü. A.`],
  ];

  const liste = neu('dl', undefined, 'see__fakten');
  liste.append(...fakten.flatMap(([begriff, wert]) => [neu('dt', begriff), neu('dd', wert)]));
  return liste;
}

function erstelleMessstelle(m: MessstelleAnsicht): HTMLLIElement {
  const eintrag = neu('li', `${m.name}: ${zahl.format(m.temperatur)} °C `);
  eintrag.append(neu('small', `(${m.quelle})`));
  return eintrag;
}

function erstelleMessstellen(see: SeeAnsicht): HTMLDetailsElement {
  const liste = neu('ul');
  liste.append(...see.messstellen.map(erstelleMessstelle));

  const details = neu('details');
  details.append(neu('summary', `Messstellen (${see.messstellen.length})`), liste);
  return details;
}

/** Baut die Karte (article) für einen See. */
export function erstelleSeeKarte(see: SeeAnsicht): HTMLLIElement {
  const artikel = neu('article', undefined, 'see');
  artikel.setAttribute('aria-labelledby', `see-${see.id}`);
  artikel.append(erstelleKopf(see), erstelleFakten(see));
  if (see.messstellen.length > 0) {
    artikel.append(erstelleMessstellen(see));
  }

  const eintrag = neu('li');
  eintrag.append(artikel);
  return eintrag;
}
