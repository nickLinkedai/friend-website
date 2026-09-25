// ---- MoonMade cart ----
// Draws the shop grid (from products.js), runs the slide-out cart and remembers the cart between pages.
// Needs products.js to be loaded first.

const Cart = (() => {
  const STORAGE_KEY = 'moonmade-cart';
  const MOON = '<svg><use href="#moon"/></svg>';
  let items = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      return saved.filter(i => findProduct(i.id)); // drop bags that no longer exist
    } catch {
      return [];
    }
  }

  function save() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
    render();
  }

  function findProduct(id) {
    return PRODUCTS.find(p => p.id === id);
  }

  function escape(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatPrice(n) {
    return n > 0 ? '$' + n.toFixed(2) : 'Price TBC';
  }

  function productImage(p, className) {
    return p.image
      ? `<img class="${className}" src="${p.image}" alt="${escape(p.alt || p.name)}">`
      : `<div class="${className} placeholder">${MOON}</div>`;
  }

  // ---- Cart contents ----
  function add(id, colour) {
    const existing = items.find(i => i.id === id && i.colour === colour);
    if (existing) existing.qty += 1;
    else items.push({ id, colour, qty: 1 });
    save();
  }

  function setQty(index, qty) {
    if (qty < 1) items.splice(index, 1);
    else items[index].qty = Math.min(qty, 20);
    save();
  }

  function clear() {
    items = [];
    save();
  }

  function count() {
    return items.reduce((sum, i) => sum + i.qty, 0);
  }

  // Returns null if any bag in the cart doesn't have a price yet
  function subtotal() {
    let total = 0;
    for (const i of items) {
      const p = findProduct(i.id);
      if (!(p.price > 0)) return null;
      total += p.price * i.qty;
    }
    return total;
  }

  function subtotalText() {
    const total = subtotal();
    return total === null ? 'To be confirmed' : formatPrice(total);
  }

  // A list of the cart's lines with product details filled in, used by checkout
  function lines() {
    return items.map(i => ({ ...i, product: findProduct(i.id) }));
  }

  // ---- Shop grid ----
  function renderGrid() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = PRODUCTS.map(p => `
      <article class="product" data-id="${p.id}">
        ${productImage(p, 'product-img')}
        <div class="product-info">
          <h3>${escape(p.name)}</h3>
          <p class="price">${formatPrice(p.price)}</p>
          <div class="swatches" role="radiogroup" aria-label="Colour">
            ${p.colours.map((c, n) => `
              <label class="swatch">
                <input type="radio" name="colour-${p.id}" value="${escape(c)}"${n === 0 ? ' checked' : ''}>
                <span>${escape(c)}</span>
              </label>`).join('')}
          </div>
          <button type="button" class="button add-btn">Add to cart</button>
        </div>
      </article>`).join('');

    grid.addEventListener('click', e => {
      const btn = e.target.closest('.add-btn');
      if (!btn) return;
      const card = btn.closest('.product');
      const colour = card.querySelector('input[type=radio]:checked').value;
      add(card.dataset.id, colour);
      open();
    });
  }

  // ---- Slide-out drawer ----
  function buildDrawer() {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="drawer-overlay" data-cart-close></div>
      <aside class="cart-drawer" id="cart-drawer" aria-label="Your cart" aria-hidden="true">
        <div class="drawer-head">
          <p class="eyebrow">Your cart</p>
          <button type="button" class="drawer-close" data-cart-close aria-label="Close cart">&times;</button>
        </div>
        <div class="drawer-body" id="cart-lines"></div>
        <div class="drawer-foot" id="cart-foot">
          <div class="subtotal"><span class="eyebrow">Subtotal</span><span id="cart-subtotal"></span></div>
          <p class="drawer-note">Shipping and payment are confirmed by email after you order.</p>
          <a href="checkout.html" class="button">Checkout</a>
        </div>
      </aside>`);

    document.addEventListener('click', e => {
      if (e.target.closest('[data-cart-open]')) { e.preventDefault(); open(); }
      if (e.target.closest('[data-cart-close]')) close();
      const qtyBtn = e.target.closest('[data-qty]');
      if (qtyBtn) {
        const index = Number(qtyBtn.dataset.index);
        setQty(index, items[index].qty + Number(qtyBtn.dataset.qty));
      }
      const removeBtn = e.target.closest('[data-remove]');
      if (removeBtn) setQty(Number(removeBtn.dataset.index), 0);
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function lineHTML(line, index) {
    const p = line.product;
    return `
      <div class="cart-line">
        ${productImage(p, 'cart-thumb')}
        <div class="cart-line-info">
          <p class="cart-line-name">${escape(p.name)}</p>
          <p class="variant">${escape(line.colour)}</p>
          <div class="qty">
            <button type="button" data-qty="-1" data-index="${index}" aria-label="Decrease quantity">&minus;</button>
            <span>${line.qty}</span>
            <button type="button" data-qty="1" data-index="${index}" aria-label="Increase quantity">+</button>
          </div>
        </div>
        <div class="cart-line-end">
          <p>${p.price > 0 ? formatPrice(p.price * line.qty) : 'TBC'}</p>
          <button type="button" class="link-btn" data-remove data-index="${index}">Remove</button>
        </div>
      </div>`;
  }

  function render() {
    for (const el of document.querySelectorAll('[data-cart-count]')) el.textContent = count();

    const linesEl = document.getElementById('cart-lines');
    if (!linesEl) return;
    if (items.length === 0) {
      linesEl.innerHTML = `<div class="cart-empty">${MOON}<p>Your cart is empty.</p><a href="index.html#shop" class="link-btn" data-cart-close>Shop the bags</a></div>`;
      document.getElementById('cart-foot').hidden = true;
    } else {
      linesEl.innerHTML = lines().map(lineHTML).join('');
      document.getElementById('cart-subtotal').textContent = subtotalText();
      document.getElementById('cart-foot').hidden = false;
    }
    document.dispatchEvent(new Event('cart:change'));
  }

  function open() {
    document.getElementById('cart-drawer').setAttribute('aria-hidden', 'false');
    document.body.classList.add('cart-open');
    document.querySelector('.drawer-close').focus();
  }

  function close() {
    document.getElementById('cart-drawer').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cart-open');
  }

  // Keep carts in sync if the site is open in two tabs
  window.addEventListener('storage', e => { if (e.key === STORAGE_KEY) { items = load(); render(); } });

  document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    buildDrawer();
    render();
  });

  return { lines, count, clear, subtotalText, formatPrice, productImage, escape };
})();
