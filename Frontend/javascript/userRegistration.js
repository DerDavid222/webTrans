//Registrierung für neue Benutzer

function registerNewUser(){
    let maxId = 0;
    let newUser = new Array();
    let tableData = new Array();
    let textFields = new Array();
    console.log('Get number of registered Users');
    $.ajax({
        url: 'http://localhost:8000/api/benutzer/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'

    }).done(function (response) {
        $(response).each(function(idx, item){
            maxId = item.id;
            console.log('Found MaxID successfully');
            maxId++;
        });

        textFields = document.querySelectorAll("table tr");
        let counter = 0;
        for(let i=0; i<textFields.length; i++){
            tableData = textFields[i].querySelectorAll(".input_txt");
            for(let j=0; j<tableData.length; j+=2){
                newUser[counter] = tableData[j].value;
                counter++;
            }
        }

        for(let k=0; k<newUser.length; k++){
            console.log(k);
            console.log(newUser[k]);
        }        

        formOfAdress = document.querySelector('input[name=xor]:checked').value;
        if (formOfAdress == "w"){
            console.log('Weibliche Anrede');
            newUser[9] = 1;
        } else {
            console.log('Männliche Anrede');
            newUser[9] = 0;
        }
    }).fail(function (){
        console.log('Problem while finding MaxID');
    });

    console.log('Push Content to DB');
    let newData = JSON.stringify({
        'id': maxId,
        'passwort': newUser[7],
        'benutzername': newUser[0],
        'anrede': newUser[9],
        'nachname': newUser[1],
        'vorname': newUser[2],
        'email': newUser[3],
        'strasse': newUser[4],
        'hausnummer': 0,    //kein extra Feld dafür verfügbar
        'plz': newUser[5],
        'ort': newUser[6],
        'isAdmin': 0
    })
    $.ajax({
        url: 'http://localhost:8000/api/benutzer',
        method: 'put',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        data: newData,
        }).done(function (response){
        console.log("Benutzer with id=" + response.id + " registered successfully");
    });
}