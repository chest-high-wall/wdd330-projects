
export async function convertToJson(res) {
  let jsonResponse = null;
  try {
    jsonResponse = await res.json();
  } catch (_) {
    
    jsonResponse = null;
  }

  if (res.ok) {
    return jsonResponse;
  } else {
    
    throw { name: 'servicesError', message: jsonResponse || res.statusText || 'Bad Response' };
  }
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
    
    this.path = `/json/${this.category}.json`;
  }

  
  async getData() {
    
    const res = await fetch(this.path, { headers: { 'Accept': 'application/json' } });
    const data = await convertToJson(res);
    
    return Array.isArray(data) ? data : (data?.products || []);
  }

  
  async findProductById(id) {
    const products = await this.getData();
    
    return products.find((product) => String(product.Id) === String(id));
  }

  
  async checkout(orderDetails) {
    const res = await fetch('/json/checkout.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(orderDetails ?? {})
    });
    
    return convertToJson(res);
  }
}
