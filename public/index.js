//stuff

function Products(products) {
let productDiv = "";
for(let i =0; i < products.length; i++) {
        let product = products[i];
        productDiv += `<div>${product.name}</div>`
}
document.getElementById("products").innerHTML= productDiv;

}
 Products(products);

 function search() {
     let searchWord = document.getElementById("searchBox").value;
     let filteredProducts = products.filter(p => p.name === searchWord)

    Products(filteredProducts);
 }

