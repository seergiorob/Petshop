var articulosDeFarmacia = []
var articulosDeFarmaciaConAviso = []
var articulos = []
var juguetes = ""
var Medicamentos = []
var elementosPorAvisof = []
var elementosSinAviso = []
var articulosDeFarmaciaConAviso = []
var articulosBuscados = []
var btnFavorite = ""
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
    Separar(articulosDeFarmacia)
}
obtenerDatos()

var favorites = JSON.parse(localStorage.getItem("favoritos")) || [];

var clearFav;
function getID(event) {
    console.log(typeof (event));

    favorites.unshift(event);
    console.log(favorites);
    const unicoFav = new Set(favorites); //Dado al recorrer el array anterios me va a dar todas las propiedades, con el metodo set elimino los repetidos y dejo solo el primer elemento encontrado, el resto lo descarta
    var clearFav = [...unicoFav]


    localStorage.setItem("favoritos", JSON.stringify(clearFav));

    init()

}



function Separar(params) {
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
            elementosPorAvisof.push({
                _id: element._id,
                nombre: element.nombre,
                descripcion: element.descripcion,
                precio: element.precio,
                stock: element.stock,
                imagen: element.imagen,
                tipo: element.tipo,
                __v: element.__v,
                aviso: "ULTIMAS UNIDADES!",
            })
        }
    })
    /*     var numero = articulosBuscados.length */

    console.table(elementosPorAvisof);

    console.table(elementosSinAviso);

    articulosDeFarmaciaConAviso.push(...elementosPorAvisof)
    articulosDeFarmaciaConAviso.push(...elementosSinAviso)

    console.log(articulosDeFarmaciaConAviso);
    cards(articulosDeFarmaciaConAviso)
}
Separar()


var inputSearch = document.getElementById("Input")

inputSearch.addEventListener("keyup", search)



function search(event) {
    console.log(event);
    var val = event.target.value
    console.log(val);


    articulosBuscados = articulosDeFarmaciaConAviso.filter(data => data.nombre.toLowerCase().includes(val.toLowerCase()))
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


    console.log(articulosBuscados);
    console.log(articulosDeFarmaciaConAviso);


    if (articulosBuscados.length == 0) {
        articulosParaMostrar.push(...articulosDeFarmaciaConAviso)
    } else {
        articulosParaMostrar.push(...articulosBuscados)
    }


    console.table(articulosParaMostrar)



    var html = ""

    articulosParaMostrar.map(articulos => {
        if (articulos.aviso !== undefined) {
            /* let stock = toDisplay.stock <= 5 ? <p>"Ultimas Unidades!"</p> : ""; */
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
                  <div>
                  <p class="card-text btn-danger text-center" id="rojo">${articulos.aviso}</p>
                  <button class="btn btn-warning w-100" id="btnfarm" onClick="getID('${articulos._id}')" >Agregar al Carrito  <i style="font-size: 16px;" class="bi bi-cart-fill"></i></button>
                  </div>
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
                  <button class="btn btn-warning w-100" id="btnfarm" onClick="getID('${articulos._id}')" >Agregar al Carrito  <i style="font-size: 16px;" class="bi bi-cart-fill"></i></button>
                </div>
              </div>

      `
        }
        document.getElementById("cart").innerHTML = html

        /*         save_localstorage(articulosDeFarmaciaConAviso) */

    });

}
cards()
getID()


/* save_localstorage() */


/* var carrit = ""


var despejarCarry = ""

function getID(event) {
    console.log(event);

    carrit.push(event)
    const UNICOCARRY = new Set(carrit)
    var despejarCarry = [...UNICOCARRY]


    localStorage.setItem('carr', JSON.stringify(despejarCarry));
    carry(despejarCarry)

}

getID() */





