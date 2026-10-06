/* ============================================================
   SakuKasir Prototype — app.js
   Fix: renderSidebar() dipanggil saat enterApp()
   ============================================================ */

// ============================================================
// 1. STATE
// ============================================================
const state = {
  user: null,
  outlet: { id: 1, name: 'Toko Berkah' },
  outlets: [
    { id: 1, name: 'Toko Berkah', address: 'Jl. Merdeka 12', active: true, phone: '0812-1111-2222' },
    { id: 2, name: 'Cabang Pasar', address: 'Pasar Baru Blok C', active: true, phone: '0812-3333-4444' },
  ],
  theme: localStorage.getItem('sk-theme') || 'light',
  online: true,
  syncQueue: [],
  cart: [],
  activeShift: null,
  shiftHistory: [
    { id: 'SH-041', start: '08:15', end: '16:30', opening: 200000, closing: 1085000, expected: 1085000, variance: 0, cash: 850000, qris: 420000, tx: 24 }
  ],
  activeView: 'pos',
  ownerTab: 'dashboard',
  transactions: [
    { id: 'TRX-20261006-0042', time: '14:32', date: '2026-10-06', items: [{ name: 'Kopi Susu', qty: 2, price: 18000 }], total: 38000, method: 'cash', sync: 'synced', cashier: 'Andi', outlet: 'Toko Berkah', discount: 0, tax: 0, received: 50000, change: 12000 },
    { id: 'TRX-20261006-0041', time: '14:05', date: '2026-10-06', items: [{ name: 'Teh Manis', qty: 1, price: 8000 }], total: 18000, method: 'qris', sync: 'synced', cashier: 'Andi', outlet: 'Toko Berkah', discount: 0, tax: 0 },
    { id: 'TRX-20261006-0040', time: '13:48', date: '2026-10-06', items: [{ name: 'Nasi Goreng', qty: 3, price: 25000 }], total: 97000, method: 'cash', sync: 'pending', cashier: 'Andi', outlet: 'Toko Berkah', discount: 2000, tax: 0, received: 100000, change: 3000 },
    { id: 'TRX-20261006-0039', time: '13:12', date: '2026-10-06', items: [{ name: 'Roti Bakar', qty: 2, price: 15000 }], total: 33000, method: 'cash', sync: 'synced', cashier: 'Andi', outlet: 'Toko Berkah', discount: 0, tax: 0, received: 50000, change: 17000 },
    { id: 'TRX-20261006-0038', time: '12:55', date: '2026-10-06', items: [{ name: 'Es Krim', qty: 4, price: 10000 }], total: 62000, method: 'qris', sync: 'error', cashier: 'Andi', outlet: 'Toko Berkah', discount: 0, tax: 0 },
  ],
  expenses: [
    { id: 'EXP-001', amount: 150000, category: 'Bahan', note: 'Beli kopi 2kg', date: '2026-10-06 08:00', by: 'Budi' },
    { id: 'EXP-002', amount: 50000, category: 'Operasional', note: 'Token listrik', date: '2026-10-06 09:30', by: 'Budi' },
    { id: 'EXP-003', amount: 120000, category: 'Gaji', note: 'Kasbon Andi', date: '2026-10-05 17:00', by: 'Budi' },
  ],
  categories: [
    { id: 1, name: 'Makanan', active: true },
    { id: 2, name: 'Minuman', active: true },
    { id: 3, name: 'Snack', active: true },
    { id: 4, name: 'Lainnya', active: true },
  ],
  products: [
    { id: 1, name: 'Kopi Susu Gula Aren', price: 18000, unit: 'cup', cat: 'Minuman', stock: 24, low: 5, track: true, active: true },
    { id: 2, name: 'Teh Manis', price: 8000, unit: 'gelas', cat: 'Minuman', stock: 3, low: 5, track: true, active: true },
    { id: 3, name: 'Roti Bakar Coklat', price: 15000, unit: 'porsi', cat: 'Makanan', stock: 12, low: 3, track: true, active: true },
    { id: 4, name: 'Nasi Goreng Spesial', price: 25000, unit: 'porsi', cat: 'Makanan', stock: 8, low: 3, track: true, active: true },
    { id: 5, name: 'Air Mineral 600ml', price: 5000, unit: 'botol', cat: 'Minuman', stock: 0, low: 5, track: true, active: true },
    { id: 6, name: 'Keripik Singkong', price: 12000, unit: 'pack', cat: 'Snack', stock: 40, low: 10, track: true, active: true },
    { id: 7, name: 'Es Krim Vanilla', price: 10000, unit: 'cup', cat: 'Snack', stock: 15, low: 5, track: true, active: true },
    { id: 8, name: 'Mie Instan Goreng', price: 12000, unit: 'porsi', cat: 'Makanan', stock: 2, low: 5, track: true, active: true },
  ],
  workers: [
    { id: 1, username: 'kasir', displayName: 'Andi Wijaya', outlet: 'Toko Berkah', whatsapp: '0812-5555-6666', active: true },
    { id: 2, username: 'kasir2', displayName: 'Siti Aminah', outlet: 'Cabang Pasar', whatsapp: '0812-7777-8888', active: true },
    { id: 3, username: 'kasir3', displayName: 'Rudi Hartono', outlet: 'Toko Berkah', whatsapp: '', active: false },
  ],
  notifications: [
    { id: 1, type: 'stock_low', title: 'Stok menipis', body: 'Teh Manis · sisa 3', time: '14:00', read: false },
    { id: 2, type: 'stock_low', title: 'Stok menipis', body: 'Mie Instan · sisa 2', time: '13:45', read: false },
    { id: 3, type: 'system', title: 'Sinkronisasi berhasil', body: '3 transaksi tersinkron', time: '12:30', read: true },
  ],
  settings: {
    qris: { image: null, active: true, outlet: 'Toko Berkah' },
    printer: { connected: false, device: 'SK-Printer-58mm' },
    receipt: {
      bizName: 'Toko Berkah',
      showOutlet: true,
      showTxNumber: true,
      showCashier: true,
      showPayment: true,
      showChange: true,
      footer: 'Terima kasih sudah berbelanja',
    },
    notifications: { lowStock: true, outOfStock: true, system: true },
  },
};

