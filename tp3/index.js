var tries = 0;
$(document).ready(function () {

  $('#easy').click(function () {
    tries = 18;
    $('form').hide();
    $('.tablero').show().css({ 'display': 'flex', 'flex-wrap': 'wrap'
    });

  });
});
$(document).ready(function () {
    $('#medium').click(function () {
      var validationOk = validationUserName();
      if (validationOk === true) {
      tries = 12;
      $('form').hide();
      $('.tablero').show().css({ 'display': 'flex', 'flex-wrap': 'wrap'
      });
    }
    console.log('no cargaste nombre');
    });
});
$(document).ready(function () {
  $('#expert').click(function () {
    tries = 9;
    $('form').hide();
    $('.tablero').show().css({ 'display': 'flex', 'flex-wrap': 'wrap'
    });
  });
});

var theFirstClick = null;
var theSecondClick = null;
// arranco con el tablero
var numeros = [ {
  numero: 1, imagen: 'img/chelsea.png', id: 1 }, { numero: 2, imagen: 'img/FC_Bayern_München.png', id: 2 },
{ numero: 3, imagen: 'img/cska.png', id: 3 }, { numero: 4, imagen: 'img/tigres.png', id: 4 },
{ numero: 5, imagen: 'img/dyj.png', id: 5 }, { numero: 6, imagen: 'img/river.png',id: 6 },
{ numero: 7, imagen: 'img/chelsea.png', id: 1 }, { numero: 8, imagen: 'img/FC_Bayern_München.png', id: 2 },
{ numero: 9, imagen: 'img/cska.png', id: 3 }, { numero: 10, imagen: 'img/tigres.png', id: 4 },
{ numero: 11, imagen: 'img/dyj.png', id: 5 }, { numero: 12, imagen: 'img/river.png', id: 6 }
];
numeros = numeros.sort(function (a, b) {
  // creo el sort para que lo haga random
  return Math.random() - 0.5
});
function createBoard () {
  var container = $('.tablero');

  for (let i = 0; i < numeros.length; i++) {

    // creo el div que va a tener la imagen dada vuelta, y originalmente no se va a ver hasta que hagamos click
    var nuevoDiv1 = $('<div class="photo" ></div>').prepend('<img class="theimageinside" id="' + numeros[i].numero + '"src="' + numeros[i].imagen + '"/>')
    // creo el div, con la clase numero, que contiene al span anteriormente creado
    var nuevoDiv = $('<div class="numero"></div>').append(nuevoDiv1);
    nuevoDiv.data('id', numeros[i].id)

    // agrego el nuevo div al contenedor principal
    container.append(nuevoDiv);
    // genero la accion con el click
    nuevoDiv.on('click', function () {
      $(this).addClass('mostrar');
      // cuento los intentos
      tries--;
      console.log($(this).data('id'));
      // aca arranca para matchear las imagenes---------------------------------
      if (theFirstClick === null) {
        theFirstClick = $(this).data('id');
      }
      else {
        theSecondClick = $(this).data('id')

        if (theFirstClick === theSecondClick) {
          console.log("iguales");
        } else {
          // aca lo que tiene que pasar es que los de vuelta solos
          ReplacingImage(theSecondClick, theFirstClick);
          console.log("distintos");
        }
        // aca termina el matcheo ----------------------------------------------

        // reseteo el valor de las variables
        theFirstClick = null;
        theSecondClick = null;
      }
      console.log("Te quedan " + tries + " intentos");

    });
  };
}

function ReplacingImage (firstImgId, secondImgId) {
$('#' + 'firstImgId').attr("src","eldiego.jpg");
$("#"+"secondImgId").attr("src","eldiego.jpg");
}

function validationUserName () {
  var nameUser = $('#name').val();
  if (nameUser === '') {
    return false;
  }
}



$(document).ready(createBoard);
