import {
    getData,
    productosFarmacia,
    filtrarPorBusqueda,
    displayProducts,
    displayCart,
  } from "./module/function.js";
  
  async function main() {
    const data = await getData();
    let prodFarmacia = productosFarmacia(data);
    let cartContainer = document.getElementById("cart");
    const searchBar = document.querySelector(".searchBar");
  
    searchBar.addEventListener("keyup", (e) => {
      const arrayYaBuscado = filtrarPorBusqueda(prodFarmacia, searchBar);
  
      displayProducts(arrayYaBuscado, prodFarmaciaContainer, cartContainer);
    });
  
    const prodFarmaciaContainer = document.querySelector(
      ".prodFarmaciaContainer"
    );
  
    displayProducts(prodFarmacia, prodFarmaciaContainer, cartContainer);
  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
  
    displayCart(cartContainer, cart);
  }
  
  main();
  


