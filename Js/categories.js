async function getCategories() {
  try {

    const { data } = await axios.get("https://dummyjson.com/products/category-list");
   // console.log(data);

    const html = data.map((item,index) => `
      <tr>
        <td>${index + 1 +" -"}</td> 
        <td>${item}</td>     
        <td>
          <a class="btn btn-primary" href="product.html">Details</a>
        </td>
      </tr>
    `).join('');

    document.querySelector(".categories-data").innerHTML = html;
    document.querySelector(".loader-lod").classList.add("d-none");

  } catch (err) {
    document.querySelector(".categories-data").innerHTML = `
      <tr>
        <td colspan="3" class="text-center">Error fetching categories</td>
      </tr>
    `;
       document.querySelector(".loader-lod").classList.add("d-none");
  }
}
 document.addEventListener("DOMContentLoaded", getCategories);