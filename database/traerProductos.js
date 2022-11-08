export const traerProductos = async() =>{
let response = await fetch("./database/productos.json")
let data = await response.json()
return data;
}

