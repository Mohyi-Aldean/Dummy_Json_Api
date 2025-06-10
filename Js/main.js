async function getCategories() {
  try {
    const { data } = await axios.get("https://dummyjson.com/products/categories");
const html = data.map((item, index) => `
  <tr>
    <td>${index + 1}</td>
  <td><a href="products.html?category=${item.slug}">${item.name}</a></td>
  </tr>
`).join('');


    document.querySelector(".category-rows").innerHTML = html;
  } catch (err) {
    document.querySelector(".category-rows").innerHTML = `
      <tr>
        <td colspan="2" class="text-center">Error fetching categories</td>
      </tr>
    `;
  }
}

async function getProducts() {
  try {
    const { data } = await axios.get("https://dummyjson.com/products?limit=5");

    displayProducts(data.products);
    document.querySelector(".loader-lod").classList.add("d-none");
  } catch (err) {
    document.querySelector(".product-rows").innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Error fetching products</td>
      </tr>
    `;
  }
}

async function loadCategoryProducts(category) {
  try {
    const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);

    displayProducts(data.products);
  } catch (err) {
    document.querySelector(".product-rows").innerHTML = `
      <tr>
        <td colspan="5" class="text-center">Error loading category</td>
      </tr>
    `;
  }
}

function displayProducts(products) {
  const html = products.map((product, index) => `
    <tr class="product-row">
      <td>${index + 1}</td>
      <td>
        <a href="product.html?id=${product.id}">
          <img src="${product.thumbnail}" alt="${product.title}" style="width: 80px; height: 50px; object-fit: cover;">
        </a>
      </td>
      <td><a href="product.html?id=${product.id}">${product.title}</a></td>
      <td>${product.category}</td>
      <td>$${product.price}</td>
    </tr>
  `).join('');

  document.querySelector(".product-rows").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  getCategories();
  getProducts();
});
