var sesion=localStorage.getItem('usuario') || "null";

if(sesion=="null"){
    window.location.href="index.html"
}

const cargarNombre=async()=>{

    datos=new FormData();
    datos.append("usuario",sesion);
    datos.append("action","select");

    let respuesta=await fetch("php/loginUsuario.php",{method:'POST',body:datos});
    let json=await respuesta.json();

    if(json.success==true){
        document.getElementById("user").innerHTML=json.mensaje;
        document.getElementById("foto_perfil").src="php/"+json.foto;
    }else{
    Swal.fire({title:"ERROR",text:json.mensaje,icon:"error"});
    }
}

document.getElementById("salir").onclick=()=>{
    Swal.fire({
        title:"¿Está seguro de Cerrar Sesión?",
        showDenyButton:true,
        confirmButtonText:"Si",
        denyButtonText:`No`
    }).then((result)=>{
if(result.isConfirmed){
localStorage.clear();
window.location.href="index.html"
}
});
}

const cargarPerfil = async () => {
    const datos = new FormData();
    datos.append("usuario", sesion);
    datos.append("action", "perfil");

    try {
        const respuesta = await fetch("php/loginUsuario.php", { method: 'POST', body: datos });
        const json = await respuesta.json();

        if (json.success) {
            document.getElementById("email").innerHTML = json.usuario;
            document.getElementById("nombre").value = json.nombre;
            document.getElementById("foto-preview").innerHTML = `<img src="php/${json.foto}" class="foto-perfil">`;
            document.getElementById("foto_perfil").src = `php/${json.foto}`;
        } else {
            Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({ title: "ERROR", text: "Hubo un problema con la conexión", icon: "error" });
    }
};

const guardarPerfil = async (event) => {
    event.preventDefault(); 

    const formPerfil = document.getElementById("formPerfil");
    const datos = new FormData(formPerfil);
    datos.append("usuario", sesion);
    datos.append("action", "saveperfil");

    try {
        const respuesta = await fetch("php/loginUsuario.php", { method: 'POST', body: datos });
        const json = await respuesta.json();

        if (json.success) {
            Swal.fire({ title: "¡ÉXITO!", text: json.mensaje, icon: "success" });
            document.getElementById("foto-preview").innerHTML = `<img src="php/${json.foto}" class="foto-perfil">`;
            document.getElementById("foto_perfil").src = `php/${json.foto}`;
        } else {
            Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({ title: "ERROR", text: "Hubo un problema con la conexión", icon: "error" });
    }
};

function cargarCatalogo() {
    fetch('php/metodosC.php')
        .then(response => response.json())
        .then(data => {
            const catalogo = document.getElementById('catalogo');
            catalogo.innerHTML = '';

            data.forEach(prenda => {
                const prendaHTML = `
                <div class="prenda">
                <img src="${prenda.foto}" alt="${prenda.nombre}" height="60px">
                <h2>${prenda.nombre}</h2>
                <p>${prenda.descripcion}</p>
                <p>Precio: $${prenda.precio}</p>
                <p>Talla: ${prenda.talla}</p>
                
                <div class="input-group mb-3">
                <button class="btn btn-outline-secondary" type="button" onclick="restarCantidad(${prenda.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </button>
                <input type="number" id="cantidad-${prenda.id}" class="form-control text-center" value="1" min="1">
                <button class="btn btn-outline-secondary" type="button" onclick="sumarCantidad(${prenda.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 1a.5.5 0 0 1 .5.5v6.5H15a.5.5 0 0 1 0 1H8.5v6.5a.5.5 0 0 1-1 0V8H1a.5.5 0 0 1 0-1h6.5V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                </button>
            </div>

                <div class="botones">
                    <button class="boton" onclick="agregarCarrito(${prenda.id})"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
        </svg>
                    </button>
                </div>
            </div>
            
                `;
                catalogo.innerHTML += prendaHTML;
            });
        })
        .catch(error => console.error('Error al cargar el catálogo:', error));
}

function sumarCantidad(idProducto) {
    const inputCantidad = document.getElementById(`cantidad-${idProducto}`);
    let cantidad = parseInt(inputCantidad.value, 10);
    cantidad++;
    inputCantidad.value = cantidad;
}


function restarCantidad(idProducto) {
    const inputCantidad = document.getElementById(`cantidad-${idProducto}`);
    let cantidad = parseInt(inputCantidad.value, 10);
    if (cantidad > 1) {
        cantidad--;
        inputCantidad.value = cantidad;
    }
}

let productosEnCarrito = [];

function mostrarCarrito() {
    const tbody = document.getElementById('carrito-table-body');
    tbody.innerHTML = ''; 

    productosEnCarrito.forEach((producto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${producto.fotop}" alt="${producto.nombrep}" height="50px"></td>
            <td>${producto.nombrep}</td>
            <td>${producto.talla}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td><button class="btn btn-danger" onclick="eliminarDelCarrito(${producto.id_carrito})">X</button></td>
        `;
        tbody.appendChild(row);
    });
}

async function agregarCarrito(idProducto) {
    const cantidad = document.getElementById(`cantidad-${idProducto}`).value;
    const usuario = localStorage.getItem('usuario'); 

    const formData = new FormData();
    formData.append('action', 'agregarC');
    formData.append('id_p', idProducto);
    formData.append('usuario', usuario);
    formData.append('cantidad', cantidad);

    try {
        const respuesta = await fetch('php/carrito.php', {
            method: 'POST',
            body: formData
        });

        const textoRespuesta = await respuesta.text();
        console.log('Respuesta del servidor:', textoRespuesta);

        const json = JSON.parse(textoRespuesta);

        if (json.success) {
            Swal.fire({
                title: '¡ÉXITO!',
                icon: 'success'
            }).then(() => {
              obtenerCarrito();
            });
        } else {
            Swal.fire({
                title: 'Error',
                icon: 'error'
            });
        }
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar agregar al carrito',
            icon: 'error'
        });
    }
}


async function obtenerCarrito() {
    const usuario = localStorage.getItem('usuario');

    const formData = new FormData();
    formData.append('action', 'listarC');
    formData.append('usuario', usuario);

    try {
        const respuesta = await fetch('php/carrito.php', {
            method: 'POST',
            body: formData
        });

        const json = await respuesta.json();

        if (json.success) {
            productosEnCarrito = json.carrito;
            mostrarCarrito();

            let totalCarrito = json.total;
            const totalCarritoDisplay = document.getElementById('total-carrito-display');
            if (totalCarritoDisplay) {
                totalCarritoDisplay.textContent = `$${totalCarrito}`;
            } else {
                console.error('Elemento para mostrar el total no encontrado');
            }
        } else {
            Swal.fire({
                title: 'Error',
                text: json.mensaje,
                icon: 'error'
            });
        }
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar obtener el carrito',
            icon: 'error'
        });
    }
}

async function eliminarDelCarrito(idCarrito) {
    const formData = new FormData();
    formData.append('action', 'eliminarC');
    formData.append('id_carrito', idCarrito);

    try {
        const respuesta = await fetch('php/carrito.php', {
            method: 'POST',
            body: formData
        });

        const json = await respuesta.json();

        if (json.success) {
            Swal.fire({
                title: 'Eliminado',
                icon: 'success'
            }).then(() => {
                obtenerCarrito();
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: json.mensaje,
                icon: 'error'
            });
        }
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema',
            icon: 'error'
        });
    }
}


async function confirmarCompra() {
    var boton = document.getElementById("confirmarCompra");
    const usuario = 'nombreUsuario';
    const formData = new FormData();
    formData.append('action', 'confirmarCompra');
    formData.append('usuario', sesion);

    try {
        const respuesta = await fetch('php/carrito.php', {
            method: 'POST',
            body: formData
        });

        const json = await respuesta.json();
        


        if (json.success) {
            Swal.fire({
                title: 'Listo!',
                icon: 'success'
            }).then(() => {
                limpiarCarrito();
            });
        } else {
            Swal.fire({
                title: 'Error',
                icon: 'error'
            });
        }
    } catch (error) {
        console.error('Error al confirmar la compra:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al intentar confirmar la compra',
            icon: 'error'
        });
    }
}

function limpiarCarrito() {
    
    productosEnCarrito = [];
    const carritoDiv = document.getElementById('carrito-table-body');
    carritoDiv.innerHTML = '';
    const carritoDisplay = document.getElementById('total-carrito-display');
    carritoDisplay.innerHTML = '';
}


function cargarDatosCliente() {
    fetch('php/consulta.php')
        .then(response => response.json())
        .then(data => {
            let tabla = document.getElementById('tabla-datos');
            tabla.innerHTML = '';
            data.forEach(item => {
                let fila = `
                    <tr>
                        <td>${item.fecha}</td>
                        <td>${item.articulo}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.precio}</td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}