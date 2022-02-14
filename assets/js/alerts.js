let btnform = document.getElementById("btnformulario")
btnform.addEventListener("click", alertita)

function alertita(){
    swal({
        title:"Mensaje Enviado!",
        Message:"Muchas gracias",
        icon:"success"
    });
}
alertita()

