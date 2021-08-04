const CANTIDAD_CARTAS = 20;
const CANTIDAD_IMAGENES = 10;
const $botonJugar = document.querySelector("#jugar");
const $botonResetear = document.querySelector("#reiniciar");
const $cantidadIntentos = document.querySelector("#intentos");
const $tiempo = document.querySelector("#tiempo");

$botonJugar.onclick = jugar;
$botonResetear.onclick = resetear;

function jugar() {
    desactivarBoton('jugar');
    arrayDeCartas = [];
    cargarCartasEnArray(arrayDeCartas);
    mezclarCartas(arrayDeCartas);
    manejarTurno(arrayDeCartas);
}


function resetear() {
    arrayDeCartas = [];
    activarBoton('jugar');
    bloquearInput();
    ocultarCartas();
}

function cargarCartasEnArray(arrayDeCartas) {
    for (let i = 1; i <= CANTIDAD_IMAGENES; i++ ){
        let cartaOperacion = {"id": i, "ruta": `imagenes/${i}.png`};
        arrayDeCartas.push(cartaOperacion);
    }
    arrayDeCartas = arrayDeCartas.concat(arrayDeCartas);
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

function manejarTurno(arrayDeCartas) {
    let cartasElegidas = [];
    const $cartas = document.querySelectorAll('.carta');
    $cartas.forEach(carta => carta.onclick = function(e) {
        manejarInput(e, cartasElegidas);
    });
}

function bloquearInput() {
    const $cartas = document.querySelectorAll('.carta');
    $cartas.forEach(carta => carta.onclick = function(){console.log('Input bloqueado!')})
}

function manejarInput(e, cartasElegidas) {
    let carta = e.target;
    let numeroDeCarta = Number(carta.id);
    carta.src = arrayDeCartas[numeroDeCarta]["ruta"];
    cartasElegidas.push(numeroDeCarta);
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