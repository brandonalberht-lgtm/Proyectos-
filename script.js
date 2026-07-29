/*======================================================
                ABRIR EL LIBRO
======================================================*/

function abrirLibro(){

    if(libroAbierto) return;

    libroAbierto=true;

    paginaActual=0;

    portada.style.display="none";

    libro.style.width="1100px";

    interior.classList.remove("oculto");
    interior.style.display="flex";

    mostrarLibro();

}


/*======================================================
        NAVEGACIÓN HACIENDO CLIC EN LAS PÁGINAS
======================================================*/

const paginaIzquierda = document.querySelector(".pagina.izquierda");
const paginaDerecha = document.querySelector(".pagina.derecha");

paginaIzquierda.addEventListener("click",(e)=>{

    if(e.target.closest(".textoPagina")) return;

    anterior();

});

paginaDerecha.addEventListener("click",(e)=>{

    if(e.target.closest(".textoPagina")) return;

    siguiente();

});

/*======================================================
            NAVEGACIÓN TÁCTIL
======================================================*/

let inicioToqueX = 0;
let inicioToqueY = 0;

interior.addEventListener("touchstart",(e)=>{

    const toque = e.changedTouches[0];

    inicioToqueX = toque.clientX;
    inicioToqueY = toque.clientY;

},{ passive:true });

interior.addEventListener("touchend",(e)=>{

    const toque = e.changedTouches[0];

    const desplazamientoX = toque.clientX - inicioToqueX;
    const desplazamientoY = toque.clientY - inicioToqueY;

    const distanciaMinima = 60;

    /*
    Evita cambiar de página cuando el usuario
    solamente está desplazando verticalmente el texto.
    */

    if(
        Math.abs(desplazamientoX) <=
        Math.abs(desplazamientoY)
    ){

        return;

    }

    if(Math.abs(desplazamientoX) < distanciaMinima){

        return;

    }

    /*
    Deslizar hacia la izquierda:
    avanzar.
    */

    if(desplazamientoX < 0){

        siguiente();

    }

    /*
    Deslizar hacia la derecha:
    retroceder.
    */

    else{

        anterior();

    }

},{ passive:true });
/*======================================================
          NAVEGACIÓN CON RUEDA DEL MOUSE
======================================================*/

let ruedaBloqueada = false;

interior.addEventListener("wheel",(e)=>{

    if(!libroAbierto) return;

    const zonaTexto = e.target.closest(".textoPagina");

    /*
    Si el cursor está sobre el texto, primero permite
    desplazarse dentro de la página.
    */

    if(zonaTexto){

        const estaArriba = zonaTexto.scrollTop <= 0;

        const estaAbajo =
            Math.ceil(
                zonaTexto.scrollTop +
                zonaTexto.clientHeight
            ) >= zonaTexto.scrollHeight;

        /*
        Mientras todavía haya texto por desplazar,
        no cambia de página.
        */

        if(e.deltaY > 0 && !estaAbajo){

            return;

        }

        if(e.deltaY < 0 && !estaArriba){

            return;

        }

    }

    e.preventDefault();

    if(ruedaBloqueada) return;

    ruedaBloqueada = true;

    if(e.deltaY > 0){

        siguiente();

    }

    else if(e.deltaY < 0){

        anterior();

    }

    /*
    Evita avanzar varias páginas con
    un único movimiento de la rueda.
    */

    setTimeout(()=>{

        ruedaBloqueada = false;

    },500);

},{ passive:false });


/*======================================================
            NAVEGACIÓN CON TECLADO
======================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key === "Escape"){

        cerrarLibro();
        return;

    }

    if(!libroAbierto) return;

    switch(e.key){

        case "ArrowRight":

            e.preventDefault();

            siguiente();

            break;

        case "ArrowLeft":

            e.preventDefault();

            anterior();

            break;

        case "Home":

            e.preventDefault();

            irAlInicio();

            break;

        case "End":

            e.preventDefault();

            irAlFinal();

            break;

    }

});

/*======================================================
                ANIMAR CAMBIO
======================================================*/

function animarCambio(direccion,accion){

    if(interior.dataset.animando === "true") return;

    interior.dataset.animando = "true";

    const desplazamiento =
        direccion === "siguiente" ? -35 : 35;

    interior.animate(

        [
            {
                opacity:1,
                transform:"translateX(0)"
            },

            {
                opacity:0,
                transform:`translateX(${desplazamiento}px)`
            }
        ],

        {
            duration:180,
            easing:"ease-in",
            fill:"forwards"
        }

    ).onfinish=()=>{

        accion();

        interior.animate(

            [
                {
                    opacity:0,
                    transform:`translateX(${-desplazamiento}px)`
                },

                {
                    opacity:1,
                    transform:"translateX(0)"
                }
            ],

            {
                duration:220,
                easing:"ease-out",
                fill:"forwards"
            }

        ).onfinish=()=>{

            interior.style.opacity="";
            interior.style.transform="";

            interior.dataset.animando="false";

        };

    };

}

/*======================================================
                PÁGINA SIGUIENTE
======================================================*/

function siguiente(){

    if(!libroAbierto) return;

    if(paginaActual + 2 >= libroCompleto.length) return;

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

    if(paginaActual - 2 < 0) return;

    animarCambio("anterior",()=>{

        paginaActual -= 2;

        mostrarLibro();

    });

}

/*======================================================
          ESTADO DE LA NAVEGACIÓN
======================================================*/

function estaEnInicio(){

    return paginaActual === 0;

}

function estaEnFinal(){

    return paginaActual + 2 >= libroCompleto.length;

}

function actualizarEstadoNavegacion(){

    /*
    Página izquierda:
    solo permite retroceder si no estamos al inicio.
    */

    if(estaEnInicio()){

        paginaIzquierda.style.cursor = "default";
        paginaIzquierda.style.opacity = "0.96";

    }

    else{

        paginaIzquierda.style.cursor = "pointer";
        paginaIzquierda.style.opacity = "1";

    }

    /*
    Página derecha:
    solo permite avanzar si quedan páginas.
    */

    if(estaEnFinal()){

        paginaDerecha.style.cursor = "default";
        paginaDerecha.style.opacity = "0.96";

    }

    else{

        paginaDerecha.style.cursor = "pointer";
        paginaDerecha.style.opacity = "1";

    }

}

/*======================================================
                CERRAR EL LIBRO
======================================================*/

function cerrarLibro(){

    if(!libroAbierto) return;

    if(interior.dataset.animando === "true") return;

    libroAbierto = false;
    paginaActual = 0;

    limpiarPaginas();

    interior.classList.add("oculto");
    interior.style.display = "none";

    portada.style.display = "flex";

    libro.style.width = "520px";

    interior.dataset.animando = "false";

}
