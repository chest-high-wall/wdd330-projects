// src/js/utils.mjs

export function renderListWithTemplate(template, parentElement, list, callback) {
  list.forEach(item => {
    const clone = template.content.cloneNode(true);
    const customizedClone = callback(clone, item);
    parentElement.appendChild(customizedClone);
  });
}

export function getParam(paramName) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(paramName);
}

export function loadHeaderFooter() {
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");

  fetch("/partials/header.html")
    .then(response => response.text())
    .then(data => {
      headerElement.innerHTML = data;
    });

  fetch("/partials/footer.html")
    .then(response => response.text())
    .then(data => {
      footerElement.innerHTML = data;
    });
}
