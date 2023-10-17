import {
    getData,
    filtrarPorBusqueda,
    productosJuguetes,
    displayProducts,
    displayCart,
  } from "./module/function.js";
  
  async function main() {
    const data = await getData();

    let prodJuguetes = productosJuguetes(data);
    let cartContainer = document.getElementById("cart");
  console.log(prodJuguetes)
    const searchBar = document.querySelector(".searchBar");
  
    searchBar.addEventListener("keyup", (e) => {
      const arrayYaBuscado = filtrarPorBusqueda(prodJuguetes, searchBar);
  
      displayProducts(arrayYaBuscado, juguetesProdContainer, cartContainer);
    });
  
    const juguetesProdContainer = document.querySelector(
      ".juguetesProdContainer"
    );
    displayProducts(prodJuguetes, juguetesProdContainer, cartContainer);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
  
    displayCart(cartContainer, cart);
  }
  
  main();
  