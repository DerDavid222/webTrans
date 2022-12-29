const helper = require("../helper.js");
const BenutzerDao = require("./benutzerDao.js");
const DienstleistungDao = require("./dienstleistungDao.js");

class AnfrageDao {
  constructor(dbConnection) {
    this._conn = dbConnection;
  }

  getConnection() {
    return this._conn;
  }

  loadById(id) {
    const benutzerDao = new BenutzerDao(this._conn);
    const dienstleistungDao = new DienstleistungDao(this._conn);

    var sql = "SELECT * FROM Anfrage WHERE id=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (helper.isUndefined(result))
      throw new Error("No Record found by id=" + id);

    result.dienstleistung = dienstleistungDao.loadById(result.dienstleistungId);
    delete result.dienstleistungId;

    result.benutzer = benutzerDao.loadById(result.benutzerId);
    delete result.benutzerId;

    return result;
  }

  loadAll() {
    const benutzerDao = new BenutzerDao(this._conn);
    const dienstleistungDao = new DienstleistungDao(this._conn);

    var sql = "SELECT * FROM Anfrage";
    var statement = this._conn.prepare(sql);
    var result = statement.all();

    if (helper.isArrayEmpty(result)) return [];

    for (var i = 0; i < result.length; i++) {
      result[i].dienstleistung = dienstleistungDao.loadById(
        result[i].dienstleistungId
      );
      delete result[i].dienstleistungId;

      result[i].benutzer = benutzerDao.loadById(result[i].benutzerId);
      delete result[i].benutzerId;
    }

    return result;
  }

  exists(id) {
    var sql = "SELECT COUNT(id) AS cnt FROM Anfrage WHERE id=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (result.cnt == 1) return true;

    return false;
  }

  create(
    benutzerId = 1,
    dienstleistungId = 1,
    auftragszweck = "",
    beschreibung = "",
    ausfuehrungsdatum = null
  ) {
    var sql =
      "INSERT INTO Anfrage (benutzerId,dienstleistungId,auftragszweck,beschreibung,ausfuehrungsdatum) VALUES (?,?,?,?,?)";
    var statement = this._conn.prepare(sql);
    var params = [
      benutzerId,
      dienstleistungId,
      auftragszweck,
      beschreibung,
      ausfuehrungsdatum,
    ];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not insert new Record. Data: " + params);

    return this.loadById(result.lastInsertRowid);
  }

  update(
    id,
    benutzerId = 1,
    dienstleistungId = 1,
    auftragszweck = "",
    beschreibung = "",
    ausfuehrungsdatum = null
  ) {
    var sql =
      "UPDATE Anfrage SET benutzerId=?,dienstleistungId=?,auftragszweck=?,beschreibung=?,ausfuehrungsdatum=? WHERE id=?";
    var statement = this._conn.prepare(sql);
    var params = [
      benutzerId,
      dienstleistungId,
      auftragszweck,
      beschreibung,
      ausfuehrungsdatum,
      id,
    ];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not update existing Record. Data: " + params);

    return this.loadById(id);
  }

  delete(id) {
    try {
      var sql = "DELETE FROM Anfrage WHERE id=?";
      var statement = this._conn.prepare(sql);
      var result = statement.run(id);

      if (result.changes != 1)
        throw new Error("Could not delete Record by id=" + id);

      return true;
    } catch (ex) {
      throw new Error(
        "Could not delete Record by id=" + id + ". Reason: " + ex.message
      );
    }
  }

  toString() {
    console.log("AnfrageDao [_conn=" + this._conn + "]");
  }
}

module.exports = AnfrageDao;
