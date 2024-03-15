let totalCompra = 0;

// Catálogo de productos
const catalogo = [
    { nombre: "Café Fino", precio: 5 },
    { nombre: "Café Medio", precio: 6 },
    { nombre: "Café Grueso", precio: 7 }
];

// mostrar el catálogo de productos
function mostrarCatalogo() {
    console.log("Bienvenido a La Casa del Café. Este es nuestro catálogo:");
    catalogo.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
}

// agregar producto al total de la compra
function agregarAlTotalCompra(productoIndex, cantidad) {
    const producto = catalogo[productoIndex];
    totalCompra += producto.precio * cantidad;
    console.log(`${cantidad}x ${producto.nombre} agregado a la compra.`);
}

// mostrar el total de la compra
function mostrarTotalCompra() {
    console.log(`Total a pagar: $${totalCompra}`);
}

function simularCompra() {
    console.log("¡Bienvenido a La Casa del Café!");
    mostrarCatalogo();

    let continuarCompra = true;
    while (continuarCompra) {
        let opcion = parseInt(prompt("Ingrese el número del producto que desea comprar (o 0 para finalizar la compra):"));

        if (opcion === 0) {
            console.log("Finalizando compra...");
            mostrarTotalCompra();
            let confirmacion = prompt("¿Desea confirmar su compra? (si/no):");
            if (confirmacion.toLowerCase() === 'si') {
                let metodoPago = seleccionarMetodoDePago();
                console.log(`Gracias por su compra. Método de pago: ${metodoPago}. ¡Vuelva pronto!`);
            } else if (confirmacion.toLowerCase() === 'no') {
                console.log("Compra cancelada. ¡Esperamos verlo nuevamente pronto!");
            } else {
                console.log("Entrada no válida. Por favor, responda 'si' o 'no'.");
                continue;
            }
            continuarCompra = false;
        } else if (opcion >= 1 && opcion <= catalogo.length) {
            let cantidad = parseInt(prompt("Ingrese la cantidad de productos que desea comprar:"));
            if (!isNaN(cantidad) && cantidad > 0) {
                agregarAlTotalCompra(opcion - 1, cantidad);
            } else {
                console.log("Cantidad no válida. Por favor, ingrese un número entero mayor que cero.");
            }
        } else {
            console.log("Opción no válida. Por favor, seleccione un número válido del catálogo.");
        }
    }
}

// método de pago
function seleccionarMetodoDePago() {
    console.log("El único método de pago disponible es tarjeta.");
    return "tarjeta";
}


simularCompra();
