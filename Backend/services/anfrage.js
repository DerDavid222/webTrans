const helper = require('../helper.js');
const AnfrageDao = require('../dao/anfrageDao.js');
const express = require('express');
const { DateTime } = require('luxon');
var serviceRouter = express.Router();

console.log('- Service Anfrage');

serviceRouter.get('/anfrage/gib/:id', function(request, response) {
    console.log('Service Anfrage: Client requested one record, id=' + request.params.id);

    const anfrageDao = new AnfrageDao(request.app.locals.dbConnection);
    try {
        var obj = anfrageDao.loadById(request.params.id);
        console.log('Service Anfrage: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anfrage: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/anfrage/alle', function(request, response) {
    console.log('Service Anfrage: Client requested all records');

    const anfrageDao = new AnfrageDao(request.app.locals.dbConnection);
    try {
        var arr = anfrageDao.loadAll();
        console.log('Service Anfrage: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Anfrage: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/anfrage/existiert/:id', function(request, response) {
    console.log('Service Anfrage: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const anfrageDao = new AnfrageDao(request.app.locals.dbConnection);
    try {
        var exists = anfrageDao.exists(request.params.id);
        console.log('Service Anfrage: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Anfrage: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/anfrage', function(request, response) {
    console.log('Service Anfrage: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.benutzer)) {
        errorMsgs.push('benutzer fehlt');    
    } else if (helper.isUndefined(request.body.benutzer.id)) {
        errorMsgs.push('benutzerId fehlt');
    }
    if (helper.isUndefined(request.body.dienstleistung)) {
        errorMsgs.push('dienstleistung fehlt');
    } else if (helper.isUndefined(request.body.dienstleistung.id)) {
        errorMsgs.push('dienstleistungId fehlt');
    }
    if (helper.isUndefined(request.body.auftragszweck)) 
        errorMsgs.push('auftragszweck fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        errorMsgs.push('beschreibung fehlt');
    if (helper.isUndefined(request.body.hoehe)) 
        errorMsgs.push('hoehe fehlt');
    if (helper.isUndefined(request.body.breite)) 
        errorMsgs.push('breite fehlt');
    if (helper.isUndefined(request.body.laenge)) 
        errorMsgs.push('laenge fehlt');
    if (helper.isUndefined(request.body.ausfuehrungsdatum)){
        errorMsgs.push('ausfuehrungsdatum fehlt');
    } else {
        request.body.ausfuehrungsdatum = helper.formatToGermanDate(DateTime.fromFormat(request.body.ausfuehrungsdatum, "yyyy-MM-dd"));
    }
    
    if (errorMsgs.length > 0) {
        console.log('Service Anfrage: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const anfrageDao = new AnfrageDao(request.app.locals.dbConnection);
    try {
        var obj = anfrageDao.create(request.body.benutzer.id, request.body.dienstleistung.id, request.body.auftragszweck, request.body.beschreibung, request.body.hoehe, request.body.breite, request.body.laenge, request.body.ausfuehrungsdatum);
        console.log('Service Anfrage: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anfrage: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/anfrage', function(request, response) {
    console.log('Service Anfrage: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.benutzer)) 
        errorMsgs.push('benutzer fehlt');    
    if (helper.isUndefined(request.body.benutzer.id)) 
        errorMsgs.push('benutzerId fehlt');
    if (helper.isUndefined(request.body.dienstleistung)) 
        errorMsgs.push('dienstleistung fehlt');
    if (helper.isUndefined(request.body.dienstleistung.id)) 
        errorMsgs.push('dienstleistungId fehlt');
    if (helper.isUndefined(request.body.auftragszweck)) 
        errorMsgs.push('auftragszweck fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        errorMsgs.push('beschreibung fehlt');
    if (helper.isUndefined(request.body.hoehe)) 
        errorMsgs.push('hoehe fehlt');
    if (helper.isUndefined(request.body.breite)) 
        errorMsgs.push('breite fehlt');
    if (helper.isUndefined(request.body.laenge)) 
        errorMsgs.push('laenge fehlt');
    if (helper.isUndefined(request.body.ausfuehrungsdatum)) {
        errorMsgs.push('ausfuehrungsdatum fehlt');
    } else {
        request.body.ausfuehrungsdatum = helper.formatToGermanDate(DateTime.fromFormat(request.body.ausfuehrungsdatum, "yyyy-MM-dd"));
    }

    if (errorMsgs.length > 0) {
        console.log('Service Anfrage: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const anfrageDao = new AnfrageDao(request.app.locals.dbConnection);
    try {
        var obj = anfrageDao.update(request.body.id, request.body.benutzer.id, request.body.dienstleistung.id, request.body.auftragszweck, request.body.beschreibung, request.body.hoehe, request.body.breite, request.body.laenge, request.body.ausfuehrungsdatum);
        console.log('Service Anfrage: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anfrage: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/anfrage/:id', function(request, response) {
    console.log('Service Anfrage: Client requested deletion of record, id=' + request.params.id);

    const anfrageDao = new AnfrageDao(request.app.locals.dbConnection);
    try {
        var obj = anfrageDao.loadById(request.params.id);
        anfrageDao.delete(request.params.id);
        console.log('Service Anfrage: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Anfrage: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;