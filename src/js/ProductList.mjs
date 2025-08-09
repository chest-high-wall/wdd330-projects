import { renderListWithTemplate } from './utils.mjs';

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    const template = document.querySelector('template.product-card');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate.bind(this));
  }

  prepareTemplate(template, product) {
    template.querySelector('.product-link').href += product.Id;
    template.querySelector('.product-name').textContent = product.Name;
    template.querySelector('.product-image').src = `/images/${this.category}/${product.Image}`;
    template.querySelector('.product-image').alt = `Image of ${product.Name}`;
    template.querySelector('.product-price').textContent = `$${product.Price}`;
    return template;
  }
}
