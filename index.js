import { traerProductos } from "./database/traerProductos.js";
const div = document.getElementById("div");
const contenedorCarrito = document.getElementById("carrito");
const carritoIcon = document.getElementById("carritoIcon");
const carritoTable = document.getElementById("carritoTable");
const tabla = document.getElementById("tableCarrito");
const vacio = document.getElementById("vacio");
const finalizar = document.getElementById("finalizarCompra");
const finalizarTabla = document.getElementById("tbodyFinal");
const tablaFinal = document.getElementById("tablaFinal");
const botonVolver = document.getElementById("botonVolver");
const contador = document.getElementById("contador");

let productos = await traerProductos();
let carrito = [];

if(div!==null){

    productos.forEach((producto) => {
        const { nombre, precio, img, id } = producto;
        let productoRenderizado = document.createElement("div");
        productoRenderizado.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${img}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">$ ${precio}</p>
        </div>
        <button id=${id} class="botonComprar">Comprar</button>
        </div>
        `;
        div.append(productoRenderizado);
        let boton = document.getElementById(producto.id);
        boton.addEventListener("click", (e) => comprarProducto(producto, e));
    });
    
}
    const revisarStorage = () => {
  carrito.length = 0;
  const storage = JSON.parse(localStorage.getItem("carrito"));
  if (storage !== null) {
    carrito = storage;
  }
  contadorProductos()
};

const comprarProducto = (producto) => {
  let productoExiste = carrito.find((item) => item.id === producto.id);
  if (productoExiste !== undefined) {
    (productoExiste.precio = productoExiste.precio + producto.precio),
      (productoExiste.cantidad = productoExiste.cantidad + 1);
    Toastify({
      text: "Agregado al carrito!",
      className: "info",
      duration: 1500,
      style: {
        background: "linear-gradient(to right, #0087FE, #9EB6CC)",
      },
    }).showToast();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
    Toastify({
      text: "Agregado al carrito!",
      className: "info",
      duration: 1500,
      style: {
        background: "linear-gradient(to right, #0087FE, #9EB6CC)",
      },
    }).showToast();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  dibujarCarrito()
};

const buscarProducto = (string) => {
  console.log(string);
  let productoBuscado = "./productos.json".find((producto) =>
    producto.nombre.includes(string)
  );
  console.log(productoBuscado);
  input.value = "";
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
};

const sumarProducto = (producto) => {
    let productoOriginal = productos.find(item => item.id=== producto.id)
    let productoASumar = carrito.find((item) => item.id === producto.id);
    (productoASumar.precio = productoASumar.precio + productoOriginal.precio),
    (productoASumar.cantidad = productoASumar.cantidad + 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarCarrito()
};

const restarProducto = (producto) => {
    let productoOriginal = productos.find(item => item.id=== producto.id)
    let productoABorrar = carrito.find((item) => item.id === producto.id);
    let indice = carrito.findIndex (item => item.id === producto.id);
    productoABorrar.precio = productoABorrar.precio - productoOriginal.precio
    productoABorrar.cantidad = productoABorrar.cantidad - 1
    if(productoABorrar.cantidad <1){
        carrito.splice(indice,1)
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarCarrito()
  };

const dibujarCarrito = () => {
  carritoTable.innerHTML = "";
  carrito.forEach((product) => {
    const { img, precio, nombre, cantidad, id } = product;
    const div = document.createElement("tr");
    div.innerHTML = 
    `
    <td><img class="fotoProductoCarrito" src="${img}" alt="imagen producto"></td>
    <td><p class="nombreProducto">${nombre}</p></td>
    <td><p class="cantidadProducto">${cantidad}</p></td>
    <td><p class="precioProducto">${precio}</p></td>
    <td><button id="sumar${id}" class="btn btn-success">+</button></td>
    <td><button id="restar${id}" class="btn btn-danger">-</button></td>
    `;
    carritoTable.append(div);
    const sumar = document.getElementById(`sumar${id}`);
    const restar = document.getElementById(`restar${id}`);
    sumar.addEventListener("click", () => sumarProducto(product));
    restar.addEventListener("click",() => restarProducto(product));
  });
  if(carrito.length<1){
    vacio.className = "on"
    tabla.className = "off"
  }else{
    tabla.className = "on"
    vacio.className = "off"
  }
  contadorProductos()
}

const finalizarCompra = () =>{
    Swal.fire({
        title: 'Finalizar compra',
        text: "Desea finalizar compra?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: "No"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            window.location="http://127.0.0.1:5500/compra.html"
          )
        }
      })
}

const mostrarCarrito = () => {
    contenedorCarrito.classList.toggle("carritoOn")
    dibujarCarrito()
}

if (contenedorCarrito!==null) {
    finalizar.addEventListener("click", finalizarCompra);
    carritoIcon.addEventListener("click", mostrarCarrito);
    
}

const dibujarTablaFinal = () => {
    const storage = JSON.parse(localStorage.getItem("carrito"));
    storage.forEach((product) => {
      const { img, precio, nombre, cantidad, id } = product;
      const div = document.createElement("tr");
      div.innerHTML = 
      `
      <td><img class="fotoProductoCarrito" src="${img}" alt="imagen producto"></td>
      <td><p class="nombreProducto">${nombre}</p></td>
      <td><p class="cantidadProducto">${cantidad}</p></td>
      <td><p class="precioProducto">${precio}</p></td>
      `;
      finalizarTabla.append(div);
   
    });


  }

if(tablaFinal!== null){
    dibujarTablaFinal()
}

const volverInicio = () =>{
    window.location = "http://127.0.0.1:5500/index.html"
    localStorage.clear()
}
if (botonVolver!== null) {
    botonVolver.addEventListener("click", volverInicio);
    
}

const contadorProductos = () => {
    let cantidadProductos = carrito.reduce((acumulador, {cantidad}) => acumulador + cantidad, 0)
    contador.innerHTML = cantidadProductos
}

revisarStorage();
