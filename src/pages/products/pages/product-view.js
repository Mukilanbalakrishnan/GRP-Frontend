/* ===============================
   URL PARAMS
================================ */
const params = new URLSearchParams(window.location.search);
const productId = params.get("product_id");

if (!productId) {
  console.error("Missing product_id in URL");
}

/* ===============================
   CONFIG
================================ */
const API_BASE_URL = window.ENV.API_BASE_URL;


const API = `${API_BASE_URL}/api/product_brands/list.php?product_id=${productId}`;
const BASE = `${API_BASE_URL}/`;
const PRODUCT_API =
  `${API_BASE_URL}/api/products/list.php?product_id=${productId}`;


const productsConfig = {};
const colorIndices = {};
let currentCardImgId = null;
let currentSeriesId = null;

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("brand-grid").innerHTML = "";
   loadProductName(); 
  loadBrandsFromBackend();
});


document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-color-picker");
  const modal = document.getElementById("color-picker-modal");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeColorPicker);
  }

  // close when clicking outside modal
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeColorPicker();
  });
});

async function loadProductName() {
  try {
    const res = await fetch(PRODUCT_API);
    const json = await res.json();

    if (!json.status || !json.data.length) return;

    // 🔥 FIND THE CORRECT PRODUCT
    const product = json.data.find(
      p => String(p.id) === String(productId)
    );

    if (!product) {
      console.warn("Product not found for ID:", productId);
      return;
    }

    const productNameEl = document.getElementById("product-name");
    if (productNameEl) {
      productNameEl.textContent = product.product_name;
    }

  } catch (err) {
    console.error("Product name load failed:", err);
  }
}





/* ===============================
   LOAD BRANDS
================================ */
async function loadBrandsFromBackend() {
  try {
    const res = await fetch(API);
    const json = await res.json();

    


    if (!json.status || !json.data.length) return;

    const grid = document.getElementById("brand-grid");

    json.data.forEach(brand => {
  const seriesSlug = `brand-${slug(brand.brand_name)}`;
  const imgId = `img-${seriesSlug}`;

  grid.insertAdjacentHTML("beforeend", `
    <div
      class="bg-white rounded-2xl overflow-hidden shadow
             hover:shadow-xl transition-all border
             group cursor-pointer"
      data-series="${seriesSlug}"
      data-img="${imgId}">

      <div class="h-64 bg-gray-100 overflow-hidden">
        <img id="${imgId}"
             src="${BASE + brand.main_image}"
             class="h-full w-full object-cover
                    group-hover:scale-105 transition-transform duration-500">
      </div>

      <div class="p-6 text-center">
        <h3 class="text-lg font-extrabold uppercase text-[#002b49]">
          ${brand.brand_name} SERIES
        </h3>

        <p class="text-xs text-gray-500 mt-1">
          Click to view colours
        </p>
      </div>
    </div>
  `);

  // ✅ GET THE CARD YOU JUST INSERTED
  const card = grid.lastElementChild;

  // ✅ ATTACH CLICK HANDLER
  card.addEventListener("click", (e) => {
  openColorPicker(
    e,
    card.dataset.series,
    card.dataset.img
  );
});



  // ✅ STORE COLOURS
  productsConfig[seriesSlug] = {
  mainImage: BASE + brand.main_image,
  colours: (brand.colours || []).map(c => ({
    name: c.colour_name,
    imageSrc: BASE + c.colour_image,
    filter: ""
  }))
};

});


    startColorCycle();

  } catch (err) {
    console.error("Brand load failed:", err);
  }
}




/* ===============================
   COLOR PICKER
================================ */
function openColorPicker(event, seriesId, imgId) {
  event.stopPropagation();

  currentCardImgId = imgId;
  currentSeriesId = seriesId;

  const modal = document.getElementById("color-picker-modal");
  const grid = document.getElementById("color-grid");
  grid.innerHTML = "";

  const config = productsConfig[seriesId];

// 🔹 1️⃣ MAIN IMAGE OPTION
const mainBtn = document.createElement("button");
mainBtn.className = "flex flex-col items-center gap-2";
mainBtn.onclick = () => updateCardImage({
  imageSrc: config.mainImage,
  filter: ""
});

mainBtn.innerHTML = `
  <img src="${config.mainImage}"
       class="w-12 h-12 rounded-full object-cover shadow">
  <span class="text-xs font-semibold">Default</span>
`;
grid.appendChild(mainBtn);

// 🔹 2️⃣ COLOUR OPTIONS
config.colours.forEach(color => {
  const btn = document.createElement("button");
  btn.className = "flex flex-col items-center gap-2";
  btn.onclick = () => updateCardImage(color);

  btn.innerHTML = `
    <img src="${color.imageSrc}"
         class="w-12 h-12 rounded-full object-cover shadow">
    <span class="text-xs">${color.name}</span>
  `;

  grid.appendChild(btn);
});


  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function updateCardImage(color) {
  const img = document.getElementById(currentCardImgId);
  if (!img) return;

  img.src = color.imageSrc;
  img.style.filter = color.filter;

  colorIndices[currentSeriesId] = -1; // reset auto-cycle


  closeColorPicker();
}

function closeColorPicker() {
  document.getElementById("color-picker-modal").classList.add("hidden");
}

/* ===============================
   AUTO COLOR CYCLE
================================ */
function startColorCycle() {
  setInterval(() => {
    Object.keys(productsConfig).forEach(seriesId => {
      const config = productsConfig[seriesId];
      const colours = config.colours;

      if (!colours.length) return;

      // 🔥 INIT index if not exists
      if (typeof colorIndices[seriesId] === "undefined") {
        colorIndices[seriesId] = -1; // start from DEFAULT
      }

      // 🔄 MOVE TO NEXT
      colorIndices[seriesId]++;

      let nextImage;

      if (colorIndices[seriesId] === -1) {
        // DEFAULT IMAGE
        nextImage = config.mainImage;
      } else if (colorIndices[seriesId] < colours.length) {
        // COLOUR IMAGE
        nextImage = colours[colorIndices[seriesId]].imageSrc;
      } else {
        // 🔁 LOOP BACK TO DEFAULT
        colorIndices[seriesId] = -1;
        nextImage = config.mainImage;
      }

      const img = document.getElementById(`img-${seriesId}`);
      if (img) {
        img.src = nextImage;
      }
    });
  }, 3000);
}







/* ===============================
   UTILS
================================ */
function slug(str) {
  return str.toLowerCase().replace(/\s+/g, "-");
}
