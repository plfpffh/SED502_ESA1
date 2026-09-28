/**
 * kennzahlen.ts – Kennzahlen der Auswahl (Template)
 *
 * Schreibt die von berechneStatistik() gelieferten Werte in den
 * Abschnitt "Kennzahlen der Auswahl".
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 1: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import type { Statistik } from '../../logic/typen';
import { element, zahl } from '../hilfsfunktionen';

export function zeigeStatistik(statistik: Statistik): void {
  element('#stat-anzahl').textContent = String(statistik.anzahl);
  element('#stat-durchschnitt').textContent =
    statistik.durchschnittsTemperatur === null ? '–' : `${zahl.format(statistik.durchschnittsTemperatur)} °C`;
  element('#stat-waermster').textContent = statistik.waermsterSee?.name ?? '–';
  element('#stat-flaeche').textContent = `${zahl.format(statistik.gesamtFlaecheKm2)} km²`;
}
