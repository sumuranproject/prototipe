/* ============================================================
   SakuKasir — app.js (FULL)
   ============================================================ */

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
      showOutlet: true, showTxNumber: true, showCashier: true,
      showPayment: true, showChange: true,
      footer: 'Terima kasih sudah berbelanja',
    },
    notifications: { lowStock: true, outOfStock: true, system: true },
  },
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function rupiah(n) {
  const num = Math.round(n);
  const sign = num < 0 ? '-' : '';
  return sign + 'Rp ' + Math.abs(num).toLocaleString('id-ID');
}

function calculateTotals(cart, discount = 0, taxPct = 0) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const disc = Math.min(Math.max(0, Math.round(discount)), subtotal);
  const afterDisc = subtotal - disc;
  const tax = Math.round(afterDisc * (taxPct / 100));
  return { subtotal, discount: disc, taxable: afterDisc, tax, total: afterDisc + tax, taxPct };
}

function uid(p) { return p + '-' + Date.now().toString(36).slice(-6).toUpperCase(); }
function nowTime() { return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }); }
function nowDateTime() {
  return new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
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

function confirmModal(title, msg, confirmLabel, onConfirm, danger = true) {
  const host = $('#modal-host');
  host.innerHTML = `
    <div class="modal-backdrop" id="modal-bd">
      <div class="modal">
        <h3>${title}</h3>
        <p>${msg}</p>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="modal-cancel">Batal</button>
          <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="modal-ok">${confirmLabel}</button>
        </div>
      </div>
    </div>`;
  const close = () => host.innerHTML = '';
  $('#modal-cancel').onclick = close;
  $('#modal-bd').onclick = (e) => { if (e.target.id === 'modal-bd') close(); };
  $('#modal-ok').onclick = () => { close(); onConfirm(); };
}

function promptModal(title, label, def, onConfirm) {
  const host = $('#modal-host');
  host.innerHTML = `
    <div class="modal-backdrop" id="modal-bd">
      <div class="modal">
        <h3>${title}</h3>
        <label class="field" style="margin:12px 0"><span>${label}</span>
          <input type="text" id="prompt-value" value="${def || ''}" /></label>
        <div class="modal-actions">
          <button class="btn btn-ghost" id="modal-cancel">Batal</button>
          <button class="btn btn-primary" id="modal-ok">Simpan</button>
        </div>
      </div>
    </div>`;
  const close = () => host.innerHTML = '';
  $('#modal-cancel').onclick = close;
  $('#modal-bd').onclick = (e) => { if (e.target.id === 'modal-bd') close(); };
  $('#modal-ok').onclick = () => { const v = $('#prompt-value').value; close(); onConfirm(v); };
  setTimeout(() => $('#prompt-value')?.focus(), 50);
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('sk-theme', t);
  state.theme = t;
}
applyTheme(state.theme);

/* AUTH */
function showView(id) {
  $$('.view').forEach(v => v.classList.remove('active'));
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
    const u = $('#reg-username').value.trim();
    const em = $('#reg-email').value.trim();
    const pw = $('#reg-password').value;
    const dn = $('#reg-displayname').value.trim();
    if (!u || !em || !pw || !dn) return toast('Lengkapi semua field', 'error');
    if (pw.length < 6) return toast('Password minimal 6 karakter', 'error');
    regStep = 2;
    $('#register-step-1').hidden = true;
    $('#register-step-2').hidden = false;
    $('#register-step-label').textContent = 'Tahap 2 dari 2';
  } else {
    const bn = $('#reg-bizname').value.trim();
    const bt = $('#reg-biztype').value;
    if (!bn || !bt) return toast('Lengkapi data bisnis', 'error');
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
  const em = $('#forgot-email').value.trim();
  if (!em) return;
  toast('Link reset dikirim ke ' + em, 'success');
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
      id: uid('SH'), startTime: nowTime(),
      openingCash: 200000, transactions: 24,
      cashSales: 850000, qrisSales: 420000,
    };
  }
  state.activeView = state.user.role === 'cashier' ? 'pos' : 'dashboard';
  state.ownerTab = 'dashboard';
  renderNav();
  renderMain();
  updateSyncIndicator();
  renderSidebar();
}

function handleLogout() {
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
}

function doLogout() {
  state.user = null;
  state.cart = [];
  state.activeShift = null;
  showView('view-login');
  $('#login-pass').value = '';
  $('#login-error').hidden = true;
}

