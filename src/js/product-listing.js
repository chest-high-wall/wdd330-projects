import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

document.addEventListener('DOMContentLoaded', () => {
  loadHeaderFooter();

  const category = getParam('category');
  console.log("Category param:", category); // Debugging output

  const dataSource = new ProductData();
  const listElement = document.querySelector('#product-list');
  const templateElement = document.querySelector('.product-card');

  if (!listElement || !templateElement) {
    console.error("Missing #product-list or .product-card in the DOM");
    return;
  }

  const myList = new ProductList(category, dataSource, listElement, templateElement);
  myList.init();
});
