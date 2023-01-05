//Registrierung für neue Benutzer

function registerNewUser(){
    console.log('Get number of registered Users');
    $.ajax({
        url: 'http://localhost:8000/api/benutzer/alle',
        method: 'get',
        contentType: 'application/json; charset=utf-8',
        cache: false,
        dataType: 'json'

    }).done(function (response) {
        console.log('Data loaded successfully');
        //$(response).each(function(idx, item){
        //});

    }).fail(function (){
        console.log('Problem while loading data');
    });
}