/* NAV */
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
  $$('.nav-item').forEach(el => {
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

/* ROUTER */
function renderMain() {
  const main = $('#main');
  const v = state.user.role === 'cashier' ? state.activeView : state.ownerTab;
  if (v === 'pos') return renderPOS(main);
  if (v === 'dashboard') return renderDashboard(main);
  if (v === 'transactions') return renderTransactions(main);
  if (v === 'shift') return renderShift(main);
  if (v === 'reports') return renderReports(main);
}

/* POS */
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
  $$('#cat-row .chip').forEach(chip => {
    chip.onclick = () => {
      $$('#cat-row .chip').forEach(c => c.classList.remove('active'));
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
  if (!list.length) {
    grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      <div class="empty-title">Produk tidak ditemukan</div>
      <div class="empty-sub">Coba kata kunci lain, atau tambahkan produk baru via menu Kelola.</div>
    </div>`;
    return;
  }
  grid.innerHTML = list.map(renderProductCard).join('');
  $$('.product-card').forEach(el => {
    el.onclick = () => addToCart(parseInt(el.dataset.id));
  });
}

function renderProductCard(p) {
  let badge = '';
  if (p.track) {
    if (p.stock === 0) badge = '<span class="stock-badge out">Habis</span>';
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
  const ex = state.cart.find(x => x.id === id);
  if (ex) {
    if (p.track && ex.qty >= p.stock) return toast('Stok tidak cukup', 'error');
    ex.qty++;
  } else {
    state.cart.push({ id: p.id, name: p.name, price: p.price, qty: 1, unit: p.unit });
  }
  renderCartBar();
  toast(`${p.name} ditambahkan`);
}

function renderCartBar() {
  const host = $('#cart-bar-host');
  if (!host) return;
  if (!state.cart.length) { host.innerHTML = ''; return; }
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
  $$('[data-act]').forEach(btn => {
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
      if (!state.cart.length) { closeSheet(); return; }
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

/* CHECKOUT */
function openCheckout() {
  let method = 'cash', discount = 0, taxPct = 0, cashReceived = 0;
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
          <span style="color:${change >= 0 ? 'var(--cash)' : 'var(--text-muted)'};font-weight:700">${change >= 0 ? rupiah(change) : '—'}</span>
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
    $('#in-disc').oninput = e => { discount = Math.max(0, parseInt(e.target.value) || 0); render(); };
    $('#in-tax').oninput = e => { taxPct = Math.max(0, Math.min(100, parseInt(e.target.value) || 0)); render(); };
    if ($('#in-cash')) {
      $('#in-cash').oninput = e => { cashReceived = parseInt(e.target.value) || 0; render(); };
      $$('[data-quick]').forEach(b => b.onclick = () => { cashReceived = parseInt(b.dataset.quick); render(); });
    }
    $('#m-cash').onclick = () => { method = 'cash'; render(); };
    $('#m-qris').onclick = () => { method = 'qris'; render(); };
    if (canPay) {
      $('#pay-btn').onclick = () => {
        const t = calculateTotals(state.cart, discount, taxPct);
        const tx = {
          id: 'TRX-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + String(state.transactions.length + 1).padStart(4, '0'),
          time: nowTime(), date: new Date().toISOString().slice(0, 10),
          items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          total: t.total, method,
          sync: state.online ? 'synced' : 'pending',
          cashier: state.user.displayName.split(' ')[0],
          outlet: state.outlet.name,
          discount: t.discount, tax: t.tax, taxPct: t.taxPct,
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
    if (state.settings.printer.connected) { toast('Struk sedang dicetak…'); printReceipt(tx); }
    else toast('Printer belum terhubung · struk masuk queue', 'error');
  };
  $('#new-tx').onclick = () => { state.cart = []; nav.style.display = ''; renderMain(); };
  $('#view-detail').onclick = () => { nav.style.display = ''; showTxDetail(tx.id); };
}

/* TRANSACTIONS */
function renderTransactions(main) {
  const isOwner = state.user.role === 'owner';
  const list = isOwner ? state.transactions : state.transactions.filter(t => t.cashier === state.user.displayName.split(' ')[0]);
  main.innerHTML = `
    <div class="page-head">
      <div><h2>Transaksi</h2><div class="sub">${list.length} transaksi</div></div>
    </div>
    <div class="filter-bar">
      <button class="chip active">Hari ini</button>
      <button class="chip">Cash</button>
      <button class="chip">QRIS</button>
      ${isOwner ? '<button class="chip">Semua outlet</button>' : ''}
    </div>
    <div class="tx-list">
      ${list.length ? list.map(renderTxItem).join('') : `
        <div class="empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>
          <div class="empty-title">Belum ada transaksi</div>
          <div class="empty-sub">Transaksi hari ini akan muncul di sini.</div>
        </div>`}
    </div>`;
  $$('.tx-item').forEach(el => el.onclick = () => showTxDetail(el.dataset.id));
}

function renderTxItem(tx) {
  const sl = { synced: '✓', pending: '⏳', error: '⚠' }[tx.sync];
  return `
    <button class="tx-item" data-id="${tx.id}">
      <div class="tx-id">#${tx.id.slice(-4)} · ${tx.time}
        <span class="sync-badge ${tx.sync}">${sl} ${tx.sync}</span>
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
    if (state.settings.printer.connected) { toast('Mencetak ulang…'); printReceipt(tx); }
    else toast('Printer belum terhubung', 'error');
  };
}

/* SHIFT */
function renderShift(main) {
  const s = state.activeShift;
  main.innerHTML = `
    <div class="page-head"><div><h2>Shift</h2><div class="sub">Riwayat & status</div></div></div>
    ${s ? `
      <div class="shift-card">
        <div class="shift-status">Shift aktif</div>
        <div class="muted small">Mulai ${s.startTime} · ${state.user.displayName}</div>
        <div class="shift-rows">
          <div class="shift-row"><span class="lbl">Kas awal</span><span class="val">${rupiah(s.openingCash)}</span></div>
          <div class="shift-row"><span class="lbl">Transaksi</span><span class="val">${s.transactions}</span></div>
          <div class="shift-row"><span class="lbl">Cash</span><span class="val">${rupiah(s.cashSales)}</span></div>
          <div class="shift-row"><span class="lbl">QRIS</span><span class="val">${rupiah(s.qrisSales)}</span></div>
          <div class="shift-row"><span class="lbl">Total penjualan</span><span class="val">${rupiah(s.cashSales + s.qrisSales)}</span></div>
          <div class="shift-row expected"><span class="lbl">Expected cash</span><span class="val">${rupiah(s.openingCash + s.cashSales)}</span></div>
        </div>
        <button class="btn btn-primary btn-block" id="close-shift" style="margin-top:8px">Tutup shift</button>
      </div>
    ` : `
      <div class="empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        <div class="empty-title">Belum ada shift aktif</div>
        <div class="empty-sub">Mulai shift untuk mencatat kas awal dan transaksi.</div>
        <button class="btn btn-primary" id="start-shift">Mulai shift</button>
      </div>
    `}
    <div class="section-title">Riwayat shift</div>
    <div class="tx-list">
      ${state.shiftHistory.map(sh => `
        <div class="tx-item">
          <div class="tx-id">${sh.id} · ${sh.start}–${sh.end}</div>
          <div class="tx-total">${rupiah(sh.cash + sh.qris)}</div>
          <div class="tx-meta">${sh.tx} transaksi · Variance ${rupiah(sh.variance)}</div>
        </div>`).join('')}
    </div>
  `;
  if ($('#start-shift')) {
    $('#start-shift').onclick = () => {
      promptModal('Mulai shift', 'Kas awal (Rp)', '200000', v => {
        state.activeShift = {
          id: uid('SH'), startTime: nowTime(),
          openingCash: parseInt(v) || 0,
          transactions: 0, cashSales: 0, qrisSales: 0,
        };
        renderMain();
        toast('Shift dimulai', 'success');
      });
    };
  }
  if ($('#close-shift')) {
    $('#close-shift').onclick = () => {
      const expected = s.openingCash + s.cashSales;
      openSheet(`
        <h3 style="font-size:17px;margin-bottom:4px">Tutup shift</h3>
        <p class="muted small" style="margin:0 0 16px">Hitung uang fisik, lalu masukkan jumlahnya.</p>
        <div class="summary-row"><span>Expected cash</span><span>${rupiah(expected)}</span></div>
        <label class="field" style="margin:12px 0"><span>Uang fisik (Rp)</span>
          <input type="number" id="close-cash" value="${expected}" step="1000" /></label>
        <button class="btn btn-primary btn-block" id="do-close">Tutup shift</button>
      `);
      $('#do-close').onclick = () => {
        const closing = parseInt($('#close-cash').value) || 0;
        const variance = closing - expected;
        state.shiftHistory.unshift({
          id: s.id, start: s.startTime, end: nowTime(),
          opening: s.openingCash, closing, expected, variance,
          cash: s.cashSales, qris: s.qrisSales, tx: s.transactions,
        });
        state.activeShift = null;
        closeSheet();
        const vText = variance === 0 ? 'Pas, tidak ada selisih.'
          : variance > 0 ? `Lebih ${rupiah(variance)}.`
          : `Kurang ${rupiah(Math.abs(variance))}.`;
        confirmModal('Shift ditutup', vText, 'OK', () => renderMain(), false);
      };
    };
  }
}

/* DASHBOARD */
function renderDashboard(main) {
  const today = new Date().toISOString().slice(0, 10);
  const todayTx = state.transactions.filter(t => t.date === today);
  const totalSales = todayTx.reduce((s, t) => s + t.total, 0);
  const cash = todayTx.filter(t => t.method === 'cash').reduce((s, t) => s + t.total, 0);
  const qris = todayTx.filter(t => t.method === 'qris').reduce((s, t) => s + t.total, 0);
  const expense = state.expenses.filter(e => e.date.startsWith(today)).reduce((s, e) => s + e.amount, 0);
  const net = totalSales - expense;

  if (state.user.role === 'cashier') {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Halo, ${state.user.displayName.split(' ')[0]}</h2>
          <div class="sub">Ringkasan shift kamu</div></div>
      </div>
      <div class="kpi-hero">
        <div class="label">Penjualan hari ini</div>
        <div class="amount">${rupiah(totalSales)}</div>
        <div class="delta">${todayTx.length} transaksi</div>
      </div>
      <div class="kpi-grid">
        <div class="kpi-card"><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
        <div class="kpi-card"><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
      </div>
      ${state.activeShift ? `
        <div class="shift-card">
          <div class="shift-status">Shift aktif</div>
          <div class="muted small">Mulai ${state.activeShift.startTime}</div>
          <div class="shift-rows">
            <div class="shift-row"><span class="lbl">Transaksi</span><span class="val">${state.activeShift.transactions}</span></div>
            <div class="shift-row"><span class="lbl">Total penjualan</span><span class="val">${rupiah(state.activeShift.cashSales + state.activeShift.qrisSales)}</span></div>
          </div>
        </div>` : ''}
      <div class="section-title">Transaksi terbaru</div>
      <div class="tx-list">${todayTx.slice(0, 5).map(renderTxItem).join('') || '<div class="empty"><div class="empty-title">Belum ada transaksi</div></div>'}</div>
    `;
    $$('.tx-item').forEach(el => el.onclick = () => showTxDetail(el.dataset.id));
    return;
  }

  main.innerHTML = `
    <div class="page-head">
      <div><h2>Halo, ${state.user.displayName.split(' ')[0]}</h2>
        <div class="sub">Ringkasan hari ini</div></div>
    </div>
    <div class="kpi-hero">
      <div class="label">Penjualan hari ini</div>
      <div class="amount">${rupiah(totalSales)}</div>
      <div class="delta">${todayTx.length} transaksi</div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
      <div class="kpi-card"><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
      <div class="kpi-card"><div class="label">Pengeluaran</div><div class="amount">${rupiah(expense)}</div></div>
      <div class="kpi-card"><div class="label">Laba bersih</div><div class="amount">${rupiah(net)}</div></div>
    </div>
    <div class="chart-card">
      <div class="chart-title">7 hari terakhir</div>
      <div class="bar-chart">
        ${[1200, 1800, 1400, 2100, 1900, 2200, Math.round(totalSales/1000)].map((v, i) => {
          const max = Math.max(1200, 1800, 1400, 2100, 1900, 2200, Math.round(totalSales/1000), 1000);
          const h = Math.max(8, (v / max) * 100);
          const days = ['S','S','R','K','J','S','M'];
          return `<div class="bar-col"><div class="bar ${i === 6 ? 'today' : ''}" style="height:${h}%"></div><div class="bar-day">${days[i]}</div></div>`;
        }).join('')}
      </div>
    </div>
    <div class="chart-card">
      <div class="chart-title">Metode pembayaran</div>
      <div class="method-row">
        <span class="method-label">Cash</span>
        <div class="method-bar"><div class="method-fill cash" style="width:${totalSales ? (cash/totalSales*100) : 0}%"></div></div>
        <span class="method-amount">${rupiah(cash)}</span>
      </div>
      <div class="method-row">
        <span class="method-label">QRIS</span>
        <div class="method-bar"><div class="method-fill qris" style="width:${totalSales ? (qris/totalSales*100) : 0}%"></div></div>
        <span class="method-amount">${rupiah(qris)}</span>
      </div>
    </div>
    <div class="section-title">Transaksi terbaru</div>
    <div class="tx-list">${todayTx.slice(0, 4).map(renderTxItem).join('')}</div>
  `;
  $$('.tx-item').forEach(el => el.onclick = () => showTxDetail(el.dataset.id));
}

/* SIDEBAR — Accordion */
function renderSidebar() {
  const body = $('#sidebar-body');
  if (!body) return;
  const lowCount = state.products.filter(p => p.track && p.stock > 0 && p.stock <= p.low).length;
  const outCount = state.products.filter(p => p.track && p.stock === 0).length;
  const stockBadge = (lowCount + outCount) > 0 ? { text: `${lowCount + outCount} low`, cls: 'warn' } : null;

  const groups = [
    { id: 'katalog', title: 'Katalog', items: [
      { label: 'Produk', route: 'products', count: state.products.length },
      { label: 'Kategori', route: 'categories', count: state.categories.length },
      { label: 'Stok', route: 'inventory', badge: stockBadge },
    ]},
    { id: 'bisnis', title: 'Bisnis', items: [
      { label: 'Outlet', route: 'outlets', count: state.outlets.length },
      { label: 'Kasir', route: 'workers', count: state.workers.length },
    ]},
    { id: 'pengaturan', title: 'Pengaturan', items: [
      { label: 'QRIS', route: 'qris', badge: state.settings.qris.active ? { text: 'Aktif', cls: 'cash' } : { text: 'Off', cls: 'muted' } },
      { label: 'Printer', route: 'printer', badge: state.settings.printer.connected ? { text: 'On', cls: 'cash' } : { text: 'Off', cls: 'muted' } },
      { label: 'Struk', route: 'receipt' },
      { label: 'Notifikasi', route: 'notif-settings' },
      { label: 'Sinkronisasi', route: 'sync-settings', count: state.syncQueue.length || null },
      { label: 'Tema', route: 'theme-settings', badge: { text: state.theme === 'dark' ? 'Gelap' : 'Terang', cls: 'muted' } },
      { label: 'Profil', route: 'profile' },
      { label: 'Tentang', route: 'about' },
    ]},
  ];

  body.innerHTML = groups.map(g => `
    <div class="sidebar-accordion open" data-acc="${g.id}">
      <button class="sidebar-accordion-header" type="button">
        <span>${g.title}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="sidebar-accordion-body">
        ${g.items.map(it => `
          <button class="sidebar-item" data-route="${it.route}">
            <span class="si-label">${it.label}</span>
            ${it.badge ? `<span class="si-badge ${it.badge.cls}">${it.badge.text}</span>` : ''}
            ${it.count != null && it.count !== 0 ? `<span class="si-count">${it.count}</span>` : ''}
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');

  body.querySelectorAll('.sidebar-accordion-header').forEach(h => {
    h.onclick = () => h.parentElement.classList.toggle('open');
  });

  body.querySelectorAll('[data-route]').forEach(el => {
    el.onclick = () => {
      closeSidebar();
      routeManage(el.dataset.route);
    };
  });
}

let _sidebarScrollY = 0;

function openSidebar() {
  if (!state.user || state.user.role !== 'owner') return;
  renderSidebar();

  _sidebarScrollY = window.scrollY || window.pageYOffset || 0;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${_sidebarScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.classList.add('sidebar-open');

  $('#sidebar').hidden = false;
  $('#sidebar-backdrop').hidden = false;
}

function closeSidebar() {
  const wasOpen = !$('#sidebar').hidden;

  $('#sidebar').hidden = true;
  $('#sidebar-backdrop').hidden = true;

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.classList.remove('sidebar-open');

  if (wasOpen) window.scrollTo(0, _sidebarScrollY);
}

$('#brand-mark').addEventListener('click', openSidebar);
$('#brand-mark').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openSidebar(); }
});
$('#sidebar-close').addEventListener('click', closeSidebar);
$('#sidebar-backdrop').addEventListener('click', closeSidebar);
$('#sidebar-logout').addEventListener('click', () => { closeSidebar(); handleLogout(); });

function routeManage(route) {
  if (route === 'products') return pageProducts();
  if (route === 'categories') return pageCategories();
  if (route === 'inventory') return pageInventory();
  if (route === 'outlets') return pageOutlets();
  if (route === 'workers') return pageWorkers();
  if (route === 'qris') return pageQRIS();
  if (route === 'printer') return pagePrinterSettings();
  if (route === 'receipt') return pageReceiptSettings();
  if (route === 'notif-settings') return pageNotifSettings();
  if (route === 'sync-settings') return pageSyncSettings();
  if (route === 'theme-settings') return pageThemeSettings();
  if (route === 'profile') return pageProfile();
  if (route === 'about') return pageAbout();
}

function backHome() { state.ownerTab = 'dashboard'; renderNav(); renderMain(); }

/* PRODUCTS */
function pageProducts() {
  const main = $('#main');
  main.innerHTML = `
    <div class="page-head">
      <div><h2>Produk</h2><div class="sub">${state.products.length} produk</div></div>
      <button class="btn btn-ghost" id="back-home">← Beranda</button>
    </div>
    <div class="pos-search" style="margin-bottom:12px">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" placeholder="Cari produk…" id="prod-search" />
    </div>
    <div class="tx-list" id="prod-list"></div>
    <button class="fab" id="add-prod">+</button>
  `;
  renderProdList();
  $('#prod-search').oninput = renderProdList;
  $('#add-prod').onclick = () => productForm(null);
  $('#back-home').onclick = backHome;
}

function renderProdList() {
  const q = ($('#prod-search')?.value || '').toLowerCase();
  const list = state.products.filter(p => p.name.toLowerCase().includes(q));
  const host = $('#prod-list');
  if (!list.length) {
    host.innerHTML = `<div class="empty"><div class="empty-title">Belum ada produk</div><div class="empty-sub">Tap tombol + untuk tambah produk pertama.</div></div>`;
    return;
  }
  host.innerHTML = list.map(p => `
    <div class="list-row">
      <div>
        <div class="row-title">${p.name} ${p.active ? '' : '<span class="pill pill-inactive">nonaktif</span>'}</div>
        <div class="row-sub">${p.cat} · /${p.unit} · ${p.track ? 'stok ' + p.stock : 'tanpa tracking'}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <div class="row-amount">${rupiah(p.price)}</div>
        <div class="row-actions">
          <button class="icon-btn sm" data-edit="${p.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
          </button>
          <button class="icon-btn sm" data-del="${p.id}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
          </button>
        </div>
      </div>
    </div>`).join('');
  $$('[data-edit]').forEach(b => b.onclick = e => { e.stopPropagation(); productForm(parseInt(b.dataset.edit)); });
  $$('[data-del]').forEach(b => b.onclick = e => {
    e.stopPropagation();
    const id = parseInt(b.dataset.del);
    const p = state.products.find(x => x.id === id);
    confirmModal('Hapus produk?', `"${p.name}" akan dihapus permanen. Histori transaksi tetap aman.`, 'Hapus', () => {
      state.products = state.products.filter(x => x.id !== id);
      renderProdList();
      toast('Produk dihapus');
    });
  });
}

function productForm(id) {
  const p = id ? state.products.find(x => x.id === id) : null;
  const isEdit = !!p;
  const data = p || { name: '', price: 0, unit: '', cat: state.categories[0]?.name || '', stock: 0, low: 5, track: true, active: true };
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:16px">${isEdit ? 'Edit produk' : 'Produk baru'}</h3>
    <div class="form-page">
      <label class="field"><span>Nama produk</span><input type="text" id="p-name" value="${data.name}" /></label>
      <div class="form-row">
        <label class="field"><span>Kategori</span>
          <select id="p-cat">${state.categories.map(c => `<option ${c.name===data.cat?'selected':''}>${c.name}</option>`).join('')}</select>
        </label>
        <label class="field"><span>Unit</span><input type="text" id="p-unit" value="${data.unit}" placeholder="porsi / cup" /></label>
      </div>
      <label class="field"><span>Harga jual (Rp)</span><input type="number" id="p-price" value="${data.price}" step="500" min="0" /></label>
      <div class="switch-row">
        <div><div style="font-weight:500">Stock tracking</div><div class="muted small">Pantau stok & notifikasi low stock</div></div>
        <button class="switch ${data.track ? 'on' : ''}" id="p-track"></button>
      </div>
      <div id="p-stock-section" ${data.track ? '' : 'hidden'}>
        <div class="form-row">
          <label class="field"><span>Stok saat ini</span><input type="number" id="p-stock" value="${data.stock}" min="0" /></label>
          <label class="field"><span>Batas low stock</span><input type="number" id="p-low" value="${data.low}" min="0" /></label>
        </div>
      </div>
      <div class="switch-row">
        <div><div style="font-weight:500">Aktif</div><div class="muted small">Nonaktif tidak muncul di POS</div></div>
        <button class="switch ${data.active ? 'on' : ''}" id="p-active"></button>
      </div>
      <div class="form-actions">
        <button class="btn btn-ghost" id="p-cancel">Batal</button>
        <button class="btn btn-primary" id="p-save">${isEdit ? 'Simpan' : 'Tambah'}</button>
      </div>
    </div>
  `);
  let track = data.track, active = data.active;
  $('#p-track').onclick = e => { track = !track; e.target.classList.toggle('on', track); $('#p-stock-section').hidden = !track; };
  $('#p-active').onclick = e => { active = !active; e.target.classList.toggle('on', active); };
  $('#p-cancel').onclick = closeSheet;
  $('#p-save').onclick = () => {
    const name = $('#p-name').value.trim();
    const price = parseInt($('#p-price').value) || 0;
    if (!name || price <= 0) return toast('Nama dan harga wajib diisi', 'error');
    const obj = {
      name, price,
      unit: $('#p-unit').value.trim() || 'pcs',
      cat: $('#p-cat').value, track,
      stock: track ? parseInt($('#p-stock').value) || 0 : 0,
      low: track ? parseInt($('#p-low').value) || 0 : 0,
      active,
    };
    if (isEdit) Object.assign(p, obj);
    else state.products.push({ id: Date.now(), ...obj });
    closeSheet();
    renderProdList();
    toast(isEdit ? 'Produk diperbarui' : 'Produk ditambahkan', 'success');
  };
}

/* CATEGORIES */
function pageCategories() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Kategori</h2><div class="sub">${state.categories.length} kategori</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="tx-list">
        ${state.categories.map(c => {
          const used = state.products.filter(p => p.cat === c.name).length;
          return `
            <div class="list-row">
              <div><div class="row-title">${c.name}</div><div class="row-sub">${used} produk</div></div>
              <div class="row-actions">
                <button class="icon-btn sm" data-edit="${c.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button class="icon-btn sm" data-del="${c.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                </button>
              </div>
            </div>`;
        }).join('')}
      </div>
      <button class="fab" id="add-cat">+</button>
    `;
    $('#back-home').onclick = backHome;
    $('#add-cat').onclick = () => {
      promptModal('Kategori baru', 'Nama kategori', '', v => {
        if (!v.trim()) return;
        state.categories.push({ id: Date.now(), name: v.trim(), active: true });
        render();
        toast('Kategori ditambahkan', 'success');
      });
    };
    $$('[data-edit]').forEach(b => b.onclick = () => {
      const c = state.categories.find(x => x.id === parseInt(b.dataset.edit));
      promptModal('Edit kategori', 'Nama', c.name, v => {
        if (!v.trim()) return;
        const oldName = c.name;
        c.name = v.trim();
        state.products.forEach(p => { if (p.cat === oldName) p.cat = c.name; });
        render();
      });
    });
    $$('[data-del]').forEach(b => b.onclick = () => {
      const c = state.categories.find(x => x.id === parseInt(b.dataset.del));
      const used = state.products.filter(p => p.cat === c.name).length;
      if (used > 0) return toast(`Tidak bisa hapus · ${used} produk pakai kategori ini`, 'error');
      confirmModal('Hapus kategori?', `"${c.name}" akan dihapus.`, 'Hapus', () => {
        state.categories = state.categories.filter(x => x.id !== c.id);
        render();
      });
    });
  };
  render();
}

/* INVENTORY */
function pageInventory() {
  const main = $('#main');
  const render = () => {
    const tracked = state.products.filter(p => p.track);
    const low = tracked.filter(p => p.stock > 0 && p.stock <= p.low);
    const out = tracked.filter(p => p.stock === 0);
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Stok</h2><div class="sub">${tracked.length} produk dilacak</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="kpi-compact">
        <div><div class="label">Low stock</div><div class="amount" style="color:var(--warn)">${low.length}</div></div>
        <div><div class="label">Out of stock</div><div class="amount" style="color:var(--alert)">${out.length}</div></div>
      </div>
      <div class="tx-list">
        ${tracked.map(p => {
          let badge = '';
          if (p.stock === 0) badge = '<span class="stock-badge out" style="position:static">Habis</span>';
          else if (p.stock <= p.low) badge = '<span class="stock-badge low" style="position:static">Low</span>';
          return `
            <div class="list-row">
              <div>
                <div class="row-title">${p.name} ${badge}</div>
                <div class="row-sub">${p.cat} · low threshold ${p.low}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="row-amount">${p.stock} ${p.unit}</div>
                <div class="row-actions">
                  <button class="icon-btn sm" data-adjust="${p.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
            </div>`;
        }).join('') || '<div class="empty"><div class="empty-title">Belum ada produk tracked</div></div>'}
      </div>
    `;
    $('#back-home').onclick = backHome;
    $$('[data-adjust]').forEach(b => b.onclick = () => {
      const p = state.products.find(x => x.id === parseInt(b.dataset.adjust));
      openSheet(`
        <h3 style="font-size:17px;margin-bottom:4px">${p.name}</h3>
        <p class="muted small" style="margin:0 0 16px">Stok saat ini: ${p.stock} ${p.unit}</p>
        <div class="form-row" style="margin-bottom:12px">
          <button class="btn btn-ghost" id="mode-plus">+ Tambah</button>
          <button class="btn btn-primary" id="mode-minus">− Kurang</button>
        </div>
        <label class="field"><span>Jumlah</span><input type="number" id="adj-qty" min="1" value="1" /></label>
        <div class="form-actions" style="margin-top:16px">
          <button class="btn btn-ghost" id="adj-cancel">Batal</button>
          <button class="btn btn-primary" id="adj-save">Simpan</button>
        </div>
      `);
      let mode = 'minus';
      $('#mode-plus').onclick = () => { mode = 'plus'; $('#mode-plus').className = 'btn btn-primary'; $('#mode-minus').className = 'btn btn-ghost'; };
      $('#mode-minus').onclick = () => { mode = 'minus'; $('#mode-minus').className = 'btn btn-primary'; $('#mode-plus').className = 'btn btn-ghost'; };
      $('#adj-cancel').onclick = closeSheet;
      $('#adj-save').onclick = () => {
        const qty = parseInt($('#adj-qty').value) || 0;
        if (qty <= 0) return toast('Jumlah harus > 0', 'error');
        if (mode === 'minus' && qty > p.stock) return toast('Stok tidak cukup', 'error');
        p.stock = mode === 'plus' ? p.stock + qty : p.stock - qty;
        closeSheet();
        render();
        toast('Stok disesuaikan', 'success');
      };
    });
  };
  render();
}

/* OUTLETS */
function pageOutlets() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Outlet</h2><div class="sub">${state.outlets.length} outlet</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="tx-list">
        ${state.outlets.map(o => `
          <div class="list-row">
            <div>
              <div class="row-title">${o.name} ${o.active ? '<span class="pill pill-active">aktif</span>' : '<span class="pill pill-inactive">nonaktif</span>'}</div>
              <div class="row-sub">${o.address}</div>
            </div>
            <div class="row-actions">
              <button class="icon-btn sm" data-edit="${o.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
              <button class="icon-btn sm" data-del="${o.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
              </button>
            </div>
          </div>`).join('')}
      </div>
      <button class="fab" id="add-outlet">+</button>
    `;
    $('#back-home').onclick = backHome;
    $('#add-outlet').onclick = () => outletForm(null);
    $$('[data-edit]').forEach(b => b.onclick = () => outletForm(parseInt(b.dataset.edit)));
    $$('[data-del]').forEach(b => b.onclick = () => {
      const o = state.outlets.find(x => x.id === parseInt(b.dataset.del));
      if (state.outlets.length <= 1) return toast('Minimal 1 outlet', 'error');
      confirmModal('Hapus outlet?', `"${o.name}" akan dihapus.`, 'Hapus', () => {
        state.outlets = state.outlets.filter(x => x.id !== o.id);
        render();
      });
    });
  };
  render();
}

function outletForm(id) {
  const o = id ? state.outlets.find(x => x.id === id) : null;
  const isEdit = !!o;
  const data = o || { name: '', address: '', phone: '', active: true };
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:16px">${isEdit ? 'Edit outlet' : 'Outlet baru'}</h3>
    <div class="form-page">
      <label class="field"><span>Nama outlet</span><input type="text" id="o-name" value="${data.name}" /></label>
      <label class="field"><span>Alamat</span><input type="text" id="o-address" value="${data.address}" /></label>
      <label class="field"><span>Nomor kontak</span><input type="tel" id="o-phone" value="${data.phone || ''}" /></label>
      <div class="switch-row">
        <div style="font-weight:500">Aktif</div>
        <button class="switch ${data.active ? 'on' : ''}" id="o-active"></button>
      </div>
      <div class="form-actions">
        <button class="btn btn-ghost" id="o-cancel">Batal</button>
        <button class="btn btn-primary" id="o-save">${isEdit ? 'Simpan' : 'Tambah'}</button>
      </div>
    </div>
  `);
  let active = data.active;
  $('#o-active').onclick = e => { active = !active; e.target.classList.toggle('on', active); };
  $('#o-cancel').onclick = closeSheet;
  $('#o-save').onclick = () => {
    const name = $('#o-name').value.trim();
    if (!name) return toast('Nama outlet wajib diisi', 'error');
    const obj = { name, address: $('#o-address').value.trim(), phone: $('#o-phone').value.trim(), active };
    if (isEdit) Object.assign(o, obj);
    else state.outlets.push({ id: Date.now(), ...obj });
    closeSheet();
    pageOutlets();
    toast('Outlet tersimpan', 'success');
  };
}

/* WORKERS */
function pageWorkers() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Kasir</h2><div class="sub">${state.workers.length} pekerja</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="tx-list">
        ${state.workers.map(w => `
          <div class="list-row">
            <div>
              <div class="row-title">${w.displayName} ${w.active ? '<span class="pill pill-active">aktif</span>' : '<span class="pill pill-inactive">nonaktif</span>'}</div>
              <div class="row-sub">@${w.username} · ${w.outlet}${w.whatsapp ? ' · ' + w.whatsapp : ''}</div>
            </div>
            <div class="row-actions">
              <button class="icon-btn sm" data-edit="${w.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
              </button>
              <button class="icon-btn sm" data-toggle="${w.id}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </button>
            </div>
          </div>`).join('')}
      </div>
      <button class="fab" id="add-worker">+</button>
    `;
    $('#back-home').onclick = backHome;
    $('#add-worker').onclick = () => workerForm(null);
    $$('[data-edit]').forEach(b => b.onclick = () => workerForm(parseInt(b.dataset.edit)));
    $$('[data-toggle]').forEach(b => b.onclick = () => {
      const w = state.workers.find(x => x.id === parseInt(b.dataset.toggle));
      w.active = !w.active;
      render();
      toast(w.active ? 'Kasir diaktifkan' : 'Kasir dinonaktifkan');
    });
  };
  render();
}

function workerForm(id) {
  const w = id ? state.workers.find(x => x.id === id) : null;
  const isEdit = !!w;
  const data = w || { username: '', displayName: '', outlet: state.outlets[0]?.name || '', whatsapp: '', active: true };
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:16px">${isEdit ? 'Edit kasir' : 'Kasir baru'}</h3>
    <div class="form-page">
      <label class="field"><span>Nama tampilan</span><input type="text" id="w-name" value="${data.displayName}" /></label>
      <label class="field"><span>Username</span><input type="text" id="w-user" value="${data.username}" ${isEdit ? 'disabled' : ''} /></label>
      <label class="field"><span>Outlet</span>
        <select id="w-outlet">${state.outlets.map(o => `<option ${o.name===data.outlet?'selected':''}>${o.name}</option>`).join('')}</select>
      </label>
      <label class="field"><span>Nomor WhatsApp (opsional)</span><input type="tel" id="w-wa" value="${data.whatsapp || ''}" /></label>
      <div class="switch-row">
        <div style="font-weight:500">Akun aktif</div>
        <button class="switch ${data.active ? 'on' : ''}" id="w-active"></button>
      </div>
      <div class="form-actions">
        <button class="btn btn-ghost" id="w-cancel">Batal</button>
        <button class="btn btn-primary" id="w-save">${isEdit ? 'Simpan' : 'Tambah'}</button>
      </div>
    </div>
  `);
  let active = data.active;
  $('#w-active').onclick = e => { active = !active; e.target.classList.toggle('on', active); };
  $('#w-cancel').onclick = closeSheet;
  $('#w-save').onclick = () => {
    const displayName = $('#w-name').value.trim();
    const username = $('#w-user').value.trim();
    if (!displayName || !username) return toast('Nama dan username wajib', 'error');
    const obj = { displayName, username, outlet: $('#w-outlet').value, whatsapp: $('#w-wa').value.trim(), active };
    if (isEdit) Object.assign(w, obj);
    else state.workers.push({ id: Date.now(), ...obj });
    closeSheet();
    pageWorkers();
    toast('Kasir tersimpan', 'success');
  };
}