// ============================================================
// 2. HELPERS
// ============================================================
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function rupiah(n) {
  const num = Math.round(n);
  const sign = num < 0 ? '-' : '';
  return sign + 'Rp ' + Math.abs(num).toLocaleString('id-ID');
}

function calculateTotals(cart, discount = 0, taxPct = 0) {
  const subtotal = cart.reduce((sum, it) => sum + it.price * it.qty, 0);
  const disc = Math.min(Math.max(0, Math.round(discount)), subtotal);
  const afterDisc = subtotal - disc;
  const taxable = afterDisc;
  const tax = Math.round(taxable * (taxPct / 100));
  const total = taxable + tax;
  return { subtotal, discount: disc, taxable, tax, total, taxPct };
}

function uid(prefix) {
  return prefix + '-' + Date.now().toString(36).slice(-6).toUpperCase();
}

function nowTime() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function nowDateTime() {
  return new Date().toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function toast(msg, type = '') {
  const host = $('#toast-host');
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => el.remove(), 2600);
}

function openSheet(html) {
  $('#sheet-content').innerHTML = html;
  $('#sheet').hidden = false;
  $('#sheet-backdrop').hidden = false;
  $('#sheet').scrollTop = 0;
}
function closeSheet() {
  $('#sheet').hidden = true;
  $('#sheet-backdrop').hidden = true;
  $('#sheet-content').innerHTML = '';
}

function confirmModal(title, message, confirmLabel, onConfirm, danger = true) {
  const host = $('#modal-host');
  host.innerHTML = `
    <div class="modal-backdrop" id="modal-bd">
      <div class="modal">
        <h3>${title}</h3>
        <p>${message}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="modal-cancel">Batal</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="modal-ok">${confirmLabel}</button>
        </div>
      </div>
    </div>`;
  const close = () => (host.innerHTML = '');
  $('#modal-cancel').onclick = close;
  $('#modal-bd').onclick = (e) => { if (e.target.id === 'modal-bd') close(); };
  $('#modal-ok').onclick = () => { close(); onConfirm(); };
}

