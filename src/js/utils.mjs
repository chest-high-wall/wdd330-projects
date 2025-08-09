

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


export function alertMessage(message, scroll = true) {
  const text =
    typeof message === 'string'
      ? message
      : (message?.message || JSON.stringify(message));

  const container = document.querySelector('main') || document.body;

  
  container.querySelectorAll('.app-alert').forEach(a => a.remove());

  const div = document.createElement('div');
  div.className = 'app-alert';
  div.setAttribute('role', 'status');
  div.innerHTML = `<strong>Heads up:</strong> ${text}`;
  container.prepend(div);

  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => div.remove(), 6000);
}
