/* var guardado = []
var mostrarCarrito = []
var cantidadQ = 1
var articulosEnBruto = []


//VEAN CAMBIOS EN OBJARRAY
//NO SE OLVIDEN DE GENERAR EN TODO EL NAVBAR LOS ELEMENTOS NECESARIO AL IGUAL QUE EN CADA HTML

//FUNCION PARA LLAMAR AL DATO COMPLETO DE LA API Y FILTRAR POR LOS ID GUARDADOS EN LOCALSTORAGE
async function obtenerArticulos() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(respuestas => respuestas.json())
        .then(json => articulosEnBruto.push(...json.response))
    console.table(articulosEnBruto);


    carry(articulosEnBruto)
}
obtenerArticulos()



function carry() {

    var dataLocal = JSON.parse(localStorage.getItem('carr'))
    if (dataLocal != null) {
        guardado = dataLocal
    } else { guardado = [] }

    console.log(guardado);

    var ancor = ""
    console.log(guardado)

    ancor =
        `
    <button type="button" class="btn btn-primary position-relative">
    <a href="./carrito.html" tabindex="2">carrito</a>
      
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
        ${guardado.length}</span>
        <span class="visually-hidden">unread messages</span>
      
    </button>
    `

    document.getElementById("carrito").innerHTML = ancor


    mostrarCarrito = []

    guardado.map(idguardado => {

        mostrarCarrito.push(...articulosEnBruto.filter(articulos => articulos.id == idguardado))

    })
    var templateHtmlCarrito = ""


    mostrarCarrito.map(articulos => {

        templateHtmlCarrito += `    
        <div class="boxCard">
        <div class="imgCard">
        <img src="${articulos.bandera}">
        </div>
        <div class="dataCard">
        <h2>${articulos.name}</h2>
        
           

            <button class="botonCards" onClick="removeID(${articulos.id})" id="${articulos.id}">remove Favorite</button>
            <div class="counterFav">
            <button class="itemsCount" onClick="restQ(${articulos.id})">-</button>
            <p class="itemsCount" >${articulos.cantidad}</p>
            <button class="itemsCount" onClick="addQ(${articulos.id})">+</button>
        </div>
            
        </div>
        </div>
        `

    })

    document.querySelector('#CarritoDetalle').innerHTML = templateHtmlCarrito //Imprimimos en html las cards guardadas en el variable html

}
carry()

//FUNCION PARA REMOVER ITEMS DEL LOCALSTORAGE

function removeID(event) {

    guardado = guardado.filter(idguardado => idguardado != event)
    localStorage.setItem('carr', JSON.stringify(guardado))
    //localStorage.setItem("cargaControl", "Secargo")
    carry()
    console.log(guardado)
}

document.getElementById("clear").addEventListener("click", function () {
    //localStorage.clear()
    localStorage.removeItem("carrito")

    carry()
})
var counter = []

//FUNCIONES PARA AGRGAR DATOS AL CONTADOR
function addQ(event) {
    counter = []
    counter.push(...mostrarCarrito.filter(articulos => articulos.id == event))
    counter.map(articulos => articulos.cantidad++)

    carry()
}
//FUNCION PARA RESTAR DATOS AL CONTADOR
function restQ(event) {
    counter = []
    counter.push(...mostrarCarrito.filter(articulos => articulos.id == event))
    counter.map(articulos => articulos.cantidad--)

    carry()
} */






























































































































var guardado = []
var toDisplayFavorite = []
var cantidadQ = 1
var array = []
var arti = []
var artiEnArray = []

//VEAN CAMBIOS EN OBJARRAY
//NO SE OLVIDEN DE GENERAR EN TODO EL NAVBAR LOS ELEMENTOS NECESARIO AL IGUAL QUE EN CADA HTML

//FUNCION PARA LLAMAR AL DATO COMPLETO DE LA API Y FILTRAR POR LOS ID GUARDADOS EN LOCALSTORAGE

async function obtenerDatos() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(respuestas => respuestas.json())
        .then(json => arti.push(...json.response))

    arti.forEach(element => {

        artiEnArray.push(
            {
                _id: element._id,
                nombre: element.nombre,
                descripcion: element.descripcion,
                precio: element.precio,
                stock: element.stock,
                imagen: element.imagen,
                tipo: element.tipo,
                v: element.v,
                cantidad: 1,
            }

        )
    }
    )
    init(artiEnArray)
}
obtenerDatos()



