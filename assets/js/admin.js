var action=document.getElementById("action");

var btnUsu=document.getElementById("btnUsu");
var btnPro=document.getElementById("btnPro");
var btnMov=document.getElementById("btnMov");
var btnDa=document.getElementById("btnDa");

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

const guardarPrendas = async () => {
    let nombrep = document.getElementById('nombrep').value;
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;
    let talla = document.getElementById('talla').value;
    let cantidadp = document.getElementById('cantidadp').value;
    let fotop = document.getElementById('fotop').files[0]; 
    let idc = document.getElementById('idc').value;

    const usuario = localStorage.getItem('usuario'); 
    

    if (nombrep.trim() == "" || descripcion.trim() == "" || precio.trim() == "" || cantidadp.trim() == "" || talla.trim() == "" || !fotop || idc.trim() == "" ) {
        Swal.fire({title: "ERROR", text: "Falta completar campos o seleccionar una imagen",icon: "error"});
        return;
    }

    let datos = new FormData();
    datos.append("nombrep", nombrep);
    datos.append("descripcion", descripcion);
    datos.append("precio", precio);
    datos.append("cantidadp", cantidadp);
    datos.append("talla", talla);
    datos.append("fotop", fotop); 
    datos.append("idc", idc); 
    datos.append('usuario', usuario);
    datos.append('action', 'guardar');

    try {
        let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
        let json = await respuesta.json();

        if (json.success == true) {
            Swal.fire({
                title: "¡REGISTRO ÉXITOSO!",
                text: json.mensaje,
                icon: "success"
            });
            limpiarP();
            cargarPrendas();
        } else {
            Swal.fire({
                title: "ERROR",
                text: json.mensaje,
                icon: "error"
            });
        }
    } catch (error) {
        console.error('Error al guardar el articulo:', error);
        Swal.fire({
            title: "ERROR",
            text: "Hubo un problema al procesar la solicitud",
            icon: "error"
        });
    }
}

const cargarPrendas = async () => {
    const datos = new FormData();
    datos.append("action", "selectAll");
    let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
    let json = await respuesta.json();

    let tablaHTML = `
        <button class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addPrenda">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>
            Add Articulo
        </button><br>

        <center>
        <table id="tablaPrendas" class="table table-striped w-75 text-center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>DESCRIPCIÓN</th>
                    <th>PRECIO</th>
                    <th>TALLA</th>
                    <th>CANTIDAD</th>
                    <th>IMAGEN</th>
                    <th>ID_C</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
    `;

    json.data.forEach(item => {
        tablaHTML += `
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
                <td>${item[4]}</td>
                <td>${item[5]}</td>
                <td><img src="img_prendas/${item[6]}" height="90px"></td>
                <td>${item[7]}</td>
                <td colspan="2">
                    <button class="btn btn-danger" onclick="eliminarPrenda(${item[0]})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
  <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
</svg>
                    </button>
                    <button class="btn btn-success" onclick="mostrarPrenda(${item[0]})" data-bs-toggle="modal" data-bs-target="#editPrenda">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>
                    </button>
                </td>
            </tr>
        `;
    });

    tablaHTML += `</tbody></table></center>`;

    document.getElementById("action").innerHTML = tablaHTML;
};


const eliminarPrenda = async (idp) => {
    Swal.fire({
        title: "¿Estás seguro de eliminarlo?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No"
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {

                let formData = new FormData();
                formData.append('idp', idp);
                formData.append('action', 'delete');

                let respuesta = await fetch("php/metodosA.php", {
                    method: 'POST',
                    body: formData
                });

                if (respuesta.ok) {
                    let json = await respuesta.json();

                    if (json.success) {
                        Swal.fire({
                            title: "¡Se eliminó con éxito!",
                            text: json.mensaje,
                            icon: "success"
                        });

                        cargarPrendas();
                    } else {
                        Swal.fire({
                            title: "ERROR",
                            text: json.mensaje,
                            icon: "error"
                        });
                    }
                } else {
                    throw new Error(`HTTP error! status: ${respuesta.status}`);
                }
            } catch (error) {
                console.error('Error al eliminar la prenda:', error);
                Swal.fire({
                    title: "Error",
                    text: "Hubo un problema al intentar eliminar la prenda",
                    icon: "error"
                });
            }
        }
    });
}

