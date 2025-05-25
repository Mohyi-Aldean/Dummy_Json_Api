 async function getProductDetails() {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

      if (!id) {
        document.querySelector("main").innerHTML = "<p>Product ID is missing</p>";
        return;
      }

      try {
        const { data: product } = await axios.get(`https://dummyjson.com/products/${id}`);

        document.querySelector(".product-title").textContent = product.title;
        document.querySelector(".product-image").src = product.thumbnail;
        document.querySelector(".product-image").alt = product.title;
        document.querySelector(".product-brand").textContent = product.brand;
        document.querySelector(".product-category").textContent = product.category;
        document.querySelector(".product-description").textContent = product.description;
        document.querySelector(".product-price").textContent = product.price;
        document.querySelector(".product-rating").textContent = product.rating;

        document.querySelector(".loader-lod").classList.add("d-none");
      } catch (err) {
        document.querySelector("main").innerHTML = "<p>Failed to load product details.</p>";
      }
    }

    document.addEventListener("DOMContentLoaded", getProductDetails);