// FUNCION QUE GENERA EL CONTADOR DE FAVORITOS Y DESPLIEGA LAS CARDS FAVORITAS
function init() {

    var dataLocal = JSON.parse(localStorage.getItem("favoritos"))
    console.log(dataLocal);
    if (dataLocal != null) {
        guardado = dataLocal
    } else { guardado = [] }

    var badge = ""
    console.log(guardado)

    badge =
        `
<button type="button" class="btn bg-transparent position-relative">
<a href="./checkout.html"tabindex="2"><i style="font-size: 20px;" class="bi bi-cart-fill"></i></a>
  
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${guardado.length}
    <span class="visually-hidden">unread messages</span>
  </span>
</button>
`

    document.getElementById("carrito").innerHTML = badge
    toDisplayFavorite = []
    guardado.map(idguardado => {

        toDisplayFavorite.push(...artiEnArray.filter(art => art._id == idguardado))

    })
    // var templateHtmlFavorite = ""


    // toDisplayFavorite.map(articulo => {

    //     templateHtmlFavorite += `    
    // <div class="boxCard">
    // <div class="imgCard">
    // <img src="${articulo.imagen}">
    // </div>
    // <div class="dataCard">
    // <h2>${articulo.nombre}</h2>
    
       
    //     <button class="botonCards"><a href="../detalle.html?id=${articulo._id}">Ver mas</a></button>
    //     <button class="botonCards" onClick="removeID('${articulo._id}')">remove Favorite</button>
    //     <div class="counterFav">
    //     <button class="itemsCount" onClick="restQ('${articulo._id}')">-</button>
    //     <p class="itemsCount" >${articulo.cantidad}</p>
    //     <button class="itemsCount" onClick="addQ('${articulo._id}')">+</button>
    // </div>
        
    // </div>
    // </div>
    // `

    // })

    // document.querySelector('#CarritoDetalle').innerHTML = templateHtmlFavorite //Imprimimos en html las cards guardadas en el variable html
    
    let templateHtmlFavorite2 = ""

    toDisplayFavorite.map(articulo => {

        templateHtmlFavorite2 += `
        <tr>
                                  <td class="product__cart__item">
                                      <div class="product__cart__item__pic">
                                          <img class="shopping__cart__table-img" src="${articulo.imagen}">
                                      </div>
                                      <div class="product__cart__item__text">
                                          <h6>${articulo.nombre}</h6>
                                          <h5 id="id">$ ${articulo.precio}</h5>
                                      </div>
                                  </td>
                                  <td class="quantity__item">
                                      <div class="quantity">
                                          <div class="pro-qty-2">
                                              <input type="text" value="${articulo.cantidad}" readonly>
                                          </div>
                                      </div>
                                  </td>
                                  <td><button class="restasumx" onClick="restQ('${articulo._id}')">-</button></td>
                                  <td id="ccu-total" class="cart__price">        $${articulo.cantidad * articulo.precio}</td>
                                  
                                  <td><button class="restasumx" onClick="addQ('${articulo._id}')">+</button></td>
                                  <td><button class="restasumx" onClick="removeID('${articulo._id}')"> x </button></td>
                              </tr>
                              `

    })
    document.querySelector('#items').innerHTML = templateHtmlFavorite2
}
init()

//FUNCION PARA REMOVER ITEMS DEL LOCALSTORAGE

function removeID(event) {

    guardado = guardado.filter(idguardado => idguardado != event)
    localStorage.setItem('favoritos', JSON.stringify(guardado))
    //localStorage.setItem("cargaControl", "Secargo")
    init()
    console.log(guardado)
}

document.getElementById("clear").addEventListener("click", function () {
    //localStorage.clear()
    localStorage.removeItem("favoritos")

    init()
})
var counter = []
//FUNCIONES PARA AGRGAR DATOS AL CONTADOR
function addQ(event) {
    counter = []
    counter.push(...toDisplayFavorite.filter(articulos => articulos._id == event))
    counter.map(function anonima(arti) {
        if (arti.cantidad < arti.stock) {
            arti.cantidad++
        }

    })

    init()
}
//FUNCION PARA RESTAR DATOS AL CONTADOR
function restQ(event) {
    counter = []
    counter.push(...toDisplayFavorite.filter(articulos => articulos._id == event))
    counter.map(articulos => articulos.cantidad > 0 ? articulos.cantidad-- : articulos.cantidad)


    init()
}