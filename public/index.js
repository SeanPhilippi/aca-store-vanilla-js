let cart = [];

function Products(products, searchWord) {
  let productLi = "";
  let detailsButton = document.createElement('button').value = "More Details";
  let toCartButton = document.createElement('button').value = "Add to Cart";
  let noResults = `<h2>Sorry no results were found for "${searchWord}"</h2>`;
  console.log('products', products);
  if (products.length > 0) {
    for (let i =0; i < products.length; i++) {
      let product = products[i];
      productLi += `
<li>
  ${product.name}
  <div
    style="visibility: hidden;"
    id="${product.id}"
  >
    <div>
      ${product.description}
    </div>
    <div>
      ${product.price}
    </div>
  </div>
</li>
<button onclick="moreDetails(${product.id})">
  ${detailsButton}
</button>
<button
  onclick="addToCart(${product.id});
  calculateCartTotal();"
>
  ${toCartButton}
</button>`;
      document.getElementById("products").innerHTML= productLi;
    }
  } else {
    console.log(2)
    document.getElementById("products").innerHTML= noResults;
  }
}

// on page load
Products(products);
let fetchedCartItems = JSON.parse(sessionStorage.getItem('cart'));
cart = fetchedCartItems;
populateCart();

function populateCart() {
  let cartItems = document.getElementById('cart-items');
  if (fetchedCartItems) {
    fetchedCartItems.forEach(product => {
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(product.name));
      cartItems.appendChild(li);
      let price = document.createElement('span');
      price.className = "amount";
      price.style.paddingLeft = "10px";
      price.appendChild(document.createTextNode(product.price));
      li.appendChild(price);
    });
  }

  // calculateTotal after populating cart
  calculateCartTotal();
}

// function handleKeyPress(e) {
//     if (e.keyCode === 13) {
//         e.preventDefault();
//         search();
//     }
// }

const handleChange = e => {
  e.target.value;
}

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
  console.log('product in cart', product)
  let li = document.createElement('li');
  li.appendChild(document.createTextNode(product.name));
  cartItems.appendChild(li);
  let price = document.createElement('span');
  price.className = "amount";
  price.style.paddingLeft = "10px";
  price.appendChild(document.createTextNode(product.price));
  li.appendChild(price);
  // add to cart array for storage in sessionStorage
  cart.push(product);
  sessionStorage.setItem('cart', JSON.stringify(cart));
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

function search(e) {
  let searchWord = e.target.value.toLowerCase().trim();
  let filteredProducts = products.filter(p => {
    console.log(p.name);
    // return product names that include searchWord, else empty array returned
    return p.name.toLowerCase().includes(searchWord) && p.name;
  })

  Products(filteredProducts, searchWord);
}