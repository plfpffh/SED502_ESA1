/**
 * typen.ts – Datenmodell der Logikschicht
 *
 * Typen, mit denen die Logikschicht nach oben (GUI) kommuniziert.
 * Die GUI darf nur diese Typen kennen, nie die Rohdaten aus data/.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 1: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import type { Bundesland, Datenquelle } from '../data/typen';

export type Tiefenkategorie = 'flach' | 'mittel' | 'tief';

export type Sortierung = 'name' | 'temperatur' | 'tiefe' | 'flaeche';

/** Filtereinstellungen aus dem Formular. */
export interface Filter {
  bundesland: Bundesland | 'alle';
  tiefe: Tiefenkategorie | 'alle';
  mindestTemperatur: number | null; // null = alle Temperaturen
  sortierung: Sortierung;
}

/** Messwert einer Messstelle, wie er angezeigt wird. */
export interface MessstelleAnsicht {
  name: string;
  quelle: Datenquelle;
  temperatur: number; // °C
}

/** Ein See mit allen für die Anzeige berechneten Werten. */
export interface SeeAnsicht {
  id: string;
  name: string;
  bundeslaender: Bundesland[];
  flaecheKm2: number;
  maxTiefeM: number;
  seehoeheM: number;
  temperatur: number | null; // Mittelwert aller Messstellen
  badeEinschaetzung: string | null;
  tiefenkategorie: Tiefenkategorie;
  messstellen: MessstelleAnsicht[];
}

/** Kennzahlen über eine Auswahl von Seen. */
export interface Statistik {
  anzahl: number;
  durchschnittsTemperatur: number | null;
  waermsterSee: SeeAnsicht | null;
  gesamtFlaecheKm2: number;
}

/** Ergebnis einer Filterung: gefilterte Seen plus Kennzahlen. */
export interface Auswahl {
  seen: SeeAnsicht[];
  gesamtanzahl: number;
  statistik: Statistik;
}
