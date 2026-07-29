/*
====================================
        NUESTRA HISTORIA
====================================
*/

const portada = document.getElementById("portada");
const libroHTML = document.getElementById("libro");

const interior = document.getElementById("interior");

const paginaIzq = document.querySelector(".izquierda");
const paginaDer = document.querySelector(".derecha");

const tituloIzq = document.getElementById("tituloIzq");
const textoIzq = document.getElementById("textoIzq");

const tituloDer = document.getElementById("tituloDer");
const textoDer = document.getElementById("textoDer");

/*==================================*/

const libro = [

{
titulo:"Nuestros sentimientos",

texto:`Aquí quiero escribir cómo comenzaron mis sentimientos por ti.

¿Qué fue lo primero que llamó mi atención?

¿Cuándo me di cuenta de que ya no eras una persona cualquiera?

¿Qué pequeños detalles hicieron que poco a poco ocuparas un lugar tan importante en mi vida?

Este es el capítulo donde quiero abrir completamente mi corazón.

━━━━━━━━━━━━━━━━━━━━━━

✍️ Escribe aquí todo lo que quieras contarle.`
},

{
titulo:"Nuestras primeras salidas",

texto:`Aquí quiero recordar nuestras primeras salidas.

¿Cómo me sentía antes de verte?

¿Qué lugares visitamos?

¿Qué momentos todavía recuerdo con una sonrisa?

¿Qué fue lo que hizo que esos días fueran tan especiales?

━━━━━━━━━━━━━━━━━━━━━━

✍️ Escribe aquí todos los recuerdos que quieras revivir con ella.`
},

{
titulo:"Carta",

texto:`Aquí escribiré una carta completamente desde el corazón.

Le agradeceré por todo lo que hemos vivido.

Le diré cuánto la amo.

Le contaré lo feliz que soy por compartir esta historia con ella.

Y terminaré deseándole un muy feliz aniversario.

━━━━━━━━━━━━━━━━━━━━━━

✍️ Escribe aquí tu carta.

(No olvides firmarla al final ❤️)`
}

];

/*==================================*/

let pagina = 0;

/*==================================*/

function cargarPaginas(){

    // Página izquierda

    if(libro[pagina]){

        tituloIzq.textContent = libro[pagina].titulo;
        textoIzq.textContent = libro[pagina].texto;

    }else{

        tituloIzq.textContent = "";
        textoIzq.textContent = "";

    }

    // Página derecha

    if(libro[pagina+1]){

        tituloDer.textContent = libro[pagina+1].titulo;
        textoDer.textContent = libro[pagina+1].texto;

    }else{

        tituloDer.textContent = "";
        textoDer.textContent = "";

    }

}

/*==================================*/

function abrirLibro(){

    portada.style.display = "none";

    interior.classList.remove("oculto");

    libroHTML.style.width = "900px";

    cargarPaginas();

}

/*==================================*/

function siguiente(){

    if(pagina + 2 < libro.length){

        pagina += 2;

        cargarPaginas();

    }

}

/*==================================*/

function anterior(){

    if(pagina >= 2){

        pagina -= 2;

        cargarPaginas();

    }

}

/*==================================*/

portada.addEventListener("click", abrirLibro);

/*==================================*/

paginaDer.addEventListener("click", siguiente);

paginaIzq.addEventListener("click", anterior);

/*==================================*/

document.addEventListener("keydown", function(e){

    if(e.key === "ArrowRight"){

        siguiente();

    }

    if(e.key === "ArrowLeft"){

        anterior();

    }

});
