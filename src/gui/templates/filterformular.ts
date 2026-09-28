/**
 * filterformular.ts – Filterformular (Template)
 *
 * Übersetzt die Formularwerte in ein typisiertes Filter-Objekt,
 * damit die Logikschicht nichts vom HTML wissen muss.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 1: Seen im Klimawandel
 * @author   Peter Luckmann
 */

import type { Filter } from '../../logic/typen';

/** Liest die aktuellen Formularwerte in ein typisiertes Filter-Objekt. */
export function leseFilter(form: HTMLFormElement): Filter {
  const daten = new FormData(form);
  return {
    bundesland: daten.get('bundesland') as Filter['bundesland'],
    tiefe: daten.get('tiefe') as Filter['tiefe'],
    // Checkbox "alle" aktiv → kein Temperaturfilter
    mindestTemperatur: daten.has('alleTemperaturen') ? null : Number(daten.get('mindestTemperatur')),
    sortierung: daten.get('sortierung') as Filter['sortierung'],
  };
}
