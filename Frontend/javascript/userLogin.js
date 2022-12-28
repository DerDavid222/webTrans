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
