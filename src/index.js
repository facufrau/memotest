const $botonJugar = document.querySelector("#jugar");
const $botonResetear = document.querySelector("#reiniciar");
const $mensajeGanador = document.querySelector("#mensajeGanador");
const $cantidadIntentos = document.querySelector("#intentos");
const $tiempo = document.querySelector("#tiempo");
const $cartas = document.querySelectorAll(".carta");
const $tablero = document.querySelector("#tablero");

$botonJugar.onclick = jugar;
$botonResetear.onclick = resetear;

let cartasElegidas = [];
let cartasAcertadas = [];
let intentos = 0;

function jugar() {
    desactivarBoton('jugar');
    mezclarCartas(cartas);
    manejarTurno(cartas);
}

function resetear() {
    activarBoton('jugar');
    bloquearInput();
    ocultarTodasCartas();
    intentos = 0;
    $cantidadIntentos.innerText = "-"
    $mensajeGanador.classList.add("oculto");
    $cartas.forEach(carta => carta.classList.remove('bien'));
}

function mezclarCartas(arrayDeCartas) {
    // Idea para esta función tomada de: https://stackoverflow.com/a/12646864
    for (let i = (cartas.length - 1); i > 0; i--) {
        let indice = Math.floor(Math.random() * (i + 1));
        let temporal = arrayDeCartas[i];
        arrayDeCartas[i] = arrayDeCartas[indice];
        arrayDeCartas[indice] = temporal;
    }
}

function manejarTurno() {
    $tablero.onclick = mostrarCarta;
}

function bloquearInput() {
    $tablero.onclick = function(){};
}

function mostrarCarta(e) {
    if (e.target.classList.contains('carta')) { 
        let carta = e.target;
        let numeroDeCarta = Number(carta.id);

        if (!carta.classList.contains('bien')) {
            carta.src = cartas[numeroDeCarta]["ruta"];
            animarCarta(carta);
            cartasElegidas.push(numeroDeCarta);

            if (cartasElegidas.length === 2) {
                bloquearInput();
                setTimeout(comprobarIgualdad, 1500);
                intentos++;
                $cantidadIntentos.innerText = intentos;
            }
        }
    }
}

function comprobarIgualdad() {
    const primerCarta = cartas[cartasElegidas[0]]["id"];
    const segundaCarta = cartas[cartasElegidas[1]]["id"];

    if (primerCarta === segundaCarta) {
        if ($cartas[cartasElegidas[0]] === $cartas[cartasElegidas[1]]) {
            alert('Elegiste 2 veces la misma carta...');
            ocultarCarta($cartas[cartasElegidas[0]]);
        }
        else {
            cartasAcertadas.push(primerCarta);
            $cartas[cartasElegidas[0]].setAttribute("src", "imagenes/ok.png");
            $cartas[cartasElegidas[1]].setAttribute("src", "imagenes/ok.png" );
    
            $cartas[cartasElegidas[0]].classList.add('bien');
            $cartas[cartasElegidas[1]].classList.add('bien');
        }
    }
    else {
        ocultarCarta($cartas[cartasElegidas[0]]);
        ocultarCarta($cartas[cartasElegidas[1]]);
    }
    cartasElegidas = [];
    if (cartasAcertadas.length === (cartas.length / 2)) {
        ganar();
    }
    else {
        manejarTurno();
    }
}

function ocultarCarta(elemento) {
    elemento.src = "imagenes/reverso.png";
}

function ocultarTodasCartas() {
    for (let i = 0; i < cartas.length; i++) {
        ocultarCarta(document.getElementById(`${i}`));
    }
}

function desactivarBoton(idBoton) {
    let boton = document.getElementById(idBoton);
    boton.setAttribute('disabled', '');
}

function activarBoton(idBoton) {
    let boton = document.getElementById(idBoton);
    boton.removeAttribute('disabled');
}

function ganar() {
    bloquearInput();
    $mensajeGanador.classList.remove("oculto");
    $mensajeGanador.innerText = `¡Ganaste el juego en ${intentos} intentos!`;
    cartasAcertadas = [];
}

function animarCarta(elemento) {
    elemento.style.scale = 1.20;
    setTimeout(function(){elemento.style.scale = 1}, 400);
}
