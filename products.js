// products.js

let products = [
    {
        id: 1,
        name: "ігристе",
        category: "вино",
        image: "shopping-8.jpeg",
        price: 400
    },
    {
        id: 2,
        name: "напівсолодке",
        category: "вино",
        image: "shopping7.jpeg",
        price: 600
    },
    {
        id: 3,
        name: "нефільтроване",
        category: "пиво",
        image: "shopping-5.jpeg",
        price: 350
    },
    {
        id: 4,
        name: "темне",
        category: "пиво",
        image: "shopping-4.jpeg",
        price: 1000
    },
    {
        id: 5,
        name: "світле",
        category: "пиво",
        image: "shopping-3.jpeg",
        price: 650
    },
    {
        id: 6,
        name: "біле",
        category: "вино",
        image: "shopping.jpeg",
        price: 440
    }
];

let currentCategory = '';
let currentSort = { field: '', direction: '' };

function loadProducts(category) {
    currentCategory = category;
    displayProducts();
    addSortingButtons(); // Додайте цю функцію
}

function addSortingButtons() {
    let sortingButtonsContainer = document.getElementById("sortingButtons");
    let sortingButtonsHtml = `
        <button onclick="sortProducts('name', 'asc')">Сортувати за назвою (А-Я)</button>
        <button onclick="sortProducts('name', 'desc')">Сортувати за назвою (Я-А)</button>
        <button onclick="sortProducts('price', 'asc')">Сортувати за ціною (дешевші)</button>
        <button onclick="sortProducts('price', 'desc')">Сортувати за ціною (дорожчі)</button>`;
    sortingButtonsContainer.innerHTML = sortingButtonsHtml;
}

function sortProducts(field, direction) {
    currentSort = { field, direction };
    displayProducts();
}

function displayProducts() {
    let container = document.getElementById("container-id");
    let productsHtml = '';

    let filteredProducts = products.filter(elem => !currentCategory || elem.category === currentCategory);

    if (currentSort.field && currentSort.direction) {
        filteredProducts.sort((a, b) => {
            if (currentSort.field === 'name') {
                return currentSort.direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (currentSort.field === 'price') {
                return currentSort.direction === 'asc' ? a.price - b.price : b.price - a.price;
            }
        });
    }

    filteredProducts.forEach(elem => {
        let elemHtml = `<div class='card__elem' id='product-${elem.id}'>
                            <h2>${elem.name}</h2>
                            <img src='${elem.image}' alt='${elem.name}' />
                            <h2>Ціна: ${elem.price}</h2>
                            <button onclick='addProductToCart(${elem.id})' class='btn__header'>В корзину</button>
                        </div>`;
        productsHtml += elemHtml;
    });

    container.innerHTML = productsHtml;
}

function addProductToCart(productId) {
    let product = products.find(item => item.id === productId);
    if (product) {
        let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
        let existingItem = cartItems.find(item => item.id === productId);
        if (!existingItem) {
            cartItems.push({ id: productId, quantity: 1 });
        } else {
            existingItem.quantity += 1;
        }
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        alert('Товар додано до кошика');
    } else {
        console.error('Product not found!');
    }
}

function showCart() {
    let cartModal = document.getElementById('cart');
    cartModal.style.display = "block";
    openCart();
}

function openCart() {
    let cartItemsContainer = document.getElementById('cart-items');
    let cartItemsData = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let containerHtml = '';
    let summ = 0;

    cartItemsData.forEach(cartItem => {
        let product = products.find(product => product.id === cartItem.id);
        if (product) {
            containerHtml += `<div class="cart-item" id="cart-item-${product.id}">
                <div class="cart-item-name">
                    <h3>${product.name}</h3>
                    <img src="${product.image}" alt="${product.name}" style="width: 100px; height: auto;">
                </div>
                <div class="cart-item-content">
                    <p>Кількість: <button onclick="decreaseQuantity(${product.id})">-</button> ${cartItem.quantity} <button onclick="increaseQuantity(${product.id})">+</button></p>
                    <p>Ціна за одиницю: ${product.price} грн</p>
                    <p>Всього: ${product.price * cartItem.quantity} грн</p>
                    <button onclick="removeItem(${product.id})">Видалити</button>
                </div>
            </div>`;
        }
        summ += product.price * cartItem.quantity;
    });

    containerHtml += `<div class="cart-item">
                <div class="cart-item-name">
                    <h3>Загальна сума:</h3>
                </div>
                <div class="cart-item-content">
                    <p>${summ}</p>
                </div>
            </div>`;

    cartItemsContainer.innerHTML = containerHtml;
}

function closeCart() {
    let cartModal = document.getElementById('cart');
    cartModal.style.display = "none";
}

function increaseQuantity(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let cartItem = cartItems.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        openCart();
    }
}

function decreaseQuantity(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    let cartItem = cartItems.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
        openCart();
    } else if (cartItem && cartItem.quantity === 1) {
        removeItem(productId);
    }
}

function removeItem(productId) {
    let cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    openCart();
}

loadProducts('');