const mostrarPrenda=async(idp)=>{
    let datos=new FormData();
    datos.append("idp",idp);
    datos.append('action','select');
    
    let respuesta=await fetch("php/metodosA.php",{method:'POST',body:datos});
    let json=await respuesta.json();

    document.querySelector("#idp").value=json.idp;
    document.querySelector("#enombrep").value=json.nombrep;
    document.querySelector("#edescripcion").value=json.descripcion;
    document.querySelector("#eprecio").value=json.precio;
    document.querySelector("#etalla").value=json.talla;
    document.querySelector("#ecantidadp").value=json.cantidadp;
    document.getElementById("eprenda-preview").src="img_prendas/"+json.fotop;
    document.querySelector("#eidc").value=json.idc;
   
}

const actualizarPrendas = async () => {
    var idp = document.querySelector("#idp").value;
    var nombrep = document.querySelector("#enombrep").value;
    var descripcion = document.querySelector("#edescripcion").value;
    var precio = document.querySelector("#eprecio").value;
    var talla = document.querySelector("#etalla").value;
    var cantidadp = document.querySelector("#ecantidadp").value;
    var fotop = document.querySelector("#efotop").files[0]; 
    var idc = document.querySelector("#eidc").value;
    
    if (nombrep.trim() == "" || descripcion.trim() == "" || precio.trim() == "" || talla.trim() == "" || cantidadp.trim() == ""  || idc.trim() == "") {
        Swal.fire({
            title: "ERROR",
            text: "Tienes campos vacíos",
            icon: "error"
        });
        return;
    }
    
    let datos = new FormData();
    datos.append("idp", idp);
    datos.append("nombrep", nombrep);
    datos.append("descripcion", descripcion);
    datos.append("precio", precio);
    datos.append("talla", talla);
    datos.append("cantidadp", cantidadp);
    datos.append("idc", idc);
    datos.append("fotop", fotop); 
    datos.append('action', 'update');
    
    try {
        let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
        let json = await respuesta.json();
        
        if (json.success == true) {
            Swal.fire({ title: "¡ACTUALIZACIÓN ÉXITOSA!", text: json.mensaje, icon: "success" });
        } else {
            Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
        }
        
        cargarPrendas(); 
    } catch (error) {
        console.error('Error al actualizar la prenda:', error);
        Swal.fire({ title: "ERROR", text: "Hubo un problema al procesar la solicitud", icon: "error" });
    }
}

function previewImage() {
    const fotoInput = document.getElementById('fotop');
    const preview = document.getElementById('prenda-preview');
    
    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block'; 
        }

        reader.readAsDataURL(fotoInput.files[0]);
    }
}


function epreviewImage() {
    const fotoInput = document.getElementById('efotop');
    const preview = document.getElementById('eprenda-preview');
    
    if (fotoInput.files && fotoInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block'; 
        }

        reader.readAsDataURL(fotoInput.files[0]);
    }
}

const cargarCategorias = async () => {
    const datos = new FormData();
    datos.append("action", "selectAllCa");
    let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
    let json = await respuesta.json();

    let tablaHTML = `
        <button class="btn btn-success mb-2" data-bs-toggle="modal" data-bs-target="#addCa">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
</svg>
            Add Categoria
        </button><br>

        <center>
        <table id="tablaC" class="table table-striped w-75 text-center">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>CATEGORÍA</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
    `;

    json.data.forEach(item => {
        tablaHTML += `
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>

                <td colspan="2">
                    <button class="btn btn-danger" onclick="eliminarC(${item[0]})">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash2-fill" viewBox="0 0 16 16">
  <path d="M2.037 3.225A.7.7 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.7.7 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
</svg>
                    </button>
                    <button class="btn btn-success" onclick="mostrarC(${item[0]})" data-bs-toggle="modal" data-bs-target="#editCa">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
</svg>
                    </button>
                </td>
            </tr>
        `;
    });

    tablaHTML += `</tbody></table></center>`;

    document.getElementById("action").innerHTML = tablaHTML;
};


