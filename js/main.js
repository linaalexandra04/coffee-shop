let carrito = [];
let totalCompra = 0;

// Catálogo de productos
const catalogo = [
    { nombre: "Café Fino", precio: 5 },
    { nombre: "Café Medio", precio: 6 },
    { nombre: "Café Grueso", precio: 7 }
];

class Cliente {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

//mostrar el catálogo de productos
function mostrarCatalogo() {
    console.log("Bienvenido a La Casa del Café. Este es nuestro catálogo:");
    catalogo.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
}

//agregar un producto al carrito
function agregarAlCarrito(productoIndex, cantidad) {
    const producto = catalogo[productoIndex];
    carrito.push({ nombre: producto.nombre, precio: producto.precio, cantidad });
    console.log(`${cantidad}x ${producto.nombre} agregado al carrito.`);
    totalCompra += producto.precio * cantidad;
}

//mostrar el contenido del carrito y el total de la compra
function mostrarCarrito() {
    console.log("Carrito de compra:");
    carrito.forEach(item => {
        console.log(`- ${item.cantidad}x ${item.nombre} - $${item.precio * item.cantidad}`);
    });
    console.log(`Total: $${totalCompra}`);
}

//solicitar información del cliente
function solicitarInformacionCliente() {
    const nombre = prompt("Ingrese su nombre:");
    const email = prompt("Ingrese su dirección de correo electrónico:");
    return new Cliente(nombre, email);
}

//simular la compra
function simularCompra() {
    console.log("¡Bienvenido a La Casa del Café!");
    mostrarCatalogo();

    // Solicitar información del cliente
    const cliente = solicitarInformacionCliente();
    console.log(`Gracias, ${cliente.nombre}, por elegirnos.`);

    let continuarCompra = true;
    while (continuarCompra) {
        let opcion = prompt("Ingrese el número del producto que desea comprar (o 'fin' para finalizar la compra):");

        if (opcion.toLowerCase() === 'fin') {
            console.log("Finalizando compra...");
            mostrarCarrito();
            let confirmacion = prompt("¿Desea confirmar su compra? (si/no):");
            if (confirmacion.toLowerCase() === 'si') {
                let metodoPago = seleccionarMetodoDePago();
                console.log(`Total a pagar: $${totalCompra}`);
                console.log(`Gracias por su compra, ${cliente.nombre}. Método de pago: ${metodoPago}. ¡Vuelva pronto!`);
            } else {
                console.log("Compra cancelada. ¡Esperamos verlo nuevamente pronto!");
            }
            continuarCompra = false;
        } else {
            opcion = parseInt(opcion);
            if (!isNaN(opcion) && opcion >= 1 && opcion <= catalogo.length) {
                let cantidad = parseInt(prompt("Ingrese la cantidad de productos que desea comprar:"));
                if (!isNaN(cantidad) && cantidad > 0) {
                    agregarAlCarrito(opcion - 1, cantidad);
                } else {
                    console.log("Cantidad no válida. Por favor, ingrese un número entero mayor que cero.");
                }
            } else {
                console.log("Opción no válida. Por favor, seleccione un número válido del catálogo o 'fin' para finalizar la compra.");
            }
        }
    }
}

// método de pago
function seleccionarMetodoDePago() {
    console.log("El único método de pago disponible es tarjeta.");
    return "tarjeta";
}

// Iniciar simulación de compra de café
simularCompra();
