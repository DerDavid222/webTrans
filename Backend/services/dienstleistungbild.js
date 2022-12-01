const helper = require('../helper.js');
const DienstleistungbildDao = require('../dao/dienstleistungbildDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Dienstleistungbild');

serviceRouter.get('/dienstleistungbild/gib/:id', function(request, response) {
    console.log('Service Dienstleistungbild: Client requested one record, id=' + request.params.id);

    const dienstleistungbildDao = new DienstleistungbildDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungbildDao.loadById(request.params.id);
        console.log('Service Dienstleistungbild: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistungbild: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/dienstleistungbild/alle', function(request, response) {
    console.log('Service Dienstleistungbild: Client requested all records');

    const dienstleistungbildDao = new DienstleistungbildDao(request.app.locals.dbConnection);
    try {
        var arr = dienstleistungbildDao.loadAll();
        console.log('Service Dienstleistungbild: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Dienstleistungbild: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/dienstleistungbild/existiert/:id', function(request, response) {
    console.log('Service Dienstleistungbild: Client requested check, if record exists, id=' + request.params.id);

    const dienstleistungbildDao = new DienstleistungbildDao(request.app.locals.dbConnection);
    try {
        var exists = dienstleistungbildDao.exists(request.params.id);
        console.log('Service Dienstleistungbild: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Dienstleistungbild: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/dienstleistungbild', function(request, response) {
    console.log('Service Dienstleistungbild: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.bildpfad)) 
        errorMsgs.push('bildpfad fehlt');
    if (helper.isUndefined(request.body.produkt)) {
        errorMsgs.push('produkt fehlt');
    } else if (helper.isUndefined(request.body.produkt.id)) {
        errorMsgs.push('produkt gesetzt, aber id fehlt');
    }
    
    if (errorMsgs.length > 0) {
        console.log('Service Dienstleistungbild: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const dienstleistungbildDao = new DienstleistungbildDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungbildDao.create(request.body.bildpfad, request.body.produkt.id);
        console.log('Service Dienstleistungbild: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistungbild: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/dienstleistungbild', function(request, response) {
    console.log('Service Dienstleistungbild: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.bildpfad)) 
        errorMsgs.push('bildpfad fehlt');
    if (helper.isUndefined(request.body.produkt)) {
        errorMsgs.push('produkt fehlt');
    } else if (helper.isUndefined(request.body.produkt.id)) {
        errorMsgs.push('produkt gesetzt, aber id fehlt');
    }

    if (errorMsgs.length > 0) {
        console.log('Service Dienstleistungbild: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const dienstleistungbildDao = new DienstleistungbildDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungbildDao.update(request.body.id, request.body.bildpfad, request.body.produkt.id);
        console.log('Service Dienstleistungbild: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistungbild: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/dienstleistungbild/:id', function(request, response) {
    console.log('Service Dienstleistungbild: Client requested deletion of record, id=' + request.params.id);

    const dienstleistungbildDao = new DienstleistungbildDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungbildDao.loadById(request.params.id);
        dienstleistungbildDao.delete(request.params.id);
        console.log('Service Dienstleistungbild: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Dienstleistungbild: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;