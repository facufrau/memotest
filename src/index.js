const CANTIDAD_CARTAS = 20;
const TOTAL_PARES = 10;
const $botonJugar = document.querySelector("#jugar");
const $botonResetear = document.querySelector("#reiniciar");
const $ganar = document.querySelector("#ganar");
const $cantidadIntentos = document.querySelector("#intentos");
const $tiempo = document.querySelector("#tiempo");

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
    ocultarCartas();
    intentos = 0;
    $cantidadIntentos.innerText = "-"
    $ganar.classList.add("oculto");
}

function mezclarCartas(arrayDeCartas) {
    // Idea para esta función tomada de: https://stackoverflow.com/a/12646864
    for (let i = CANTIDAD_CARTAS - 1; i > 0; i--) {
        let indice = Math.floor(Math.random() * (i + 1));
        let temporal = arrayDeCartas[i];
        arrayDeCartas[i] = arrayDeCartas[indice];
        arrayDeCartas[indice] = temporal;
    }
}

function manejarTurno() {
    const $cartas = document.querySelectorAll('.carta');
    $cartas.forEach(carta => carta.onclick = mostrarCarta);
}

function bloquearInput() {
    const $cartas = document.querySelectorAll('.carta');
    $cartas.forEach(carta => carta.onclick = function(){console.log('Input bloqueado!')})
}

function mostrarCarta(e) {
    let carta = e.target;
    let numeroDeCarta = Number(carta.id);
    carta.src = cartas[numeroDeCarta]["ruta"];
    cartasElegidas.push(numeroDeCarta);
    if (cartasElegidas.length === 2) {
        setTimeout(comprobarIgualdad, 600);
        intentos++;
        $cantidadIntentos.innerText = intentos;
    }
}

function comprobarIgualdad() {
    const $cartas = document.querySelectorAll(".carta");

    const primerCarta = cartas[cartasElegidas[0]]["id"];
    const segundaCarta = cartas[cartasElegidas[1]]["id"];

    if (primerCarta === segundaCarta) {
        cartasAcertadas.push(primerCarta);
        $cartas[cartasElegidas[0]].setAttribute("src", "imagenes/ok.png");
        $cartas[cartasElegidas[1]].setAttribute("src", "imagenes/ok.png" );
    }
    else {
        $cartas[cartasElegidas[0]].setAttribute("src", "imagenes/reverso.png");
        $cartas[cartasElegidas[1]].setAttribute("src", "imagenes/reverso.png" );
    }
    cartasElegidas = [];
    if (cartasAcertadas.length === TOTAL_PARES) {
        ganar();
    }
}

function ocultarCartas() {
    for (let i = 0; i < CANTIDAD_CARTAS; i++) {
        let carta = document.getElementById(`${i}`);
        carta.src = "imagenes/reverso.png";
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
    $ganar.classList.remove("oculto");
    $ganar.innerText = `¡Ganaste el juego en ${intentos} intentos!`;
    cartasAcertadas = [];
}