const guardarCategoria = async () => {
    let nombrec = document.getElementById('nombrec').value;
    

    if (nombrec.trim() == "") {
        Swal.fire({
            title: "ERROR",
            text: "CAMPO VACÍO",
            icon: "error"
        });
        return;
    }

    let datos = new FormData();
    datos.append("nombrec", nombrec); 
    datos.append('action', 'guardarCa');

        let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
        let json = await respuesta.json();

        if (json.success == true) {
            Swal.fire({
                title: "¡REGISTRO ÉXITOSO!",
                text: json.mensaje,
                icon: "success"
            });
            document.querySelector("#nombrec").value="";
            cargarCategorias();
        } else {
            Swal.fire({
                title: "ERROR",
                text: json.mensaje,
                icon: "error"
            });
        }
}

const eliminarC = async (idCategoria) => {
    Swal.fire({
        title: "¿Estás seguro de eliminarlo?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No"
    }).then(async (result) => {
        if (result.isConfirmed) {
           
            let formData = new FormData();
            formData.append('idc', idCategoria); 
            formData.append('action', 'deleteCa'); 

            try {
                let respuesta = await fetch("php/metodosA.php", {
                    method: 'POST',
                    body: formData
                });

                let json = await respuesta.json();

                if (json.success) {
                    Swal.fire({
                        title: "¡Se eliminó con éxito!",
                        text: json.mensaje,
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "ERROR",
                        text: json.mensaje,
                        icon: "error"
                    });
                }
                cargarCategorias();
            } catch (error) {
                console.error('Error al eliminar categoría:', error);
                Swal.fire({
                    title: "ERROR",
                    text: "Hubo un problema al eliminar la categoría.",
                    icon: "error"
                });
            }
        }
    });
}

const mostrarC=async(idc)=>{
    let datos=new FormData();
    datos.append("idc",idc);
    datos.append('action','selectCa');
    
    let respuesta=await fetch("php/metodosA.php",{method:'POST',body:datos});
    let json=await respuesta.json();

    document.querySelector("#idc").value=json.idc;
    document.querySelector("#enombrec").value=json.nombrec;
   
}

const actualizarCategoria = async () => {
    var idc = document.querySelector("#idc").value;
    var nombrec = document.querySelector("#enombrec").value;
    
    if (nombrec.trim() == "") {
        Swal.fire({
            title: "ERROR",
            text: "El nombre de categoría no puede estar vacío",
            icon: "error"
        });
        return;
    }
    
    let datos = new FormData();
    datos.append("idc", idc);
    datos.append("nombrec", nombrec); 
    datos.append('action', 'updateCa');
    try {
        let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
        let json = await respuesta.json();
        
        if (json.success == true) {
            Swal.fire({ title: "¡ACTUALIZACIÓN ÉXITOSA!", text: json.mensaje, icon: "success" });
        } else {
            Swal.fire({ title: "ERROR", text: json.mensaje, icon: "error" });
        }
        
        cargarCategorias(); 
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        Swal.fire({ title: "ERROR", text: "Hubo un problema al procesar la solicitud", icon: "error" });
    }
}    


const limpiarP=()=>{
    document.querySelector("#idp").value="";
    document.querySelector("#nombrep").value="";
    document.querySelector("#descripcion").value="";
    document.querySelector("#precio").value="";
    document.querySelector("#talla").value="";
    document.querySelector("#cantidadp").value="";
    document.getElementById("prenda-preview").src="";
}