function promptModal(title, label, defaultValue, onConfirm) {
  const host = $('#modal-host');
  host.innerHTML = `
    <div class="modal-backdrop" id="modal-bd">
      <div class="modal">
        <h3>${title}</h3>
        <label class="field" style="margin:12px 0">
          <span>${label}</span>
          <input type="text" id="prompt-value" value="${defaultValue || ''}" />
        </label>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="modal-cancel">Batal</button>
          <button class="btn btn-primary" id="modal-ok">Simpan</button>
        </div>
      </div>
    </div>`;
  const close = () => (host.innerHTML = '');
  $('#modal-cancel').onclick = close;
  $('#modal-bd').onclick = (e) => { if (e.target.id === 'modal-bd') close(); };
  $('#modal-ok').onclick = () => {
    const v = $('#prompt-value').value;
    close();
    onConfirm(v);
  };
  setTimeout(() => $('#prompt-value')?.focus(), 50);
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('sk-theme', t);
  state.theme = t;
}
applyTheme(state.theme);

// ============================================================
// 3. AUTH
// ============================================================
function showView(id) {
  $$('.view').forEach((v) => v.classList.remove('active'));
  $('#' + id).classList.add('active');
}

$('#show-register').onclick = () => showView('view-register');
$('#show-forgot').onclick = () => showView('view-forgot');
$('#reg-cancel').onclick = () => showView('view-login');
$('#forgot-cancel').onclick = () => showView('view-login');

let regStep = 1;
$('#register-form').addEventListener('submit', (e) => {
  e.preventDefault();
  if (regStep === 1) {
    const username = $('#reg-username').value.trim();
    const email = $('#reg-email').value.trim();
    const password = $('#reg-password').value;
    const displayName = $('#reg-displayname').value.trim();
    if (!username || !email || !password || !displayName) return toast('Lengkapi semua field', 'error');
    if (password.length < 6) return toast('Password minimal 6 karakter', 'error');
    regStep = 2;
    $('#register-step-1').hidden = true;
    $('#register-step-2').hidden = false;
    $('#register-step-label').textContent = 'Tahap 2 dari 2';
  } else {
    const bizname = $('#reg-bizname').value.trim();
    const biztype = $('#reg-biztype').value;
    if (!bizname || !biztype) return toast('Lengkapi data bisnis', 'error');
    toast('Registrasi berhasil · silakan login', 'success');
    setTimeout(() => {
      showView('view-login');
      $('#login-user').value = $('#reg-username').value;
      regStep = 1;
      $('#register-step-1').hidden = false;
      $('#register-step-2').hidden = true;
      $('#register-step-label').textContent = 'Tahap 1 dari 2';
    }, 800);
  }
});

$('#reg-back').onclick = () => {
  regStep = 1;
  $('#register-step-1').hidden = false;
  $('#register-step-2').hidden = true;
  $('#register-step-label').textContent = 'Tahap 1 dari 2';
};

$('#forgot-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $('#forgot-email').value.trim();
  if (!email) return;
  toast('Link reset dikirim ke ' + email, 'success');
  setTimeout(() => showView('view-login'), 900);
});

$('#login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const errEl = $('#login-error');
  errEl.hidden = true;
  const user = $('#login-user').value.trim().toLowerCase();
  const pass = $('#login-pass').value;
  if (!user || !pass) {
    errEl.textContent = 'Username dan password wajib diisi.';
    errEl.hidden = false;
    return;
  }
  const btn = e.target.querySelector('button[type=submit]');
  btn.classList.add('loading');
  setTimeout(() => {
    btn.classList.remove('loading');
    if (user === 'owner') {
      state.user = { username: 'owner', displayName: 'Budi Santoso', role: 'owner' };
    } else if (user === 'kasir') {
      state.user = { username: 'kasir', displayName: 'Andi Wijaya', role: 'cashier' };
    } else {
      errEl.textContent = 'Username atau password salah.';
      errEl.hidden = false;
      return;
    }
    enterApp();
  }, 500);
});

