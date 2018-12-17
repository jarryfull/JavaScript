var lienzoOrigen;
var lienzoResultado;

var ctxOrigen;
var ctxResultado;

var imgOrigen;
var imgResultado;


document.getElementById('cargar').addEventListener('change', leerImagen);
document.getElementById('umbralBrillo').addEventListener('input', Brillo);
document.getElementById('umbralTransparencia').addEventListener('input', Transparencia);


function prepararResultados(){ 
  lienzoResultado = document.getElementById('canvas2');
  ctxResultado = lienzoResultado.getContext('2d');
  lienzoResultado.height = lienzoOrigen.height;
  lienzoResultado.width = lienzoOrigen.width;
  imgOrigen = ctxOrigen.getImageData(0, 0, lienzoOrigen.width, lienzoOrigen.height); 
  imgResultado = ctxResultado.createImageData(lienzoOrigen.width, lienzoOrigen.height);
}

function leerImagen(e){      
  var archivo = e.target.files[0];
  if(archivo){        
    var lector = new FileReader();
    lector.readAsDataURL(archivo);         
    lector.onload = function(event){
      ponerImgEnCanvas(event.target.result);
    }
  }
}

function ponerImgEnCanvas(datosImg){  
  var img = new Image();
  img.src = datosImg;
  img.onload = function(){
    lienzoOrigen = document.getElementById('canvas');
    ctxOrigen = lienzoOrigen.getContext('2d');
    lienzoOrigen.width=img.width;
    lienzoOrigen.height=img.height;
    ctxOrigen.drawImage(img, 0, 0);
    prepararResultados();
  }
}

function Copiar(){   
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4){
      imgResultado.data[i+0] = imgOrigen.data[i+0];
      imgResultado.data[i+1] = imgOrigen.data[i+1];
      imgResultado.data[i+2] = imgOrigen.data[i+2];
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function BlancoNegro(){   
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4){
      var sumatoria = (imgOrigen.data[i+0] + imgOrigen.data[i+1] + imgOrigen.data[i+2])/3; 
      imgResultado.data[i+0] = sumatoria;
      imgResultado.data[i+1] = sumatoria;
      imgResultado.data[i+2] = sumatoria;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function Brillo(){   
  var i;
  var rojo = 0;
  var verde = 0;
  var azul = 0;

  var umbral = document.getElementById('umbralBrillo').value;
  umbral = parseInt(umbral);
  rojo = umbral;
  verde = umbral;
  azul = umbral;
  for (i = 0; i < imgOrigen.data.length; i+=4){
      //COLOR ROJO
      if ((imgOrigen.data[i+0] + umbral) > 255){
        rojo = 255;
      }
      else if ((imgOrigen.data[i+0] + umbral) < 0){
        rojo = 0;
      }
      else{
        rojo = imgOrigen.data[i+0] + umbral;
      }
      //COLOR VERDE
      if ((imgOrigen.data[i+1] + umbral) > 255){
        verde = 255;
      }
      else if ((imgOrigen.data[i+1] + umbral) < 0){
        verde = 0;
      }
      else{
        verde = imgOrigen.data[i+1] + umbral;
      }
      //COLOR AZUL
      if ((imgOrigen.data[i+2] + umbral) > 255){
        azul = 255;
      }
      else if ((imgOrigen.data[i+2] + umbral) < 0){
        azul = 0;
      }
      else{
        azul = imgOrigen.data[i+2] + umbral;
      }

      imgResultado.data[i+0] = rojo;
      imgResultado.data[i+1] = verde;
      imgResultado.data[i+2] = azul;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function Intercambio(){
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4){
      imgResultado.data[i+0] = imgOrigen.data[i+0];
      imgResultado.data[i+1] = imgOrigen.data[i+2];
      imgResultado.data[i+2] = imgOrigen.data[i+1];
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function IntercambioDos(){
  var i;

  for (i = 0; i < imgOrigen.data.length; i+=4){
      imgResultado.data[i+0] = imgOrigen.data[i+2];
      imgResultado.data[i+1] = imgOrigen.data[i+0];
      imgResultado.data[i+2] = imgOrigen.data[i+1];
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function Transparencia(){
  var umbral = document.getElementById('umbralTransparencia').value;
  umbral = parseInt(umbral);
  console.log(umbral);
  for (i = 0; i < imgOrigen.data.length; i+=4){
    imgResultado.data[i+0] = imgOrigen.data[i+0];
    imgResultado.data[i+1] = imgOrigen.data[i+1];
    imgResultado.data[i+2] = imgOrigen.data[i+2];
    imgResultado.data[i+3] = umbral;
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
} 

function Sepia(){   
  var i;
  
  for (i = 0; i < imgOrigen.data.length; i+=4){
      var sumatoria = (imgOrigen.data[i+0] + imgOrigen.data[i+1] + imgOrigen.data[i+2])/3; 
      imgResultado.data[i+0] = sumatoria;
      imgResultado.data[i+1] = sumatoria;
      imgResultado.data[i+2] = sumatoria;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }

  for (i = 0; i < imgOrigen.data.length; i+=4){
      var rojo = 100;
      var verde = 50;
      
      if ((imgResultado.data[i+0] + rojo) > 255) {
        rojo = 255;
      }
      else{
        rojo = (imgResultado.data[i+0] + rojo);
      }

      if ((imgResultado.data[i+1] + verde) > 255) {
        verde = 255;
      }
      else{
        verde = (imgResultado.data[i+1] + verde);
      }

      imgResultado.data[i+0] = rojo;
      imgResultado.data[i+1] = verde;
      imgResultado.data[i+2] = imgResultado.data[i+2];
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}

function Ruido(){   
  var i;
  var ruido;
  var rojo;
  var verde;
  var azul;

  for (i = 0; i < imgOrigen.data.length; i+=4){
      ruido = Math.random() * 150;
      rojo = 0;
      verde = 0;
      azul = 0;

      // ROJO
      if (imgOrigen.data[i+0] + ruido > 255) {
        rojo = 255;
      }
      else{
        rojo = imgOrigen.data[i+0] + ruido;
      }
      //VERDE
      if (imgOrigen.data[i+1] + ruido > 255) {
        verde = 255;
      }
      else{
        verde = imgOrigen.data[i+1] + ruido;
      }
      // AZUL
      if (imgOrigen.data[i+2] + ruido > 255) {
        azul = 255;
      }
      else{
        azul = imgOrigen.data[i+2] + ruido;
      }


      imgResultado.data[i+0] = rojo;
      imgResultado.data[i+1] = verde;
      imgResultado.data[i+2] = azul;
      imgResultado.data[i+3] = imgOrigen.data[i+3];
  }
  ctxResultado.putImageData(imgResultado, 0, 0);
}