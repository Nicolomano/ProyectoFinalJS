const input = document.getElementById("input");
const botonInput = document.getElementById("botonInput");
const div = document.getElementById("div");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const formulario = document.getElementById("formulario");
const usuariolog = document.getElementById("usuario");
const formularioLog = document.getElementById("formularioLog");
const botonCarrito = document.getElementById("carrito");

let carrito = [];

let usuarios = [{ usuario: "Nicolas", contraseña: 123456 }];

fetch("./productos.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto) => {
      const { nombre, precio, img, id } = producto;
      let productoRenderizado = document.createElement("div");
      productoRenderizado.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${img}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${nombre}</h5>
                <p class="card-text">$ ${precio}</p>
            </div>
        <button id=${id}>Comprar</button>
  </div>
  `;
      div.append(productoRenderizado);
      let boton = document.getElementById(producto.id);
      boton.addEventListener("click", (e) => comprarProducto(producto, e));
    });
  });

const comprarProducto = (producto) => {
  let productoExiste = carrito.find((item) => item.id === producto.id);
  if (productoExiste !== undefined) {
    (productoExiste.precio = productoExiste.precio + producto.precio),
      (productoExiste.cantidad = productoExiste.cantidad + 1);
    actualizarCarrito();
    Toastify({
        text: "Agregado al carrito!",
        className: "info",
        duration:1500,
        style: {
          background: "linear-gradient(to right, #0087FE, #9EB6CC)",
        }
      }).showToast();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
    actualizarCarrito();
    Toastify({
        text: "Agregado al carrito!",
        className: "info",
        duration:1500,
        style: {
          background: "linear-gradient(to right, #0087FE, #9EB6CC)",
        }
      }).showToast();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
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
} 

const eliminarProducto = (producto) => {
    let productoABorrar = carrito.find((item) => item.id === producto.id);
    productoABorrar.precio = productoABorrar.precio - producto.precio,
    productoABorrar.cantidad = productoABorrar.cantidad - 1;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
  
  
const mostrarCarrito = () => {
      contenedorCarrito.classList.toggle("carritoOn")
      contenedorCarrito.innerHTML=""
      carrito.forEach((product) => {
          const { img, precio, nombre, cantidad, id } = product;
          const div = document.createElement("div");
          div.innerHTML = `
          <div class="card" style="width: 10rem;">
          <img class="card-img-top" src="${img}" alt="Card image cap">
          <div class="card-body">
          <h5 class="card-title">${nombre}</h5>
          <h5 class="card-title">${cantidad}</h5>
          <p class="card-text">$ ${precio}</p>
          </div>
          <button id=${id}>Eliminar</button>
          </div>
          `;
          contenedorCarrito.appendChild(div);
          let boton = document.getElementById(product.id);
          boton.addEventListener("click", () => eliminarProducto(product));
        });
    };
    botonCarrito.addEventListener("click", mostrarCarrito);
    
    
    const guardarEmail = (e) => {
        e.preventDefault();
        let usuario = e.target.children[0].value;
        let pass = Number(e.target.children[1].value);
        let userExiste = usuarios.find((user) => user.usuario === usuario);
        if (userExiste.contraseña !== pass) {
            console.log("contraseña incorrecta");
        } else if (userExiste.contraseña === pass) {
            console.log("contraseña correcta. usuario correcto. Bienvenido");
            localStorage.setItem("usuario", JSON.stringify(usuarios));
            console.log(usuarioRegistrado);
        }
    };
    
    let usuarioRegistrado = JSON.parse(localStorage.getItem("usuario"));
    
    const bienvenido = (usuario) => {
        formularioLog.classList.toggle("formLogOn");
        usuariolog.classList.toggle("usuarioOn");
        let usuarioRegistrado = document.createElement("div");
        usuarioRegistrado.innerHTML = `
    <H1>Bienvenido ${usuario[0].usuario}</H1>`;
    usuariolog.append(usuarioRegistrado);
};

usuarioRegistrado != null ? bienvenido(usuarioRegistrado) : false;

formulario.addEventListener("submit", (e) => guardarEmail(e));
botonInput.addEventListener("click", () => buscarProducto(input.value));
