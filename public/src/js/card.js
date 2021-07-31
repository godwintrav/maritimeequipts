const purchase = document.getElementById('submitBtn');
const exit = document.getElementById('exit');
const modal = document.querySelector('.overlay');

purchase.addEventListener('click', () => {
  modal.classList.add('show');
});
exit.addEventListener('click', () => {
  modal.classList.remove('show');
  window.location.replace("/src/html/invoice.html");
});
