//const { table } = require("console");

var loggedUser = null;
let newLogin = new Array();
let textField = new Array();
let tableData = new Array();

// laden aus der session, wird immer durchgeführt beim Laden der Seite
if (existsSessionItem("loggedUser")) {
  loggedUser = getJSONSessionItem("loggedUser");
  console.log("eingeloggter Benutzer", loggedUser);
} else loggedUser = null;

function isUserLoggedIn() {
  return loggedUser != null;
}

function isAdminLoggedIn() {
  if (!isUserLoggedIn()) return false;

  return loggedUser.isAdmin;
}

//Versteckt oder zeigt den Adminpage Button in der Navigation
function adjustNavigation() {
  if (isUserLoggedIn()) {
    $("#idlogin").text("Logout").attr("href", "logout.html");
    console.log("user is logged in, showing logout");

    if (loggedUser.isAdmin == true) $("#idadmin").show();
    else $("#idadmin").hide();
  } else {
    console.log("user is not logged in");
    $("#idadmin").hide();
  }
}

//Ändert Anfrage versenden / Hinweis auf Login auf der Anfrageseite
function adjustInquiry() {
  if (isUserLoggedIn()) {
    $("#idinquiry")
      .text("Anfrage versenden")
      .attr("href", "bestätigungsseite.html");
    console.log("user is logged in, showing submit button for inquiry");
  } else {
    $("#idinquiry")
      .text("Anfrage nicht möglich - zum Login hier klicken")
      .attr("href", "login.html");
  }
}

//holt die Inputs aus den Eingabefeldern
function getUserInput(){
  textField = document.querySelectorAll("table tr");
  let counter = 0;
  for(let i=0; i<textField.length; i++){
      tableData = textField[i].querySelectorAll(".input_txt");
      for(let j=0; j<tableData.length; j+=2){
        if(tableData[j].value !== ""){
          newLogin[counter] = tableData[j].value;
        }else{
          newLogin[counter] = "false";
        }
        counter++;
      }
  }
}

//prüft, ob alle Felder ausgefüllt sind
function checkFilled(){
  let erg = true;
  for(let j=0; j<newLogin.length; j++){
    console.log('newvalr',newLogin[j]);
    if(newLogin[j] === "false"){
      $("#hinweis").text("Bitte füllen Sie alle nötigen Felder aus!");
      document.getElementById('Passwort').value = "";
      erg = false;
      return erg;
    }else{
      $("#hinweis").text("Geben Sie Ihre Anmeldedaten ein.");
    }
  }
  return erg;
}


//prüft die Daten gegen die DB
function checkAccess(){
  let newPwHash = mySubmit();
  let newData = JSON.stringify({
    "benutzername": newLogin[0],
    "passwort": newPwHash
  });
  const parsedData = JSON.parse(newData);
  console.log(parsedData);
  return parsedData;
}

//hashed das Passwort
function mySubmit(){
  var pwdObj = document.getElementById('Passwort');
  var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
  hashObj.update(pwdObj.value);
  var hash = hashObj.getHash("HEX");
  pwdObj.value = hash;
  console.log('hashed: ', pwdObj.value);
  return pwdObj.value;
}
