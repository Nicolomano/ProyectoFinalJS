let input = document.getElementById("input");
let botonInput = document.getElementById("botonInput");
let div = document.getElementById("div");
const contenedorCarrito = document.getElementById("contenedorCarrito");

class Producto {
  constructor(id, nombre, precio, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }
}

let carrito = [];

let productos = [];
productos.push(
  new Producto(
    productos.length + 1,
    "filtro cobre 5gr",
    345,
    "https://www.sparepartsmarkt.com/image/cache/data/products/drayer-KG0037964-2-800x800.jpg"
  )
);
productos.push(
  new Producto(
    productos.length + 1,
    "filtro cobr.10gr",
    500,
    "https://www.sparepartsmarkt.com/image/cache/data/products/drayer-KG0037964-2-800x800.jpg"
  )
);
productos.push(
  new Producto(
    productos.length + 1,
    "filtro cobr.15gr",
    650,
    "https://www.sparepartsmarkt.com/image/cache/data/products/drayer-KG0037964-2-800x800.jpg"
  )
);
productos.push(
  new Producto(
    productos.length + 1,
    "valvula de acceso SPLIT 1/4F",
    2000,
    "https://http2.mlstatic.com/D_NQ_NP_872749-MLA43485047260_092020-O.jpg"
  )
);
productos.push(
  new Producto(
    productos.length + 1,
    "valvula de acceso SPLIT 3/8",
    2800,
    "https://http2.mlstatic.com/D_NQ_NP_872749-MLA43485047260_092020-O.jpg"
  )
);

productos.forEach((producto) => {
  let productoRenderizado = document.createElement("div");
  productoRenderizado.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${producto.imagen}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$ ${producto.precio}</p>
            </div>
        <button id=${producto.id}>Comprar</button>
  </div>
  `;
  div.append(productoRenderizado);
  let boton = document.getElementById(producto.id)
  boton.addEventListener("click", () => comprarProducto(producto))
});



const comprarProducto = (producto) =>{
    let productoExiste = carrito.find(item => item.id===producto.id)
     if(productoExiste === undefined){
         carrito.push({
             id: producto.id,
             nombre: producto.nombre,
             precio: producto.precio,
             imagen: producto.precio,
             cantidad: 1
         })
         actualizarCarrito();
         Swal.fire({
          title: 'Agregado al carrito',
          icon: 'success',
          text:`${producto.nombre} fue agregado al carrito`,
          showConfirmButton: false,
          timer: 1000,
         })
     }else{
         productoExiste.precio = productoExiste.precio + producto.precio,
         productoExiste.cantidad = productoExiste.cantidad + 1;
         actualizarCarrito();
         Swal.fire({
          title: 'Agregado al carrito',
          icon: 'success',
          text:`${producto.nombre} fue agregado al carrito`,
          showConfirmButton: false,
          timer: 1000,
         })
     } 
 }

 const buscarProducto = (string) =>{
    console.log(string)
    let productoBuscado = productos.find(producto => producto.nombre.includes(string))
    console.log(productoBuscado);
    input.value = ""
   }


   const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";

   carrito.forEach((product) => {
    const div = document.createElement("div")
    div.innerHTML = `
    <p>${product.nombre}</p>
    <p>Precio:${product.precio}</p>
    <p>Cantidad: <span>${product.cantidad}</span> </p>
    `
    contenedorCarrito.appendChild(div);

   })
  }

botonInput.addEventListener("click", ()=> buscarProducto(input.value));
