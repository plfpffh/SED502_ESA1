# Seen im Klimawandel – Salzburg & Oberösterreich

Statische Webseite für die Einsendeaufgabe 1 im Modul **SED502 Frontend Development** (Ferdinand Porsche FernFH).

Die Seite vergleicht 14 Seen im Salzburger Seenland und im Salzkammergut nach Wassertemperatur, Tiefe und Fläche und erklärt, warum flache und tiefe Seen unterschiedlich auf Hitze und Frost reagieren. Sie ist die inhaltliche Grundlage für die React-Anwendung in ESA 2 und ESA 3, die dort live Messwerte lädt.

## Funktionen

- Seenliste als Karten mit Fläche, maximaler Tiefe, Seehöhe und Wassertemperatur je Messstelle
- Filter nach Bundesland, Tiefenkategorie und Wassertemperatur zum Baden (mindestens 0–30 °C oder „alle“), Sortierung nach Temperatur, Name, Tiefe oder Fläche
- Seen ohne aktuellen Messwert werden mit „Wert aktuell nicht vorhanden“ angezeigt und stehen bei jeder Sortierung und jedem Temperaturfilter am Ende (unbekannt, ob sie den Filter erfüllen)
- Kennzahlen zur aktuellen Auswahl (Anzahl, Durchschnittstemperatur, wärmster See, Gesamtfläche)
- Hintergrundinformationen zu Seen und Klima inkl. Sicherheitshinweis zum Eislaufen

## Starten

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # TypeScript-Prüfung + Produktions-Build
```

## Ordnerstruktur

### Hauptordner

Die Struktur des Hauptordners ergibt sich aus den Konventionen der eingesetzten Werkzeuge. Da keine `vite.config.ts` existiert, gelten die Standardwerte von Vite.

```
esa1-seen/
├── package.json          npm: Projektbeschreibung, Skripte, Abhängigkeiten
├── package-lock.json     npm: exakte Versionen aller Abhängigkeiten (erzeugt)
├── tsconfig.json         TypeScript: Compiler-Einstellungen
├── index.html            Vite: Einstiegspunkt der Seite
├── public/               Vite: statische Dateien, unverändert übernommen
│   ├── favicon.svg       Symbol im Browser-Tab
│   └── robots.txt        Bitte an Suchmaschinen, nicht zu indexieren
├── src/                  Konvention: eigener Quellcode (siehe unten)
├── .gitignore            Git: nicht versionierte Dateien
├── README.md             GitHub: Projektdokumentation
├── node_modules/         npm: installierte Abhängigkeiten (nicht im Repository)
└── dist/                 Vite: Produktions-Build (nicht im Repository)
```

| Datei/Ordner | Vorgegeben durch | Pflicht? |
|---|---|---|
| `package.json` | npm | Ja, npm sucht diese Datei im Hauptordner. |
| `package-lock.json`, `node_modules/` | npm | Werden von `npm install` automatisch erzeugt. |
| `index.html` im Hauptordner | Vite | Standard, änderbar über `vite.config.ts`. |
| `public/`, `dist/` | Vite | Standardnamen, änderbar über `vite.config.ts`. |
| `tsconfig.json` | TypeScript | Ja, `tsc` sucht diese Datei im Hauptordner. |
| `src/` | Konvention | Nein. Festgelegt durch `"include": ["src"]` in `tsconfig.json` und den Verweis auf `/src/main.ts` in `index.html`. |
| `.gitignore` | Git | Git erkennt die Datei nur unter diesem Namen. |
| `README.md` | GitHub-Konvention | Für den Betrieb nicht nötig. GitHub zeigt sie auf der Startseite des Repositorys an. |

**Was ins Repository gehört und was nicht**

- `dist/` ist ein **Build-Artefakt**. Der Ordner entsteht bei `npm run build` aus dem eigenen Code: TypeScript wird zu JavaScript übersetzt, gebündelt und verkleinert, CSS wird verkleinert und der Inhalt von `public/` wird kopiert. Die Prüfsummen im Dateinamen (z. B. `index-Dnuq-FQA.js`) ändern sich mit dem Inhalt, damit der Browser keine veraltete Version aus dem Cache lädt. `npm run preview` liefert genau diesen Stand lokal aus und eignet sich deshalb für den Lighthouse-Audit.
- `node_modules/` enthält **fremden Code** (TypeScript, Vite und deren Abhängigkeiten) aus der npm-Registry. Ins Repository kommt nur das „Rezept“: `package.json` legt fest, *welche* Pakete benötigt werden, `package-lock.json` legt fest, *welche genauen Versionen*. Mit `npm ci` erhalten dadurch alle Gruppenmitglieder in ESA 2 und 3 identische Versionen.
- `public/` ist dagegen **eigener Inhalt** und gehört ins Repository. Anders als Dateien in `src/`, die per `import` eingebunden und von Vite verarbeitet werden, behalten Dateien in `public/` ihren Namen und liegen später im Wurzelverzeichnis der Seite. Das ist z. B. für `robots.txt` nötig, die unter genau diesem Namen erreichbar sein muss. `robots.txt` ist nur eine Bitte an Crawler und kein Zugriffsschutz, denn das öffentliche Repository bleibt für alle einsehbar.

### Quellcode (`src/`)

Innerhalb von `src/` macht kein Werkzeug Vorgaben. Die Aufteilung in drei Schichten ist eine eigene Architekturentscheidung, siehe *Architektur: Warum drei Schichten?*.

```
src/
├── main.ts                         Einstiegspunkt, verbindet die Schichten mit dem Formular
├── data/                           Daten
│   ├── typen.ts                    Rohdaten: See, Messwert, Bundesland, Datenquelle
│   └── seen.ts                     Stammdaten und Momentaufnahme der Wassertemperaturen
├── logic/                          Geschäftslogik (ohne DOM-Zugriff)
│   ├── typen.ts                    Schnittstelle zur GUI: Filter, SeeAnsicht, Statistik, Auswahl
│   └── funktionen.ts               waehleSeen, zuAnsicht, filtereSeen, berechneStatistik …
│                                   mit filter, reduce, map und sort
└── gui/                            Darstellung
    ├── design/
    │   └── style.css               Eigenes Stylesheet
    ├── hilfsfunktionen.ts          DOM-Zugriff, Zahlen- und Datumsformat
    └── templates/                  Wiederverwendbare Seitenbausteine
        ├── filterformular.ts       Formularwerte → Filter
        ├── seekarte.ts             Karte (article) für einen See
        └── kennzahlen.ts           Kennzahlen der Auswahl
