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
titulo:"Prólogo",
texto:"Hay historias que comienzan sin que uno lo note. La nuestra fue una de ellas."
},

{
titulo:"El primer mensaje",
texto:"Jamás imaginé que aquella conversación terminaría convirtiéndose en una parte tan importante de mi vida."
},

{
titulo:"Nuestro primer recuerdo",
texto:"Aquí escribirás ese recuerdo que siempre te hace sonreír."
},

{
titulo:"Una promesa",
texto:"Prometí acompañarte en cada capítulo que venga, en los días fáciles y también en los difíciles."
},

{
titulo:"Carta",
texto:"Gracias por cada risa, cada abrazo y cada momento que hemos compartido. Espero seguir escribiendo esta historia contigo durante muchos años más. Feliz aniversario ❤️"
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

// Click sobre las páginas

paginaDer.addEventListener("click", siguiente);

paginaIzq.addEventListener("click", anterior);

/*==================================*/

// Flechas del teclado

document.addEventListener("keydown", function(e){

    if(e.key === "ArrowRight"){

        siguiente();

    }

    if(e.key === "ArrowLeft"){

        anterior();

    }

});