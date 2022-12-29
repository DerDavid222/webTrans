const helper = require("../helper.js");
const BenutzerDao = require("../dao/benutzerDao.js");
const express = require("express");
var serviceRouter = express.Router();

console.log("- Service Benutzer");

serviceRouter.get("/benutzer/gib/:id", function (request, response) {
  console.log(
    "Service Benutzer: Client requested one record, id=" + request.params.id
  );

  const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
  try {
    var obj = benutzerDao.loadById(request.params.id);
    console.log("Service Benutzer: Record loaded");
    response.status(200).json(obj);
  } catch (ex) {
    console.error(
      "Service Benutzer: Error loading record by id. Exception occured: " +
        ex.message
    );
    response.status(400).json({ fehler: true, nachricht: ex.message });
  }
});

serviceRouter.get("/benutzer/alle", function (request, response) {
  console.log("Service Benutzer: Client requested all records");

  const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
  try {
    var arr = benutzerDao.loadAll();
    console.log("Service Benutzer: Records loaded, count=" + arr.length);
    response.status(200).json(arr);
  } catch (ex) {
    console.error(
      "Service Benutzer: Error loading all records. Exception occured: " +
        ex.message
    );
    response.status(400).json({ fehler: true, nachricht: ex.message });
  }
});

serviceRouter.get("/benutzer/existiert/:id", function (request, response) {
  console.log(
    "Service Benutzer: Client requested check, if record exists, id=" +
      request.params.id
  );

  const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
  try {
    var exists = benutzerDao.exists(request.params.id);
    console.log(
      "Service Benutzer: Check if record exists by id=" +
        request.params.id +
        ", exists=" +
        exists
    );
    response.status(200).json({ id: request.params.id, existiert: exists });
  } catch (ex) {
    console.error(
      "Service Benutzer: Error checking if record exists. Exception occured: " +
        ex.message
    );
    response.status(400).json({ fehler: true, nachricht: ex.message });
  }
});

serviceRouter.post("/benutzer", function (request, response) {
  console.log("Service Benutzer: Client requested creation of new record");

  var errorMsgs = [];
  if (helper.isUndefined(request.body.anrede)) {
    errorMsgs.push("anrede fehlt");
  } else if (
    request.body.anrede.toLowerCase() !== "herr" &&
    request.body.anrede.toLowerCase() !== "frau"
  ) {
    errorMsgs.push("anrede falsch. Herr und Frau sind erlaubt");
  }
  if (helper.isUndefined(request.body.vorname)) errorMsgs.push("vorname fehlt");
  if (helper.isUndefined(request.body.nachname))
    errorMsgs.push("nachname fehlt");
  if (helper.isUndefined(request.body.benutzername))
    errorMsgs.push("benutzername fehlt");
  if (helper.isUndefined(request.body.passwort))
    errorMsgs.push("passwort fehlt");
  if (helper.isUndefined(request.body.isAdmin)) errorMsgs.push("isAdmin fehlt");
  if (helper.isUndefined(request.body.adresse)) {
    errorMsgs.push("adresse fehlt");
  } else if (helper.isUndefined(request.body.adresse.id)) {
    errorMsgs.push("adresseId fehlt");
  }
  if (helper.isUndefined(request.body.email)) errorMsgs.push("email fehlt");
  if (!helper.isEmail(request.body.email))
    errorMsgs.push("email hat ein falsches Format");

  if (errorMsgs.length > 0) {
    console.log("Service Benutzer: Creation not possible, data missing");
    response
      .status(400)
      .json({
        fehler: true,
        nachricht:
          "Funktion nicht möglich. Fehlende Daten: " +
          helper.concatArray(errorMsgs),
      });
    return;
  }

  const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
  try {
    var obj = benutzerDao.create(
      request.body.anrede,
      request.body.vorname,
      request.body.nachname,
      request.body.benutzername,
      request.body.passwort,
      request.body.isAdmin,
      request.body.adresse.id,
      request.body.email
    );
    console.log("Service Benutzer: Record inserted");
    response.status(200).json(obj);
  } catch (ex) {
    console.error(
      "Service Benutzer: Error creating new record. Exception occured: " +
        ex.message
    );
    response.status(400).json({ fehler: true, nachricht: ex.message });
  }
});

serviceRouter.put("/benutzer", function (request, response) {
  console.log("Service Benutzer: Client requested update of existing record");

  var errorMsgs = [];
  if (helper.isUndefined(request.body.id)) errorMsgs.push("id missing");
  if (helper.isUndefined(request.body.anrede)) {
    errorMsgs.push("anrede fehlt");
  } else if (
    request.body.anrede.toLowerCase() !== "herr" &&
    request.body.anrede.toLowerCase() !== "frau"
  ) {
    errorMsgs.push("anrede falsch. Herr und Frau sind erlaubt");
  }
  if (helper.isUndefined(request.body.vorname)) errorMsgs.push("vorname fehlt");
  if (helper.isUndefined(request.body.nachname))
    errorMsgs.push("nachname fehlt");
  if (helper.isUndefined(request.body.benutzername))
    errorMsgs.push("benutzername fehlt");
  if (helper.isUndefined(request.body.passwort))
    errorMsgs.push("passwort fehlt");
  if (helper.isUndefined(request.body.isAdmin)) errorMsgs.push("isAdmin fehlt");
  if (helper.isUndefined(request.body.adresse)) {
    errorMsgs.push("adresse fehlt");
  } else if (helper.isUndefined(request.body.adresse.id)) {
    errorMsgs.push("adresseId fehlt");
  }
  if (helper.isUndefined(request.body.email)) errorMsgs.push("email fehlt");
  if (!helper.isEmail(request.body.email))
    errorMsgs.push("email hat ein falsches Format");

  if (errorMsgs.length > 0) {
    console.log("Service Benutzer: Update not possible, data missing");
    response
      .status(400)
      .json({
        fehler: true,
        nachricht:
          "Funktion nicht möglich. Fehlende Daten: " +
          helper.concatArray(errorMsgs),
      });
    return;
  }

  const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
  try {
    var obj = benutzerDao.update(
      request.body.id,
      request.body.anrede,
      request.body.vorname,
      request.body.nachname,
      request.body.benutzername,
      request.body.passwort,
      request.body.isAdmin,
      request.body.adresse.id,
      request.body.email
    );
    console.log("Service Benutzer: Record updated, id=" + request.body.id);
    response.status(200).json(obj);
  } catch (ex) {
    console.error(
      "Service Benutzer: Error updating record by id. Exception occured: " +
        ex.message
    );
    response.status(400).json({ fehler: true, nachricht: ex.message });
  }
});

serviceRouter.delete("/benutzer/:id", function (request, response) {
  console.log(
    "Service Benutzer: Client requested deletion of record, id=" +
      request.params.id
  );

  const benutzerDao = new BenutzerDao(request.app.locals.dbConnection);
  try {
    var obj = benutzerDao.loadById(request.params.id);
    benutzerDao.delete(request.params.id);
    console.log(
      "Service Benutzer: Deletion of record successfull, id=" +
        request.params.id
    );
    response.status(200).json({ gelöscht: true, eintrag: obj });
  } catch (ex) {
    console.error(
      "Service Benutzer: Error deleting record. Exception occured: " +
        ex.message
    );
    response.status(400).json({ fehler: true, nachricht: ex.message });
  }
});

module.exports = serviceRouter;
