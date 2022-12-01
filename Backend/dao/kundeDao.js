const helper = require('../helper.js');
const AdresseDao = require('./adresseDao.js');

class KundeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const adresseDao = new AdresseDao(this._conn);

        var sql = 'SELECT * FROM Kunde WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        if (result.anrede == 0) 
            result.anrede = 'Herr';
        else 
            result.anrede = 'Frau';

        result.adresse = adresseDao.loadById(result.adresseId);
        delete result.adresseId;

        return result;
    }

    loadAll() {
        const adresseDao = new AdresseDao(this._conn);

        var sql = 'SELECT * FROM Kunde';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            if (result[i].anrede == 0) 
                result[i].anrede = 'Herr';
            else 
                result[i].anrede = 'Frau';
            
            result[i].adresse = adresseDao.loadById(result[i].adresseId);
            delete result[i].adresseId;
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Kunde WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(anrede = 'Herr', vorname = '', nachname = '', benutzername ='', passwort='', isAdmin=0, adresseId = 1, email = '') {
        var sql = 'INSERT INTO Kunde (anrede,vorname,nachname,benutzername,passwort,isAdmin,adresseId,email) VALUES (?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [(helper.strStartsWith(anrede, 'He') ? 0 : 1), vorname, nachname, benutzername, passwort, isAdmin, adresseId, email];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, anrede = 'Herr', vorname = '', nachname = '', benutzername ='', passwort='', isAdmin=0, adresseId = 1, email = '') {
        var sql = 'UPDATE Kunde SET anrede=?,vorname=?,nachname=?,benutzername=?,passwort=?,isAdmin=?,adresseId=?,email=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [(helper.strStartsWith(anrede, 'He') ? 0 : 1), vorname, nachname, benutzername, passwort, isAdmin, adresseId, email, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Kunde WHERE id=?';
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
        console.log('KundeDao [_conn=' + this._conn + ']');
    }
}

module.exports = KundeDao;