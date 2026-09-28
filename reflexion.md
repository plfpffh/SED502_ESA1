# Reflexionsbericht ESA 1

Peter Luckmann · SED502 Front-End Development · Seen im Klimawandel

## Welches Thema habe ich gewählt und warum?

Meine Webseite vergleicht 14 Seen in Salzburg und Oberösterreich nach Wassertemperatur, Tiefe und Fläche. Ich wähle gerne Themen aus dem Fachgebiet der Referent\*innen, weil das meinen Horizont über die Technik hinaus erweitert. Außerdem sollte das Thema in allen ESAs des Moduls weiterverwendbar sein. ESA 2 und 3 bauen darauf auf, wie in einem typischen Softwareprojekt.

## Welche technische Entscheidung war für mich die schwierigste und wie habe ich sie gelöst?

Am schwierigsten war es, den Aufbau eines Node- und TypeScript-Projekts zu verinnerlichen. Ich komme aus der C#/.NET-Entwicklung mit 3-Schichten-Modell und serviceorientierter Architektur. Erst als ich verstanden hatte, wie und warum npm, Vite und TypeScript zusammenarbeiten, ging es gut voran. Die Standardwerte der Werkzeuge habe ich bewusst belassen. Im Ordner src habe ich dann meine gewohnte Architektur umgesetzt und Daten, Logik und Darstellung strikt getrennt.

## Welche Ressourcen und AI-Tools habe ich wie eingesetzt?

Ressourcen waren das Kompendium zu Modul 01 und 02, Visual Studio Code, Chrome DevTools mit Lighthouse, die Messdaten von Hydris Salzburg und Hydro Oberösterreich sowie Wikipedia für die Stammdaten.

Claude Code von Anthropic (Claude Opus 5.5, September 2026) nutzte ich zum Pair Programming für Reviews, Refactoring, Ideenaustausch und den Abgleich von Umsetzung und Anforderungen. Zu Beginn ließ ich die Angabe-PDF auf versteckte Textstellen prüfen. So setze ich keine verdeckten Anforderungen um, die gar nicht verlangt sind, und löse beim Abgleich durch die KI keine Prompt Injection aus. Die Prüfung ergab keine versteckten Textstellen. Dokumentation und README-Begründungen zu Ordnerstruktur und Architektur ließ ich bewusst von Claude Code formulieren, als Teil meiner Qualitätssicherung. Erfüllt der Methodenrumpf, was der Methodenkopf verspricht, vergleiche ich beides mit der generierten Dokumentation. Erst wenn alle drei zusammenpassen, weiß ich, dass die Methode tut, was sie soll.
