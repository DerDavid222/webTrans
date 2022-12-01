-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Insert Statements

INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('TEST', 'TEST', './TEST.jpg');
INSERT INTO Dienstleistung (bezeichnung, beschreibung, bildpfad) VALUES ('TEST2', 'TEST2', './TEST.jpg');

INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('TEST', 'TEST', 'TEST', 1);
INSERT INTO Dienstleistungdetails (ueberschrift, preisinformationen, beschreibung, dienstleistungId) VALUES ('TEST2', 'TEST2', 'TEST2', 2);

INSERT INTO Adresse (strasse, hausnummer, plz, ort) VALUES ('TEST', '42', '12345', 'TEST');
INSERT INTO Adresse (strasse, hausnummer, plz, ort) VALUES ('TEST2', '666', '54321', 'TEST2');

INSERT INTO Kunde (anrede, vorname, nachname, benutzername, passwort, isAdmin, adresseId, email) VALUES ('Herr', 'TEST', 'TEST', 'TEST', 'TEST', 0, 1, 'TEST@gmx.de');
INSERT INTO Kunde (anrede, vorname, nachname, benutzername, passwort, isAdmin, adresseId, email) VALUES ('Frau', 'TEST2', 'TEST2', 'TEST2', 'TEST2', 1, 2, 'TEST2@gmx.de');

INSERT INTO Anfrage (kundeId, dienstleistungId, auftragszweck, beschreibung, ausfuehrungsdatum) VALUES (1, 1, 'TEST', 'TEST', '01.01.1900');
INSERT INTO Anfrage (kundeId, dienstleistungId, auftragszweck, beschreibung, ausfuehrungsdatum) VALUES (2, 2, 'TEST2', 'TEST2', '02.02.1900');