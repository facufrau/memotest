const $botonJugar = document.querySelector("#jugar");
const $botonResetear = document.querySelector("#reiniciar");
const CANTIDAD_CARTAS = 20;
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
    for (let i = 0; i < CANTIDAD_CARTAS / 2; i++ ){
        let cartaOperacion = {"tipo": i, "ruta": `imagenes/operaciones/${i}.png`};
        arrayDeCartas.push(cartaOperacion);

        let cartaRespuesta = {"tipo": i, "ruta": `imagenes/respuestas/${i}.png`};
        arrayDeCartas.push(cartaRespuesta);
    }
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

    if (cartasElegidas.length === 2) {
        console.log(cartasElegidas);
        let primera = cartasElegidas[0]
        let segunda = cartasElegidas[1];
        if (arrayDeCartas[primera]['tipo'] === arrayDeCartas[segunda]['tipo']) {
            console.log('correctito');
            bloquearInput();
        }
        cartasElegidas = [];
        ocultarCartas();
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