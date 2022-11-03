// Funktion 1 --> Formularüberprüfung
function pruefen() {
  var f = document.Auftrag;
  var fehler = '';

  if (f.AuftragsArt.value == '') {
    fehler += '- Auftragsart\n';
  }

  if (f.xor.value == '') {
    fehler += '- Privat / Geschaeftlich?\n';
  }

  if (f.Vorname.value == '') {
    fehler += '- Vorname\n';
  }

  if (f.Nachname.value == '') {
    fehler += '- Nachname\n';
  }

  if (f.EMail.value == '') {
    fehler += '- E-Mail-Adresse\n';
  }

  if (f.Strasse.value == '') {
    fehler += '- Straße\n';
  }

  if (f.plz.value == '') {
    fehler += '- Postleitzahl\n';
  }

  if (f.Wohnort.value == '') {
    fehler += '- Wohnort\n';
  }

  if (f.Text.value == '') {
    fehler += '- Auftragsbeschreibung\n';
  }

  if (f.Datum.value == '') {
    fehler += '- Auführungsdatum\n';
  }

  if (fehler != '') {
    var fehlertext =
      'Die folgenden Felder wurden nicht vollständig ausgefüllt:\n\n';
    fehlertext += fehler;
    alert(
      fehlertext +
        '\nFüllen Sie bitte die genannten Felder zur Auftragsabwicklung noch aus.'
    );
  }
}

// Funktion 2 --> Cookies setzen um Dark-Mode zu speichern

function setDarkmodeCookie(cookieValue) {
  let date = new Date();
  const expieryDays = 365;
  date.setTime(date.getTime() + expieryDays * 24 * 60 * 60 * 1000);
  let expires = 'expires=' + date.toUTCString();
  document.cookie = 'darkMode=' + cookieValue + ';' + expires + ';path=/';
}

function getDarkmodeCookie() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if ((key === 'darkMode')) {
    console.log(value, typeof(value));
      return (value === 'true');
    }
  }
}

function toggleDarkmode(){
    document.body.classList.toggle('dark');
    const isDarkMode = getDarkmodeCookie();
    console.log(isDarkMode);
    setDarkmodeCookie(!isDarkMode);
}

// Funktion 3 --> Dark-Mode erzeugen (chk = check)

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
  toggleDarkmode();
});

if(getDarkmodeCookie()){
    console.o
     document.body.classList.toggle('dark');
     chk.setAttribute('checked', 'true')
}

// Bild anklicken

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');

//Bild zum ueberlagern
$overlay.append($image);

//hinzufuegen
$('body').append($overlay);

//click-event zum anzeigen des Bildes
$('#photo-gallery a').click(function (event) {
  event.preventDefault();
  var imageLocation = $(this).attr('href');

  //ueberlagern mit bild im link
  $image.attr('src', imageLocation);

  //anzeigen des bildes
  $overlay.show();
  $('#overlay').height($(document).height());
});

$('#overlay').click(function () {
  $('#overlay').hide();
});
