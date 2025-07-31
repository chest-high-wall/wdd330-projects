// src/js/utils.mjs

// Render a list of items using a template
export function renderListWithTemplate(template, parentElement, list, callback) {
  list.forEach(item => {
    const clone = template.content.cloneNode(true);
    const readyTemplate = callback(clone, item);
    parentElement.appendChild(readyTemplate);
  });
}

// Get data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Set data in localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Load an HTML file from a given path and return its contents
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// Render a single template into a DOM element
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Load header and footer partials and inject them into the page
export async function loadHeaderFooter() {
  const header = await loadTemplate('/public/partials/header.html');
  const footer = await loadTemplate('/public/partials/footer.html');

  const headerEl = document.getElementById('main-header');
  const footerEl = document.getElementById('main-footer');

  renderWithTemplate(header, headerEl);
  renderWithTemplate(footer, footerEl);
}
