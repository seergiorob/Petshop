var articulosDeJugueteria = []
var articulosDeJugueteriaConAviso = []
var articulos = []
var juguetes = ""
var elementosPorAviso = []
var elementosSinAviso = []
console.log(articulosDeJugueteria);


async function obtenerDatos() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(respuestas => respuestas.json())
        .then(json => articulos.push(...json.response))
    console.table(articulos);



    var articulosPorTipo = articulos.map(x => x.tipo)
    const tiposenarray = new Set(articulosPorTipo);
    TiposDeArticulo = [...tiposenarray]

    console.log(TiposDeArticulo);

    juguetes = TiposDeArticulo[0]
    console.log(juguetes);

    articulos.forEach(element => {
        if (element.tipo == juguetes) {
            articulosDeJugueteria.push(element)
        }
    });

    console.table(articulosDeJugueteria);

    /*     articulosDeJugueteria.forEach(element => {
            if (element.stock < 5) {
                elementosPorAviso.push({
                    id: element.id,
                    nombre: element.nombre,
                    descripcion: element.descripcion,
                    precio: element.precio,
                    stock: element.stock,
                    imagen: element.imagen,
                    tipo: element.tipo,
                    __v: element.__v,
                    aviso: "ultimas unidades"
                }
                )
            } if (element.stock > 5) {
                elementosSinAviso = articulosDeJugueteria
            }
        }); */
    articulosDeJugueteria.forEach(element => {
        if (element.stock >= 5) {
            elementosSinAviso.push(
                {
                    id: element.id,
                    nombre: element.nombre,
                    descripcion: element.descripcion,
                    precio: element.precio,
                    stock: element.stock,
                    imagen: element.imagen,
                    tipo: element.tipo,
                    __v: element.__v,
                }
            )
        } else {
            elementosPorAviso.push({
                id: element.id,
                nombre: element.nombre,
                descripcion: element.descripcion,
                precio: element.precio,
                stock: element.stock,
                imagen: element.imagen,
                tipo: element.tipo,
                __v: element.__v,
                aviso: "ultimas unidades"
            })
        }
    })


    console.table(elementosPorAviso);

    console.table(elementosSinAviso);

    articulosDeJugueteriaConAviso.push(...elementosPorAviso)
    articulosDeJugueteriaConAviso.push(...elementosSinAviso)

    console.table(articulosDeJugueteriaConAviso)

    var html = ""

    articulosDeJugueteriaConAviso.forEach(articulos => {
        if (articulos.aviso !== undefined) {
            html +=
                `<div class="card" style="width: 20rem;">
                <img style="width: 15rem;" src="${articulos.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${articulos.nombre}</h5>
                  <p class="card-text"></p>
                  <p class="card-text">Precio: ${articulos.precio}</p>
                  <p class="card-text">Stock: ${articulos.stock}</p>
                  <p class="card-text">${articulos.aviso}</p>
                  <a href="#" class="btn btn-warning">Agregar al Carrito</a>
                </div>
              </div>
      `
        } else {
            html +=
                `<div class="card" style="width: 20rem;">
                <img style="width: 15rem;" src="${articulos.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${articulos.nombre}</h5>
                  <p class="card-text"></p>
                  <p class="card-text">Precio: ${articulos.precio}</p>
                  <p class="card-text">Stock: ${articulos.stock}</p>
                  
                  <a href="#" class="btn btn-warning">Agregar al Carrito</a>
                </div>
              </div>
      `
        }
        document.getElementById("cart").innerHTML = html



    });

}
obtenerDatos()
