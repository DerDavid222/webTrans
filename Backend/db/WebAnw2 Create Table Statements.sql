-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements

-- ------------------------------
-- Dienstleistungen
CREATE TABLE Dienstleistung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
);

CREATE TABLE Dienstleistungbild (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bildpfad TEXT NOT NULL,
	dienstleistungId INTEGER NOT NULL,
	CONSTRAINT fk_Dienstleistungbild1 FOREIGN KEY (dienstleistungId) REFERENCES Dienstleistung(id)
);

CREATE TABLE Dienstleistungdetails (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	ueberschrift TEXT NOT NULL,
	preisinformationen TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	dienstleistungId INTEGER NOT NULL,
	CONSTRAINT fk_Dienstleistungdetails1 FOREIGN KEY (dienstleistungId) REFERENCES Dienstleistung(id)
);
-- ------------------------------
-- Kunde, Adresse

CREATE TABLE Adresse (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	strasse TEXT NOT NULL,
	hausnummer TEXT NOT NULL,
	plz TEXT NOT NULL,
	ort TEXT NOT NULL,
);

CREATE TABLE Kunde (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	anrede INTEGER NOT NULL DEFAULT 0,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	benutzername TEXT NOT NULL,
	passwort TEXT NOT NULL,
	adresseId INTEGER NOT NULL,
	email TEXT NOT NULL,
	CONSTRAINT fk_Kunde1 FOREIGN KEY (adresseId) REFERENCES Adresse(id)
);

-- ------------------------------
-- Anfrage
CREATE TABLE Anfrage (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	kundeId INTEGER NOT NULL,
	dienstleistungId INTEGER NOT NULL,
	auftragszweck TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	ausfuehrungsdatum TEXT NOT NULL,
	CONSTRAINT fk_Anfrage1 FOREIGN KEY (kundeId) REFERENCES Kunde(id),
	CONSTRAINT fk_Anfrage2 FOREIGN KEY (dienstleistungId) REFERENCES Dienstleistung(id)
);