var tries = 0;
var message = $('#message-error');
$(document).ready(function () {
  $('#easy').click(function () {
    message.html(''); // para que el mensaje de error solo este una vez
    // validacion de ingreso (solo puede jugar si pone nombre)
    var validation = validationUserName();
    if (validation === true) {
    tries = 18;
    $('form').hide();
    $('.board').show().css({ 'display': 'flex', 'justify-content': 'center'
  });;
    $('.containerImgs').show().css({ 'display': 'flex', 'flex-wrap': 'wrap'
  });
  }
  });
});
$(document).ready(function () {
    $('#medium').click(function () {
      message.html('');
      var validation = validationUserName();
      if (validation === true) {
      tries = 12;
      $('form').hide();
      $('.board').show().css({ 'display': 'flex', 'justify-content': 'center'
    });;
      $('.containerImgs').show().css({ 'display': 'flex', 'flex-wrap': 'wrap'
    });
    }
    });
});
$(document).ready(function () {
  $('#expert').click(function () {
    message.html('');
    var validation = validationUserName();
    if (validation === true) {
    tries = 9;
    $('form').hide();
    $('.board').show().css({ 'display': 'flex', 'justify-content': 'center'
    });;
      $('.containerImgs').show().css({ 'display': 'flex', 'flex-wrap': 'wrap'
    });
    }
    });
});

var theFirstClick = null;
var theSecondClick = null;
var nameUser = $('#name').val();
var player = $('.welcome');
console.log(nameUser);
// arranco con el board
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
  var container = $('.board');
  var container2 = $('.containerImgs');
  player.append(nameUser);
  for (let i = 0; i < numeros.length; i++) {

    // creo el div que va a tener la imagen dada vuelta, y originalmente no se va a ver hasta que hagamos click
    var nuevoDiv1 = $('<div class="photo" ></div>').prepend('<img class="theimageinside" id="' + numeros[i].numero + '"src="' + numeros[i].imagen + '"/>')
    // creo el div, con la clase numero, que contiene a la img anteriormente creado
    var nuevoDiv = $('<div class="numero"></div>').append(nuevoDiv1);
    nuevoDiv.data('id', numeros[i].id)

    // agrego el nuevo div al contenedor principal
    
    container.append(container2);
    container2.append(nuevoDiv);
    
    // genero la accion con el click
    nuevoDiv.on('click', function () {
      $(this).addClass('mostrar');
      // cuento los intentos
      tries--;
      console.log($(this).data('id'));
      // aca arranca para matchear las imagenes---------------------------------
      if (theFirstClick === null) {
        theFirstClick = { id: $(this).data('id'),
          numero: $(this).children().children().attr('id')
        }
      }
      else {
        theSecondClick = { id: $(this).data('id'),
          numero: $(this).attr('id')
        }
        if (theFirstClick.id === theSecondClick.id) {
          $('#' + theFirstClick.numero).css('-webkit-filter', 'grayscale(100%)');
          console.log(theFirstClick);
          $(this).css('-webkit-filter', 'grayscale(100%)');
          console.log("iguales");
        } else {

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



function validationUserName () {
  var nameUser = $('#name').val();
  console.log(nameUser);
  if (nameUser) {
    console.log('valido');
    return true;
  }
  else {
    message.append('UPS... El nombre es requerido!')
    return false;
  }
}



$(document).ready(createBoard);