const mostrarUsu=async()=>{
    const datos = new FormData();
    datos.append("action", "selectAllUsu");
    let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
    let json = await respuesta.json();

    let tablaHTML = `
    <center>
        <table id="tablaU" class="table table-striped w-75 text-center">
            <thead>
                <tr>
                    <th>ID_U</th>
                    <th>USUARIO</th>
                    <th>PASSWORD</th>
                    <th>NOMBRE</th>
                    <th>TIPO</th>
                </tr>
            </thead>
            <tbody id="lista">
    `;

    json.data.forEach(item => {
        tablaHTML += `
            <tr>
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
                <td>${item[4]}</td>
            </tr>
        `;
    });

    tablaHTML += `</tbody></table>

    <a href="assets/reportes/generar_pdf.php">
</a>
</center>
    `;

    document.getElementById("action").innerHTML = tablaHTML;
};

const cargarMovimientos = async () => {
    const datos = new FormData();
    datos.append("action", "selectMov");

    try {
        let respuesta = await fetch("php/metodosA.php", { method: 'POST', body: datos });
        let json = await respuesta.json();

        if (json.success) {
            let tablaHTML = `
            <center>
                <table id="tablaM" class="table table-striped w-75 text-center">
                    <thead>
                        <tr>
                            <th>USUARIO</th>
                            <th>MOVIMIENTO</th>
                            <th>NOMBRE ARTICULO</th>
                            <th>CANTIDAD</th>
                            <th>TALLA</th>
                            <th>FECHA</th>
                           
                        </tr>
                    </thead>
                    <tbody>
            `;

            json.data.forEach(item => {
                tablaHTML += `
                    <tr>
                        <td>${item.nombre}</td>
                        <td>${item.tipomov}</td>
                        <td>${item.nombrep}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.talla}</td>
                        <td>${item.fecha}</td>
                       
                    </tr>
                    
                `;
            });

            tablaHTML += `</tbody></table> </center>`;
            document.getElementById("action").innerHTML = tablaHTML;

        } else {
            console.error("Error al cargar movimientos:", json.mensaje);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
};

const graficoMovimientos = () => {
    action.innerHTML = '';

    const formData = new FormData();
    formData.append('action', 'graficasMov');

    fetch('php/metodosA.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos recibidos:', data);

        if (data.success) {
            const movimientos = data.data;
            const fechas = Object.keys(movimientos).sort();
            const ventasPorDia = fechas.map(fecha => movimientos[fecha].ventas || 0);
            const comprasPorDia = fechas.map(fecha => movimientos[fecha].compras || 0);

            let canvasVentas = document.createElement('canvas');
            canvasVentas.id = 'canvasVentas';
            canvasVentas.height = 90;
            action.appendChild(canvasVentas);

            let ctxVentas = canvasVentas.getContext('2d');
            let chartVentas = new Chart(ctxVentas, {
                type: 'bar',
                data: {
                    labels: fechas,
                    datasets: [{
                        label: 'Ventas por Día',
                        data: ventasPorDia,
                        backgroundColor: '#44F59C',
                        borderColor: 'green',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            let canvasCompras = document.createElement('canvas');
            canvasCompras.id = 'canvasCompras';
            canvasCompras.height = 90;
            action.appendChild(canvasCompras);

            let ctxCompras = canvasCompras.getContext('2d');
            let chartCompras = new Chart(ctxCompras, {
                type: 'bar',
                data: {
                    labels: fechas,
                    datasets: [{
                        label: 'Compras por Día',
                        data: comprasPorDia,
                        backgroundColor: '#F54444',
                        borderColor: 'red',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        } else {
            console.error('Error al obtener los datos de movimientos:', data.mensaje);
        }
    })
    .catch(error => {
        console.error('Error en la solicitud AJAX:', error);
    });
};