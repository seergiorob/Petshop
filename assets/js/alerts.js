// let btnform = document.getElementById("btnformulario")
// btnform.addEventListener("click", alertita)

// function alertita(){
//     swal({
//         title:"Mensaje Enviado!",
//         Message:"Muchas gracias",
//         icon:"success"
//     });
// }


let btncomprar = document.getElementById("btncomprar");
btncomprar.addEventListener("click", comprar)

function comprar(){
    
    swal({
        title:"Felicidades, tu pedido llegará en 2 días hábiles!",
        Message:"Muchas gracias",
        icon:"success"
    });

}