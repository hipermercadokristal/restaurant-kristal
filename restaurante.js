const supabaseClient = window.kristalSupabase;
const dishGrid = document.querySelector("#dish-grid");
const categoryFilter = document.querySelector("#category-filter");
const catalogStatus = document.querySelector("#catalog-status");
const dishSearch = document.querySelector("#dish-search");
const orderButton = document.querySelector("#order-button");
const orderCount = document.querySelector("#order-count");
const toast = document.querySelector("#restaurant-toast");
const buffetForm = document.querySelector("#buffet-form");
const buffetPrice = document.querySelector("#buffet-price");
const buffetError = document.querySelector("#buffet-error");
const proteinHint = document.querySelector("#protein-hint");
const WHATSAPP_NUMBER = "584128867088";
const currency = new Intl.NumberFormat("es-VE", { style: "currency", currency: "USD" });
const demoCategories = [
  "Entradas", "Sopas", "Arroces", "Tallarines", "Chop suey y vegetales",
  "Pollo", "Carnes y cerdo", "Mariscos", "Especialidades", "Combos", "Bebidas",
];
const demoDishes = [
  { name: "Lumpias de vegetales", category: "Entradas", price: 3.5, icon: "🥟", description: "Rollitos crujientes rellenos de vegetales, con salsa agridulce." },
  { name: "Wantones fritos", category: "Entradas", price: 4, icon: "🥠", description: "Wantones dorados para compartir, acompañados de salsa." },
  { name: "Pan chino al vapor", category: "Entradas", price: 2.5, icon: "🥮", description: "Pan suave al vapor, ideal para comenzar." },
  { name: "Sopa wanton", category: "Sopas", price: 6, icon: "🍲", description: "Caldo ligero con wantones y cebollín." },
  { name: "Sopa de maíz con pollo", category: "Sopas", price: 5.5, icon: "🥣", description: "Crema de maíz con pollo desmenuzado." },
  { name: "Arroz chino especial", category: "Arroces", price: 8, icon: "🍚", description: "Arroz salteado con pollo, jamón, vegetales y huevo." },
  { name: "Arroz chino con camarones", category: "Arroces", price: 10, icon: "🍤", description: "Arroz frito con camarones, huevo y vegetales." },
  { name: "Arroz chino mixto", category: "Arroces", price: 9.5, icon: "🥡", description: "Combinación de pollo, carne, camarones y vegetales." },
  { name: "Arroz chino con pollo", category: "Arroces", price: 7.5, icon: "🍗", description: "Arroz salteado con pollo, cebollín y huevo." },
  { name: "Tallarines con pollo", category: "Tallarines", price: 8, icon: "🍜", description: "Tallarines salteados con pollo y vegetales frescos." },
  { name: "Tallarines mixtos", category: "Tallarines", price: 10, icon: "🍜", description: "Tallarines con pollo, carne y camarones." },
  { name: "Tallarines con camarones", category: "Tallarines", price: 10.5, icon: "🍤", description: "Tallarines al wok con camarones y vegetales." },
  { name: "Chop suey de pollo", category: "Chop suey y vegetales", price: 8, icon: "🥦", description: "Pollo salteado con repollo, zanahoria y vegetales." },
  { name: "Chop suey mixto", category: "Chop suey y vegetales", price: 10, icon: "🥢", description: "Vegetales al wok con pollo, carne y camarones." },
  { name: "Pollo agridulce", category: "Pollo", price: 9, icon: "🍗", description: "Pollo crujiente con salsa agridulce y pimentón." },
  { name: "Pollo con almendras", category: "Pollo", price: 9.5, icon: "🥜", description: "Pollo salteado con almendras y vegetales." },
  { name: "Pollo con vegetales", category: "Pollo", price: 8.5, icon: "🐓", description: "Trozos de pollo al wok con vegetales y salsa de soya." },
  { name: "Pollo con miel y ajonjolí", category: "Pollo", price: 9, icon: "🍯", description: "Pollo glaseado con miel y semillas de ajonjolí." },
  { name: "Carne en salsa de ostras", category: "Carnes y cerdo", price: 10, icon: "🥩", description: "Carne salteada con vegetales en salsa de ostras." },
  { name: "Carne con brócoli", category: "Carnes y cerdo", price: 10, icon: "🥦", description: "Carne tierna al wok con brócoli y salsa especial." },
  { name: "Cerdo agridulce", category: "Carnes y cerdo", price: 9.5, icon: "🥢", description: "Cerdo crujiente con piña, pimentón y salsa agridulce." },
  { name: "Costillitas chinas", category: "Carnes y cerdo", price: 11, icon: "🍖", description: "Costillitas glaseadas al estilo chino." },
  { name: "Camarones salteados", category: "Mariscos", price: 12, icon: "🍤", description: "Camarones al wok con vegetales frescos." },
  { name: "Camarones en salsa de ajo", category: "Mariscos", price: 12.5, icon: "🦐", description: "Camarones salteados en salsa de ajo." },
  { name: "Pato laqueado estilo Kristal", category: "Especialidades", price: 15, icon: "🦆", description: "Pato horneado con glaseado dulce y acompañantes." },
  { name: "Combo individual", category: "Combos", price: 11, icon: "🥡", description: "Arroz chino, una proteína y una lumpia." },
  { name: "Combo para compartir", category: "Combos", price: 25, icon: "🍱", description: "Arroz mixto, pollo agridulce y lumpias para compartir." },
  { name: "Té frío", category: "Bebidas", price: 2, icon: "🧋", description: "Bebida refrescante para acompañar tu comida." },
  { name: "Refresco", category: "Bebidas", price: 1.5, icon: "🥤", description: "Refresco bien frío." },
];
let dishes = [];
let categories = [];
let activeCategory = "Todos";
let searchQuery = "";
const order = new Map();
const buffetOrders = [];
let toastTimeout;

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function setToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("visible"), 2200);
}

