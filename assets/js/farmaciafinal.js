var articulosDeFarmacia = []
var articulosDeFarmaciaConAviso = []
var articulos = []
var juguetes = ""
var Medicamentos = []
var elementosPorAviso = []
var elementosSinAviso = []
var articulosDeFarmaciaConAviso = []
console.log(articulosDeFarmacia);


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



var inputSearch = document.getElementById("Input")

inputSearch.addEventListener("keyup", search)



function search(event) {
    console.log(event);
    var val = event.target.value
    console.log(val);


    articulosBuscados = articulosDeFarmacia.filter(data => data.nombre.toLowerCase().includes(val.toLowerCase()))
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

    console.log(articulosDeFarmacia);


    articulosDeFarmacia.forEach(element => {
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
                aviso: "últimas unidades"
            })
        }
    })
    /*     var numero = articulosBuscados.length */

    console.table(elementosPorAviso);

    console.table(elementosSinAviso);

    articulosDeFarmaciaConAviso.push(...elementosPorAviso)
    articulosDeFarmaciaConAviso.push(...elementosSinAviso)
    /*     console.log(articulosBuscados);
        console.log(articulosBuscados.length);
        console.log(typeof (numero)); */
console.log(articulosDeFarmaciaConAviso)
    if (data == undefined) {
        articulosParaMostrar.push(...articulosDeFarmaciaConAviso)
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
                  <button class="btn btn-warning botonCards" onClick="getID(${articulos.id})" id="${articulos.id}">Agregar al Carrito  <i style="font-size: 16px;" class="bi bi-cart-fill"></i></button>
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
                  
                  <button class="btn btn-warning botonCards" onClick="getID(${articulos.id})" id="${articulos.id}">Agregar al Carrito  <i style="font-size: 16px;" class="bi bi-cart-fill"></i></button>
                </div>
              </div>
      `
        }
        document.getElementById("cart").innerHTML = html



    });

}
cards()

