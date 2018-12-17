//xi, yi se usan para guardar las coordenadas del primer punto de la recta
var xi=0; 
var yi=0;

//la recta se define por dos puntos, el punto inicial de la recta
//será la posición donde se haga clic por primera vez y el punto
//final estara definido por la ubicación del segundo clic
var primerPunto=true;  //bandera para controlar los clics

function ponerPixel(contexto, x,y, color){
    contexto.fillStyle = color;
    contexto.fillRect(x, y, 1, 1);
} 

//Para pintar una recta esta función deberá ser ejecutada dos veces
//la primera vez captura las coordenadas del punto incial de la recta
// y lo grafica sobre el lienzo. La segunda vez toma las coordenadas
//del segundo punto y pinta la línea llamando a la función lineaEcuacionRecta.
function dibujar(event){ //Esta función se ejecuta cada que se hace clic sobre el lienzo

  var canvas = document.getElementById("lienzo"); //accedemos al lienzo de dibujo
  var contexto = canvas.getContext("2d"); //obtenemos el contexto 2d del lienzo

  if(primerPunto){  //Si es el primer clic, se lee el primer punto de la línea
    xi=event.offsetX;  //Guardamos la abscisa
    yi=event.offsetY;  //guardamos la ordenada
    ponerPixel(contexto, xi, yi, "#00FF00");  //ponemos el punto inicial en verde
    primerPunto = false;
  }
  else{
    if (xi < event.offsetX) {
      lineaEcuacionRecta(xi, yi, event.offsetX, event.offsetY, contexto, "#00FF00");
      primerPunto = true;
    }
    else{
      lineaEcuacionRectaNegativa(xi, yi, event.offsetX, event.offsetY, contexto, "#FF0000");
      primerPunto = true;
    }
  }  //Si es el segundo clic, pintamos la línea con los valores xi, yi
        //y la posición del último clic del ratón (event.offsetX, event.offsetY)
  
  
}

function lineaEcuacionRecta(punto1x, punto1y, punto2x, punto2y, contexto, color){

  var pendiente=(punto2y-punto1y)/(punto2x-punto1x); //calcular pendiente
  var cruza= punto1y - (pendiente*punto1x);    //determinar el punto donde la recta se cruza con el eje y

  for(var i=punto1x; i<=punto2x; i++){ //Se asume que el punto inicial está más a la izq q el final
    var y= (pendiente*i)+cruza;     //Ecuación de la recta
    ponerPixel(contexto, i, Math.round(y), color);  //pintar el siguiente punto de la línea
  }
}

function lineaEcuacionRectaNegativa(punto1x, punto1y, punto2x, punto2y, contexto, color){

  var pendiente=(punto2y-punto1y)/(punto2x-punto1x); //calcular pendiente
  var cruza= punto1y - (pendiente*punto1x);    //determinar el punto donde la recta se cruza con el eje y

  for(var i=punto2x; i<=punto1x; i++){ //Se asume que el punto inicial está más a la izq q el final
    var y= (pendiente*i)+cruza;     //Ecuación de la recta
    ponerPixel(contexto, i, Math.round(y), color);  //pintar el siguiente punto de la línea
  }
}