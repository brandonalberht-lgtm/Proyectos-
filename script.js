/*======================================================
                NUESTRA HISTORIA
             Motor del Libro v3.0
======================================================*/

/*=================== ELEMENTOS ===================*/

const portada = document.getElementById("portada");
const libro = document.getElementById("libro");
const interior = document.getElementById("interior");

const tituloIzq = document.getElementById("tituloIzq");
const tituloDer = document.getElementById("tituloDer");

const textoIzq = document.getElementById("textoIzq");
const textoDer = document.getElementById("textoDer");

const numeroIzq = document.getElementById("numeroIzq");
const numeroDer = document.getElementById("numeroDer");

/*=================== CONTENIDO ===================*/

const capitulos = [

{
    titulo:"Nuestros sentimientos",

    paginas:[

        {

            subtitulo:"Cómo empezó todo",

            texto:`

Aquí escribirás la primera parte de este capítulo.

No importa cuánto escribas.

Cuando quieras continuar solamente agregas otra página.

`

        },

        {

            subtitulo:"Lo primero que llamó mi atención",

            texto:`

Aquí continúa el capítulo.

Cada página representa un recuerdo.

`

        }

    ]

},

{

    titulo:"Nuestras primeras salidas",

    paginas:[

        {

            subtitulo:"La primera salida",

            texto:`

Aquí escribirás todo sobre la primera salida.

`

        },

        {

            subtitulo:"Lo que más recuerdo",

            texto:`

Aquí continúa la historia.

`

        }

    ]

},

{

    titulo:"Carta",

    paginas:[

        {

            subtitulo:"Para ti",

            texto:`

Aquí escribirás toda la carta.

Puedes agregar tantas páginas como quieras.

`

        }

    ]

}

];

/*=================== VARIABLES ===================*/

let libroCompleto=[];

let paginaActual=0;

/*======================================================
            CONSTRUIR EL LIBRO
======================================================*/

function construirLibro(){

    libroCompleto=[];

    capitulos.forEach((capitulo,indiceCapitulo)=>{

        capitulo.paginas.forEach((pagina,indicePagina)=>{

            libroCompleto.push({

                capitulo:indiceCapitulo+1,

                titulo:capitulo.titulo,

                subtitulo:pagina.subtitulo,

                texto:pagina.texto.trim()

            });

        });

    });

}

/*======================================================
            OBTENER PÁGINA
======================================================*/

function obtenerPagina(indice){

    if(indice<0) return null;

    if(indice>=libroCompleto.length) return null;

    return libroCompleto[indice];

}

/*======================================================
            LIMPIAR PÁGINA
======================================================*/

function limpiarPaginas(){

    tituloIzq.innerHTML="";
    tituloDer.innerHTML="";

    textoIzq.innerHTML="";
    textoDer.innerHTML="";

    numeroIzq.innerHTML="";
    numeroDer.innerHTML="";

}

/*======================================================
            FORMATO DEL TÍTULO
======================================================*/

function crearTitulo(pagina){

    return `

<div class="capituloTitulo">

CAPÍTULO ${pagina.capitulo}

</div>

<div class="tituloPrincipal">

${pagina.titulo}

</div>

<div class="subtituloPagina">

${pagina.subtitulo}

</div>

`;

}
/*======================================================
                MOSTRAR EL LIBRO
======================================================*/

function mostrarLibro(){

    limpiarPaginas();

    const izquierda = obtenerPagina(paginaActual);
    const derecha   = obtenerPagina(paginaActual + 1);

    /*================ IZQUIERDA ================*/

    if(izquierda){

        tituloIzq.innerHTML = crearTitulo(izquierda);

        textoIzq.innerHTML = izquierda.texto
            .replace(/\n/g,"<br>");

        numeroIzq.textContent = paginaActual + 1;

    }

    /*================ DERECHA ================*/

    if(derecha){

        tituloDer.innerHTML = crearTitulo(derecha);

        textoDer.innerHTML = derecha.texto
            .replace(/\n/g,"<br>");

        numeroDer.textContent = paginaActual + 2;

    }

}
/*======================================================
                EVENTOS
======================================================*/

// Abrir el libro
portada.addEventListener("click", abrirLibro);

// Botones (si existen)
const btnSiguiente = document.getElementById("btnSiguiente");
const btnAnterior = document.getElementById("btnAnterior");

if(btnSiguiente){

    btnSiguiente.addEventListener("click", siguiente);

}

if(btnAnterior){

    btnAnterior.addEventListener("click", anterior);

}

/*======================================================
            NAVEGACIÓN CON TECLADO
======================================================*/

document.addEventListener("keydown",(e)=>{

    switch(e.key){

        case "ArrowRight":

            siguiente();
            break;

        case "ArrowLeft":

            anterior();
            break;

    }

});

/*======================================================
                INICIALIZACIÓN
======================================================*/

window.addEventListener("load",()=>{

    construirLibro();

});

/*======================================================
            UTILIDADES
======================================================*/

function irAlInicio(){

    paginaActual = 0;

    mostrarLibro();

}

function irAlFinal(){

    if(libroCompleto.length % 2 == 0){

        paginaActual = libroCompleto.length-2;

    }

    else{

        paginaActual = libroCompleto.length-1;

    }

    mostrarLibro();

}
