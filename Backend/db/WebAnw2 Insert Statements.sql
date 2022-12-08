-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Insert Statements

INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('Europaweite Teil-und Komplettladungen', 'Wir realisieren für Sie die optimale Planung und einen ökonomischen Transport von Teil - und Komplettladungen
            europaweit. Unsere Mitarbeiter/innen unterstützen Ihre Transportplanung und stellen Ihnen Anforderungen entsprechenden
            Laderaum, termingerecht zur Verfügung.', '../Bilder/dienstleistung1.png');
INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('Weltweiter Stückgutverkehr', 'Mit einem umfassenden Frachtnetzwerk für Sammelguttransporte in ganz Europa ermöglicht WebTrans eine präzise Transportplanung für die Lieferung Ihrer Güter. 
            Wir sind täglich in ganz Europa unterwegs und bieten feste Kapazitäten und hohe Flexibilität.
            Wir bieten Ihnen massgeschneiderte Konzepte für Sammelguttransporte auf Basis direkter und regelmässiger Abfahrten mit zuverlässigen Lieferzeiten.', '../Bilder/dienstleistung2.png');
INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('Spezial - und Gefahrguttransporte', 'Spezielle Aufträge und insbesonders als Gefahrgut deklarierte Lasten transportieren wir ganz routiniert, weil sie unser Tagesgeschäft sind.
            Um allen Anforderungen gerecht werden zu können, sind unsere Fahrzeuge mit der notwendigen Technik für den Transport gefährlicher Güter ausgestattet. Unser Fahrpersonal und unsere Disponenten sind im Umgang mit Gefahrgut bestens geschult. 
            Es ist ihre Erfahrung die das Spezialtransportgeschäft zu unserem Metier macht. ', '../Bilder/dienstleistung3.png');
INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('Schwertransporte', 'Für große und komplexe Herausforderungen hat WebTrans eine besondere Leidenschaft. Und alle notwendigen Voraussetzungen für die erfolgreiche Umsetzung Ihrer Projekte. Gerade im Bereich von Großraum- und Schwertransporten gilt es, zahlreiche Aspekte zu beachten. 
            Dazu gehören neben dem richtigen Fuhrpark mit passenden Fahrzeugkombinationen und top geschulten Fahrern nicht zuletzt langjährige Erfahrung und optimale Kenntnisse der Straßenverkehrsordnung.', '../Bilder/dienstleistung4.png');
INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('Umzugstransporte', 'Jeder Privatumzug ist so individuell wie Sie selbst und benötigt daher eine gründliche Planung und Vorbereitung, ganz nach Ihren Bedürfnissen und Wünschen.
            Unser erfahrenes und geschultes Festpersonal begleitet Sie gerne bei Ihrem Umzug in bzw. aus der Bodenseeregion.
            Mit unserem Full-Service begleiten wir Sie gerne über den kompletten Umzug hinweg.', '../Bilder/dienstleistung5.png');
INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('Sonderfahrten aller Art', 'Außergewöhnliche Sendungen erfordern maximale Sorgfalt. 
            Mit den vielzähligen gesetzlichen Vorschriften kennen wir uns bestens aus. 
            Und komplexe Anforderungen im Rahmen von geforderten Sonderbedingungen sind die Spezialität unserer erfahrenen Disponenten. 
            Wir bieten maximale Transportqualität, gewährleisten größtmögliche Sicherheit und fahren Ihre Sendung bei aller Sorgsamkeit so schnell wie möglich bis zum Bestimmungsort.', '../Bilder/dienstleistung6.png');

INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('TEST', 'TEST', 'TEST', 1);
INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('TEST2', 'TEST2', 'TEST2', 2);

INSERT INTO Adresse (strasse, hausnummer, plz, ort) VALUES ('TEST', '42', '12345', 'TEST');
INSERT INTO Adresse (strasse, hausnummer, plz, ort) VALUES ('TEST2', '666', '54321', 'TEST2');

INSERT INTO Kunde (anrede, vorname, nachname, benutzername, passwort, isAdmin, adresseId, email) VALUES (1, 'TEST', 'TEST', 'TEST', 'TEST', 0, 1, 'TEST@gmx.de');
INSERT INTO Kunde (anrede, vorname, nachname, benutzername, passwort, isAdmin, adresseId, email) VALUES (0, 'TEST2', 'TEST2', 'TEST2', 'TEST2', 1, 2, 'TEST2@gmx.de');

INSERT INTO Anfrage (kundeId, dienstleistungId, auftragszweck, beschreibung, ausfuehrungsdatum) VALUES (1, 1, 'TEST', 'TEST', '01.01.1900');
INSERT INTO Anfrage (kundeId, dienstleistungId, auftragszweck, beschreibung, ausfuehrungsdatum) VALUES (2, 2, 'TEST2', 'TEST2', '02.02.1900');