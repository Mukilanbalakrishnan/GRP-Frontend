


const API_BASE_URL = window.ENV.API_BASE_URL;

const grid = document.getElementById("products-grid");

async function loadProducts() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/products/list.php`);
    const json = await res.json();

    if (!json.status || !Array.isArray(json.data)) {
      grid.innerHTML = `<p class="text-center text-gray-500 col-span-full">No products found</p>`;
      return;
    }

    grid.innerHTML = json.data.map(product => `
      <a href="pages/product-view.html?product_id=${product.id}"
        class="group block relative h-80 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">

        <img
          src="${product.product_thumbnail
            ? `http://localhost/GRP-Backend/${product.product_thumbnail}`
            : 'https://via.placeholder.com/800x600?text=Product'}"
          class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

        <div class="absolute bottom-0 left-0 p-8 w-full">
          <h3 class="text-2xl font-bold text-white mb-2 group-hover:text-blue-100 transition-colors">
            ${product.product_name}
          </h3>

          <p
            class="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 
                   transform translate-y-4 group-hover:translate-y-0 
                   transition-all duration-300">
            ${product.short_description ?? ""}
          </p>

          <span class="inline-flex items-center text-white text-sm font-semibold uppercase tracking-wider">
            Explore Series
            <i class="ph-bold ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
          </span>
        </div>
      </a>
    `).join("");

  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="text-center text-red-500 col-span-full">Failed to load products</p>`;
  }
}

loadProducts();
