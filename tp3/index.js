var tries = 0;
var graysCards = 12;
var message = $('#message-error');
var theFirstClick = null;
var theSecondClick = null;
var nameUser = $('#name').val();
var player = $('#welcome');
var chances = $('#intentos');
var dificultad = $('#dificultad');
var intentos = $('#tries');
difficulty = "";
var tipoJuego
var gamers = [];
var gamer = {};
var dificultades = {
  'facil': {
    intentos: 18,
    texto: 'facil'
  },
  'intermedio': {
    intentos: 12,
    texto: 'intermedio'
  },
  'dificil': {
    intentos: 9,
    texto: 'dificíl'
  }
}

function startGame(difficulty) {
  tipoJuego = dificultades[difficulty];
  message.html(''); // para que el mensaje de error solo este una vez
  // validacion de ingreso (solo puede jugar si pone nombre)
  var userName = $('#name').val();
  
  var isValidUsername = validationUserName(userName);
  if (isValidUsername === true) {
  tries = tipoJuego.intentos;

  // armo el objeto jugadr con sus tres caracteristicas
  gamer = {
    nombre: userName,
    dificultad: tipoJuego.texto,
    puntaje: 0
  }

  dificultad.html("Nivel: " + tipoJuego.texto);
  $('form').hide();
  $('.board').show().css({ 'display': 'flex', 'justify-content': 'center' });
  $('.containerImgs').show().css({ 'display': 'flex', 'flex-wrap': 'wrap'});
  createBoard();
  }
}

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
  var container2 = $('.containerImgs');

  textHtml ();
  
  for (let i = 0; i < numeros.length; i++) {

    // creo el div que va a tener la imagen dada vuelta, y originalmente no se va a ver hasta que hagamos click
    var nuevoDiv1 = $('<div class="photo" ></div>').prepend('<img class="theimageinside" id="' + numeros[i].numero + '"src="' + numeros[i].imagen + '"/>')
    // creo el div, con la clase numero, que contiene a la img anteriormente creado

    var nuevoDiv = $('<div class="numero"></div>').append(nuevoDiv1);
    
    nuevoDiv.data('id', numeros[i].id);

    // agrego el nuevo div al contenedor principal
    
    //container.append(container2);
    container2.append(nuevoDiv); 
    // genero la accion con el click
    nuevoDiv.on('click', function () {
      $(this).addClass('mostrar');
      // aca arranca para matchear las imagenes---------------------------------
      if (theFirstClick === null) {
        theFirstClick = { 
          id: $(this).data('id'),
          numero: $(this).children().children().attr('id')
        }
      }
      else {
        theSecondClick = { 
          id: $(this).data('id'),
          numero: $(this).children().children().attr('id')        
        }

        if (theFirstClick.id === theSecondClick.id) {
          $('#' + theFirstClick.numero).css('-webkit-filter', 'grayscale(100%)');
          $(this).css('-webkit-filter', 'grayscale(100%)');
          graysCards = graysCards -2;
          console.log(graysCards);
          var firstCard = $('[id='+theFirstClick.numero+']');
          var secondCard = $('[id='+theSecondClick.numero+']')
         
          $(firstCard).click(false);
          $(secondCard).click(false);


        } else {
          // agarro el div sobre el cual voy a aplicar el flip
          var firstCard = $('[id='+theFirstClick.numero+']')
          var secondCard = $('[id='+theSecondClick.numero+']')
          // le seteo un tiempo de espera para el flip
          $(firstCard).click(false);
          $(secondCard).click(false);
          setTimeout(function() {
          flip(firstCard);
          flip(secondCard);
          $(firstCard).click(false);
          $(secondCard).click(false);
        }, 1000); 
        }
        // aca termina el matcheo ----------------------------------------------
        // cuento los intentos
        // reseteo el valor de las variables
      tries--;
      // piso los intentos en el html
      intentos.html(`Te quedan ${tries} Intentos`);
      theFirstClick = null;
      theSecondClick = null;
      }
      winner(graysCards);
      loser(tries);
    });
  };
}

function generateJSON () {
gamer.puntaje = tries
var jugadores = JSON.parse(localStorage.getItem("gamers")) || [];
jugadores.push(gamer);
var jugadoresStringify = JSON.stringify(jugadores);
console.log(jugadores);
localStorage.setItem("gamers", jugadoresStringify);

}

function showPlayers () {
  var gamers = JSON.parse(localStorage.getItem("gamers"));
  var tablePlayers = $("#tablePlayersBody");
  for (let i = 0; i < gamers.length; i++) {
    var fila = $('<tr class="fila"></tr>');

    var tdNombre = "<td>" + gamers[i].nombre + "</td>";
    var tdDificultad = "<td>" + gamers[i].dificultad + "</td>";
    var tdIntentos = "<td>" + gamers[i].puntaje + "</td>";

    fila.append(tdNombre);
    fila.append(tdDificultad);
    fila.append(tdIntentos);
  
    tablePlayers.append(fila);
  }

}

function assembleTable () {
  var containerTable = $("#containerTable");
  var tablePlayers = $("<table id ='tablePlayers'></table>");
  tablePlayers.append("<th>Nombre</th><th>Dificultad</th><th>Intentos Restantes</th>"
  );
  containerTable.append(tablePlayers);
}

function winner(graysCards){
  if(graysCards === 0){
    $('.modal-winner').show();

    var modal = $('.modal-contentWinner');
    modal.append('<p id="winner-message">GANAASTEE y te sobraron '+tries+' intentos<br> Podes volver a jugar</p>');
    modal.append('<button id="myBtn" onClick = "backToStart()">Volver a jugar!</button>');
   
    generateJSON();
    
    showPlayers();
  }

}

function loser(tries) {
  if (tries === 0) {
    $('.modal-loser').show();
    var modal = $('.modal-content');
    modal.append('<p id="loser-message">Perdisteee :( <br> Pero podes volver a jugar!</p>');
    modal.append('<button id="myBtn" onClick = "backToStart()">Volver a jugar!</button>');
  }

}
function flip(flipped) {
 flipped.parent().parent().removeClass("mostrar");
}

function textHtml () {
  player.html("Hola! " + $('#name').val());
  chances.html("Encontra todos los pares en menos de " +  tries + " intentos"); 
  intentos.html(`Te quedan ${tries} Intentos`);
}

function validationUserName(nameUser) {
  if (nameUser) {
    console.log('valido');
    return true;
  }
  else {
    message.append('UPS... El nombre es requerido!')
    return false;
  }
}

function backToStart() {
  location.reload();
}

function agregarPuntaje(nuevoPuntaje) {
  var arrayPuntajes = JSON.parse(localStorage.getItem('puntajes'));
  arrayPuntajes.push(nuevoPuntaje)
  localStorage.setItem('puntajes', arrayPuntajes);

  
}

function obtenerPuntaje() {
  var arrayPuntajes = JSON.parse(localStorage.getItem('puntajes'));

  var puntajesOrdenados = arrayPuntajes.sort(function(itemActual, itemSiguiente) {
    return itemActual.puntaje < itemSiguiente.puntaje
  });

  return puntajesOrdenados;
}