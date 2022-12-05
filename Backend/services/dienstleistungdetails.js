const helper = require('../helper.js');
const DienstleistungdetailsDao = require('../dao/dienstleistungdetailsDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Dienstleistungdetails');

serviceRouter.get('/dienstleistungdetails/gib/:id', function(request, response) {
    console.log('Service Dienstleistungdetails: Client requested one record, id=' + request.params.id);

    const dienstleistungdetailsDao = new DienstleistungdetailsDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungdetailsDao.loadById(request.params.id);
        console.log('Service Dienstleistungdetails: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistungdetails: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/dienstleistungdetails/alle', function(request, response) {
    console.log('Service Dienstleistungdetails: Client requested all records');

    const dienstleistungdetailsDao = new DienstleistungdetailsDao(request.app.locals.dbConnection);
    try {
        var arr = dienstleistungdetailsDao.loadAll();
        console.log('Service Dienstleistungdetails: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Dienstleistungdetails: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/dienstleistungdetails/existiert/:id', function(request, response) {
    console.log('Service Dienstleistungdetails: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const dienstleistungdetailsDao = new DienstleistungdetailsDao(request.app.locals.dbConnection);
    try {
        var exists = dienstleistungdetailsDao.exists(request.params.id);
        console.log('Service Dienstleistungdetails: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Dienstleistungdetails: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/dienstleistungdetails', function(request, response) {
    console.log('Service Dienstleistungdetails: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.ueberschrift)) 
        errorMsgs.push('ueberschrift fehlt');
    if (helper.isUndefined(request.body.preisinformationen)) 
        errorMsgs.push('preisinformationen fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        errorMsgs.push('beschreibung fehlt');
    if (helper.isUndefined(request.body.dienstleistung)) {
        errorMsgs.push('dienstleistung fehlt');
    } else if (helper.isUndefined(request.body.dienstleistung.id)) {
        errorMsgs.push('dienstleistungId fehlt');
    }
    
    if (errorMsgs.length > 0) {
        console.log('Service Dienstleistungdetails: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const dienstleistungdetailsDao = new DienstleistungdetailsDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungdetailsDao.create(request.body.ueberschrift, request.body.preisinformationen, request.body.beschreibung, request.body.dienstleistung.id);
        console.log('Service Dienstleistungdetails: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistungdetails: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/dienstleistungdetails', function(request, response) {
    console.log('Service Dienstleistungdetails: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.ueberschrift)) 
        errorMsgs.push('ueberschrift fehlt');
    if (helper.isUndefined(request.body.preisinformationen)) 
        errorMsgs.push('preisinformationen fehlt');
    if (helper.isUndefined(request.body.beschreibung)) 
        errorMsgs.push('beschreibung fehlt');
    if (helper.isUndefined(request.body.dienstleistung)) {
        errorMsgs.push('dienstleistung fehlt');
    } else if (helper.isUndefined(request.body.dienstleistung.id)) {
        errorMsgs.push('dienstleistungId fehlt');
    }

    if (errorMsgs.length > 0) {
        console.log('Service Dienstleistungdetails: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const dienstleistungdetailsDao = new DienstleistungdetailsDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungdetailsDao.update(request.body.id, request.body.ueberschrift, request.body.preisinformationen, request.body.beschreibung, request.body.dienstleistung.id);
        console.log('Service Dienstleistungdetails: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Dienstleistungdetails: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/dienstleistungdetails/:id', function(request, response) {
    console.log('Service Dienstleistungdetails: Client requested deletion of record, id=' + request.params.id);

    const dienstleistungdetailsDao = new DienstleistungdetailsDao(request.app.locals.dbConnection);
    try {
        var obj = dienstleistungdetailsDao.loadById(request.params.id);
        dienstleistungdetailsDao.delete(request.params.id);
        console.log('Service Dienstleistungdetails: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Dienstleistungdetails: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;