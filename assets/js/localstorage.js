let guardado = []
let toDisplayCart = []
let cantidadQ = []
let array = []

async function obtenerDatos() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(respuestas => respuestas.json())
        .then(json => articulos.push(...json.response))
    console.table(articulos);



    var articulosPorTipo = articulos.map(x => x.tipo)
    const tiposenarray = new Set(articulosPorTipo);
    TiposDeArticulo = [...tiposenarray]

    console.log(TiposDeArticulo);

    Medicamentos = TiposDeArticulo[1]
    console.log(Medicamentos);

    articulos.forEach(element => {
        if (element.tipo == Medicamentos) {
            articulosDeFarmacia.push(element)
        }
    });

    console.table(articulosDeFarmacia);
    cards(articulosDeFarmacia)
}
obtenerDatos()