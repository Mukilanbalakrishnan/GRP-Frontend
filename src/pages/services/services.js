const API = "http://localhost/GRP-Backend/api/main_services/front-service.php";
// const BACKEND_BASE = "http://localhost/GRP-Backend/";

const API_BASE_URL = window.ENV.API_BASE_URL;

if (!API_BASE_URL) {
  console.error("❌ API_BASE_URL not found");
}

document.addEventListener("DOMContentLoaded", loadServices);
async function loadServices() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/main_services/front-service.php`);
    const result = await res.json();

    if (!result.status) {
      console.error(result.message);
      return;
    }

    const grid = document.getElementById("servicesGrid");

    grid.innerHTML = result.data.map(service => `
      <div class="service-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
        <div class="relative h-40 md:h-48 overflow-hidden">
          <img 
            src="${service.thumbnail 
              ? API_BASE_URL + (service.thumbnail.startsWith('/') ? '' : '/') + service.thumbnail
              : 'https://via.placeholder.com/400x300'}"
            alt="${service.title}"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
        </div>

        <div class="pt-8 pb-6 px-6 text-center">
          <h3 class="text-xl font-bold text-gray-900 mb-3">
            ${service.title}
          </h3>
          <p class="text-gray-600 text-sm mb-6 leading-relaxed">
            ${service.short_desc}
          </p>
          <a href="pages/service-detail.html?id=${service.id}"
             class="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            View Service →
          </a>
        </div>
      </div>
    `).join("");

  } catch (err) {
    console.error("Service load failed", err);
  }
}
