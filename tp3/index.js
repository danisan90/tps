$(document).ready(function () {
  $('#easy').click(function () {
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
    var nuevoDiv1 = $('<div class="photo"></div>').prepend('<img class="theimageinside" src="' + numeros[i].imagen + '"/>')
    // creo el div, con la clase numero, que contiene al span anteriormente creado
    var nuevoDiv = $('<div class="numero"></div>').append(nuevoDiv1);
    nuevoDiv.data('id',numeros[i].id)

    // agrego el nuevo div al contenedor principal
    container.append(nuevoDiv);
    // genero la accion con el click
    nuevoDiv.on('click', function () {
      $(this).addClass('mostrar');
      console.log($(this).data('id'));

      if (theFirstClick === null) {
        theFirstClick = $(this).data('id');
      }
      else {
        theSecondClick = $(this).data('id')

        if (theFirstClick === theSecondClick) {
          console.log("iguales");
        } else {
          console.log("distintos");
        }
        // reseteo el valor de las variables
        theFirstClick = null;
        theSecondClick = null;
      }
    }
    );
  };
}

$(document).ready(createBoard);
