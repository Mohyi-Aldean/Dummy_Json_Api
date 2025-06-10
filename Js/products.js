const getProducts = async () => {

  const urlParams = new URLSearchParams(location.search);
  const page =urlParams.get("page")
  const limit = 12;
  const skip = (page-1)*limit;
  const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const products = response.data.products;
 const numberOfPages = Math.ceil(response.data.total / limit);
  const result = products.map((product) =>
   `
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
    `
    )
    .join("");

  document.querySelector(".product-container").innerHTML = result;
  document.querySelector(".loader-lod").classList.add("d-none");
  customModal();

  // Pagination
let paginationLink = ``;

  if (page == 1) {
    let paginationLink = `<li><a href="products.html?page=${page-1}" class='disabled'>&lt;</a></li>`;

  }else{
    paginationLink = `<li><a href="products.html?page=${page-1}">&lt;</a></li>`;
  }

  for (let i = 1; i <= numberOfPages; i++) {
    paginationLink += `<li><a href="products.html?page=${i}">${i}</a></li>`;
  }

  if (page == numberOfPages) {
  paginationLink += `<li><a href="products.html?page=${parseInt(page)+1}" class='disabled'>&gt;</a></li>`;
  
  }else{
     paginationLink += `<li><a href="products.html?page=${parseInt(page)+1}">&gt;</a></li>`;
  }

  document.querySelector(".pagination-list").innerHTML = paginationLink;
};

getProducts();

function customModal() {
  const images = Array.from(document.querySelectorAll(".card-img"));
  const modal = document.querySelector(".my-modal");
 // console.log(images+modal);
  const modalImg = document.querySelector(".modal-img");
  const closeBtn = document.querySelector(".close-btn");
  const rightBtn = document.querySelector(".right-btn");
  const leftBtn = document.querySelector(".left-btn");
  let currentIndex = 0;

  images.forEach((img) => {
    img.onclick = function (e) {
      modal.classList.add('show');
      modalImg.setAttribute("src", e.target.getAttribute("src"));
      console.log(modalImg)
      currentIndex = images.indexOf(e.target);
    };
  });

  //close btn
  closeBtn.onclick = () => {
    modal.classList.add("d-none");
  };

  //right btn
  rightBtn.onclick = () => {
    currentIndex++;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    modalImg.setAttribute("src", images[currentIndex].getAttribute("src"));
  };

  //Left btn
  leftBtn.onclick = () => {
    currentIndex--;

    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }
    modalImg.setAttribute("src", images[currentIndex].getAttribute("src"));
  }
  document.onkeydown = (e) => {
    if (e.key === "Escape") {
      modal.classList.add("d-none");
    } else if (e.key === "ArrowRight") {
      rightBtn.click();
    } else if (e.key === "ArrowLeft") {
      leftBtn.click();
    }
  }
}
