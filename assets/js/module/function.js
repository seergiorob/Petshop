const apiUrl = "https://mindhub-xj03.onrender.com/api/petshop";
const data = [];

async function getData() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Ocurrió un error al obtener los datos:", error);
  }
}

function productosFarmacia(prod) {
  return prod.filter((prod) => {
    return prod.categoria === "farmacia";
  });
}

function productosJuguetes(prod) {
  return prod.filter((prod) => {
    return prod.categoria === "jugueteria";
  });
}

export function filtrarPorBusqueda(events, searchBar) {
  const searchString = searchBar.value.toLowerCase();
  return events.filter((event) => {
    return event.producto.toLowerCase().includes(searchString);
  });
}

export const displayProducts = (products, prodContainer, cartContainer) => {
  if (products.length > 0) {
    const htmlString = products
      .map((prod, index) => {
        return `
          


        <div class="card mx-2 my-2" style="width: 20rem;">
        <img style="width: 10rem; height: 10rem; display: block; margin: auto;" src="${prod.imagen}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column justify-content-between w-100">
            <div class="pepe"> 
                <h6 class="card-title">${prod.producto}</h6>
                <p class="card-text"></p>
                <p class="card-text">Precio: $ ${prod.precio}</p>
                <p class="card-text">Stock: ${prod.disponibles}</p>
            </div>
            <div>
                
                <button class="btn btn-warning w-100"  id="addToCartButton${index}" >Agregar al Carrito  <i style="font-size: 16px;" class="bi bi-cart-fill"></i></button>
            </div>
        </div>
    </div>
    


          `;
      })
      .join("");
    prodContainer.innerHTML = htmlString;

    products.forEach((prod, index) => {
      document
        .getElementById(`addToCartButton${index}`)
        .addEventListener("click", () => addToCart(prod, cartContainer));
    });
  } else {
    prodContainer.innerHTML = `<h3 class="text-center my-4">No products found, try with another one.</h3>`;
  }
};

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product, cartContainer) {
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(cartContainer, cart);
}

function removeFromCart(productId, cartContainer) {
  cart = cart.filter((product) => product._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(cartContainer, cart);
}

function displayCart(cartContainer, cart) {
  if (cart.length > 0) {
    const htmlString = `
        
          
            <button type="button" class="btn bg-transparent position-relative">
<a href="./checkout.html"tabindex="2"><i style="font-size: 20px;" class="bi bi-cart-fill"></i></a>
  
  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cart.length}
    <span class="visually-hidden">unread messages</span>
  </span>
</button>
          
          `;
          
    cartContainer.innerHTML = htmlString;

    cart.forEach((product, index) => {
      document
        .getElementById(`removeFromCartButton${index}`)
        .addEventListener("click", () =>
          removeFromCart(product._id, cartContainer)
        );
    });
  } else {
    cartContainer.innerHTML = "<h3>Your cart is empty.</h3>";
  }
}

export {
  getData,
  productosFarmacia,
  productosJuguetes,
  addToCart,
  displayCart,
  removeFromCart,
};
