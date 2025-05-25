async function getProducts() {
  try {
    const { data } = await axios.get("https://dummyjson.com/products");

    renderProducts(data.products);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

async function getProductsByCategory(category) {
  try {
    const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
    
    renderProducts(data.products);
  } catch (err) {
    console.error("Error loading category products:", err);
    document.querySelector(".product-container").innerHTML = `<p>Error loading products.</p>`;
  }
}

function renderProducts(products) {
  const html = products.map((product) => `
    <div class="product-card">
      <div class="card">
        <img src="${product.thumbnail}" class="card-img" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">
            <strong>Category:</strong> ${product.category}<br>
            <strong>Price:</strong> $${product.price}
          </p>
          <div class="card-actions">
            <button class="buy-btn">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelector(".product-container").innerHTML = html;
  document.querySelector(".loader-lod").classList.add("d-none");
}
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category");

  if (category) {
    getProductsByCategory(category);
  } else {
    getProducts();
  }
});