const checkoutBtn = document.getElementById('checkout');
products = [];
checkoutBtn.addEventListener('click', () => {
  if(products.length > 0){
      //fetch post request
    fetch("/api/order/save-order", {
      method: 'POST',
      body: JSON.stringify({
        products: products,
      }),

      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      window.location.href = "/src/html/invoice.html";
    }).catch(err => {
      console.log(err);
      
    })
  }else{
    alert("Cart is empty.");
  }
    
});


(function () {
  const caret = document.querySelector('.caret');
  const logout = document.querySelector('.logout');
  console.log(document.cookie);

  caret.addEventListener('click', () => {
    logout.classList.toggle('logout-active');
  });
})();

(function () {
  const cartBtn = document.querySelector('.cart-box');
  const cart = document.querySelector('.cart');

  cartBtn.addEventListener('click', () => {
    cart.classList.toggle('show-cart');
  });
})();

(function () {
  const cartBtn = document.querySelectorAll('.add');
  cartBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      //console.log(event.target);
      if (event.target.parentElement.classList.contains('desc')) {
        const item = [];
        let name = event.target.parentElement.children[0].textContent;
        let priceWsign = event.target.parentElement.children[1].textContent;

        let price = priceWsign.substring(1);
        item.name = name;
        item.price = price;
        quantity = 1;
        products.push({name, price, quantity});
        console.log(products);

        let id = Math.floor(Math.random());
        console.log(id);

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `<h1 id="cart-item-title">${item.name}</h1>
<span>$</span>
<span id="cart-item-price" class="cart-item-price">${item.price}</span>

  
        
</div>`;

        //select cart
        const cart = document.querySelector('.cart');
        const buttons = document.querySelector('.cart-buttons-container');

        cart.insertBefore(cartItem, buttons);

        removeItems(cartItem);
      }
    });
  });
})();

function removeItems(items) {
  const removeBtn = document.getElementById('clear-cart');
  removeBtn.addEventListener('click', () => {
    items.classList.add('cart-item-remove');
  });
}

