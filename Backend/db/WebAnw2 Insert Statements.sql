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

INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('Europaweite Teil-und Komplettladungen', 'Preis richtet sich nach Gewicht und Abmessungen', 'Wir realisieren für Sie die optimale Planung und einen ökonomischen Transport von Teil - und Komplettladungen
            europaweit. Unsere Mitarbeiter/innen unterstützen Ihre Transportplanung und stellen Ihnen Anforderungen entsprechenden
            Laderaum, termingerecht zur Verfügung. Mehrere Teilladungen werden auf einem Transport gebündelt und mit einem Transportmittel befördert. Bei Teilladungen handelt es sich in der Regel um Frachten, die aufgrund ihrer Größe oder Beschaffenheit vom Standard abweichen und daher nicht umgeschlagen werden. 
            Sie füllen den Frachtraum des Transporters nicht komplett aus. Der Transport erfolgt mit anderen Teilladungen bzw. als Sammelgut. Im Gegensatz zur Teilladung wird bei der Komplettladung eine einzige Ladung befördert, die den Transportraum komplett ausfüllt. An Bord des Transporters sind keine weiteren Güter.
            Wir holen die Fracht beim Verlader ab und bringen diese auf einem Fahrzeug ohne Umschlag zum Empfänger.', 4);


INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('Weltweiter Stückgutverkehr', 'Preis richtet sich nach Gewicht und Abmessungen', 'Mit einem umfassenden Frachtnetzwerk für Sammelguttransporte in ganz Europa ermöglicht WebTrans eine präzise Transportplanung für die Lieferung Ihrer Güter. 
            Wir sind täglich in ganz Europa unterwegs und bieten feste Kapazitäten und hohe Flexibilität.
            Wir bieten Ihnen massgeschneiderte Konzepte für Sammelguttransporte auf Basis direkter und regelmässiger Abfahrten mit zuverlässigen Lieferzeiten.
            Mit unserer großen, modernen Fahrzeugflotte transportieren wir Ihre Güter per LKW oder verladen diese in unserem internationalen Netzwerk auf Schiff, Flugzeug oder Schiene. Mit unserem qualifizierten Fachpersonal bieten wir Ihnen auch alle Lösungen rund um die Lagerlogistik. Unsere Kompetenzen rund um Speditionsversand und Logistik bieten Ihnen Zuverlässigkeit und Flexibilität, immer mit einem Höchstmaß an Qualität. 
            Vor Ort und weltweit. Mit einem starken Team verbinden wir als deutsches Logistikunternehmen die Wirtschaftsregion Nordrhein-Westfalen mit Europa und der ganzen Welt.', 5);

INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('Spezial - und Gefahrguttransporte', 'Preis richtet sich nach Gewicht und Abmessungen', 'Spezielle Aufträge und insbesonders als Gefahrgut deklarierte Lasten transportieren wir ganz routiniert, weil sie unser Tagesgeschäft sind.
            Um allen Anforderungen gerecht werden zu können, sind unsere Fahrzeuge mit der notwendigen Technik für den Transport gefährlicher Güter ausgestattet. Unser Fahrpersonal und unsere Disponenten sind im Umgang mit Gefahrgut bestens geschult. 
            Es ist ihre Erfahrung die das Spezialtransportgeschäft zu unserem Metier macht. Spezielle Aufträge und insbesonders als Gefahrgut deklarierte Lasten transportieren wir ganz routiniert, weil sie unser Tagesgeschäft sind.
            Um allen Anforderungen gerecht werden zu können, sind unsere Fahrzeuge mit der notwendigen Technik für den Transport gefährlicher Güter ausgestattet. Unser Fahrpersonal und unsere Disponenten sind im Umgang mit Gefahrgut bestens geschult. 
            Es ist ihre Erfahrung die das Spezialtransportgeschäft zu unserem Metier macht. Die Organisation und Durchführung dieser Transporte gehört damit zu unserem Tagesgeschäft.
            Auch der Transport von überhohen und überbreiten Containern gehört zu unserem Repertoire.', 6);

INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('Schwertransporte', 'Preis richtet sich nach Gewicht und Abmessungen', 'Für große und komplexe Herausforderungen hat WebTrans eine besondere Leidenschaft. Und alle notwendigen Voraussetzungen für die erfolgreiche Umsetzung Ihrer Projekte. Gerade im Bereich von Großraum- und Schwertransporten gilt es, zahlreiche Aspekte zu beachten. 
            Dazu gehören neben dem richtigen Fuhrpark mit passenden Fahrzeugkombinationen und top geschulten Fahrern nicht zuletzt langjährige Erfahrung und optimale Kenntnisse der Straßenverkehrsordnung. Präzise Feinabstimmung für große Dimensionen: gezielte Einzelstudien und Analysen, professionelle Schwertransporte inklusive detaillierter Streckenplanung und Durchführung aller Genehmigungsverfahren.
            Als Experten für Schwertransporte und Projektlogistik verstehen wir es als unsere Aufgabe, buchstäblich an alles zu denken. 
            Die rechtzeitige Klärung des Transportweges gehört ebenso dazu wie die Abwicklung von Zoll- und Versicherungsmodalitäten. Auch für die transportsichere Verpackung der überdimensionierten Frachtstücke ist bei den Profis von WebTrans in den richtigen Händen. Wir finden zu jeder Aufgabenstellung die optimale Komplettlösung.', 7);


INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('Umzugstransporte', 'Preis richtet sich nach Gewicht und Abmessungen', 'Jeder Privatumzug ist so individuell wie Sie selbst und benötigt daher eine gründliche Planung und Vorbereitung, ganz nach Ihren Bedürfnissen und Wünschen.
            Unser erfahrenes und geschultes Festpersonal begleitet Sie gerne bei Ihrem Umzug in bzw. aus der Bodenseeregion.
            Mit unserem Full-Service begleiten wir Sie gerne über den kompletten Umzug hinweg. Durch günstigen Preise, fachlich geschultem Personal und langjährige Erfahrung steht das Umzugsteam für Zuverlässigkeit, Kompetenz und Qualität.
            Wir bieten kompletten Full-Service für Kleinumzüge, Familienhaushalte, Büros oder große Unternehmen. 
            Als professionelles Umzugsunternehmen  übernehmen wir fachmänisch die gesamte Planung Ihres Umzugs nach gemeinsamer Absprache und garantieren einen reibungslosen Ablauf vom Verpacken Ihrer Umzugsgüter bis zum Aufbau aller Einrichtungsgegenstände in Ihren neuen vier Wänden.' , 8);

INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('Sonderfahrten aller Art', 'Preis richtet sich nach Gewicht und Abmessungen','Außergewöhnliche Sendungen erfordern maximale Sorgfalt. 
            Mit den vielzähligen gesetzlichen Vorschriften kennen wir uns bestens aus. 
            Und komplexe Anforderungen im Rahmen von geforderten Sonderbedingungen sind die Spezialität unserer erfahrenen Disponenten. 
            Wir bieten maximale Transportqualität, gewährleisten größtmögliche Sicherheit und fahren Ihre Sendung bei aller Sorgsamkeit so schnell wie möglich bis zum Bestimmungsort. Für Ihre Produktion benötigen Sie dringend Ersatzteile? Dann sind wir zur Stelle. Ob Stahl, Kfz-Teile oder Werkzeuge: wir transportieren wichtige Ersatzteile flexibel und pünktlich direkt zur Produktionsstätte. 
            Den Transport planen wir sorgfältig und sichern Ihnen so den fortlaufenden Arbeitsprozess Ihres Unternehmens. Ob Direkt- oder Eiltransporte - wir übernehmen Sonderfahrten aller Art. Mit persönlichem Einsatz und logistischem Know-How befördern wir Ihre Fracht. 
            Von Warenannahme bis zur Auslieferung ist sie bei uns in sicheren Händen. Außergewöhnliche Transportanforderungen erfüllen wir gerne.' , 9);


INSERT INTO Benutzer (anrede, vorname, nachname, benutzername, passwort, isAdmin, email, strasse, hausnummer, plz, ort) VALUES (0, 'Max', 'Mustermann', 'MaxMustermann', 'TEST', 1, 'max.mustermann@gmx.de', 'Musterstr', '12', '12345', 'Musterstadt');
INSERT INTO Benutzer (anrede, vorname, nachname, benutzername, passwort, isAdmin, email, strasse, hausnummer, plz, ort) VALUES (0, 'Bruce', 'Wayne', 'Batman', 'IAmBatman', 0, 'bat.man@gmx.de', 'Batcave', '42', '54321', 'Gotham');
INSERT INTO Benutzer (anrede, vorname, nachname, benutzername, passwort, isAdmin, email, strasse, hausnummer, plz, ort) VALUES (0, 'Peter', 'Pan', 'PeterPan', 'Kindskopf01', 0, 'peterpan@gmx.de', 'Nimmerweg', '23', '98765', 'Nimmerland');
INSERT INTO Benutzer (anrede, vorname, nachname, benutzername, passwort, isAdmin, email, strasse, hausnummer, plz, ort) VALUES (1, 'Bibi', 'Blocksberg', 'Bibi', 'Kartoffelbrei', 0, 'blocksberg.bibi@gmx.de', 'Lange Straße', '5', '76548', 'Neustadt');

INSERT INTO Anfrage (benutzerId, dienstleistungId, auftragszweck, beschreibung, hoehe, breite, laenge, ausfuehrungsdatum) VALUES (1, 4, 'TEST', 'TEST', 5.0, 5.0, 5.0, '01.01.1900');
INSERT INTO Anfrage (benutzerId, dienstleistungId, auftragszweck, beschreibung, hoehe, breite, laenge, ausfuehrungsdatum) VALUES (2, 5, 'TEST2', 'TEST2', 10.5, 7.4, 8.2, '02.02.1900');