function renderCategories() {
  categoryFilter.innerHTML = ["Todos", ...categories.map((category) => category.nombre)]
    .map((name) => `<button type="button" class="${name === activeCategory ? "active" : ""}" data-category="${escapeHtml(name)}" aria-pressed="${name === activeCategory}">${escapeHtml(name)}</button>`)
    .join("");
}

function renderDishes() {
  const query = searchQuery.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
  const filtered = dishes.filter((dish) => {
    const matchesCategory = activeCategory === "Todos" || dish.category === activeCategory;
    const searchText = `${dish.name} ${dish.description} ${dish.category}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("es");
    return matchesCategory && searchText.includes(query);
  });
  dishGrid.innerHTML = filtered.length
    ? filtered.map((dish) => `<article class="dish-card">
        ${dish.demo
          ? `<div class="dish-art" aria-hidden="true">${dish.icon}</div>`
          : `<img src="${escapeHtml(dish.image)}" alt="Foto de ${escapeHtml(dish.name)}" loading="lazy" />`}
        <div class="dish-card-body">
          <span class="dish-category">${escapeHtml(dish.category)}${dish.demo ? " · MUESTRA" : ""}</span>
          <h3>${escapeHtml(dish.name)}</h3>
          <p>${escapeHtml(dish.description || "Consulta los detalles de este plato al hacer tu pedido.")}</p>
          <div class="dish-card-bottom"><strong class="dish-price">${currency.format(dish.price)}</strong><button type="button" data-add-dish="${escapeHtml(dish.id)}">Agregar ${order.has(dish.id) ? `(${order.get(dish.id)})` : ""}</button></div>
        </div>
      </article>`).join("")
    : `<p class="empty-menu">${dishes.length ? "No encontramos platos con esos filtros." : "El menú se está preparando. Vuelve pronto para descubrir nuestros platos."}</p>`;
  const liveCount = dishes.filter((dish) => !dish.demo).length;
  catalogStatus.textContent = `Menú de muestra · ${filtered.length} opciones con precios ficticios para presentación${liveCount ? `, más ${liveCount} ${liveCount === 1 ? "plato publicado" : "platos publicados"}` : ""}.`;
}

function updateOrder() {
  const count = [...order.values()].reduce((total, quantity) => total + quantity, 0) + buffetOrders.length;
  orderCount.textContent = String(count);
  orderButton.disabled = count === 0;
  renderDishes();
}

async function loadMenu() {
  if (!supabaseClient) throw new Error("No se pudo conectar con el menú. Revisa la configuración de Supabase.");
  const [categoryResult, dishResult] = await Promise.all([
    supabaseClient.from("restaurant_categories").select("id,nombre").order("nombre"),
    supabaseClient.from("restaurant_products").select("id,nombre,descripcion,precio,imagen_url,disponible,categorias:restaurant_categories(nombre)").eq("disponible", true).order("nombre"),
  ]);
  if (categoryResult.error) throw categoryResult.error;
  if (dishResult.error) throw dishResult.error;
  const liveDishes = dishResult.data.map((row) => ({
      id: row.id,
      name: row.nombre,
      description: row.descripcion || "",
      price: Number(row.precio),
      image: row.imagen_url,
      category: row.categorias?.nombre || "Menú",
    }));
  dishes = [
    ...demoDishes.map((dish, index) => ({ ...dish, id: `demo-${index}`, demo: true })),
    ...liveDishes,
  ];
  categories = [...new Set([
    ...demoCategories,
    ...categoryResult.data.map((category) => category.nombre),
  ])].map((nombre) => ({ nombre }));
  if (activeCategory !== "Todos" && !categories.some((category) => category.nombre === activeCategory)) {
    activeCategory = "Todos";
  }
  const available = new Set(dishes.map((dish) => dish.id));
  for (const id of order.keys()) if (!available.has(id)) order.delete(id);
  renderCategories();
  updateOrder();
}

categoryFilter.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderDishes();
});

dishSearch.addEventListener("input", () => {
  searchQuery = dishSearch.value.trim();
  renderDishes();
});

dishGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add-dish]");
  if (!button) return;
  const id = button.dataset.addDish;
  order.set(id, (order.get(id) || 0) + 1);
  updateOrder();
  setToast("Plato agregado a tu pedido");
});

function getBuffetPrice() {
  return Number(buffetForm.querySelector('input[name="buffet-size"]:checked').dataset.price);
}

function updateBuffetPrice() {
  buffetPrice.textContent = currency.format(getBuffetPrice());
  const size = buffetForm.querySelector('input[name="buffet-size"]:checked').value;
  const proteinLimit = size === "Pequeño" ? 1 : size === "Mediano" ? 2 : 3;
  proteinHint.textContent = `Elige al menos una proteína y hasta ${proteinLimit}.`;
  buffetForm.querySelectorAll('input[name="buffet-protein"]').forEach((input) => {
    input.disabled = !input.checked && buffetForm.querySelectorAll('input[name="buffet-protein"]:checked').length >= proteinLimit;
  });
}

buffetForm.addEventListener("change", (event) => {
  if (event.target.matches('input[name="buffet-size"], input[name="buffet-protein"]')) {
    updateBuffetPrice();
  }
});

buffetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const base = buffetForm.querySelector('input[name="buffet-base"]:checked');
  const proteins = [...buffetForm.querySelectorAll('input[name="buffet-protein"]:checked')].map((input) => input.value);
  const extras = [...buffetForm.querySelectorAll('input[name="buffet-extra"]:checked')].map((input) => input.value);
  const size = buffetForm.querySelector('input[name="buffet-size"]:checked').value;
  const proteinLimit = size === "Pequeño" ? 1 : size === "Mediano" ? 2 : 3;
  if (!base || proteins.length === 0 || proteins.length > proteinLimit) {
    buffetError.textContent = !base
      ? "Selecciona una base para tu plato."
      : proteins.length === 0 ? "Selecciona al menos una proteína." : `El tamaño ${size.toLowerCase()} permite hasta ${proteinLimit} proteína${proteinLimit > 1 ? "s" : ""}.`;
    return;
  }
  buffetOrders.push({
    size,
    base: base.value,
    proteins,
    extras,
    price: getBuffetPrice(),
  });
  buffetError.textContent = "";
  buffetForm.reset();
  buffetForm.querySelector('input[name="buffet-size"][value="Pequeño"]').checked = true;
  updateBuffetPrice();
  updateOrder();
  setToast("Tu plato de buffet se agregó al pedido");
});

orderButton.addEventListener("click", () => {
  const dishLines = dishes.filter((dish) => order.has(dish.id)).map((dish) =>
    `${dish.demo ? "[MUESTRA] " : ""}${dish.name} x${order.get(dish.id)} — ${currency.format(dish.price * order.get(dish.id))}`,
  );
  const buffetLines = buffetOrders.map((buffet, index) => {
    const selections = [buffet.base, ...buffet.proteins, ...buffet.extras].join(", ");
    return `Plato buffet ${index + 1} (${buffet.size}): ${selections} — ${currency.format(buffet.price)}`;
  });
  const lines = [...dishLines, ...buffetLines];
  if (!lines.length) return;
  const total = dishes.reduce((sum, dish) => sum + dish.price * (order.get(dish.id) || 0), 0)
    + buffetOrders.reduce((sum, buffet) => sum + buffet.price, 0);
  const message = [
    "¡Hola, Restaurante Kristal! Quiero consultar y hacer este pedido:",
    "",
    ...lines,
    "",
    `Total estimado: ${currency.format(total)}`,
    "",
    "Los platos marcados [MUESTRA] y sus precios son ficticios para presentación. Por favor confirmen disponibilidad, precio final y opciones de entrega. ¡Gracias!",
  ].join("\n");
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});

updateBuffetPrice();

if (!supabaseClient) {
  catalogStatus.textContent = "No se pudo conectar con el menú. Revisa la configuración de Supabase.";
} else {
  loadMenu().catch((error) => {
    console.error("No se pudo cargar el menú del restaurante.", error);
    catalogStatus.textContent = "No se pudo cargar el menú. Recarga la página o consulta por WhatsApp.";
  });
  supabaseClient.channel("restaurant-menu-live")
    .on("postgres_changes", { event: "*", schema: "public", table: "restaurant_product_events" }, () => {
      loadMenu().catch((error) => {
        console.error("No se pudo actualizar el menú del restaurante.", error);
        catalogStatus.textContent = "No se pudo actualizar el menú. Intenta recargar la página.";
      });
    })
    .subscribe((status, error) => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.error("Falló la suscripción al menú del restaurante.", error);
      }
    });
}
