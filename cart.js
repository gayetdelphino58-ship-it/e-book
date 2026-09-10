// ===== GESTION DU PANIER =====

function getCart() {
  return JSON.parse(localStorage.getItem('ebookCart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('ebookCart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const countEl = document.getElementById('cartCount');
  if (countEl) countEl.textContent = cart.length;
}

function addToCart(name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.name === name);
  if (!existing) {
    cart.push({ name, price });
    saveCart(cart);
    showToast('✅ "' + name + '" ajouté au panier !');
  } else {
    showToast('⚠️ Ce livre est déjà dans votre panier.');
  }
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ===== RENDU PANIER (cart.html) =====
function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cartItemsContainer');
  const totalEl = document.getElementById('cartTotal');
  const subtotalEl = document.getElementById('cartSubtotal');
  const itemCountEl = document.getElementById('itemCount');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">🛒 Votre panier est vide.<br><a href="index.html" style="color:#4f46e5;font-weight:600;">← Retourner au catalogue</a></div>';
    if (totalEl) totalEl.textContent = '0,00 €';
    if (subtotalEl) subtotalEl.textContent = '0,00 €';
    if (itemCountEl) itemCountEl.textContent = '0 article(s)';
    return;
  }

  const icons = ['📖','💰','❤️','🧠','📈','🧘'];
  container.innerHTML = cart.map((item, i) => `
    <div class="cart-item">
      <div class="cart-item-icon">${icons[i % icons.length]}</div>
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <span>Format PDF & EPUB · Téléchargement immédiat</span>
      </div>
      <span class="cart-item-price">${item.price.toFixed(2).replace('.', ',')} €</span>
      <button class="btn-remove" onclick="removeFromCart(${i})" title="Supprimer">🗑️</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  if (subtotalEl) subtotalEl.textContent = total.toFixed(2).replace('.', ',') + ' €';
  if (totalEl) totalEl.textContent = total.toFixed(2).replace('.', ',') + ' €';
  if (itemCountEl) itemCountEl.textContent = cart.length + ' article(s)';
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  renderCart();
});
