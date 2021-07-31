var emailBtn = document.getElementById('emailBtn');
var successMsg = document.getElementById('success-message');
var errorMsg = document.getElementById('error-message');

emailBtn.addEventListener('click', () => {
  errorTxt = '';
  emailBtn.disabled = true;
  successMsg.innerHTML = 'Loading....';
  errorMsg.innerHTML = '';

  //fetch post request
  fetch('/api/order/send-order', {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.errors) {
        errorTxt = data.errors.error;
        successMsg.innerHTML = '';
        errorMsg.innerHTML = errorTxt;
        alert('Error placing order please try again');
      } else {
        successMsg.innerHTML = 'Order Succesful';
        errorMsg.innerHTML = '';
        alert('Your order has been placed');
        window.location.href = '/src/html/home.html';
      }
      emailBtn.disabled = false;
    })
    .catch((err) => {
      console.log(err);
      errorTxt += 'Error Placing order <br>';
      successMsg.innerHTML = '';
      errorMsg.innerHTML = errorTxt;
      emailBtn.disabled = false;
      alert('Error placing order please try again');
    });
});
