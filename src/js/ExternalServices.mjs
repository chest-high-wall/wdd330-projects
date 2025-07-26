// src/js/ExternalServices.mjs

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Could not fetch products:", error);
      return [];
    }
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((product) => product.Id === id);
  }
}
