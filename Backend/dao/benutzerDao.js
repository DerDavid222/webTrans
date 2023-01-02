const helper = require("../helper.js");

class BenutzerDao {
  constructor(dbConnection) {
    this._conn = dbConnection;
  }

  getConnection() {
    return this._conn;
  }

  loadById(id) {
    var sql = "SELECT * FROM Benutzer WHERE id=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (helper.isUndefined(result))
      throw new Error("No Record found by id=" + id);

    if (result.anrede == 0) result.anrede = "Herr";
    else result.anrede = "Frau";

    return result;
  }

  loadAll() {
    var sql = "SELECT * FROM Benutzer";
    var statement = this._conn.prepare(sql);
    var result = statement.all();

    if (helper.isArrayEmpty(result)) return [];

    for (var i = 0; i < result.length; i++) {
      if (result[i].anrede == 0) result[i].anrede = "Herr";
      else result[i].anrede = "Frau";
    }

    return result;
  }

  exists(id) {
    var sql = "SELECT COUNT(id) AS cnt FROM Benutzer WHERE id=?";
    var statement = this._conn.prepare(sql);
    var result = statement.get(id);

    if (result.cnt == 1) return true;

    return false;
  }

  create(
    anrede = "Herr",
    vorname = "",
    nachname = "",
    benutzername = "",
    passwort = "",
    isAdmin = 0,
    email = "",
    strasse = "",
    hausnummer = "",
    plz = "",
    ort = ""
  ) {
    var sql =
      "INSERT INTO Benutzer (anrede,vorname,nachname,benutzername,passwort,isAdmin,email,strasse,hausnummer,plz,ort) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    var statement = this._conn.prepare(sql);
    var params = [
      helper.strStartsWith(anrede, "He") ? 0 : 1,
      vorname,
      nachname,
      benutzername,
      passwort,
      isAdmin,
      email,
      strasse,
      hausnummer,
      plz,
      ort
    ];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not insert new Record. Data: " + params);

    return this.loadById(result.lastInsertRowid);
  }

  update(
    id,
    anrede = "Herr",
    vorname = "",
    nachname = "",
    benutzername = "",
    passwort = "",
    isAdmin = 0,
    adresseId = 1,
    email = "",
    strasse = "",
    hausnummer = "",
    plz = "",
    ort = ""
  ) {
    var sql =
      "UPDATE Benutzer SET anrede=?,vorname=?,nachname=?,benutzername=?,passwort=?,isAdmin=?,adresseId=?,email=?,strasse=?,hausnummer=?,plz=?,ort=? WHERE id=?";
    var statement = this._conn.prepare(sql);
    var params = [
      helper.strStartsWith(anrede, "He") ? 0 : 1,
      vorname,
      nachname,
      benutzername,
      passwort,
      isAdmin,
      adresseId,
      email,
      strasse,
      hausnummer,
      plz,
      ort
    ];
    var result = statement.run(params);

    if (result.changes != 1)
      throw new Error("Could not update existing Record. Data: " + params);

    return this.loadById(id);
  }

  delete(id) {
    try {
      var sql = "DELETE FROM Benutzer WHERE id=?";
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
    console.log("BenutzerDao [_conn=" + this._conn + "]");
  }
}

module.exports = BenutzerDao;
