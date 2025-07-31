// src/js/ProductList.mjs

import ExternalServices from "./ExternalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, cardSelector, listElementId) {
    this.category = category;
    this.cardTemplate = document.querySelector(cardSelector);
    this.listElement = document.getElementById(listElementId);
    this.dataSource = new ExternalServices(category);
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  prepareTemplate(template, product) {
    template.querySelector(".product-link").href = `/product_pages/index.html?product=${product.Id}`;
    template.querySelector(".product-image").src = product.Image;
    template.querySelector(".product-name").textContent = product.Name;
    template.querySelector(".product-price").textContent = `$${product.Price}`;
    return template;
  }

  renderList(list) {
    renderListWithTemplate(
      this.cardTemplate,
      this.listElement,
      list,
      this.prepareTemplate.bind(this)
    );
  }
}
