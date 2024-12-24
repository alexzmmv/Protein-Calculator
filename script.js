let products = [
    { name: 'Porumb', quantity: 0, protein: 10, price: 1 },
    { name: 'Grau', quantity: 0, protein: 10, price: 1 },
    { name: 'Orz', quantity: 0, protein: 11, price: 1 },
    { name: 'Tarate', quantity: 0, protein: 11, price: 1.2 },
    { name: 'Floare', quantity: 0, protein: 28, price: 2 },
    { name: 'Soia', quantity: 0, protein: 46, price: 4 },
    { name: 'Amino/altele', quantity: 0, protein: 0, price: 0 },
];

function loadProducts(){
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
    computeAndShowPercent();
}

function computeAndShowPercent(){
    let totalProtein = products.reduce((sum, product) => sum + (product.quantity * product.protein / 100), 0);
    let totalPrice = products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
    let totalQuantity = products.reduce((sum, product) => sum + product.quantity, 0);
    
    let proteinPercent = (totalProtein / totalQuantity * 100).toFixed(2) || 0;
    let pricePerKg = (totalPrice / totalQuantity).toFixed(2) || 0;

    console.log(proteinPercent, pricePerKg);    
    document.getElementById('protein-percent').textContent="Proteina: "+ proteinPercent+"%";
    document.getElementById('price-per-kg').textContent="Pret: "+pricePerKg+" ron/kg";
}

loadProducts();