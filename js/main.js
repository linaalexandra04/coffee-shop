    //Active Navbar
    let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};
    
    
    // Gestión del menú de navegación y efectos de desplazamiento
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('nav');
    const navbg = document.querySelector('.nav-bg');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        navbg.classList.toggle('active');
    });

    // Funcionalidad del carrito de compras
    const productsContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const viewCartButton = document.getElementById('cart-icon');
    const closeCartButton = document.getElementById('close-cart');
    const cartCounter = document.getElementById('cart-counter');
    const checkoutButton = document.getElementById('checkout');
    const buyButton = document.getElementById('buy-button');
    const popup = document.getElementById('popup');
    const closePopupButton = document.getElementById('close-popup');
    const purchaseForm = document.getElementById('purchase-form');
    const confirmationPopup = document.getElementById('confirmation-popup');
    const closeConfirmationPopupButton = document.getElementById('close-confirmation-popup');
    const paymentTypeSelect = document.getElementById('payment-type');
    const cardDetailsContainer = document.getElementById('card-details');

    let cart = [];

    const products = [
        { id: 1, name: 'Café Tostado Molido', price: 10, image: '1.png' },
        { id: 2, name: 'Café Fino Molido', price: 28, image: '2.png' },
        { id: 3, name: 'Café Medio Molido', price: 20, image: '3.png' },
        { id: 4, name: 'Café Grueso Molido', price: 22, image: '4.png' },
        { id: 5, name: 'Café Organico', price: 15, image: '5.png' },
    ];

    // Mostrar productos en la página
    function renderProducts() {
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            
            //imagen del producto
            const imageUrl = `img/${product.image}`;
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <img src="${imageUrl}" alt="${product.name}">
                <p>Precio: $${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    // Añadir producto al carrito
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            updateCart();
        }
    }

    // Eliminar todos los productos del carrito
    function removeAllFromCart() {
        cart = [];
        updateCart();
    }

    // Eliminar producto del carrito
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Mostrar los elementos del carrito
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(product => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>${product.name} - $${product.price}</span>
                <button class="remove-from-cart" data-id="${product.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    // Actualizar contador de elementos en el carrito
    function updateCartCounter() {
        cartCounter.innerText = cart.length;
    }

    // Guardar el carrito en el almacenamiento local
    function saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Cargar el carrito desde el almacenamiento local
    function loadCartFromLocalStorage() {
        const cartFromStorage = localStorage.getItem('cart');
        if (cartFromStorage) {
            cart = JSON.parse(cartFromStorage);
            updateCart();
        }
    }

    // Actualizar el carrito y el precio total
    function updateCart() {
        renderCartItems();
        updateCartCounter();
        saveCartToLocalStorage();
        updateTotalPrice();
    }

    // Calcular el valor total de los productos en el carrito
    function calculateTotalPrice() {
        return cart.reduce((total, product) => total + product.price, 0);
    }

    // Actualizar el valor total
    function updateTotalPrice() {
        const totalPriceElement = document.getElementById('total-price');
        const totalPrice = calculateTotalPrice();
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`; 
    }

    // Event listeners para mostrar y ocultar el carrito
    viewCartButton.addEventListener('click', () => {
        cartContainer.classList.remove('hidden');
    });

    closeCartButton.addEventListener('click', () => {
        cartContainer.classList.add('hidden');
    });

    // Event listener para añadir producto al hacer clic en "Añadir al carrito"
    productsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Event listener para eliminar producto del carrito
    cartItemsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            removeFromCart(productId);
        }
    });

    // Event listener para eliminar todos los productos del carrito al hacer clic en "Pagar"
    checkoutButton.addEventListener('click', () => {
        removeAllFromCart();
    });

    //pop-up de compra
    buyButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    paymentTypeSelect.addEventListener('change', () => {
        if (paymentTypeSelect.value === 'paypal') {
            cardDetailsContainer.classList.add('hidden');
        } else {
            cardDetailsContainer.classList.remove('hidden');
        }
    });

    purchaseForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const paymentType = document.getElementById('payment-type').value;
        let paymentDetails = {};

        if (paymentType !== 'paypal') {
            const bank = document.getElementById('bank').value;
            const cardNumber = document.getElementById('card-number').value;
            const securityCode = document.getElementById('security-code').value;
            paymentDetails = { bank, cardNumber, securityCode };
        }

        console.log("Nombre:", name);
        console.log("Dirección:", address);
        console.log("Tipo de Tarjeta:", paymentType);
        console.log("Detalles de Pago:", paymentDetails);

        popup.classList.add('hidden');
        confirmationPopup.classList.remove('hidden');
    });

    closeConfirmationPopupButton.addEventListener('click', () => {
        confirmationPopup.classList.add('hidden');
    });

    // Inicializar la casa del café "ecommerce"
    renderProducts();
    loadCartFromLocalStorage();

    // Carrusel de productos
    const carousel = document.querySelector('.carousel-cafe');
    const productsCarousel = document.querySelectorAll('.product-cafe');
    const productWidth = productsCarousel[0].offsetWidth + 20; // 
    let currentPosition = 0;

    carousel.addEventListener('mouseover', () => {
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousedown', e => {
        let startX = e.pageX - carousel.offsetLeft;
        let scrollLeft = carousel.scrollLeft;

        carousel.style.cursor = 'grabbing';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(e) {
            const moveX = e.pageX - carousel.offsetLeft;
            const diffX = moveX - startX;
            carousel.scrollLeft = scrollLeft - diffX;
        }

        function onMouseUp() {
            carousel.style.cursor = 'grab';
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    });
;

//slide img
const slide = document.querySelector('.carousel'); 
const images = Array.from(slide.querySelectorAll('img')); 
const indicatorsContainer = document.querySelector('.carousel-indicators');
let currentIndex = 0; 

images[currentIndex].classList.add('active'); 
const prevButton = slide.querySelector('.prev');
const nextButton = slide.querySelector('.next');

prevButton.addEventListener('click', () => updateSlide(currentIndex - 1));
nextButton.addEventListener('click', () => updateSlide(currentIndex + 1)); 
            

setInterval(() => updateSlide(currentIndex + 1), 3000); 

const indicators = images.map((image, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('carousel-indicator');
    indicator.addEventListener('click', () => updateSlide(index));
    indicatorsContainer.appendChild(indicator); 
    return indicator;
});

const updateSlide = (newIndex) => { 
    images[currentIndex].classList.remove('active'); 
    currentIndex = (newIndex + images.length) % images.length; 
    images[currentIndex].classList.add('active'); 
    updateIndicators(); 
};

const updateIndicators = () => {
    indicators.forEach((indicator, index) => { 
        if (index === currentIndex) { 
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active'); 
        } 
    });
};

updateIndicators();
