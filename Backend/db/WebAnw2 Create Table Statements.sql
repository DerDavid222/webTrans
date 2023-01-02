-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements

-- ------------------------------
-- Dienstleistungen
CREATE TABLE Dienstleistung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	bildpfad TEXT NOT NULL
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
-- Benutzer

CREATE TABLE Benutzer (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	anrede INTEGER NOT NULL DEFAULT 0,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	benutzername TEXT NOT NULL,
	passwort TEXT NOT NULL,
	isAdmin INTEGER NOT NULL DEFAULT 0,
	email TEXT,
	strasse TEXT,
	hausnummer TEXT,
	plz TEXT,
	ort TEXT
);

-- ------------------------------
-- Anfrage
CREATE TABLE Anfrage (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	benutzerId INTEGER NOT NULL,
	dienstleistungId INTEGER NOT NULL,
	auftragszweck TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	ausfuehrungsdatum TEXT NOT NULL,
	CONSTRAINT fk_Anfrage1 FOREIGN KEY (benutzerId) REFERENCES Benutzer(id),
	CONSTRAINT fk_Anfrage2 FOREIGN KEY (dienstleistungId) REFERENCES Dienstleistung(id)
);