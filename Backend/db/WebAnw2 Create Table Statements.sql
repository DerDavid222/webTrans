-- ------------------------------
-- DB Modell zu WebAnwendungen 2, Version 3.0
-- Create Table Statements

-- ------------------------------
-- Dienstleistungen
CREATE TABLE Mehrwertsteuer (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	steuerSatz REAL NOT NULL DEFAULT 19.0
);

CREATE TABLE Dienstleistung (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bezeichnung TEXT NOT NULL,
	beschreibung TEXT NOT NULL,
	mehrwertsteuerId INTEGER NOT NULL,
	details TEXT DEFAULT NULL,
	nettopreis REAL NOT NULL DEFAULT 0.0,
	CONSTRAINT fk_Dienstleistung1 FOREIGN KEY (mehrwertsteuerId) REFERENCES Mehrwertsteuer(id),
);

CREATE TABLE Dienstleistungbild (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	bildpfad TEXT NOT NULL,
	dienstleistungId INTEGER NOT NULL,
	CONSTRAINT fk_Dienstleistungbild1 FOREIGN KEY (dienstleistungId) REFERENCES Dienstleistung(id)
);

-- ------------------------------
-- Person, Adresse
CREATE TABLE Land (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	kennzeichnung TEXT NOT NULL,
	bezeichnung TEXT NOT NULL	
);

CREATE TABLE Adresse (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	strasse TEXT NOT NULL,
	hausnummer TEXT NOT NULL,
	adresszusatz TEXT NOT NULL,
	plz TEXT NOT NULL,
	ort TEXT NOT NULL,
	landId INTEGER NOT NULL,
	CONSTRAINT fk_Adresse1 FOREIGN KEY (landId) REFERENCES Land(id)
);

CREATE TABLE Kunde (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	anrede INTEGER NOT NULL DEFAULT 0,
	vorname TEXT NOT NULL,
	nachname TEXT NOT NULL,
	benutzername TEXT NOT NULL,
	adresseId INTEGER NOT NULL,
	telefonnummer TEXT NOT NULL,
	email TEXT NOT NULL,
	geburtstag TEXT DEFAULT NULL,
	CONSTRAINT fk_Person1 FOREIGN KEY (adresseId) REFERENCES Adresse(id)
);

-- ------------------------------
-- Firma
CREATE TABLE Firma (
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	inhaber TEXT DEFAULT NULL,
	beschreibung TEXT NOT NULL,
	adresseId INTEGER NOT NULL,
	ansprechpartnerId INTEGER DEFAULT NULL,
	CONSTRAINT fk_Firma1 FOREIGN KEY (adresseId) REFERENCES Adresse(id),
	CONSTRAINT fk_Firma2 FOREIGN KEY (ansprechpartnerId) REFERENCES Kunde(id),
);