var loggedUser = null;

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

//prüft die eingegebenen Daten gegen die DB
function userLogin(){
  let newLogin = new Array();
  let textField = new Array();
  let tableData = new Array();
  textField = document.querySelectorAll("table tr");
  let counter = 0;
  for(let i=0; i<textField.length; i++){
      tableData = textField[i].querySelectorAll(".input_txt");
      for(let j=0; j<tableData.length; j+=2){
          newLogin[counter] = tableData[j].value;
          counter++;
      }
  }

  let newData = JSON.stringify({
    "benutzername": newLogin[0],
    "passwort": newLogin[1]
  });
  const parsedData = JSON.parse(newData);
  $.ajax({
    url: 'http://localhost:8000/api/benutzer/zugang',
    method: 'get',
    contentType: 'application/json',
    data: parsedData,
    dataType: 'json',
  }).done(function (response){
    console.log("Benutzer hat Zugang: ", response)
  }).fail(function (){
    console.log('Problem while loading Data');
  });
}
