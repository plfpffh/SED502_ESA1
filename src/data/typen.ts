/**
 * typen.ts – Datenmodell der Datenschicht
 *
 * Beschreibt die Rohdaten, so wie sie gespeichert bzw. geladen werden.
 * Darf nur von data/ und logic/ verwendet werden, nie direkt von der GUI.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 1: Seen im Klimawandel
 * @author   Peter Luckmann
 */

export type Bundesland = 'Salzburg' | 'Oberösterreich';

export type Datenquelle = 'Hydris Salzburg' | 'Hydrographischer Dienst OÖ';

/** Ein einzelner Messwert einer Messstelle am See. */
export interface Messwert {
  messstelle: string;
  quelle: Datenquelle;
  wassertemperatur: number; // °C
  zeitpunkt: string; // ISO-Datum, z.B. '2026-09-25T18:00'
}

/** Stammdaten eines Sees inkl. Momentaufnahme der Wassertemperatur. */
export interface See {
  id: string;
  name: string;
  bundeslaender: Bundesland[];
  flaecheKm2: number;
  maxTiefeM: number;
  seehoeheM: number;
  messwerte: Messwert[];
}