/* QRIS */
function pageQRIS() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>QRIS</h2><div class="sub">Pengaturan pembayaran QR</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="form-section">
        <div style="text-align:center;padding:24px;border:1px dashed var(--border-strong);border-radius:var(--radius)">
          ${state.settings.qris.image
            ? `<div style="font-size:12px">QRIS ${state.outlet.name}</div>`
            : `<div style="color:var(--text-faint);font-size:13px">Belum ada gambar QRIS</div>`}
        </div>
        <div class="switch-row">
          <div><div style="font-weight:500">Aktifkan QRIS</div><div class="muted small">Muncul sebagai metode bayar di POS</div></div>
          <button class="switch ${state.settings.qris.active ? 'on' : ''}" id="q-active"></button>
        </div>
        <div class="form-actions">
          <button class="btn btn-ghost" id="q-upload">${state.settings.qris.image ? 'Ganti QR' : 'Upload QR'}</button>
          ${state.settings.qris.image ? '<button class="btn btn-danger" id="q-del">Hapus</button>' : ''}
        </div>
      </div>
    `;
    $('#back-home').onclick = backHome;
    $('#q-active').onclick = e => {
      state.settings.qris.active = !state.settings.qris.active;
      e.target.classList.toggle('on', state.settings.qris.active);
    };
    $('#q-upload').onclick = () => {
      state.settings.qris.image = 'qris.png';
      render();
      toast('QRIS diunggah', 'success');
    };
    if ($('#q-del')) {
      $('#q-del').onclick = () => confirmModal('Hapus QRIS?', 'QRIS tidak akan tampil di POS.', 'Hapus', () => {
        state.settings.qris.image = null;
        render();
      });
    }
  };
  render();
}

/* PRINTER SETTINGS */
function pagePrinterSettings() {
  const main = $('#main');
  const render = () => {
    const p = state.settings.printer;
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Printer</h2><div class="sub">Bluetooth thermal</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="form-section">
        <div class="switch-row" style="padding:0">
          <div>
            <div style="font-weight:500">${p.connected ? p.device : 'Belum terhubung'}</div>
            <div class="muted small">${p.connected ? 'Siap mencetak struk' : 'Tap tombol untuk cari printer'}</div>
          </div>
          <span class="sync-dot" data-status="${p.connected ? 'synced' : 'error'}"></span>
        </div>
        <div class="form-actions">
          ${p.connected
            ? `<button class="btn btn-ghost" id="pr-test">Test print</button>
               <button class="btn btn-danger" id="pr-disc">Putuskan</button>`
            : `<button class="btn btn-primary" id="pr-scan">Cari printer</button>`}
        </div>
      </div>
    `;
    $('#back-home').onclick = backHome;
    if ($('#pr-scan')) $('#pr-scan').onclick = () => {
      toast('Mencari printer…');
      setTimeout(() => {
        state.settings.printer.connected = true;
        render();
        toast('SK-Printer-58mm terhubung', 'success');
      }, 1200);
    };
    if ($('#pr-disc')) $('#pr-disc').onclick = () => {
      state.settings.printer.connected = false;
      render();
      toast('Printer diputus');
    };
    if ($('#pr-test')) $('#pr-test').onclick = () => toast('Test print terkirim');
  };
  render();
}

