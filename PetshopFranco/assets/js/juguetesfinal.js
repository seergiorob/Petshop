var articulosDeJugueteria = []
var articulosDeJugueteriaConAviso = []
var articulos = []
var juguetes = ""
var elementosPorAviso = []
var elementosSinAviso = []




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
    cards(articulosDeJugueteria)
}
obtenerDatos()



var inputSearch = document.getElementById("Input")

inputSearch.addEventListener("keyup", search)



function search(event) {
    console.log(event);
    var val = event.target.value
    console.log(val);


    articulosBuscados = articulosDeJugueteria.filter(data => data.nombre.toLowerCase().includes(val.toLowerCase()))
    console.log(articulosBuscados);
    cards(articulosBuscados)

}

search()



function cards(data) {


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
    var articulosParaMostrar = []


    articulosDeJugueteria.forEach(element => {
        if (element.stock >= 5) {
            elementosSinAviso.push(
                {
                    _id: element._id,
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
                _id: element._id,
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
    /*     var numero = articulosBuscados.length */

    console.table(elementosPorAviso);

    console.table(elementosSinAviso);

    articulosDeJugueteriaConAviso.push(...elementosPorAviso)
    articulosDeJugueteriaConAviso.push(...elementosSinAviso)
    /*     console.log(articulosBuscados);
        console.log(articulosBuscados.length);
        console.log(typeof (numero)); */

    if (data == undefined) {
        articulosParaMostrar.push(...articulosDeJugueteriaConAviso)
    } else {
        articulosParaMostrar.push(...data)
    }


    console.table(articulosParaMostrar)



    var html = ""

    articulosParaMostrar.forEach(articulos => {
        if (articulos.aviso !== undefined) {
            html +=
                `<div class="card" style="width: 20rem;">
                <img style="width: 15rem;" src="${articulos.imagen}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column justify-content-between w-100">
                <div class="pepe"> 
                  <h5 class="card-title">${articulos.nombre}</h5>
                  <p class="card-text"></p>
                  <p class="card-text">Precio: ${articulos.precio}</p>
                  <p class="card-text">Stock: ${articulos.stock}</p>
                  <p class="card-text">${articulos.aviso}</p>
                  </div>
                  <a href="#" class="btn btn-warning">Agregar al Carrito  <i style="font-size: 16px;" class="bi bi-cart-fill"></i></a>
                </div>
              </div>
      `
        } else {
            html +=
                `<div class="card" style="width: 20rem;">
                <img style="width: 15rem;" src="${articulos.imagen}" class="card-img-top" alt="...">
                <div class="card-body d-flex flex-column justify-content-between w-100">
                <div class="pepe"> 
                  <h5 class="card-title">${articulos.nombre}</h5>
                  <p class="card-text"></p>
                  <p class="card-text">Precio: ${articulos.precio}</p>
                  <p class="card-text">Stock: ${articulos.stock}</p>
                  
                  </div>
                  <a href="#" class="btn btn-warning">Agregar al Carrito  <i style="font-size: 16px;" class="bi bi-cart-fill"></i></a>
                </div>
              </div>
      `
        }
        document.getElementById("cart").innerHTML = html



    });

}
cards()

