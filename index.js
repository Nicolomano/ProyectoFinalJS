class Producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

let productosDeOferta = [];
productosDeOferta.push(new Producto(productosDeOferta.length + 1, "Filtro cobre 5gr", 345));
productosDeOferta.push(new Producto(productosDeOferta.length + 1, "Filtro cobr.10gr", 500));
productosDeOferta.push(new Producto(productosDeOferta.length + 1, "Filtro cobr.15gr", 650));
productosDeOferta.push(new Producto(productosDeOferta.length + 1, "Valvula de acceso SPLIT 1/4F", 2000));
productosDeOferta.push(new Producto(productosDeOferta.length + 1,"Valvula de acceso SPLIT 3/8", 2800));

let saludo = prompt("Bienvenido, desea ver nuestras ofertas (ingrese SI o NO)");


if(saludo== "SI"){
    productosDeOferta.forEach(item => {
        let mensaje = `producto: ${item.nombre}
precio: ${item.precio}`;
        alert(mensaje)
    });
}else{
    alert("bienvenido a nuestra pagina")
}