import { getLocalStorage } from './utils.mjs';
import { loadHeaderFooter } from './utils.mjs';
import { renderCartItems, calculateOrderTotal } from './cart.mjs';

loadHeaderFooter();

const cartItems = getLocalStorage('so-cart');

const productList = document.querySelector('.products');

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
