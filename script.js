let products_o = [
    { name: 'Porumb', quantity: 0, protein: 10, price: 1 },
    { name: 'Grau', quantity: 0, protein: 10, price: 1 },
    { name: 'Orz', quantity: 0, protein: 11, price: 1 },
    { name: 'Tarate', quantity: 0, protein: 11, price: 1.2 },
    { name: 'Floare', quantity: 0, protein: 28, price: 2 },
    { name: 'Soia', quantity: 0, protein: 46, price: 4 },
    { name: 'Amino/altele', quantity: 0, protein: 0, price: 0 },
];


let products = [
];


function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    console.log(`Cookie set: ${name}=${value}`);
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function saveProductsToCookies() {
    setCookie('products', JSON.stringify(products), 7);
}

function loadProductsFromCookies() {
    let cookieData = getCookie('products');
    if (cookieData) {
        products = JSON.parse(cookieData);
        console.log('Products loaded from cookies:', products);
    }
}

function loadProducts(Products_i, reset = false) {
    loadProductsFromCookies();
    if (products.length === 0 || reset) {
        products = Products_i;
        saveProductsToCookies();
    }
    let productsContainerHtml = [];
    products.forEach((product, index) => {
        let productHtml = `
            <div class="row" id="${product.name}">
                <div class="cell namecell">${product.name}</div>
                <div class="cell"><input type="number" name="quantity" value="${product.quantity}" min="0" class="quantity-input" data-index="${index}"></div>
                <div class="cell percent-cell" name="percent">${product.protein}</div>
                <div class="cell"><input type="number" name="price" value="${product.price}" min="0" class="price-input" data-index="${index}"></div>
            </div>
        `;
        productsContainerHtml.push(productHtml);
    });
    document.getElementById('products-container').innerHTML = productsContainerHtml.join('');

    document.querySelectorAll('.quantity-input, .price-input').forEach(input => {
        input.addEventListener('input', handleInputChange);
    });
    computeAndShowPercent();

}

function resetProducts() {
    loadProducts(products_o, true);
    saveProductsToCookies();
    window.scrollTo(0, 0);
}

function handleInputChange(event) {
    const index = event.target.getAttribute('data-index');
    const value = parseFloat(event.target.value);
    const name = event.target.getAttribute('name');

    switch (name) {
        case 'quantity':
            products[index].quantity = value;
            break;
        case 'price':
            products[index].price = value;
            break;
        default:
    }
    saveProductsToCookies();
    computeAndShowPercent();
}

function computeAndShowPercent() {
    let totalProtein = products.reduce((sum, product) => sum + (product.quantity * product.protein / 100), 0);
    let totalPrice = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
    let totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

    let proteinPercent = totalQuantity ? (totalProtein / totalQuantity * 100).toFixed(2) : 0;
    let pricePerKg = totalQuantity ? (totalPrice / totalQuantity).toFixed(2) : 0;

    console.log(proteinPercent, pricePerKg);
    document.getElementById('protein-percent').textContent = "Proteina: " + proteinPercent + "%";
    document.getElementById('price-per-kg').textContent = "Pret: " + pricePerKg + " ron/kg";
}


loadProducts(products_o);