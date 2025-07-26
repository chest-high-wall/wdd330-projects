export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${category}.json`;
  }

  async getData() {
    try {
      const response = await fetch(this.path);
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch data:", err);
      return [];
    }
  }
}
