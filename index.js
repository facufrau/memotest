const $botonJugar = document.querySelector("#jugar");
const $botonResetear = document.querySelector("#reiniciar");
$botonJugar.onclick = jugar;
$botonResetear.onclick = resetear;

function jugar() {
    let indicesCartasMezclados = mezclarNumerosCartas();
    mostrarCartas(indicesCartasMezclados);
}

function resetear() {
    ocultarCartas();
}

function mezclarNumerosCartas() {
    // Idea para esta función tomada de: https://stackoverflow.com/a/12646864
    let listaNumeros = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
    for (let i = listaNumeros.length - 1; i > 0; i--) {
        let indice = Math.floor(Math.random() * (i + 1));
        let temporal = listaNumeros[i];
        listaNumeros[i] = listaNumeros[indice];
        listaNumeros[indice] = temporal;
    }
    return listaNumeros
}

function mostrarCartas(listaIndices) {
    for (let i = 0; i < listaIndices.length; i++) {
        let carta = document.querySelector(`#carta-${i}`);
        carta.src = `imagenes/${listaIndices[i]}.png`;
    }
}

function ocultarCartas() {
    for (let i = 0; i < 16; i++) {
        let carta = document.querySelector(`#carta-${i}`);
        carta.src = "imagenes/reverso.png";
    }
}