```

## Technische Entscheidungen

- **Vite + TypeScript (strict)** ohne Framework: `npm run build` führt zuerst `tsc` aus, Typfehler brechen den Build ab.
- **Strikte 3-Schichten-Architektur (data – logic – gui)**: siehe *Architektur: Warum drei Schichten?*.
- **Kein `innerHTML`**: Die Seekarten werden mit `createElement` und `textContent` aufgebaut. Daten werden dadurch nie als HTML interpretiert – wichtig, sobald in ESA 2 externe Messdaten geladen werden (Schutz vor XSS).
- **Semantisches HTML**: `header`, `nav` (mit `aria-label`), `main`, `section`, `article`, `aside`, `figure`/`figcaption`, `footer`; Formular mit `fieldset`/`legend` und `label`.
- **Accessibility**: Skip-Link, sichtbare Fokus-Stile, `aria-live` für die Trefferanzahl, ausreichende Farbkontraste. Lighthouse-Ergebnis: siehe `lighthouse.png`.
- **Mehrere Messstellen pro See** (z. B. Attersee: Kammer, Unterach) werden gemittelt. Das bereitet die Zusammenführung zweier Datenquellen in ESA 2 vor.
- **Temperaturfilter mit Checkbox „alle“**: Der Regler reicht von 0 °C bis 30 °C. 0 °C ist ein echter Filterwert (Süßwasser gefriert bei 0 °C, flüssiges Oberflächenwasser liegt nicht darunter) und nicht gleichbedeutend mit „kein Filter“. Dafür gibt es die Checkbox „alle“, die standardmäßig aktiv ist und den Regler sperrt.
- **Filter nur fürs Baden, Eissport erst in ESA 2 – bewusste Entscheidung**: Ursprünglich sollte derselbe Regler auch zeigen, welche Seen zugefroren sein könnten. Das ist mit den Daten aus ESA 1 aus zwei Gründen nicht seriös möglich. Erstens gibt es nur eine Momentaufnahme pro Messstelle. Eine Aussage wie „so viele Tage unter X °C“ braucht aber eine Zeitreihe mit Tageswerten. Zweitens ist die Wassertemperatur an der Messstelle ein schlechter Anzeiger für Eis. Ob ein See zufriert, hängt vor allem davon ab, wie lange die **Lufttemperatur** unter 0 °C bleibt, und unter einer Eisdecke kann die Messstelle weiterhin einige Grad über 0 °C messen. In ESA 2 kommt deshalb ein Umschalter „Baden / Eissport“ dazu. Der Eissport-Modus filtert dort nach der längsten Serie von Tagen mit einem Tagesmittel der Luft unter 0 °C (Open-Meteo, Tageswerte seit 1940) und ist ausdrücklich ein klimatischer Hinweis, keine Freigabe der Eisfläche.
- **Seen ohne Messwert bleiben sichtbar – bewusste Entscheidung**: Liefert eine Messstelle keinen Wert, erscheint der See trotzdem, mit dem Hinweis „Wert aktuell nicht vorhanden“, und steht bei jeder Sortierung und jedem Temperaturfilter am Ende der Liste. Würde der Filter solche Seen ausblenden, müssten Nutzer\*innen annehmen, dass der See zu kalt ist und den Filter nicht erfüllt. Tatsächlich wissen wir über seine Temperatur nichts. Die Seite soll fehlende Information als fehlend zeigen und nicht als Ergebnis ausgeben. In ESA 1 hat jeder See einen Messwert. Relevant wird die Regel in ESA 2, wenn eine der beiden Live-Datenquellen ausfällt. In der Statistik zählen diese Seen bei Anzahl und Gesamtfläche mit, nicht aber bei Durchschnittstemperatur und wärmstem See.

## Architektur: Warum drei Schichten?

### Aufbau

| Schicht | Ordner | Aufgabe | Kennt |
|---|---|---|---|
| Daten | `data/` | Rohdaten der Seen und Messwerte, so wie sie gespeichert bzw. geladen werden | nichts |
| Logik | `logic/` | Umwandeln, Filtern, Sortieren, Kennzahlen berechnen, ohne DOM-Zugriff | `data/` |
| Darstellung | `gui/` | Formular lesen, Karten und Kennzahlen ins HTML schreiben | `logic/` |

Die Schichten sind **strikt** getrennt: Jede Schicht greift nur auf die direkt darunterliegende zu, `gui/` und `main.ts` importieren nichts aus `data/`. Die Schnittstelle zwischen Logik und Darstellung ist in `logic/typen.ts` festgelegt (`Filter` hinein, `Auswahl` mit `SeeAnsicht[]` und `Statistik` heraus). Die GUI ruft dafür nur `waehleSeen()` und `messzeitpunkt()` auf. Die Datenschicht hat mit `data/typen.ts` ein eigenes Modell, das beschreibt, wie die Daten vorliegen, und nicht, wie sie angezeigt werden.

### Warum das hier sinnvoll ist

Für eine einzelne statische Seite wäre eine Datei `main.ts` technisch ausreichend. Die Trennung lohnt sich, weil dieses Projekt die Grundlage für ESA 2 und ESA 3 ist:

1. **Austauschbare Datenquelle.** In ESA 2 sollen die Wassertemperaturen live aus zwei Quellen (Hydris Salzburg, Hydrographischer Dienst OÖ) geladen werden. Diese Quellen liefern ihre Daten in eigenen Formaten. Durch die Trennung betrifft die Änderung vor allem `data/` und die Umwandlung in `zuAnsicht()`. Filterlogik und Darstellung arbeiten weiter mit `SeeAnsicht`, egal woher die Werte kommen. Einzige Anpassung in der Logik: Weil Live-Daten asynchron geladen werden, erhält `waehleSeen()` die Seen und Messwerte als Parameter, statt sie selbst aus `data/` zu lesen.
2. **Austauschbare Darstellung.** In ESA 2 und 3 wird die Oberfläche als React-Anwendung umgesetzt. Die Logikschicht besteht aus reinen Funktionen ohne DOM-Zugriff und kann bis auf die Signatur von `waehleSeen()` übernommen werden. Ersetzt wird `gui/`.
3. **Gruppenarbeit.** ESA 2 und 3 werden in Gruppen von 2–3 Personen umgesetzt. Die als TypeScript-Interfaces festgelegten Schnittstellen (`data/typen.ts`, `logic/typen.ts`) wirken dabei wie ein Vertrag: Wer eine neue Datenquelle anbindet oder eine neue Ansicht baut, arbeitet gegen dieselben Typen, und der Compiler meldet sofort, wenn jemand die Schnittstelle bricht. Weil Daten, Logik und Darstellung in getrennten Dateien liegen, entstehen außerdem weniger Merge-Konflikte.
4. **Testbarkeit.** Da die Logik kein `document` braucht, lässt sie sich ohne Browser prüfen, z. B. in Node oder später mit einem Test-Framework.
5. **Sicherheit.** Externe Daten gelangen nur über die Logikschicht zur Oberfläche. Damit gibt es eine klar definierte Stelle, an der Daten aus fremden Quellen in ESA 2 geprüft werden können. Die GUI setzt Texte zusätzlich nur über `textContent` (siehe *Kein `innerHTML`*).

### Preis der Trennung

Die Architektur hat auch Kosten: mehr Dateien, und `zuAnsicht()` kopiert Felder wie `name` oder `flaecheKm2` von `See` nach `SeeAnsicht`, was auf den ersten Blick doppelt wirkt. Dieser Mehraufwand ist bewusst in Kauf genommen, denn genau diese Kopie entkoppelt die Anzeige vom Format der Datenquelle. Für ESA 1 allein wäre die Architektur überdimensioniert, mit Blick auf ESA 2 und 3 spart sie Umbauarbeit.

## Datenquellen

- Wassertemperaturen (Momentaufnahme 25.09.2026, ca. 18:00): [Land Salzburg – Hydris Online](https://www.salzburg.gv.at/wasser/hydro/), [Land Oberösterreich – Hydrographischer Dienst](https://hydro.ooe.gv.at/)
- Fläche, Tiefe, Seehöhe: deutschsprachige Wikipedia, abgerufen am 25.09.2026

## Einsatz von AI-Tools

Siehe `reflexion.pdf`.