/* RECEIPT SETTINGS */
function pageReceiptSettings() {
  const main = $('#main');
  const r = state.settings.receipt;
  const render = () => {
    const preview = `${r.bizName}
──────────────────────────
${r.showTxNumber ? 'TRX-20261006-0042' : ''}
06 Okt 2026 · 14:32
${r.showOutlet ? state.outlet.name : ''}
${r.showCashier ? 'Kasir: Andi' : ''}
──────────────────────────
Kopi Susu   2× 18.000
            36.000
──────────────────────────
Subtotal        36.000
${r.showPayment ? 'Cash            50.000' : ''}
${r.showChange ? 'Kembali         14.000' : ''}
──────────────────────────
${r.footer}`.trim();
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Struk</h2><div class="sub">Format & konten</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="form-section">
        <label class="field"><span>Nama bisnis (header)</span><input type="text" id="r-biz" value="${r.bizName}" /></label>
        <div class="switch-row"><div style="font-weight:500">Tampilkan outlet</div><button class="switch ${r.showOutlet?'on':''}" data-sw="showOutlet"></button></div>
        <div class="switch-row"><div style="font-weight:500">Tampilkan nomor transaksi</div><button class="switch ${r.showTxNumber?'on':''}" data-sw="showTxNumber"></button></div>
        <div class="switch-row"><div style="font-weight:500">Tampilkan kasir</div><button class="switch ${r.showCashier?'on':''}" data-sw="showCashier"></button></div>
        <div class="switch-row"><div style="font-weight:500">Tampilkan metode bayar</div><button class="switch ${r.showPayment?'on':''}" data-sw="showPayment"></button></div>
        <div class="switch-row"><div style="font-weight:500">Tampilkan kembalian</div><button class="switch ${r.showChange?'on':''}" data-sw="showChange"></button></div>
        <label class="field"><span>Footer (max 120 karakter)</span><input type="text" id="r-footer" value="${r.footer}" maxlength="120" /></label>
      </div>
      <div class="section-title">Preview struk</div>
      <div class="receipt">${preview}</div>
      <div class="form-actions" style="margin-top:16px">
        <button class="btn btn-primary btn-block" id="r-save">Simpan</button>
      </div>
    `;
    $('#back-home').onclick = backHome;
    $$('[data-sw]').forEach(b => b.onclick = e => {
      r[b.dataset.sw] = !r[b.dataset.sw];
      e.target.classList.toggle('on', r[b.dataset.sw]);
      render();
    });
    $('#r-biz').oninput = e => { r.bizName = e.target.value; };
    $('#r-footer').oninput = e => { r.footer = e.target.value; };
    $('#r-save').onclick = () => {
      r.bizName = $('#r-biz').value;
      r.footer = $('#r-footer').value;
      toast('Pengaturan struk disimpan', 'success');
    };
  };
  render();
}

/* NOTIF SETTINGS */
function pageNotifSettings() {
  const main = $('#main');
  const n = state.settings.notifications;
  main.innerHTML = `
    <div class="page-head">
      <div><h2>Notifikasi</h2><div class="sub">Preferensi</div></div>
      <button class="btn btn-ghost" id="back-home">← Beranda</button>
    </div>
    <div class="form-section">
      <div class="switch-row"><div style="font-weight:500">Stok menipis</div><button class="switch ${n.lowStock?'on':''}" data-n="lowStock"></button></div>
      <div class="switch-row"><div style="font-weight:500">Stok habis</div><button class="switch ${n.outOfStock?'on':''}" data-n="outOfStock"></button></div>
      <div class="switch-row"><div style="font-weight:500">Sistem</div><button class="switch ${n.system?'on':''}" data-n="system"></button></div>
    </div>
  `;
  $('#back-home').onclick = backHome;
  $$('[data-n]').forEach(b => b.onclick = e => {
    n[b.dataset.n] = !n[b.dataset.n];
    e.target.classList.toggle('on', n[b.dataset.n]);
  });
}

/* SYNC SETTINGS */
function pageSyncSettings() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Sinkronisasi</h2><div class="sub">Status & queue</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="form-section">
        <div class="shift-row"><span class="lbl">Status</span><span class="val">${state.online ? 'Online' : 'Offline'}</span></div>
        <div class="shift-row"><span class="lbl">Pending</span><span class="val">${state.syncQueue.length}</span></div>
      </div>
      <div class="form-actions" style="margin-top:16px">
        <button class="btn btn-primary btn-block" id="sync-now-btn" ${!state.online ? 'disabled' : ''}>
          ${state.online ? 'Sync sekarang' : 'Offline'}
        </button>
      </div>
    `;
    $('#back-home').onclick = backHome;
    $('#sync-now-btn').onclick = () => {
      state.syncQueue = [];
      updateSyncIndicator();
      render();
      toast('Sinkronisasi selesai', 'success');
    };
  };
  render();
}

