const helper = require('../helper.js');
const MehrwertsteuerDao = require('./mehrwertsteuerDao.js');
const DienstleistungbildDao = require('./dienstleistungbildDao.js');

class DienstleistungDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);
        const dienstleistungbildDao = new DienstleistungbildDao(this._conn);

        var sql = 'SELECT * FROM Dienstleistung WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result.mehrwertsteuer = mehrwertsteuerDao.loadById(result.mehrwertsteuerId);
        delete result.mehrwertsteuerId;

        result.bilder = dienstleistungbildDao.loadByParent(result.id);

        result.mehrwertsteueranteil = helper.round((result.nettopreis / 100) * result.mehrwertsteuer.steuerSatz);

        result.bruttopreis = helper.round(result.nettopreis + result.mehrwertsteueranteil);

        return result;
    }

    loadAll() {
        const mehrwertsteuerDao = new MehrwertsteuerDao(this._conn);
        const dienstleistungbildDao = new DienstleistungbildDao(this._conn);

        var sql = 'SELECT * FROM Dienstleistung';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            result[i].mehrwertsteuer = mehrwertsteuerDao.loadById(result[i].mehrwertsteuerId);
            delete result[i].mehrwertsteuerid;

            result[i].bilder = dienstleistungbildDao.loadByParent(result[i].id);

            result[i].mehrwertsteueranteil = helper.round((result[i].nettopreis / 100) * result[i].mehrwertsteuer.steuerSatz);

            result[i].bruttopreis = helper.round(result[i].nettopreis + result[i].mehrwertsteueranteil);
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Dienstleistung WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(bezeichnung = '', beschreibung = '', mehrwertsteuerId = 1, details = null, nettopreis = 0.0, bilder = []) {
        const dienstleistungbildDao = new DienstleistungbildDao(this._conn);

        var sql = 'INSERT INTO Dienstleistung (bezeichnung,beschreibung,mehrwertsteuerId,details,nettopreis) VALUES (?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        if (bilder.length > 0) {
            for (var element of bilder) {
                dienstleistungbildDao.create(element.bildpfad, result.lastInsertRowid);
            }
        }

        return this.loadById(result.lastInsertRowid);
    }

    update(id, bezeichnung = '', beschreibung = '', mehrwertsteuerId = 1, details = null, nettopreis = 0.0, bilder = []) {
        const dienstleistungbildDao = new DienstleistungbildDao(this._conn);
        dienstleistungbildDao.deleteByParent(id);

        var sql = 'UPDATE Dienstleistung SET bezeichnung=?,beschreibung=?,mehrwertsteuerId=?,details=?,nettopreis=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [bezeichnung, beschreibung, mehrwertsteuerId, details, nettopreis, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        if (bilder.length > 0) {
            for (var element of bilder) {
                dienstleistungbildDao.create(element.bildpfad, id);
            }
        }

        return this.loadById(id);
    }

    delete(id) {
        try {
            const dienstleistungbildDao = new DienstleistungbildDao(this._conn);
            dienstleistungbildDao.deleteByParent(id);

            var sql = 'DELETE FROM Dienstleistung WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('DienstleistungDao [_conn=' + this._conn + ']');
    }
}

module.exports = DienstleistungDao;