export default class ProductData {
  async getData(category) {
    // ✅ Correct path: /json/tents.json, /json/sleeping-bags.json, etc.
    const response = await fetch(`/json/${category}.json`);
    if (!response.ok) {
      console.error('Failed to fetch products:', response.status, response.statusText);
      return [];
    }
    const data = await response.json();
    return data;
  }
}
