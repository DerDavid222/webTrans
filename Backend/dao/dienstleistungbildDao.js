const helper = require('../helper.js');

class DienstleistungbildDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Dienstleistungbild WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result.dienstleistung = { 'id': result.dienstleistungId };
        delete result.dienstleistungId;

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Dienstleistungbild';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            result[i].dienstleistungId = { 'id': result[i].dienstleistungId };
            delete result[i].dienstleistungId;
        }

        return result;
    }

    loadByParent(id) {
        var sql = 'SELECT * FROM Dienstleistungbild WHERE dienstleistungId=?';
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            result[i].dienstleistung = { 'id': result[i].dienstleistungId };
            delete result[i].dienstleistungId;
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Dienstleistungbild WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(bildpfad = '', dienstleistungId = 1) {
        var sql = 'INSERT INTO Dienstleistungbild (bildpfad,dienstleistungId) VALUES (?,?)';
        var statement = this._conn.prepare(sql);
        var params = [bildpfad, dienstleistungId];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, bildpfad = '', dienstleistungId = 1) {
        var sql = 'UPDATE Dienstleistungbild SET bildpfad=?,dienstleistungId=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [bildpfad, dienstleistungId, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Dienstleistungbild WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    deleteByParent(id) {
        try {
            var sql = 'DELETE FROM Dienstleistungbild WHERE dienstleistungId=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Records by id=' + dienstleistungid + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('DienstleistungbildDao [_conn=' + this._conn + ']');
    }
}

module.exports = DienstleistungbildDao;