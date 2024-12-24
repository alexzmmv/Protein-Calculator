let products = [
    { name: 'Faina', quantity: 0, protein: 10, price: 5 },
    { name: 'Oua', quantity: 0, protein: 5, price: 2 }
];

document.querySelectorAll('.quantity-input, .price-input').forEach(input => {
    input.addEventListener('input', (event) => {
        let row = event.target.closest('.row');
        let name = row.id;
        let product = products.find(p => p.name === name);
        if (product) {
            switch (event.target.name){ 
            case 'quantity':
                product.quantity = event.target.value === '' ? 0 : parseFloat(event.target.value);
                break;
            case 'price':
                product.price = isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value);
                break;
            default:
                console.log("error");
            }
        } else {
            console.log("Product not found");
        }
        computeAndShowPercent();
    });
});

function computeAndShowPercent(){
    let totalProtein = products.reduce((sum, product) => sum + (product.quantity?product.quantity:0 * product.protein / 100), 0);
    let totalPrice = products.reduce((sum,product)=> sum+ (product.quantity * product.price),0);
    let totalQuantity=products.reduce((sum,product)=>sum+(product.quantity), 0);
    
    let proteinPercent=(totalProtein/totalQuantity*100);
    let pricePerKg=(totalPrice/totalQuantity);

    //console.log(proteinPercent,pricePerKg);    
    
    document.getElementById("protein-percent").textContent = 'Proteina: '+proteinPercent+ '%';
    document.getElementById("price-per-kg").textContent = 'Pret: '+pricePerKg+' ron/kg'
}