function enterApp() {
  showView('view-app');
  if (state.user.role === 'cashier' && !state.activeShift) {
    state.activeShift = {
      id: uid('SH'),
      startTime: nowTime(),
      openingCash: 200000,
      transactions: 24,
      cashSales: 850000,
      qrisSales: 420000,
    };
  }
  state.activeView = state.user.role === 'cashier' ? 'pos' : 'dashboard';
  state.ownerTab = 'dashboard';
  renderNav();
  renderMain();
  updateSyncIndicator();
  renderSidebar();   // ← FIX: pre-render sidebar agar body terisi
}

$('#logout-btn').onclick = () => {
  if (state.activeShift) {
    confirmModal(
      'Shift masih aktif',
      'Tutup shift dulu sebelum keluar. Kalau tetap keluar, shift akan tercatat sebagai anomali.',
      'Tetap keluar',
      doLogout
    );
  } else {
    confirmModal('Keluar dari SakuKasir?', 'Kamu perlu login lagi untuk masuk.', 'Keluar', doLogout, false);
  }
};

function doLogout() {
  state.user = null;
  state.cart = [];
  state.activeShift = null;
  showView('view-login');
  $('#login-pass').value = '';
  $('#login-error').hidden = true;
}

// ============================================================
// 4. NAV
// ============================================================
function renderNav() {
  const nav = $('#bottom-nav');
  if (state.user.role === 'cashier') {
    nav.innerHTML = `
      ${navItem('pos', 'POS', '<path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M3 9h18"/>')}
      ${navItem('transactions', 'Transaksi', '<path d="M5 3h14a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2V5a2 2 0 0 1 2-2z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>')}
      ${navItem('shift', 'Shift', '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>')}
    `;
  } else {
    nav.innerHTML = `
      ${navItem('dashboard', 'Dashboard', '<path d="M3 3h7v9H3z"/><path d="M14 3h7v5h-7z"/><path d="M14 12h7v9h-7z"/><path d="M3 16h7v5H3z"/>')}
      ${navItem('pos', 'POS', '<path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M3 9h18"/>')}
      ${navItem('reports', 'Laporan', '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/>')}
    `;
  }
  $$('.nav-item').forEach((el) => {
    el.onclick = () => {
      const v = el.dataset.view;
      if (state.user.role === 'cashier') state.activeView = v;
      else state.ownerTab = v;
      renderNav();
      renderMain();
    };
  });
}

function navItem(view, label, svgInner) {
  const active =
    (state.user.role === 'cashier' && state.activeView === view) ||
    (state.user.role === 'owner' && state.ownerTab === view);
  return `
    <button class="nav-item ${active ? 'active' : ''}" data-view="${view}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${svgInner}</svg>
      <span>${label}</span>
    </button>`;
}

// ============================================================
// 5. ROUTER
// ============================================================
function renderMain() {
  const main = $('#main');
  const v = state.user.role === 'cashier' ? state.activeView : state.ownerTab;
  if (v === 'pos') return renderPOS(main);
  if (v === 'dashboard') return renderDashboard(main);
  if (v === 'transactions') return renderTransactions(main);
  if (v === 'shift') return renderShift(main);
  if (v === 'reports') return renderReports(main);
}

