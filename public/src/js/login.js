const email = document.getElementById('email');
const password = document.getElementById('pwd');
const submitBtn = document.querySelector('.submit');
var successMsg = document.getElementById('success-message');
var errorMsg = document.getElementById('error-message');

submitBtn.addEventListener('click', () => {
  let userEmail = email.value;
  let userPwd = password.value;

  // console.log(userEmail);
  // console.log(userPwd);

  errorTxt = '';
  submitBtn.disabled = true;
  successMsg.innerHTML = 'Loading....';
  errorMsg.innerHTML = '';

  //fetch post request
  fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: userEmail,
      password: userPwd,
    }),

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
        for (const key in data.errors) {
          if (data.errors[key] !== '') {
            errorTxt += data.errors[key] + '<br>';
          }
        }
        successMsg.innerHTML = '';
        errorMsg.innerHTML = errorTxt;
      } else {
        successMsg.innerHTML = 'Authentication Successful';
        errorMsg.innerHTML = '';
        window.location.href = '/src/html/home.html';
      }
      submitBtn.disabled = false;
    })
    .catch((err) => {
      console.log(err);
      errorTxt += 'Error authenticating user <br>';
      successMsg.innerHTML = '';
      errorMsg.innerHTML = errorTxt;
      submitBtn.disabled = false;
    });
});
