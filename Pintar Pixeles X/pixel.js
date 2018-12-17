function ponerPixel(contexto, x, y, color){

  contexto.fillStyle = color; //configura el color para pintado

  //pintar un punto (debe ser 1x1, para mejorar su visualización es de 3x3)
  contexto.fillRect( x, y, 1, 1 );

}

function dibujar(){ //Esta función es llamada al cargar el documento html

  var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
  var contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo
	
  // ponerPixel(contexto, 100, 120, "#FF0000"); //pintamos el pixel en rojo
  for (var i = 0; i < 400; i++) {
  	var y=200;
  	ponerPixel(contexto, i, y, "#0000FF");
  }
  for (var i = 0; i < 400; i++) {
  	var x=200;
  	ponerPixel(contexto, x, i, "#00FF00");
  }
    for (var i = 0; i < 400; i++) {
    	var x=i;
    	ponerPixel(contexto, x, i, "#FF0000");
    }
    for (var i = 400; i > 0; i--) {
    	var x= 399 -i;
    	ponerPixel(contexto, x, i, "#002300");
    }

} 
