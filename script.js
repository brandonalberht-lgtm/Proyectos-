/*======================================================
                NUESTRA HISTORIA
                Motor del Libro
======================================================*/

const portada = document.getElementById("portada");
const libro = document.getElementById("libro");
const interior = document.getElementById("interior");

const tituloIzq = document.getElementById("tituloIzq");
const tituloDer = document.getElementById("tituloDer");

const textoIzq = document.getElementById("textoIzq");
const textoDer = document.getElementById("textoDer");

const numeroIzq = document.getElementById("numeroIzq");
const numeroDer = document.getElementById("numeroDer");

/*======================================================
                    CONTENIDO
======================================================*/

const capitulos = [

{

titulo:"Nuestros sentimientos",

texto:`

Aquí escribirás TODO este capítulo.

No importa si ocupa media página.

No importa si ocupa diez páginas.

El programa lo dividirá automáticamente.

Puedes escribir normalmente.

Puedes dejar párrafos.

Puedes escribir durante horas.

`

},

{

titulo:"Nuestras primeras salidas",

texto:`

Aquí escribirás todo el segundo capítulo.

Todo seguido.

Sin preocuparte por el tamaño.

`

},

{

titulo:"Carta",

texto:`

Aquí escribirás toda la carta.

Toda.

No volverás a dividir páginas manualmente.

`

}

];

/*======================================================
                VARIABLES
======================================================*/

let libroPaginas=[];

let paginaActual=0;

/*
Cada elemento tendrá:

{

titulo:"",

texto:""

}

*/