/* THEME SETTINGS */
function pageThemeSettings() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Tema</h2></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="form-section">
        ${['light', 'dark'].map(t => `
          <button class="list-row" data-theme="${t}">
            <div>
              <div class="row-title">${t === 'light' ? 'Terang' : 'Gelap'}</div>
              <div class="row-sub">${t === 'light' ? 'Cocok untuk ruangan terang' : 'Hemat mata di malam hari'}</div>
            </div>
            ${state.theme === t ? '<span style="color:var(--primary);font-weight:600">Aktif</span>' : ''}
          </button>`).join('')}
      </div>
    `;
    $('#back-home').onclick = backHome;
    $$('[data-theme]').forEach(b => b.onclick = () => { applyTheme(b.dataset.theme); render(); });
  };
  render();
}

/* PROFILE */
function pageProfile() {
  const main = $('#main');
  main.innerHTML = `
    <div class="page-head">
      <div><h2>Profil</h2></div>
      <button class="btn btn-ghost" id="back-home">← Beranda</button>
    </div>
    <div class="form-section">
      <div class="field"><span>Nama</span><input type="text" value="${state.user.displayName}" disabled /></div>
      <div class="field"><span>Username</span><input type="text" value="${state.user.username}" disabled /></div>
      <div class="field"><span>Role</span><input type="text" value="${state.user.role === 'owner' ? 'Owner' : 'Cashier'}" disabled /></div>
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn btn-ghost btn-block" id="p-logout">Keluar</button>
    </div>
  `;
  $('#back-home').onclick = backHome;
  $('#p-logout').onclick = handleLogout;
}

/* ABOUT */
function pageAbout() {
  const main = $('#main');
  main.innerHTML = `
    <div class="page-head">
      <div><h2>Tentang</h2></div>
      <button class="btn btn-ghost" id="back-home">← Beranda</button>
    </div>
    <div class="form-section">
      <div class="brand-mark" style="cursor:default">SK</div>
      <div style="font-weight:600;font-size:16px">SakuKasir</div>
      <div class="muted small">Versi prototipe · 2026</div>
      <p class="muted small" style="margin:12px 0 0">Point of Sale untuk usaha kecil dan menengah.</p>
    </div>
  `;
  $('#back-home').onclick = backHome;
}

/* REPORTS */
function renderReports(main) {
  let tab = 'summary';
  const TABS = [
    { id: 'summary', label: 'Ringkasan' },
    { id: 'outlet', label: 'Outlet' },
    { id: 'cashier', label: 'Kasir' },
    { id: 'daily', label: 'Harian' },
    { id: 'monthly', label: 'Bulanan' },
    { id: 'finance', label: 'Keuangan' },
    { id: 'expense', label: 'Pengeluaran' },
  ];

  const render = () => {
    const today = new Date().toISOString().slice(0, 10);
    const monthPrefix = today.slice(0, 7);
    const todayTx = state.transactions.filter(t => t.date === today);
    const monthTx = state.transactions.filter(t => t.date.startsWith(monthPrefix));
    const tx = tab === 'monthly' ? monthTx : todayTx;
    const sales = tx.reduce((s, t) => s + t.total, 0);
    const cash = tx.filter(t => t.method === 'cash').reduce((s, t) => s + t.total, 0);
    const qris = tx.filter(t => t.method === 'qris').reduce((s, t) => s + t.total, 0);
    const discount = tx.reduce((s, t) => s + (t.discount || 0), 0);
    const tax = tx.reduce((s, t) => s + (t.tax || 0), 0);
    const expense = state.expenses.reduce((s, e) => s + e.amount, 0);
    const net = sales - expense;
    const gross = sales + discount;
    const byOutlet = {};
    tx.forEach(t => { byOutlet[t.outlet] = (byOutlet[t.outlet] || 0) + t.total; });
    const byCashier = {};
    tx.forEach(t => { byCashier[t.cashier] = (byCashier[t.cashier] || 0) + t.total; });

    main.innerHTML = `
      <div class="page-head">
        <div><h2>Laporan</h2><div class="sub">Periode: ${tab === 'monthly' ? 'Bulan ini' : 'Hari ini'}</div></div>
        ${tab !== 'expense' ? '<button class="btn btn-ghost" id="export">Export XLSX</button>' : ''}
      </div>
      <div class="tabs">
        ${TABS.map(t => `<button data-tab="${t.id}" class="${tab === t.id ? 'active' : ''}">${t.label}</button>`).join('')}
      </div>
      ${tab === 'summary' ? `
        <div class="kpi-hero">
          <div class="label">Penjualan hari ini</div>
          <div class="amount">${rupiah(sales)}</div>
          <div class="delta">${tx.length} transaksi</div>
        </div>
        <div class="kpi-compact">
          <div><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
          <div><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
          <div><div class="label">Pengeluaran</div><div class="amount">${rupiah(expense)}</div></div>
          <div><div class="label">Laba bersih</div><div class="amount">${rupiah(net)}</div></div>
        </div>
      ` : ''}
      ${tab === 'outlet' ? `
        <div class="section-title">Penjualan per outlet</div>
        <div class="tx-list">
          ${Object.entries(byOutlet).map(([name, total]) => `
            <div class="list-row"><div class="row-title">${name}</div><div class="row-amount">${rupiah(total)}</div></div>
          `).join('') || '<div class="empty"><div class="empty-title">Belum ada data</div></div>'}
        </div>
      ` : ''}
      ${tab === 'cashier' ? `
        <div class="section-title">Penjualan per kasir</div>
        <div class="tx-list">
          ${Object.entries(byCashier).map(([name, total]) => `
            <div class="list-row"><div class="row-title">${name}</div><div class="row-amount">${rupiah(total)}</div></div>
          `).join('') || '<div class="empty"><div class="empty-title">Belum ada data</div></div>'}
        </div>
      ` : ''}
      ${tab === 'daily' ? `
        <div class="kpi-hero">
          <div class="label">Penjualan hari ini</div>
          <div class="amount">${rupiah(sales)}</div>
        </div>
        <div class="kpi-compact">
          <div><div class="label">Transaksi</div><div class="amount">${tx.length}</div></div>
          <div><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
          <div><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
          <div><div class="label">Pengeluaran</div><div class="amount">${rupiah(expense)}</div></div>
        </div>
      ` : ''}
      ${tab === 'monthly' ? `
        <div class="kpi-hero">
          <div class="label">Penjualan bulan ini</div>
          <div class="amount">${rupiah(sales)}</div>
          <div class="delta">${tx.length} transaksi</div>
        </div>
        <div class="kpi-compact">
          <div><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
          <div><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
          <div><div class="label">Pengeluaran</div><div class="amount">${rupiah(expense)}</div></div>
          <div><div class="label">Laba</div><div class="amount">${rupiah(sales - expense)}</div></div>
        </div>
      ` : ''}
      ${tab === 'finance' ? `
        <div class="section-title">Ringkasan keuangan</div>
        <div class="waterfall">
          <div class="shift-row"><span class="lbl">Gross sales</span><span class="val">${rupiah(gross)}</span></div>
          <div class="shift-row"><span class="lbl">Diskon</span><span class="val" style="color:var(--alert)">- ${rupiah(discount)}</span></div>
          <div class="shift-row"><span class="lbl">Pajak</span><span class="val" style="color:var(--alert)">- ${rupiah(tax)}</span></div>
          <div class="shift-row"><span class="lbl">Net sales</span><span class="val">${rupiah(sales)}</span></div>
          <div class="shift-row"><span class="lbl">Pengeluaran</span><span class="val" style="color:var(--alert)">- ${rupiah(expense)}</span></div>
          <div class="shift-row" style="border-top:1px solid var(--border);margin-top:4px;padding-top:10px">
            <span class="lbl" style="font-weight:600;color:var(--text)">Net profit</span>
            <span class="val" style="color:var(--primary);font-size:16px">${rupiah(net)}</span>
          </div>
        </div>
        <div class="kpi-compact">
          <div><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
          <div><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
        </div>
      ` : ''}
      ${tab === 'expense' ? `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px">
          <div>
            <div style="font-weight:600">Pengeluaran</div>
            <div class="muted small">${state.expenses.length} catatan</div>
          </div>
          <button class="btn btn-primary" id="add-exp-report" style="min-height:36px;padding:8px 14px;font-size:13px">+ Tambah</button>
        </div>
        <div class="kpi-hero">
          <div class="label">Total pengeluaran</div>
          <div class="amount amount-expense">${rupiah(expense)}</div>
        </div>
        <div class="kpi-compact" style="margin-bottom:16px">
          ${['Bahan','Operasional','Gaji','Lainnya'].map(cat => {
            const sum = state.expenses.filter(e => e.category === cat).reduce((s,e) => s + e.amount, 0);
            return `<div><div class="label">${cat}</div><div class="amount">${rupiah(sum)}</div></div>`;
          }).join('')}
        </div>
        <div class="tx-list">
          ${state.expenses.length ? state.expenses.map(e => `
            <div class="list-row">
              <div>
                <div class="row-title">${e.note || e.category}</div>
                <div class="row-sub">${e.category} · ${e.date} · ${e.by}</div>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div class="row-amount amount-expense">-${rupiah(e.amount)}</div>
                <div class="row-actions">
                  <button class="icon-btn sm" data-edit-exp="${e.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  </button>
                  <button class="icon-btn sm" data-del-exp="${e.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                  </button>
                </div>
              </div>
            </div>`).join('')
          : '<div class="empty"><div class="empty-title">Belum ada pengeluaran</div><div class="empty-sub">Tap tombol + Tambah untuk catat pengeluaran.</div></div>'}
        </div>
      ` : ''}
    `;

    $$('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; render(); });
    if ($('#export')) $('#export').onclick = () => toast('Export XLSX diproses backend', 'success');

    if (tab === 'expense') {
      const CATS = ['Bahan', 'Operasional', 'Gaji', 'Lainnya'];
      $('#add-exp-report').onclick = () => expForm(null, CATS, render);
      $$('[data-edit-exp]').forEach(b => b.onclick = () => expForm(b.getAttribute('data-edit-exp'), CATS, render));
      $$('[data-del-exp]').forEach(b => b.onclick = () => {
        const id = b.getAttribute('data-del-exp');
        const e = state.expenses.find(x => x.id === id);
        if (!e) return;
        confirmModal('Hapus pengeluaran?', `"${e.note || e.category}" akan dihapus.`, 'Hapus', () => {
          state.expenses = state.expenses.filter(x => x.id !== e.id);
          render();
          toast('Pengeluaran dihapus');
        });
      });
    }
  };
  render();
}

function expForm(id, CATS, onDone) {
  const e = id ? state.expenses.find(x => x.id === id) : null;
  const isEdit = !!e;
  const data = e || { amount: 0, category: CATS[0], note: '', date: nowDateTime() };
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:16px">${isEdit ? 'Edit pengeluaran' : 'Pengeluaran baru'}</h3>
    <div class="form-page">
      <label class="field"><span>Nominal (Rp)</span><input type="number" id="e-amount" value="${data.amount}" step="1000" min="0" /></label>
      <label class="field"><span>Kategori</span>
        <select id="e-cat">${CATS.map(c => `<option ${c===data.category?'selected':''}>${c}</option>`).join('')}</select>
      </label>
      <label class="field"><span>Catatan</span><input type="text" id="e-note" value="${data.note}" placeholder="Deskripsi singkat" /></label>
      <div class="form-actions">
        <button class="btn btn-ghost" id="e-cancel">Batal</button>
        <button class="btn btn-primary" id="e-save">${isEdit ? 'Simpan' : 'Tambah'}</button>
      </div>
    </div>
  `);
  $('#e-cancel').onclick = closeSheet;
  $('#e-save').onclick = () => {
    const amount = parseInt($('#e-amount').value) || 0;
    if (amount <= 0) return toast('Nominal harus > 0', 'error');
    const obj = {
      amount,
      category: $('#e-cat').value,
      note: $('#e-note').value.trim(),
      date: isEdit ? data.date : nowDateTime(),
      by: state.user.displayName,
    };
    if (isEdit) Object.assign(e, obj);
    else state.expenses.push({ id: uid('EXP'), ...obj });
    closeSheet();
    if (typeof onDone === 'function') onDone();
    toast('Pengeluaran disimpan', 'success');
  };
}

