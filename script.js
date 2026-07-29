/*======================================================
                NUESTRA HISTORIA
             Motor del Libro v4.0
======================================================*/


/*======================================================
                ELEMENTOS DEL HTML
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

const paginaIzquierda =
    document.querySelector(".pagina.izquierda");

const paginaDerecha =
    document.querySelector(".pagina.derecha");


/*======================================================
                    CONTENIDO
======================================================*/

const capitulos = [

    {
        titulo: "Nuestros sentimientos",

        paginas: [

            {
                subtitulo: "Cómo empezó todo",

                texto: `

                Todo inicia con algo tan confunso como fue el incio de la Universidad
                te vi y me gustaste como siempre timido nunca dije nada luego como sabemos
                las sircustancias nunca nos ayudaron, aunque siempre me sentia feliz con solo verte 
                luego nos empezamos a ver en algunos cursos y me gustaba hablar contigo , jugabamos lol
                nos gustaba el anime 
            },

            {
                subtitulo: "Nuestro primer abrazo",

                texto: `
Aquí continúa el capítulo.

Cada página representa un recuerdo.
                `
            }

        ]
    },

    {
        titulo: "Nuestras primeras salidas",

        paginas: [

            {
                subtitulo: "La primera salida",

                texto: `
Aquí escribirás todo sobre la primera salida.
                `
            },

            {
                subtitulo: "Lo que más recuerdo",

                texto: `
Aquí continúa la historia.
                `
            }

        ]
    },

    {
        titulo: "Carta",

        paginas: [

            {
                subtitulo: "Para ti",

                texto: `
Aquí escribirás toda la carta.

Puedes agregar tantas páginas como quieras.
                `
            }

        ]
    }

];


/*======================================================
                VARIABLES PRINCIPALES
======================================================*/

let libroCompleto = [];

let paginaActual = 0;

let libroAbierto = false;

let animando = false;


/*======================================================
                CONSTRUIR EL LIBRO
======================================================*/

function construirLibro(){

    libroCompleto = [];

    capitulos.forEach((capitulo, indiceCapitulo)=>{

        capitulo.paginas.forEach((pagina)=>{

            libroCompleto.push({

                capitulo: indiceCapitulo + 1,

                titulo: capitulo.titulo,

                subtitulo: pagina.subtitulo,

                texto: pagina.texto.trim()

            });

        });

    });

}


/*======================================================
                OBTENER UNA PÁGINA
======================================================*/

function obtenerPagina(indice){

    if(indice < 0){

        return null;

    }

    if(indice >= libroCompleto.length){

        return null;

    }

    return libroCompleto[indice];

}


/*======================================================
                LIMPIAR LAS PÁGINAS
======================================================*/

function limpiarPaginas(){

    tituloIzq.innerHTML = "";
    tituloDer.innerHTML = "";

    textoIzq.innerHTML = "";
    textoDer.innerHTML = "";

    numeroIzq.textContent = "";
    numeroDer.textContent = "";

}


/*======================================================
                CREAR TÍTULO
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
                MOSTRAR LAS PÁGINAS
======================================================*/

function mostrarLibro(){

    limpiarPaginas();

    const izquierda = obtenerPagina(paginaActual);

    const derecha = obtenerPagina(
        paginaActual + 1
    );


    /*-------------- PÁGINA IZQUIERDA --------------*/

    if(izquierda){

        tituloIzq.innerHTML =
            crearTitulo(izquierda);

        textoIzq.innerHTML =
            izquierda.texto.replace(
                /\n/g,
                "<br>"
            );

        numeroIzq.textContent =
            paginaActual + 1;

    }


    /*-------------- PÁGINA DERECHA --------------*/

    if(derecha){

        tituloDer.innerHTML =
            crearTitulo(derecha);

        textoDer.innerHTML =
            derecha.texto.replace(
                /\n/g,
                "<br>"
            );

        numeroDer.textContent =
            paginaActual + 2;

    }


    /* Reiniciar el scroll de ambas páginas */

    textoIzq.scrollTop = 0;
    textoDer.scrollTop = 0;

}

/*======================================================
                ESTADO INICIAL
======================================================*/

function prepararLibro(){

    construirLibro();

    paginaActual = 0;
    libroAbierto = false;
    animando = false;

    /*
    Se usa display inline porque el CSS contiene
    una regla #interior con mayor prioridad que .oculto.
    */

    interior.classList.add("oculto");
    interior.style.display = "none";

    portada.style.display = "flex";

    libro.style.width = "520px";

    limpiarPaginas();

}


/*======================================================
                ABRIR EL LIBRO
======================================================*/

function abrirLibro(){

    if(libroAbierto) return;

    if(animando) return;

    /*
    Protección por si el contenido todavía
    no hubiera sido construido.
    */

    if(libroCompleto.length === 0){

        construirLibro();

    }

    libroAbierto = true;
    paginaActual = 0;

    portada.style.display = "none";

    libro.style.width = "1100px";

    interior.classList.remove("oculto");
    interior.style.display = "flex";

    mostrarLibro();

}


/*======================================================
                CERRAR EL LIBRO
======================================================*/

function cerrarLibro(){

    if(!libroAbierto) return;

    if(animando) return;

    libroAbierto = false;
    paginaActual = 0;

    limpiarPaginas();

    interior.classList.add("oculto");
    interior.style.display = "none";

    portada.style.display = "flex";

    libro.style.width = "520px";

}


/*======================================================
                EVENTO DE LA PORTADA
======================================================*/

portada.addEventListener("click", abrirLibro);


/*======================================================
                INICIALIZACIÓN
======================================================*/

prepararLibro();


/*======================================================
                LÍMITES DEL LIBRO
======================================================*/

function estaEnInicio(){

    return paginaActual === 0;

}

function estaEnFinal(){

    return paginaActual + 2 >= libroCompleto.length;

}


/*======================================================
                ANIMACIÓN DE PÁGINA
======================================================*/

function animarCambio(direccion, accion){

    if(!libroAbierto) return;

    if(animando) return;

    animando = true;

    const desplazamientoSalida =
        direccion === "siguiente" ? -35 : 35;

    const desplazamientoEntrada =
        -desplazamientoSalida;


    /*
    Compatibilidad por si el navegador
    no admite Element.animate().
    */

    if(typeof interior.animate !== "function"){

        accion();

        animando = false;

        return;

    }


    const animacionSalida = interior.animate(

        [
            {
                opacity: 1,
                transform: "translateX(0)"
            },

            {
                opacity: 0,
                transform:
                    `translateX(${desplazamientoSalida}px)`
            }
        ],

        {
            duration: 180,
            easing: "ease-in",
            fill: "forwards"
        }

    );


    animacionSalida.onfinish = ()=>{

        /*
        Elimina la animación anterior para evitar
        que interfiera con la entrada.
        */

        animacionSalida.cancel();

        accion();


        const animacionEntrada = interior.animate(

            [
                {
                    opacity: 0,
                    transform:
                        `translateX(${desplazamientoEntrada}px)`
                },

                {
                    opacity: 1,
                    transform: "translateX(0)"
                }
            ],

            {
                duration: 220,
                easing: "ease-out",
                fill: "forwards"
            }

        );


        animacionEntrada.onfinish = ()=>{

            animacionEntrada.cancel();

            animando = false;

        };


        animacionEntrada.oncancel = ()=>{

            animando = false;

        };

    };


    animacionSalida.oncancel = ()=>{

        animando = false;

    };

}


/*======================================================
                PÁGINA SIGUIENTE
======================================================*/

function siguiente(){

    if(!libroAbierto) return;

    if(animando) return;

    if(estaEnFinal()) return;

    animarCambio("siguiente",()=>{

        paginaActual += 2;

        mostrarLibro();

    });

}


/*======================================================
                PÁGINA ANTERIOR
======================================================*/

function anterior(){

    if(!libroAbierto) return;

    if(animando) return;

    if(estaEnInicio()) return;

    animarCambio("anterior",()=>{

        paginaActual -= 2;

        mostrarLibro();

    });

}


/*======================================================
                IR AL INICIO
======================================================*/

function irAlInicio(){

    if(!libroAbierto) return;

    if(animando) return;

    if(estaEnInicio()) return;

    animarCambio("anterior",()=>{

        paginaActual = 0;

        mostrarLibro();

    });

}


/*======================================================
                IR AL FINAL
======================================================*/

function irAlFinal(){

    if(!libroAbierto) return;

    if(animando) return;

    const ultimaApertura = Math.max(

        0,

        Math.floor(
            (libroCompleto.length - 1) / 2
        ) * 2

    );

    if(paginaActual === ultimaApertura) return;

    animarCambio("siguiente",()=>{

        paginaActual = ultimaApertura;

        mostrarLibro();

    });

}

/*======================================================
        NAVEGACIÓN HACIENDO CLIC EN LAS PÁGINAS
======================================================*/

paginaIzquierda.addEventListener("click",(e)=>{

    if(!libroAbierto) return;

    if(animando) return;

    /*
    Si el usuario hace clic dentro del texto,
    no cambia de página para evitar errores
    mientras intenta seleccionar o desplazar.
    */

    if(e.target.closest(".textoPagina")) return;

    anterior();

});


paginaDerecha.addEventListener("click",(e)=>{

    if(!libroAbierto) return;

    if(animando) return;

    if(e.target.closest(".textoPagina")) return;

    siguiente();

});


/*======================================================
            NAVEGACIÓN CON TECLADO
======================================================*/

document.addEventListener("keydown",(e)=>{

    /*
    Escape permite cerrar el libro.
    */

    if(e.key === "Escape"){

        cerrarLibro();

        return;

    }

    if(!libroAbierto) return;

    if(animando) return;


    switch(e.key){

        /*
        Flecha derecha:
        avanzar dos páginas.
        */

        case "ArrowRight":

            e.preventDefault();

            siguiente();

            break;


        /*
        Flecha izquierda:
        retroceder dos páginas.
        */

        case "ArrowLeft":

            e.preventDefault();

            anterior();

            break;


        /*
        Home:
        regresar al inicio.
        */

        case "Home":

            e.preventDefault();

            irAlInicio();

            break;


        /*
        End:
        ir a la última apertura.
        */

        case "End":

            e.preventDefault();

            irAlFinal();

            break;

    }

});

/*======================================================
                NAVEGACIÓN TÁCTIL
======================================================*/

let inicioToqueX = 0;
let inicioToqueY = 0;

let toqueIniciado = false;


interior.addEventListener("touchstart",(e)=>{

    if(!libroAbierto) return;

    if(animando) return;

    const toque = e.changedTouches[0];

    inicioToqueX = toque.clientX;
    inicioToqueY = toque.clientY;

    toqueIniciado = true;

},{ passive:true });


interior.addEventListener("touchend",(e)=>{

    if(!libroAbierto) return;

    if(animando) return;

    if(!toqueIniciado) return;

    const toque = e.changedTouches[0];

    const desplazamientoX =
        toque.clientX - inicioToqueX;

    const desplazamientoY =
        toque.clientY - inicioToqueY;

    const distanciaMinima = 60;


    /*
    Reiniciar el estado táctil.
    */

    toqueIniciado = false;


    /*
    Si el movimiento fue principalmente vertical,
    se considera desplazamiento del texto.
    */

    if(
        Math.abs(desplazamientoY) >=
        Math.abs(desplazamientoX)
    ){

        return;

    }


    /*
    Ignorar movimientos horizontales pequeños.
    */

    if(
        Math.abs(desplazamientoX) <
        distanciaMinima
    ){

        return;

    }


    /*
    Deslizar hacia la izquierda:
    avanzar.
    */

    if(desplazamientoX < 0){

        siguiente();

        return;

    }


    /*
    Deslizar hacia la derecha:
    retroceder.
    */

    anterior();

},{ passive:true });


interior.addEventListener("touchcancel",()=>{

    toqueIniciado = false;

},{ passive:true });


/*======================================================
          NAVEGACIÓN CON RUEDA DEL MOUSE
======================================================*/

let ruedaBloqueada = false;

let temporizadorRueda = null;


interior.addEventListener("wheel",(e)=>{

    if(!libroAbierto) return;

    if(animando) return;

    const zonaTexto =
        e.target.closest(".textoPagina");


    /*
    Si el cursor está sobre una zona de texto,
    primero permite desplazarse dentro de ella.
    */

    if(zonaTexto){

        const tolerancia = 2;

        const estaArriba =
            zonaTexto.scrollTop <= tolerancia;

        const estaAbajo =
            zonaTexto.scrollTop +
            zonaTexto.clientHeight >=
            zonaTexto.scrollHeight - tolerancia;


        /*
        Todavía existe texto hacia abajo.
        */

        if(e.deltaY > 0 && !estaAbajo){

            return;

        }


        /*
        Todavía existe texto hacia arriba.
        */

        if(e.deltaY < 0 && !estaArriba){

            return;

        }

    }


    /*
    Evita que la página completa se desplace.
    */

    e.preventDefault();


    /*
    Evita avanzar varias aperturas con
    un solo movimiento de la rueda.
    */

    if(ruedaBloqueada) return;

    ruedaBloqueada = true;


    if(e.deltaY > 0){

        siguiente();

    }

    else if(e.deltaY < 0){

        anterior();

    }


    clearTimeout(temporizadorRueda);

    temporizadorRueda = setTimeout(()=>{

        ruedaBloqueada = false;

    },500);

},{ passive:false });


