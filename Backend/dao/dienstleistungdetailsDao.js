const helper = require('../helper.js');

class DienstleistungdetailsDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Dienstleistungdetails WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Dienstleistungdetails';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Dienstleistungdetails WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(ueberschrift = '', preisinformationen = '', beschreibung='', dienstleistungId = 1) {
        var sql = 'INSERT INTO Dienstleistungdetails (ueberschrift,preisinformationen,beschreibung,dienstleistungId) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [ueberschrift, preisinformationen, beschreibung, dienstleistungId];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, ueberschrift = '', preisinformationen = '', beschreibung='', dienstleistungId = 1) {
        var sql = 'UPDATE Dienstleistungdetails SET ueberschrift=?,preisinformationen=?,beschreibung=?,dienstleistungId=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [ueberschrift, preisinformationen, beschreibung, dienstleistungId, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Dienstleistungdetails WHERE id=?';
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
        console.log('DienstleistungdetailsDao [_conn=' + this._conn + ']');
    }
}

module.exports = DienstleistungdetailsDao;