/* HEADER ACTIONS */
function updateSyncIndicator() {
  const dot = $('#sync-indicator .sync-dot');
  const banner = $('#offline-banner');
  const text = $('#offline-text');
  const pending = state.syncQueue.length;
  if (!state.online) {
    dot.dataset.status = 'pending';
    banner.hidden = false;
    text.textContent = `Mode offline · ${pending} transaksi menunggu`;
  } else if (pending > 0) {
    dot.dataset.status = 'pending';
    banner.hidden = false;
    text.textContent = `${pending} transaksi menunggu sinkron`;
  } else {
    dot.dataset.status = 'synced';
    banner.hidden = true;
  }
}

$('#sync-indicator').onclick = () => {
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:4px">Sinkronisasi</h3>
    <p class="muted small" style="margin:0 0 12px">Status: ${state.online ? 'Online' : 'Offline'}</p>
    <div class="shift-rows">
      <div class="shift-row"><span class="lbl">Pending</span><span class="val">${state.syncQueue.length}</span></div>
    </div>
    <div style="display:grid;gap:8px;margin-top:12px">
      <button class="btn btn-primary btn-block" id="do-sync" ${!state.online ? 'disabled' : ''}>${state.online ? 'Sync sekarang' : 'Offline'}</button>
      <button class="btn btn-ghost btn-block" id="toggle-online">${state.online ? 'Simulasikan offline' : 'Simulasikan online'}</button>
    </div>
  `);
  $('#do-sync').onclick = () => {
    if (!state.online) return toast('Tidak bisa sync saat offline', 'error');
    state.syncQueue = [];
    updateSyncIndicator();
    closeSheet();
    toast('Sinkronisasi selesai', 'success');
  };
  $('#toggle-online').onclick = () => {
    state.online = !state.online;
    updateSyncIndicator();
    closeSheet();
    toast(state.online ? 'Kembali online' : 'Mode offline aktif');
  };
};

$('#sync-now-inline').onclick = () => {
  if (!state.online) return toast('Tidak bisa sync saat offline', 'error');
  state.syncQueue = [];
  updateSyncIndicator();
  toast('Sinkronisasi selesai', 'success');
};

$('#printer-indicator').onclick = () => {
  if (state.user && state.user.role === 'owner') {
    pagePrinterSettings();
  } else {
    openSheet(`
      <h3 style="font-size:17px;margin-bottom:4px">Printer Bluetooth</h3>
      <p class="muted small" style="margin:0 0 16px">${state.settings.printer.connected ? 'Terhubung: ' + state.settings.printer.device : 'Belum ada printer terhubung'}</p>
      <div style="display:grid;gap:8px">
        ${state.settings.printer.connected
          ? `<button class="btn btn-ghost btn-block" id="test-print-c">Test print</button>
             <button class="btn btn-danger btn-block" id="disconnect-c">Putuskan</button>`
          : `<button class="btn btn-primary btn-block" id="scan-printer-c">Cari printer</button>`}
      </div>
    `);
    const scan = $('#scan-printer-c');
    if (scan) scan.onclick = () => {
      toast('Mencari printer…');
      setTimeout(() => {
        state.settings.printer.connected = true;
        closeSheet();
        toast('SK-Printer-58mm terhubung', 'success');
      }, 1200);
    };
    const disc = $('#disconnect-c');
    if (disc) disc.onclick = () => {
      state.settings.printer.connected = false;
      closeSheet();
      toast('Printer diputus');
    };
    const tp = $('#test-print-c');
    if (tp) tp.onclick = () => toast('Test print terkirim');
  }
};

$('#notif-btn').onclick = () => {
  const list = state.notifications;
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:12px">Notifikasi</h3>
    ${list.length ? `<div class="tx-list">
      ${list.map(n => `
        <div class="tx-item" style="grid-template-columns:1fr">
          <div class="tx-id" style="color:${n.type === 'stock_low' ? 'var(--warn)' : n.type === 'out_of_stock' ? 'var(--alert)' : 'var(--primary)'}">
            ${n.type === 'stock_low' ? '⚠ STOK MENIPIS' : n.type === 'out_of_stock' ? '⚠ STOK HABIS' : 'ℹ SISTEM'}
          </div>
          <div style="font-weight:500">${n.title}</div>
          <div class="muted small">${n.body} · ${n.time}</div>
        </div>`).join('')}
    </div>` : '<div class="empty"><div class="empty-title">Tidak ada notifikasi</div></div>'}
  `);
  $('#notif-dot').style.display = 'none';
};

