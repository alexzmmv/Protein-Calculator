document.addEventListener('DOMContentLoaded', () => {
    const products_o = [
        { name: 'Porumb', quantity: 0, protein: 10, price: 1 },
        { name: 'Grau', quantity: 0, protein: 10, price: 1 },
        { name: 'Orz', quantity: 0, protein: 11, price: 1 },
        { name: 'Tarate', quantity: 0, protein: 11, price: 1.2 },
        { name: 'Floare', quantity: 0, protein: 28, price: 2 },
        { name: 'Soia', quantity: 0, protein: 36, price: 4 },
        { name: 'Fara proteina', quantity: 0, protein: 0, price: 0 },
    ];

    let products = JSON.parse(JSON.stringify(products_o));

    const productsContainer = document.getElementById('products-container');
    const proteinPercentElem = document.getElementById('protein-percent');
    const pricePerKgElem = document.getElementById('price-per-kg');

    // Utility: Cookie management
    const setCookie = (name, value, days) => {
        const expires = days ? `; expires=${new Date(Date.now() + days * 864e5).toUTCString()}` : '';
        document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
    };

    const getCookie = (name) => {
        const matches = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
        return matches ? decodeURIComponent(matches[1]) : null;
    };

    const saveProductsToCookies = () => {
        setCookie('products', JSON.stringify(products), 7);
    };
    const loadProductsFromCookies = () => {
        const cookieData = getCookie('products');
        if (cookieData) products = JSON.parse(cookieData);
    };

    // DOM Update: Load products
    const renderProducts = () => {
        productsContainer.innerHTML = products.map((product, index) => `
            <div class="row" id="${product.name}">
                <div class="cell namecell">${product.name}</div>
                <div class="cell">
                    <input type="number" 
                           name="quantity" 
                           placeholder="${product.quantity}" 
                           min="0"
                           class="quantity-input" 
                           data-index="${index}">
                </div>
                <div class="cell percent-cell" name="percent">
                    <button class="minus-button" data-index="${index}">-</button>
                    ${product.protein}
                    <button class="plus-button" data-index="${index}">+</button>
                </div>
                <div class="cell">
                    <input type="number" 
                           name="price" 
                           value="${product.price}" 
                           min="0" 
                           class="price-input" 
                           data-index="${index}">
                </div>
            </div>
        `).join('');

        attachEventListeners();
    };

    // Event Listeners
    const attachEventListeners = () => {
        productsContainer.querySelectorAll('.quantity-input').forEach(input => 
            input.addEventListener('input', handleInputChange)
        );
        productsContainer.querySelectorAll('.price-input').forEach(input => 
            input.addEventListener('input', handleInputChange)
        );
        productsContainer.querySelectorAll('.minus-button').forEach(button => 
            button.addEventListener('click', handleMinusButtonClick)
        );
        productsContainer.querySelectorAll('.plus-button').forEach(button => 
            button.addEventListener('click', handlePlusButtonClick)
        );
    };


    const handleMinusButtonClick = (event) => {
        const index = event.target.dataset.index;
        products[index].protein = Math.max(0, products[index].protein - 1);
        updateProducts();
    };

    const handlePlusButtonClick = (event) => {
        const index = event.target.dataset.index;
        products[index].protein = Math.min(99, products[index].protein + 1);
        updateProducts();
    };

    const handleInputChange = (event) => {
        const index = event.target.dataset.index;
        const value = parseFloat(event.target.value) || 0;
        const name = event.target.name;
    
        products[index][name] = value;
    
        // Update calculations and percentages directly without full re-render
        computeAndShowPercent();
        saveProductsToCookies();
    };
    


    // Logic: Compute percentages and update UI
    const computeAndShowPercent = () => {
        const totalProtein = products.reduce((sum, product) => sum + (product.quantity * product.protein / 100), 0);
        const totalPrice = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
        const totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);

        const proteinPercent = totalQuantity ? (totalProtein / totalQuantity * 100).toFixed(2) : 0;
        const pricePerKg = totalQuantity ? (totalPrice / totalQuantity).toFixed(2) : 0;

        proteinPercentElem.textContent = `Proteina: ${proteinPercent}%`;
        pricePerKgElem.textContent = `Pret: ${pricePerKg} ron/kg`;
    };

    // Reset products to initial state
    const resetProducts = () => {
        products = JSON.parse(JSON.stringify(products_o));
        updateProducts();
    };
    //Attach add button event
    document.getElementById('add-button').addEventListener('click', () => {
        const name = document.getElementById('product-name').value;
        const quantity = parseFloat(document.getElementById('product-quantity').value) || 0;
        const protein = parseFloat(document.getElementById('product-protein').value) || 0;
        const price = parseFloat(document.getElementById('product-price').value) || 0;

        if (name && quantity && protein && price) {
            products.push({ name, quantity, protein, price });
            updateProducts();
        }
        document.getElementById('product-name').value = '';
        document.getElementById('product-quantity').value = '';
        document.getElementById('product-protein').value = '';
        document.getElementById('product-price').value = '';
    });

    // Update products and re-render
    const updateProducts = () => {
        saveProductsToCookies();
        renderProducts();
        computeAndShowPercent();
    };



    // Initialize
    loadProductsFromCookies();
    renderProducts();
    computeAndShowPercent();

    // Attach reset button event
    document.getElementById('reset-button').addEventListener('click', resetProducts);
    
});