// ============================================================
// 6. POS
// ============================================================
function renderPOS(main) {
  const cats = ['Semua', ...state.categories.filter(c => c.active).map(c => c.name)];
  main.innerHTML = `
    <div class="pos-search">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" placeholder="Cari produk…" id="pos-search-input" />
    </div>
    <div class="chip-row" id="cat-row">
      ${cats.map((c, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('')}
    </div>
    <div class="product-grid" id="product-grid"></div>
    <div id="cart-bar-host"></div>
  `;
  renderProductGrid();
  $('#pos-search-input').oninput = renderProductGrid;
  $$('#cat-row .chip').forEach((chip) => {
    chip.onclick = () => {
      $$('#cat-row .chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      renderProductGrid();
    };
  });
  renderCartBar();
}

function renderProductGrid() {
  const q = ($('#pos-search-input')?.value || '').toLowerCase();
  const cat = $('#cat-row .chip.active')?.dataset.cat || 'Semua';
  let list = state.products.filter(p => p.active);
  if (cat !== 'Semua') list = list.filter(p => p.cat === cat);
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q));
  const grid = $('#product-grid');
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      <div class="empty-title">Produk tidak ditemukan</div>
      <div class="empty-sub">Coba kata kunci lain, atau tambahkan produk baru via menu Kelola.</div>
    </div>`;
    return;
  }
  grid.innerHTML = list.map(renderProductCard).join('');
  $$('.product-card').forEach((el) => {
    el.onclick = () => addToCart(parseInt(el.dataset.id));
  });
}

function renderProductCard(p) {
  let badge = '';
  if (p.track) {
    if (p.stock === 0) badge = `<span class="stock-badge out">Habis</span>`;
    else if (p.stock <= p.low) badge = `<span class="stock-badge low">Sisa ${p.stock}</span>`;
  }
  return `
    <button class="product-card ${p.stock === 0 && p.track ? 'out' : ''}" data-id="${p.id}">
      ${badge}
      <div class="pname">${p.name}</div>
      <div class="punit">/ ${p.unit}</div>
      <div class="pprice">${rupiah(p.price)}</div>
    </button>`;
}

function addToCart(id) {
  const p = state.products.find(x => x.id === id);
  if (!p) return;
  const existing = state.cart.find(x => x.id === id);
  if (existing) {
    if (p.track && existing.qty >= p.stock) return toast('Stok tidak cukup', 'error');
    existing.qty++;
  } else {
    state.cart.push({ id: p.id, name: p.name, price: p.price, qty: 1, unit: p.unit });
  }
  renderCartBar();
  toast(`${p.name} ditambahkan`);
}

function renderCartBar() {
  const host = $('#cart-bar-host');
  if (!host) return;
  if (state.cart.length === 0) { host.innerHTML = ''; return; }
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  const { total } = calculateTotals(state.cart);
  host.innerHTML = `
    <button class="cart-bar" id="cart-bar-btn">
      <div>
        <div class="cart-count">${count} item</div>
        <div class="cart-total">${rupiah(total)}</div>
      </div>
      <span class="cart-cta">Lihat Cart</span>
    </button>`;
  $('#cart-bar-btn').onclick = openCartSheet;
}

function openCartSheet() {
  const { subtotal } = calculateTotals(state.cart);
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:4px">Cart · ${state.cart.reduce((s,i)=>s+i.qty,0)} item</h3>
    <p class="muted small" style="margin:0 0 8px">Tap +/- untuk ubah jumlah</p>
    <div class="cart-list">
      ${state.cart.map(item => `
        <div class="cart-item">
          <div>
            <div class="ci-name">${item.name}</div>
            <div class="ci-price">${rupiah(item.price)} × ${item.qty}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px">
            <div class="ci-total">${rupiah(item.price * item.qty)}</div>
            <div class="qty-ctrl">
              <button data-act="minus" data-id="${item.id}">−</button>
              <span class="qty-val">${item.qty}</span>
              <button data-act="plus" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div class="summary-row"><span>Subtotal</span><span>${rupiah(subtotal)}</span></div>
    <div style="display:grid;gap:8px;margin-top:12px">
      <button class="btn btn-ghost" id="clear-cart">Kosongkan cart</button>
      <button class="btn btn-primary" id="go-checkout">Bayar · ${rupiah(subtotal)}</button>
    </div>
  `);
  $$('[data-act]').forEach((btn) => {
    btn.onclick = () => {
      const id = parseInt(btn.dataset.id);
      const item = state.cart.find(x => x.id === id);
      if (!item) return;
      if (btn.dataset.act === 'plus') {
        const p = state.products.find(x => x.id === id);
        if (p.track && item.qty >= p.stock) return toast('Stok tidak cukup', 'error');
        item.qty++;
      } else {
        item.qty--;
        if (item.qty <= 0) state.cart = state.cart.filter(x => x.id !== id);
      }
      renderCartBar();
      if (state.cart.length === 0) { closeSheet(); return; }
      openCartSheet();
    };
  });
  $('#clear-cart').onclick = () => {
    confirmModal('Kosongkan cart?', 'Semua item akan dihapus.', 'Kosongkan', () => {
      state.cart = [];
      closeSheet();
      renderCartBar();
    });
  };
  $('#go-checkout').onclick = () => { closeSheet(); openCheckout(); };
}

// ============================================================
// 7. CHECKOUT
// ============================================================
function openCheckout() {
  let method = 'cash';
  let discount = 0;
  let taxPct = 0;
  let cashReceived = 0;

  const render = () => {
    const t = calculateTotals(state.cart, discount, taxPct);
    const change = cashReceived - t.total;
    const canPay = method === 'cash' ? cashReceived >= t.total : true;
    openSheet(`
      <h3 style="font-size:17px;margin-bottom:12px">Pembayaran</h3>
      <div style="text-align:center;padding:16px 0;border-bottom:1px solid var(--border);margin-bottom:16px">
        <div class="muted small">Total</div>
        <div style="font-size:32px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:-0.02em">${rupiah(t.total)}</div>
      </div>
      <div class="section-title" style="margin-top:0">Diskon & Pajak</div>
      <div class="form-row" style="margin-bottom:16px">
        <label class="field"><span>Diskon (Rp)</span><input type="number" id="in-disc" value="${discount}" min="0" step="1000" /></label>
        <label class="field"><span>Pajak (%)</span><input type="number" id="in-tax" value="${taxPct}" min="0" max="100" step="1" /></label>
      </div>
      <div class="section-title" style="margin-top:0">Metode Pembayaran</div>
      <div class="form-row" style="margin-bottom:16px">
        <button class="btn ${method === 'cash' ? 'btn-primary' : 'btn-ghost'}" id="m-cash">Cash</button>
        <button class="btn ${method === 'qris' ? 'btn-primary' : 'btn-ghost'}" id="m-qris">QRIS</button>
      </div>
      ${method === 'cash' ? `
        <label class="field" style="margin-bottom:10px"><span>Uang diterima</span>
          <input type="number" id="in-cash" value="${cashReceived || ''}" placeholder="0" step="1000" /></label>
        <div style="display:flex;gap:8px;margin-bottom:16px">
          <button class="btn btn-ghost" data-quick="${t.total}">Pas</button>
          <button class="btn btn-ghost" data-quick="50000">50rb</button>
          <button class="btn btn-ghost" data-quick="100000">100rb</button>
        </div>
        <div class="summary-row" style="font-size:16px">
          <span>Kembalian</span>
          <span style="color:${change >= 0 ? 'var(--cash)' : 'var(--text-muted)'};font-weight:700">
            ${change >= 0 ? rupiah(change) : '—'}</span>
        </div>
      ` : `
        <div style="text-align:center;padding:20px;border:1px dashed var(--border-strong);border-radius:var(--radius);margin-bottom:16px">
          <div style="width:160px;height:160px;background:var(--surface-alt);border-radius:var(--radius);display:inline-flex;align-items:center;justify-content:center;color:var(--text-faint);font-size:12px;font-weight:600">QRIS ${state.settings.qris.active ? '· Aktif' : '· Belum diatur'}</div>
          <p class="muted small" style="margin:12px 0 0">Scan pakai aplikasi bank atau e-wallet</p>
        </div>
      `}
      <div class="summary-row"><span>Subtotal</span><span>${rupiah(t.subtotal)}</span></div>
      ${t.discount > 0 ? `<div class="summary-row"><span>Diskon</span><span style="color:var(--alert)">-${rupiah(t.discount)}</span></div>` : ''}
      ${t.tax > 0 ? `<div class="summary-row"><span>Pajak ${taxPct}%</span><span>${rupiah(t.tax)}</span></div>` : ''}
      <div class="summary-row total"><span>Total</span><span>${rupiah(t.total)}</span></div>
      <div style="display:grid;gap:8px;margin-top:16px">
        <button class="btn btn-primary btn-block" id="pay-btn" ${canPay ? '' : 'disabled'}>Bayar ${rupiah(t.total)}</button>
      </div>
    `);
    $('#in-disc').oninput = (e) => { discount = Math.max(0, parseInt(e.target.value) || 0); render(); };
    $('#in-tax').oninput = (e) => { taxPct = Math.max(0, Math.min(100, parseInt(e.target.value) || 0)); render(); };
    if ($('#in-cash')) {
      $('#in-cash').oninput = (e) => { cashReceived = parseInt(e.target.value) || 0; render(); };
      $$('[data-quick]').forEach((b) => b.onclick = () => { cashReceived = parseInt(b.dataset.quick); render(); });
    }
    $('#m-cash').onclick = () => { method = 'cash'; render(); };
    $('#m-qris').onclick = () => { method = 'qris'; render(); };
    if (canPay) {
      $('#pay-btn').onclick = () => {
        const t = calculateTotals(state.cart, discount, taxPct);
        const tx = {
          id: 'TRX-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(state.transactions.length + 1).padStart(4, '0'),
          time: nowTime(),
          date: new Date().toISOString().slice(0, 10),
          items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          total: t.total,
          method,
          sync: state.online ? 'synced' : 'pending',
          cashier: state.user.displayName.split(' ')[0],
          outlet: state.outlet.name,
          discount: t.discount,
          tax: t.tax,
          taxPct: t.taxPct,
          received: method === 'cash' ? cashReceived : null,
          change: method === 'cash' ? cashReceived - t.total : 0,
        };
        state.transactions.unshift(tx);
        if (!state.online) state.syncQueue.push({ type: 'transaction', id: tx.id });
        if (state.activeShift) {
          state.activeShift.transactions++;
          if (method === 'cash') state.activeShift.cashSales += t.total;
          else state.activeShift.qrisSales += t.total;
        }
        state.cart.forEach(item => {
          const p = state.products.find(x => x.id === item.id);
          if (p && p.track) p.stock = Math.max(0, p.stock - item.qty);
        });
        closeSheet();
        showSuccess(tx);
      };
    }
  };
  render();
}

function showSuccess(tx) {
  const main = $('#main');
  const nav = $('#bottom-nav');
  nav.style.display = 'none';
  main.innerHTML = `
    <div class="success-screen">
      <div class="success-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
      </div>
      <h2>Transaksi berhasil</h2>
      <div class="tx-num">${tx.id}</div>
      <div class="success-total">${rupiah(tx.total)}</div>
      <div class="success-meta">
        <span class="pill ${tx.method}">${tx.method === 'cash' ? 'Cash' : 'QRIS'}</span>
        ${tx.method === 'cash' ? ` · Kembalian ${rupiah(tx.change)}` : ''}
        ${tx.sync === 'pending' ? ' · <span style="color:var(--warn)">Menunggu sync</span>' : ''}
      </div>
      <div class="success-actions">
        <button class="btn btn-primary" id="print-receipt">${state.settings.printer.connected ? 'Cetak struk' : 'Hubungkan printer'}</button>
        <button class="btn btn-ghost" id="new-tx">Transaksi baru</button>
        <button class="btn-link" id="view-detail">Lihat detail</button>
      </div>
    </div>
  `;
  $('#print-receipt').onclick = () => {
    if (state.settings.printer.connected) {
      toast('Struk sedang dicetak…');
      printReceipt(tx);
    } else {
      toast('Printer belum terhubung · struk masuk queue', 'error');
    }
  };
  $('#new-tx').onclick = () => {
    state.cart = [];
    nav.style.display = '';
    renderMain();
  };
  $('#view-detail').onclick = () => { nav.style.display = ''; showTxDetail(tx.id); };
}

// ============================================================
// 8. TRANSACTIONS
// ============================================================
function renderTransactions(main) {
  const isOwner = state.user.role === 'owner';
  const txList = isOwner
    ? state.transactions
    : state.transactions.filter(t => t.cashier === state.user.displayName.split(' ')[0]);
  main.innerHTML = `
    <div class="page-head">
      <div><h2>Transaksi</h2><div class="sub">${txList.length} transaksi</div></div>
    </div>
    <div class="filter-bar">
      <button class="chip active">Hari ini</button>
      <button class="chip">Cash</button>
      <button class="chip">QRIS</button>
      ${isOwner ? '<button class="chip">Semua outlet</button>' : ''}
    </div>
    <div class="tx-list" id="tx-list">
      ${txList.length ? txList.map(renderTxItem).join('') : `
        <div class="empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>
          <div class="empty-title">Belum ada transaksi</div>
          <div class="empty-sub">Transaksi hari ini akan muncul di sini.</div>
        </div>`}
    </div>
  `;
  $$('.tx-item').forEach((el) => {
    el.onclick = () => showTxDetail(el.dataset.id);
  });
}

function renderTxItem(tx) {
  const syncLabel = { synced: '✓', pending: '⏳', error: '⚠' }[tx.sync];
  return `
    <button class="tx-item" data-id="${tx.id}">
      <div class="tx-id">#${tx.id.slice(-4)} · ${tx.time}
        <span class="sync-badge ${tx.sync}">${syncLabel} ${tx.sync}</span>
      </div>
      <div class="tx-total">${rupiah(tx.total)}</div>
      <div class="tx-meta">${tx.items.reduce((s,i)=>s+i.qty,0)} item · ${tx.method === 'cash' ? 'Cash' : 'QRIS'}</div>
    </button>`;
}

function showTxDetail(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:4px">${tx.id}</h3>
    <p class="muted small" style="margin:0 0 16px">${tx.date} · ${tx.time} · ${tx.outlet}</p>
    <div class="shift-rows">
      <div class="shift-row"><span class="lbl">Kasir</span><span class="val">${tx.cashier}</span></div>
      <div class="shift-row"><span class="lbl">Metode</span><span class="val">${tx.method === 'cash' ? 'Cash' : 'QRIS'}</span></div>
      <div class="shift-row"><span class="lbl">Status sync</span><span class="val"><span class="sync-badge ${tx.sync}">${tx.sync}</span></span></div>
    </div>
    <div class="section-title">Item</div>
    <div class="cart-list" style="padding:0">
      ${tx.items.map(i => `
        <div class="cart-item" style="padding:8px 0">
          <div><div class="ci-name">${i.name}</div><div class="ci-price">${rupiah(i.price)} × ${i.qty}</div></div>
          <div class="ci-total">${rupiah(i.price * i.qty)}</div>
        </div>`).join('')}
    </div>
    <div class="summary-row"><span>Subtotal</span><span>${rupiah(tx.items.reduce((s,i)=>s+i.price*i.qty,0))}</span></div>
    ${tx.discount > 0 ? `<div class="summary-row"><span>Diskon</span><span style="color:var(--alert)">-${rupiah(tx.discount)}</span></div>` : ''}
    ${tx.tax > 0 ? `<div class="summary-row"><span>Pajak ${tx.taxPct}%</span><span>${rupiah(tx.tax)}</span></div>` : ''}
    <div class="summary-row total"><span>Total</span><span>${rupiah(tx.total)}</span></div>
    ${tx.method === 'cash' ? `
      <div class="summary-row"><span>Diterima</span><span>${rupiah(tx.received)}</span></div>
      <div class="summary-row"><span>Kembalian</span><span>${rupiah(tx.change)}</span></div>` : ''}
    <div style="display:grid;gap:8px;margin-top:16px">
      <button class="btn btn-primary btn-block" id="print-again">Cetak ulang struk</button>
    </div>
  `);
  $('#print-again').onclick = () => {
    if (state.settings.printer.connected) {
      toast('Mencetak ulang…');
      printReceipt(tx);
    } else {
      toast('Printer belum terhubung', 'error');
    }
  };
}