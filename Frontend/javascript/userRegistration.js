//Registrierung für neue Benutzer

function registerNewUser(){
    let maxId = 0;
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
        });

        console.log('Found MaxID successfully');
        let newUser = new Array();
        let tableData = new Array();
        let textFields = new Array();
        textFields = document.querySelectorAll("table tr");
        for(let i=0; i<textFields.length; i++){
            tableData = textFields[i].querySelectorAll(".input_txt");
            for(let j=0; j<tableData.length; j+=2){
                console.log(tableData[j].value);
            }
        }

        formOfAdress = document.querySelector('input[name=xor]:checked').value;
        if (formOfAdress == "w"){
            console.log('Weibliche Anrede');
        } else {
            console.log('Männliche Anrede');
        }
    }).fail(function (){
        console.log('Problem while finding MaxID');
    });
}