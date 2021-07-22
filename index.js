console.log('testing');

function mezclarCartas(listaCartas) {
    // Idea para esta función tomada de: https://stackoverflow.com/a/12646864
    for (let i = listaCartas.length - 1; i > 0; i--) {
        let indice = Math.floor(Math.random() * (i + 1));
        let temporal = listaCartas[i];
        listaCartas[i] = listaCartas[indice];
        listaCartas[indice] = temporal;
    }
}
mezclarCartas([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]);