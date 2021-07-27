const $botonJugar = document.querySelector("#jugar");
const $botonResetear = document.querySelector("#reiniciar");
const CANTIDAD_CARTAS = 20;
const $cantidadIntentos = document.querySelector("#intentos");
const $tiempo = document.querySelector("#tiempo");

$botonJugar.onclick = jugar;
$botonResetear.onclick = resetear;

function jugar() {
    arrayDeCartas = [];
    cargarCartasEnArray(arrayDeCartas);
    mezclarCartas(arrayDeCartas);
    mostrarCartas(arrayDeCartas);
}

function resetear() {
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

function ocultarCartas() {
    for (let i = 0; i < CANTIDAD_CARTAS; i++) {
        let carta = document.querySelector(`#carta-${i}`);
        carta.src = "imagenes/reverso.png";
    }
}