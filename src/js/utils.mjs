// src/js/utils.mjs

export function renderListWithTemplate(template, parentElement, list, callback) {
  list.forEach(item => {
    const clone = template.content.cloneNode(true);
    const readyTemplate = callback(clone, item);
    parentElement.appendChild(readyTemplate);
  });
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
