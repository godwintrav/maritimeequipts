increment();
decrement();


function increment() {
  const plus = document.querySelectorAll('.plus');
  let items_qty = document.querySelectorAll('.item-quantity');
  let items_price = document.querySelectorAll('.item-price');
  updateTotalPrice(items_price);

  plus.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.parentElement.classList.contains('qty')) {
        let stringPrice = btn.getAttribute("data-price");
        let productPrice = parseFloat(Number(stringPrice.replace(/[^0-9.-]+/g,"")));
        console.log(parseFloat(productPrice));
        let productId = parseInt(btn.getAttribute("data-id"));
        let amount = e.target.parentElement.children[1];
        amount.textContent = parseInt(amount.textContent) + 1;
        items_price[productId].textContent = (productPrice * parseInt(amount.textContent)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
        updateTotalPrice(items_price);
        updateServerCart(productId, parseInt(amount.textContent));
      }
    });
  });
}

function decrement() {
  const minus = document.querySelectorAll('.minus');

  let items_qty = document.querySelectorAll('.item-quantity');
  let items_price = document.querySelectorAll('.item-price');

  minus.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (e.target.parentElement.classList.contains('qty')) {
        let stringPrice = btn.getAttribute("data-price");
        let productPrice = parseFloat(Number(stringPrice.replace(/[^0-9.-]+/g,"")));
        let productId = parseInt(btn.getAttribute("data-id"));
        let amount = e.target.parentElement.children[1];
        if (amount.textContent > 0) {
          amount.textContent = parseInt(amount.textContent) - 1;
          items_price[productId].textContent = (productPrice * parseInt(amount.textContent)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
        } else {
          qty.textContent = 0;
          items_price[productId].textContent = 0;
        }
        updateTotalPrice(items_price);
        updateServerCart(productId, parseInt(amount.textContent));
      }
    });
  });
}

function updateTotalPrice(items_price){
  let totalPrice = 0;
  items_price.forEach((price) => {
    totalPrice = totalPrice + parseFloat(Number(price.textContent.replace(/[^0-9.-]+/g,"")));
  });
  let totalElement = document.getElementsByClassName("total");
  let grandTotalElement = document.getElementById("g-total");
  totalElement[0].textContent = totalPrice;
  totalElement[1].textContent = totalPrice;
  let grandTotal = totalPrice + 450;
  grandTotalElement.textContent = grandTotal;
}

function updateServerCart(id, quantity){
  fetch("/api/order/update-cart", {
    method: 'POST',
    body: JSON.stringify({
      id: id,
      quantity: quantity
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
  }).catch(err => {
    console.log(err);
    
  })
}

