/**
 * main.ts – Einstiegspunkt der Seite
 *
 * Verbindet das Formular mit Logik und Darstellung.
 * Greift wie die GUI nur auf die Logikschicht zu, nie direkt auf data/.
 *
 * @project  FERNFH SED502 Frontend Development WS 2026/27 ESA 1: Seen im Klimawandel
 * @author   Peter Luckmann
 */

// Eigenes Stylesheet
import './gui/design/style.css';

// Logikschicht: gefilterte Seen, Kennzahlen, Messzeitpunkt
import { messzeitpunkt, waehleSeen } from './logic/funktionen';

// GUI-Schicht: Hilfsfunktionen und Templates
import { datumZeit, element, zahl } from './gui/hilfsfunktionen';
import { leseFilter } from './gui/templates/filterformular';
import { zeigeStatistik } from './gui/templates/kennzahlen';
import { erstelleSeeKarte } from './gui/templates/seekarte';

const formular = element<HTMLFormElement>('#filter');
const liste = element<HTMLUListElement>('#seenliste');
const status = element<HTMLOutputElement>('#trefferanzahl');
const temperaturRegler = element<HTMLInputElement>('#mindest-temperatur');
const temperaturAnzeige = element<HTMLOutputElement>('#mindest-temperatur-wert');

function aktualisiere(): void {
  const filter = leseFilter(formular);
  const auswahl = waehleSeen(filter);

  // Checkbox "alle" aktiv → Regler sperren
  temperaturRegler.disabled = filter.mindestTemperatur === null;
  temperaturAnzeige.textContent = `${zahl.format(Number(temperaturRegler.value))} °C`;
  liste.replaceChildren(...auswahl.seen.map(erstelleSeeKarte));
  status.textContent =
    auswahl.seen.length === 0
      ? 'Kein See entspricht den Filtern.'
      : `${auswahl.seen.length} von ${auswahl.gesamtanzahl} Seen werden angezeigt.`;
  zeigeStatistik(auswahl.statistik);
}

formular.addEventListener('input', aktualisiere);
formular.addEventListener('reset', () => {
  // Reset setzt die Werte erst nach dem Event zurück
  setTimeout(aktualisiere);
});

const zeitpunkt = messzeitpunkt();
element('#messzeitpunkt').textContent = datumZeit.format(new Date(zeitpunkt));
element<HTMLTimeElement>('#messzeitpunkt').dateTime = zeitpunkt;

aktualisiere();
