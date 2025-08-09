// src/js/checkout.js
import { getLocalStorage, loadHeaderFooter, alertMessage } from './utils.mjs';
import { renderCartItems, calculateOrderTotal } from './cart.mjs';
import ExternalServices from './ExternalServices.mjs';

loadHeaderFooter();


const cartItems = getLocalStorage('so-cart');
const productList = document.querySelector('.products');

if (productList) {
  if (cartItems && cartItems.length > 0) {
    const ul = document.createElement('ul');
    ul.classList.add('cart-items');
    renderCartItems(ul, cartItems);
    productList.appendChild(ul);

    const total = document.createElement('p');
    total.classList.add('cart-total');
    total.innerHTML = `Total: $${calculateOrderTotal(cartItems).toFixed(2)}`;
    productList.appendChild(total);
  } else {
    productList.innerHTML += '<p>Your cart is empty.</p>';
  }
}


const form = document.querySelector('#checkoutForm');
const submitBtn = document.querySelector('#checkoutSubmit');


function formToObject(f) {
  const data = new FormData(f);
  return Object.fromEntries(data.entries());
}

if (form && submitBtn) {
  submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    
    const orderDetails = formToObject(form);
    orderDetails.items = cartItems ?? [];

    
    try {
      const services = new ExternalServices('tents'); 
      await services.checkout(orderDetails);

      
      localStorage.removeItem('so-cart');
      window.location.assign('/checkout/success.html');
    } catch (err) {
      if (err?.name === 'servicesError') {
        
        alertMessage(err.message);
      } else {
        alertMessage('Unexpected error. Please try again.');
      }
    }
  });
}
