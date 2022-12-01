const helper = require('../helper.js');
const DienstleistungDao = require('../dao/dienstleistungDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Dienstleistung');

serviceRouter.get('/dienstleistung/gib/:id', function(request, response) {
    console.log('Service Dienstleistung: Client requested one record, id=' + request.params.id);

    const dienstleistungDao = new DienstleistungDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungDao.loadById(request.params.id);
        console.log('Service Dienstleistung: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistung: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/dienstleistung/alle', function(request, response) {
    console.log('Service Dienstleistung: Client requested all records');

    const dienstleistungDao = new DienstleistungDao(request.app.locals.dbConnection);
    try {
        var arr = dienstleistungDao.loadAll();
        console.log('Service Dienstleistung: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Dienstleistung: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/dienstleistung/existiert/:id', function(request, response) {
    console.log('Service Dienstleistung: Client requested check, if record exists, id=' + request.params.id);

    const dienstleistungDao = new DienstleistungDao(request.app.locals.dbConnection);
    try {
        var exists = dienstleistungDao.exists(request.params.id);
        console.log('Service Dienstleistung: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Dienstleistung: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/dienstleistung', function(request, response) {
    console.log('Service Dienstleistung: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        request.body.beschreibung = '';
    if (helper.isUndefined(request.body.details)) 
        request.body.details = null;
    if (helper.isUndefined(request.body.nettopreis)) 
        errorMsgs.push('nettopreis fehlt');
    if (!helper.isNumeric(request.body.nettopreis)) 
        errorMsgs.push('nettopreis muss eine Zahl sein');        
    if (helper.isUndefined(request.body.mehrwertsteuer)) {
        errorMsgs.push('mehrwertsteuer fehlt');
    } else if (helper.isUndefined(request.body.mehrwertsteuer.id)) {
        errorMsgs.push('mehrwertsteuer gesetzt, aber id fehlt');
    }        

    if (helper.isUndefined(request.body.bilder)) 
        request.body.bilder = [];
    
    if (errorMsgs.length > 0) {
        console.log('Service Dienstleistung: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const dienstleistungDao = new DienstleistungDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungDao.create(request.body.kategorie.id, request.body.bezeichnung, request.body.beschreibung, request.body.mehrwertsteuer.id, request.body.details, request.body.nettopreis, request.body.datenblatt, request.body.bilder);
        console.log('Service Dienstleistung: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistung: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.put('/dienstleistung', function(request, response) {
    console.log('Service Dienstleistung: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        request.body.beschreibung = '';
    if (helper.isUndefined(request.body.details)) 
        request.body.details = null;
    if (helper.isUndefined(request.body.nettopreis)) 
        errorMsgs.push('nettopreis fehlt');
    if (!helper.isNumeric(request.body.nettopreis)) 
        errorMsgs.push('nettopreis muss eine Zahl sein');      
    if (helper.isUndefined(request.body.mehrwertsteuer)) {
        errorMsgs.push('mehrwertsteuer fehlt');
    } else if (helper.isUndefined(request.body.mehrwertsteuer.id)) {
        errorMsgs.push('mehrwertsteuer gesetzt, aber id fehlt');
    }        
    if (helper.isUndefined(request.body.bilder)) 
        request.body.bilder = [];

    if (errorMsgs.length > 0) {
        console.log('Service Dienstleistung: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const dienstleistungDao = new DienstleistungDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungDao.update(request.body.id, request.body.kategorie.id, request.body.bezeichnung, request.body.beschreibung, request.body.mehrwertsteuer.id, request.body.details, request.body.nettopreis, request.body.datenblatt, request.body.bilder);
        console.log('Service Dienstleistung: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistung: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/dienstleistung/:id', function(request, response) {
    console.log('Service Dienstleistung: Client requested deletion of record, id=' + request.params.id);

    const dienstleistungDao = new DienstleistungDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungDao.loadById(request.params.id);
        dienstleistungDao.delete(request.params.id);
        console.log('Service Dienstleistung: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Dienstleistung: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;