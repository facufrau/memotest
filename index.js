const $botonJugar = document.querySelector("#jugar");
const $botonResetear = document.querySelector("#reiniciar");
const CANTIDAD_CARTAS = 20;
let arrayDeCartas = [];

$botonJugar.onclick = jugar;
$botonResetear.onclick = resetear;

function jugar() {
    let indicesCartasMezclados = mezclarNumerosCartas();
    cargarCartasEnObjeto(arrayDeCartas);
    //console.log(arrayDeCartas);
    mostrarCartas(indicesCartasMezclados);
}

function resetear() {
    ocultarCartas();
}

function mezclarNumerosCartas() {
    // Idea para esta función tomada de: https://stackoverflow.com/a/12646864
    // Generar una lista con numeros consecutivos https://stackoverflow.com/a/33352604 
    let listaNumeros = [...Array(CANTIDAD_CARTAS).keys()];
    for (let i = listaNumeros.length - 1; i > 0; i--) {
        let indice = Math.floor(Math.random() * (i + 1));
        let temporal = listaNumeros[i];
        listaNumeros[i] = listaNumeros[indice];
        listaNumeros[indice] = temporal;
    }
    return listaNumeros
}

function cargarCartasEnObjeto(arrayDeCartas) {
    for (let i = 0; i < CANTIDAD_CARTAS / 2; i++ ){
        let cartaOperacion = {"tipo": i, "ruta": `imagenes/operaciones/${i}.png`};
        arrayDeCartas.push(cartaOperacion);

        let cartaRespuesta = {"tipo": i, "ruta": `imagenes/respuestas/${i}.png`};
        arrayDeCartas.push(cartaRespuesta);
    }
}


function mostrarCartas(listaIndices) {
    let indice;
    for (let i = 0; i < listaIndices.length; i++) {
        let carta = document.querySelector(`#carta-${i}`);
        indice = listaIndices[i] 
        carta.src = arrayDeCartas[indice]["ruta"];
    }
}

function ocultarCartas() {
    for (let i = 0; i < CANTIDAD_CARTAS; i++) {
        let carta = document.querySelector(`#carta-${i}`);
        carta.src = "imagenes/reverso.png";
    }
}