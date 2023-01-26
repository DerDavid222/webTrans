//Registrierung für neue Benutzer

function registerNewUser(){
    let newUser = new Array();
    let tableData = new Array();
    let textFields = new Array();
    let pwhash = "";
    console.log('Get number of registered Users');
    $.ajax({
        url: 'http://localhost:8000/api/benutzer/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'

    }).done(function (response) {
        textFields = document.querySelectorAll("table tr");
        let counter = 0;
        for(let i=0; i<textFields.length; i++){
            tableData = textFields[i].querySelectorAll(".input_txt");
            for(let j=0; j<tableData.length; j+=2){
                if(tableData[j].value !== ""){
                    newUser[counter] = tableData[j].value;
                }else{
                    newUser[counter] = "false";
                }
                counter++;
            }

        }

        formOfAdress = document.querySelector('input[name=xor]:checked').value;
        if (formOfAdress == "w"){
            console.log('Weibliche Anrede');
            newUser[10] = 'Frau';
        } else {
            console.log('Männliche Anrede');
            newUser[10] = 'Herr';
        }

        for(let k=0; k<newUser.length; k++){
            if(newUser[k] === "false"){
                $("#hinweis").text("Füllen Sie alle nötigen Felder aus!");
                break
            }else{
                $("#hinweis").text("Geben Sie Ihre Anmeldedaten ein.");
                if (newUser[8] !== newUser[9]){
                    $("#hinweis").text("Passwörter sind nicht identisch!");
                    document.getElementById('Passwort').value = "";
                    document.getElementById('PasswortWh').value = "";
                    pwhash=false;
                }else{
                    pwhash = mySubmit(this);
                    break
                }
            }
        }
    }).fail(function (){
        console.log('Problem while finding MaxID');
    });

    $.ajax({
        url: 'http://localhost:8000/api/benutzer/gib/1',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json',
      }).done(function (outerResponse) {
        let newData = JSON.stringify({
                'passwort': pwhash,
                'benutzername': newUser[0],
                'anrede': newUser[10],
                'nachname': newUser[1],
                'vorname': newUser[2],
                'email': newUser[3],
                'strasse': newUser[4],
                'hausnummer': newUser[5],
                'plz': newUser[6],
                'ort': newUser[7],
                'isAdmin': 0
              })
        $.ajax({
        url: 'http://localhost:8000/api/benutzer',
        method: 'post',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: newData,
        }).done(function (response) {
          console.log("Benutzer with id=" + response.id + " updated successfully");
          //window.location.href = "login.html";
        });
      });
}

function mySubmit(obj){
    var pwdObj = document.getElementById('Passwort');
    var hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1});
    hashObj.update(pwdObj.value);
    var hash = hashObj.getHash("HEX");
    pwdObj.value = hash;
    console.log('hashed: ', pwdObj.value);
    return pwdObj.value;
  }