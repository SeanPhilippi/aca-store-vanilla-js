function Products(products) {
let productLi = "";
let detailsButton = document.createElement('button').value = "More Details";
let toCartButton = document.createElement('button').value = "Add to Cart";

for (let i =0; i < products.length; i++) {
        let product = products[i];
        productLi += `<li>${product.name}<div style="visibility: hidden;" id="${product.id}"><div>${product.description}</div><div>${product.price}</div></div></li><button onclick = "moreDetails(${product.id})">${detailsButton}</button><button onclick ="addToCart(${product.id});calculateCartTotal();">${toCartButton}</button>`;
}
document.getElementById("products").innerHTML= productLi;
}

Products(products);

function moreDetails(id) {
    let detailsDiv = document.getElementById(id);
    if (detailsDiv !== null) {
        if (detailsDiv.style.visibility === "visible") {
            detailsDiv.style.visibility = "hidden";
        } else if (detailsDiv.style.visibility === "hidden") {
            detailsDiv.style.visibility = "visible";
        }
    } 
}

function addToCart(id) {
    let cartItems = document.getElementById('cart-items');
    let product = products.find(function(product) {
        return product.id == id;
    });
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(product.name));
    cartItems.appendChild(li);
    let price = document.createElement('span');
    price.className = "amount";
    price.style.paddingLeft = "10px";
    price.appendChild(document.createTextNode(product.price));
    li.appendChild(price);
}

function calculateCartTotal() {
   let amounts = document.getElementsByClassName("amount");
   let total = 0;
   for (let i = 0; i < amounts.length; i++) {
       const amount = parseFloat(amounts[i].innerText.replace('$', ''));
       total = total + amount;
       total = Math.round(total * 100) / 100;
   }
   console.log(total);
   let cartTotal = document.getElementById('cart-total');
   cartTotal.innerText = "$" + total;
}

function search() {
    let searchWord = document.getElementById("searchBox").value;
    let filteredProducts = products.filter(p => p.name === searchWord)

    Products(filteredProducts);
}