$('#theme-btn').onclick = () => {
  const next = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  toast(`Tema: ${next === 'dark' ? 'Gelap' : 'Terang'}`);
};

$('#outlet-chip').onclick = () => {
  openSheet(`
    <h3 style="font-size:17px;margin-bottom:12px">Pilih outlet</h3>
    <div class="tx-list">
      ${state.outlets.filter(o => o.active).map(o => `
        <button class="list-row" data-outlet="${o.name}">
          <div><div class="row-title">${o.name}</div><div class="row-sub">${o.address}</div></div>
          ${state.outlet.name === o.name ? '<span style="color:var(--primary);font-weight:600">Aktif</span>' : ''}
        </button>`).join('')}
    </div>
  `);
  $$('[data-outlet]').forEach(b => b.onclick = () => {
    const o = state.outlets.find(x => x.name === b.dataset.outlet);
    state.outlet = o;
    $('#outlet-name').textContent = o.name;
    state.settings.receipt.bizName = o.name;
    closeSheet();
    toast('Outlet diganti: ' + o.name);
  });
};

$('#sheet-backdrop').onclick = closeSheet;

/* PRINT RECEIPT */
function printReceipt(tx) {
  const r = state.settings.receipt;
  const lines = [];
  lines.push(r.bizName);
  lines.push('─'.repeat(26));
  if (r.showTxNumber) lines.push(tx.id);
  lines.push(`${tx.date} · ${tx.time}`);
  if (r.showOutlet) lines.push(tx.outlet);
  if (r.showCashier) lines.push('Kasir: ' + tx.cashier);
  lines.push('─'.repeat(26));
  tx.items.forEach(i => {
    lines.push(`${i.name}`);
    lines.push(`  ${i.qty}×${i.price}    ${i.price * i.qty}`);
  });
  lines.push('─'.repeat(26));
  const subtotal = tx.items.reduce((s, i) => s + i.price * i.qty, 0);
  lines.push(`Subtotal        ${subtotal}`);
  if (tx.discount) lines.push(`Diskon         -${tx.discount}`);
  if (tx.tax) lines.push(`Pajak ${tx.taxPct}%      ${tx.tax}`);
  lines.push(`Total           ${tx.total}`);
  if (r.showPayment) lines.push(`${tx.method === 'cash' ? 'Cash' : 'QRIS'}            ${tx.received || tx.total}`);
  if (r.showChange && tx.method === 'cash') lines.push(`Kembali         ${tx.change}`);
  lines.push('─'.repeat(26));
  lines.push(r.footer);
  const text = lines.join('\n');
  const host = $('#receipt-host');
  host.innerHTML = `
    <div class="modal-backdrop" id="rc-bd">
      <div class="modal" style="max-width:360px">
        <h3 style="font-size:15px;margin-bottom:12px">Preview struk</h3>
        <div class="receipt">${text.replace(/</g,'&lt;')}</div>
        <div class="modal-actions" style="margin-top:16px">
          <button class="btn btn-ghost" id="rc-close">Tutup</button>
          <button class="btn btn-primary" id="rc-print">Cetak</button>
        </div>
      </div>
    </div>`;
  const close = () => (host.innerHTML = '');
  $('#rc-close').onclick = close;
  $('#rc-bd').onclick = e => { if (e.target.id === 'rc-bd') close(); };
  $('#rc-print').onclick = () => { close(); toast('Struk terkirim ke printer', 'success'); };
}

/* INIT */
updateSyncIndicator();