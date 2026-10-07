// PERMISSIONS
const PERMISSIONS = [
  { id: 'pos',          label: 'POS',                desc: 'Buat transaksi penjualan' },
  { id: 'dashboard',    label: 'Dashboard',          desc: 'Ringkasan penjualan kasir' },
  { id: 'transactions', label: 'Transaksi',          desc: 'Lihat riwayat transaksi sendiri' },
  { id: 'shift',        label: 'Shift',              desc: 'Mulai & tutup shift' },
  { id: 'expense',      label: 'Pengeluaran',        desc: 'Catat & kelola pengeluaran' },
  { id: 'void',         label: 'Void Transaksi',     desc: 'Batalkan transaksi sendiri' },
  { id: 'refund',       label: 'Refund Transaksi',   desc: 'Refund transaksi sendiri' },
  { id: 'printer',      label: 'Printer',            desc: 'Setup & cetak struk Bluetooth' },
  { id: 'sync',         label: 'Sinkronisasi',       desc: 'Status & manual sync' },
  { id: 'theme',        label: 'Ganti Tema',         desc: 'Terang / gelap' },
  { id: 'profile',      label: 'Profil',             desc: 'Lihat info akun sendiri' },
];

// STATE
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
  auditLog: [],
  activeView: 'pos',
  ownerTab: 'pos',
  transactions: [
    { id: 'TRX-20261006-0042', time: '14:32', date: '2026-10-06', createdAt: Date.now() - 3600000, items: [{ name: 'Kopi Susu', qty: 2, price: 18000 }], total: 38000, method: 'cash', sync: 'synced', cashier: 'Andi', cashierId: 'kasir', outlet: 'Toko Berkah', discount: 0, tax: 0, received: 50000, change: 12000, status: 'completed' },
    { id: 'TRX-20261006-0041', time: '14:05', date: '2026-10-06', createdAt: Date.now() - 5000000, items: [{ name: 'Teh Manis', qty: 1, price: 8000 }], total: 18000, method: 'qris', sync: 'synced', cashier: 'Andi', cashierId: 'kasir', outlet: 'Toko Berkah', discount: 0, tax: 0, status: 'completed' },
    { id: 'TRX-20261006-0040', time: '13:48', date: '2026-10-06', createdAt: Date.now() - 7000000, items: [{ name: 'Nasi Goreng', qty: 3, price: 25000 }], total: 97000, method: 'cash', sync: 'pending', cashier: 'Andi', cashierId: 'kasir', outlet: 'Toko Berkah', discount: 2000, tax: 0, received: 100000, change: 3000, status: 'completed' },
    { id: 'TRX-20261006-0039', time: '13:12', date: '2026-10-06', createdAt: Date.now() - 9000000, items: [{ name: 'Roti Bakar', qty: 2, price: 15000 }], total: 33000, method: 'cash', sync: 'synced', cashier: 'Andi', cashierId: 'kasir', outlet: 'Toko Berkah', discount: 0, tax: 0, received: 50000, change: 17000, status: 'completed' },
    { id: 'TRX-20261006-0038', time: '12:55', date: '2026-10-06', createdAt: Date.now() - 11000000, items: [{ name: 'Es Krim', qty: 4, price: 10000 }], total: 62000, method: 'qris', sync: 'error', cashier: 'Andi', cashierId: 'kasir', outlet: 'Toko Berkah', discount: 0, tax: 0, status: 'completed' },
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
    { id: 1, username: 'kasir', displayName: 'Andi Wijaya', outlet: 'Toko Berkah', whatsapp: '0812-5555-6666', active: true, password: 'kasir123',
      permissions: ['pos','dashboard','transactions','shift','expense','void','refund','printer','sync','theme','profile'] },
    { id: 2, username: 'kasir2', displayName: 'Siti Aminah', outlet: 'Cabang Pasar', whatsapp: '0812-7777-8888', active: true, password: 'kasir123',
      permissions: ['pos','transactions','shift','printer','sync','theme','profile'] },
    { id: 3, username: 'kasir3', displayName: 'Rudi Hartono', outlet: 'Toko Berkah', whatsapp: '', active: false, password: 'kasir123',
      permissions: ['pos','printer','theme','profile'] },
  ],
  notifications: [
    { id: 1, type: 'stock_low', title: 'Stok menipis', body: 'Teh Manis · sisa 3', time: '14:00', read: false },
    { id: 2, type: 'stock_low', title: 'Stok menipis', body: 'Mie Instan · sisa 2', time: '13:45', read: false },
    { id: 3, type: 'system', title: 'Sinkronisasi berhasil', body: '3 transaksi tersinkron', time: '12:30', read: true },
  ],
  settings: {
    qris: { image: null, active: true, outlet: 'Toko Berkah', retentionDays: 35 },
    printer: { connected: false, device: 'SK-Printer-58mm' },
    receipt: {
      bizName: 'Toko Berkah',
      showOutlet: true, showTxNumber: true, showCashier: true,
      showPayment: true, showChange: true,
      footer: 'Terima kasih sudah berbelanja',
    },
    notifications: { lowStock: true, outOfStock: true, system: true },
    security: {
      voidWindowMinutes: 5,
      voidLimitCashier: 50000,
      refundLimitCashier: 50000,
      ownerPin: '1234',
      alertVoidPerDay: 5,
    },
  },
};

// HELPERS
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function hasPerm(id) {
  if (!state.user) return false;
  if (state.user.role === 'owner') return true;
  const p = state.user.permissions;
  return Array.isArray(p) ? p.includes(id) : true;
}

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
function todayStr() { return new Date().toISOString().slice(0, 10); }
function formatTimestamp(ts) {
  if (!ts) return '-';
  const d = new Date(ts);
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
function isWithinVoidWindow(tx) {
  if (!tx.createdAt) return true;
  const minutes = state.settings.security.voidWindowMinutes;
  const age = (Date.now() - tx.createdAt) / 60000;
  return age <= minutes;
}
function txAgeMinutes(tx) {
  if (!tx.createdAt) return 0;
  return Math.floor((Date.now() - tx.createdAt) / 60000);
}

function formatRupiahInput(value) {
  const digits = String(value).replace(/\D/g, '');
  if (!digits) return '';
  return parseInt(digits, 10).toLocaleString('id-ID');
}
function parseRupiahInput(value) {
  const digits = String(value).replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
}
function bindRupiahInput(selector, onChange) {
  const el = $(selector);
  if (!el) return;
  el.addEventListener('input', (e) => {
    const prevLen = e.target.value.length;
    const cursorFromEnd = prevLen - e.target.selectionStart;
    const formatted = formatRupiahInput(e.target.value);
    e.target.value = formatted;
    const newPos = Math.max(0, formatted.length - cursorFromEnd);
    try { e.target.setSelectionRange(newPos, newPos); } catch (err) {}
    if (onChange) onChange(parseRupiahInput(formatted));
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

function pinModal(title, hint, onConfirm) {
  const host = $('#modal-host');
  host.innerHTML = `
    <div class="modal-backdrop" id="modal-bd">
      <div class="modal">
        <h3>${title}</h3>
        <p>${hint || 'Masukkan PIN owner 4 digit.'}</p>
        <div class="pin-input">
          <input type="password" inputmode="numeric" maxlength="1" data-pin="0" autofocus />
          <input type="password" inputmode="numeric" maxlength="1" data-pin="1" />
          <input type="password" inputmode="numeric" maxlength="1" data-pin="2" />
          <input type="password" inputmode="numeric" maxlength="1" data-pin="3" />
        </div>
        <div id="pin-error" class="form-error" hidden></div>
        <div class="modal-actions" style="margin-top:12px">
          <button class="btn btn-ghost" id="pin-cancel">Batal</button>
          <button class="btn btn-primary" id="pin-ok">Konfirmasi</button>
        </div>
      </div>
    </div>`;
  const close = () => host.innerHTML = '';
  const inputs = $$('.pin-input input');
  inputs.forEach((inp, i) => {
    inp.oninput = (e) => { if (e.target.value && i < inputs.length - 1) inputs[i + 1].focus(); };
    inp.onkeydown = (e) => { if (e.key === 'Backspace' && !e.target.value && i > 0) inputs[i - 1].focus(); };
  });
  const getPin = () => Array.from(inputs).map(i => i.value).join('');
  const check = () => {
    const pin = getPin();
    if (pin.length < 4) { $('#pin-error').textContent = 'PIN harus 4 digit'; $('#pin-error').hidden = false; return; }
    if (pin !== state.settings.security.ownerPin) {
      $('#pin-error').textContent = 'PIN salah.';
      $('#pin-error').hidden = false;
      inputs.forEach(i => i.value = '');
      inputs[0].focus();
      return;
    }
    close();
    onConfirm();
  };
  $('#pin-cancel').onclick = close;
  $('#pin-ok').onclick = check;
  inputs[3].onkeydown = (e) => { if (e.key === 'Enter') check(); };
  setTimeout(() => inputs[0].focus(), 100);
}

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('sk-theme', t);
  state.theme = t;
}
applyTheme(state.theme);

function pushAudit(type, data) {
  const entry = {
    id: uid('AUD'),
    type,
    at: Date.now(),
    by: state.user ? state.user.username : 'system',
    byName: state.user ? state.user.displayName : 'System',
    device: navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop',
    ...data,
  };
  state.auditLog.unshift(entry);
  return entry;
}

function pushNotif(type, title, body) {
  state.notifications.unshift({ id: Date.now(), type, title, body, time: nowTime(), read: false });
  $('#notif-dot').style.display = '';
}

function imageViewer(src) {
  const host = document.createElement('div');
  host.className = 'image-viewer-bd';
  host.innerHTML = `
    <button class="close-x" title="Tutup">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
    <img src="${src}" />`;
  document.body.appendChild(host);
  const close = () => host.remove();
  host.onclick = (e) => { if (e.target === host || e.target.closest('.close-x')) close(); };
}

function captureQrisProof(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.capture = 'environment';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const capturedAt = Date.now();
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target.result;
      callback({
        dataUrl,
        capturedAt,
        deviceModel: navigator.userAgent.includes('Mobile') ? 'Mobile Device' : 'Desktop',
        fileSize: Math.round(dataUrl.length * 0.75),
      });
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// AUTH
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
    } else {
      const w = state.workers.find(x => x.username === user);
      if (!w) {
        errEl.textContent = 'Username atau password salah.';
        errEl.hidden = false;
        return;
      }
      if (w.password && w.password !== pass) {
        errEl.textContent = 'Username atau password salah.';
        errEl.hidden = false;
        return;
      }
      if (!w.active) {
        errEl.textContent = 'Akun dinonaktifkan. Hubungi owner.';
        errEl.hidden = false;
        return;
      }
      state.user = {
        username: w.username,
        displayName: w.displayName,
        role: 'cashier',
        outlet: w.outlet,
        permissions: w.permissions || ['pos','transactions','shift','printer','sync','theme','profile'],
      };
    }
    enterApp();
  }, 500);
});

function enterApp() {
  showView('view-app');
  if (state.user.role === 'cashier') {
    if (hasPerm('pos')) state.activeView = 'pos';
    else if (hasPerm('dashboard')) state.activeView = 'dashboard';
    else if (hasPerm('transactions')) state.activeView = 'transactions';
    else if (hasPerm('shift')) state.activeView = 'shift';
    else state.activeView = 'pos';
  } else {
    state.ownerTab = 'pos';
  }
  renderNav();
  renderMain();
  updateSyncIndicator();
  renderSidebar();
  renderOutletChip();
}

function handleLogout() {
  if (state.activeShift) {
    confirmModal('Shift masih aktif', 'Tutup shift dulu sebelum keluar. Kalau tetap keluar, shift akan tercatat sebagai anomali.', 'Tetap keluar', doLogout);
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

// NAV
function renderNav() {
  const nav = $('#bottom-nav');
  if (state.user.role === 'cashier') {
    const items = [];
    if (hasPerm('dashboard'))    items.push(navItem('dashboard', 'Dashboard', '<path d="M3 3h7v9H3z"/><path d="M14 3h7v5h-7z"/><path d="M14 12h7v9h-7z"/><path d="M3 16h7v5H3z"/>'));
    if (hasPerm('pos'))          items.push(navItem('pos', 'POS', '<path d="M3 3h18v18H3z"/><path d="M9 3v18"/><path d="M3 9h18"/>'));
    if (hasPerm('transactions')) items.push(navItem('transactions', 'Transaksi', '<path d="M5 3h14a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2V5a2 2 0 0 1 2-2z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/>'));
    if (hasPerm('shift'))        items.push(navItem('shift', 'Shift', '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'));
    if (state.activeView === 'checkout') items.push(navItem('checkout', 'Checkout', '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'));
    nav.innerHTML = items.length ? items.join('') : `<div style="flex:1;text-align:center;padding:16px;font-size:12px;color:var(--text-muted)">Tidak ada akses fitur. Hubungi owner.</div>`;
  } else {
    nav.innerHTML = `
      ${navItem('pos', 'POS',
        '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>')}
      ${navItem('checkout', 'Checkout',
        '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>')}
      ${navItem('reports', 'Laporan',
        '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/>')}
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
  const active = (state.user.role === 'cashier' && state.activeView === view) || (state.user.role === 'owner' && state.ownerTab === view);
  return `
    <button class="nav-item ${active ? 'active' : ''}" data-view="${view}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${svgInner}</svg>
      <span>${label}</span>
    </button>`;
}

// ROUTER
function renderMain() {
  const main = $('#main');
  const v = state.user.role === 'cashier' ? state.activeView : state.ownerTab;
  if (v === 'pos')        return renderPOS(main);
  if (v === 'checkout')   return renderCheckout(main);
  if (v === 'dashboard')  return renderDashboard(main);
  if (v === 'transactions') return renderTransactions(main);
  if (v === 'shift')      return renderShift(main);
  if (v === 'reports')    return renderReports(main);
}

// OUTLET CHIP
function renderOutletChip() {
  const chip = $('#outlet-chip');
  const nameEl = $('#outlet-name');
  const isOwner = state.user.role === 'owner';
  const chev = chip.querySelector('svg');

  if (isOwner) {
    nameEl.textContent = state.outlet.name;
    chip.style.cursor = 'pointer';
    chip.style.pointerEvents = '';
    if (chev) chev.style.display = '';
    chip.onclick = () => {
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
  } else {
    nameEl.textContent = state.user.outlet || state.outlet.name;
    chip.style.cursor = 'default';
    chip.style.pointerEvents = 'none';
    if (chev) chev.style.display = 'none';
    chip.onclick = null;
  }
}

// POS
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
    <button class="cart-bar" id="cart-bar-btn" aria-label="Buka checkout">
      <div>
        <div class="cart-count">${count} item siap dibayar</div>
        <div class="cart-total">${rupiah(total)}</div>
      </div>
      <span class="cart-cta">Lihat Cart</span>
    </button>`;
  $('#cart-bar-btn').onclick = () => {
    if (state.user.role === 'cashier') state.activeView = 'checkout';
    else state.ownerTab = 'checkout';
    renderNav();
    renderMain();
  };
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

// CHECKOUT SHEET
function openCheckout() {
  let method = 'cash', discount = 0, taxPct = 0, cashReceived = 0;
  let qrisProof = null;

  const updateSummary = () => {
    const t = calculateTotals(state.cart, discount, taxPct);
    const change = cashReceived - t.total;
    const setTxt = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };
    setTxt('#ck-subtotal', rupiah(t.subtotal));
    const discRow = $('#ck-discount-row');
    if (discRow) discRow.textContent = t.discount > 0 ? '-' + rupiah(t.discount) : '';
    const taxRow = $('#ck-tax-row');
    if (taxRow) taxRow.textContent = t.tax > 0 ? rupiah(t.tax) : '';
    setTxt('#ck-total', rupiah(t.total));
    setTxt('#ck-total-hero', rupiah(t.total));
    const changeEl = $('#ck-change');
    if (changeEl) {
      changeEl.textContent = change >= 0 ? rupiah(change) : '—';
      changeEl.style.color = change >= 0 ? 'var(--cash)' : 'var(--text-muted)';
    }
    const payBtn = $('#pay-btn');
    if (payBtn) {
      const canPay = method === 'cash' ? cashReceived >= t.total : (qrisProof !== null);
      payBtn.disabled = !canPay;
      payBtn.textContent = method === 'qris' && !qrisProof ? 'Ambil bukti QRIS dulu' : 'Bayar ' + rupiah(t.total);
    }
  };

  const render = () => {
    const t = calculateTotals(state.cart, discount, taxPct);
    const change = cashReceived - t.total;
    const canPay = method === 'cash' ? cashReceived >= t.total : (qrisProof !== null);

    openSheet(`
      <h3 style="font-size:17px;margin-bottom:12px">Pembayaran</h3>
      <div style="text-align:center;padding:16px 0;border-bottom:1px solid var(--border);margin-bottom:16px">
        <div class="muted small">Total</div>
        <div id="ck-total-hero" style="font-size:32px;font-weight:700;font-variant-numeric:tabular-nums;letter-spacing:-0.02em">${rupiah(t.total)}</div>
      </div>
      <div class="section-title" style="margin-top:0">Diskon & Pajak</div>
      <div class="form-row" style="margin-bottom:16px">
        <label class="field"><span>Diskon (Rp)</span>
          <input type="text" inputmode="numeric" id="in-disc" value="${discount ? discount.toLocaleString('id-ID') : ''}" placeholder="0" /></label>
        <label class="field"><span>Pajak (%)</span>
          <input type="number" id="in-tax" value="${taxPct}" min="0" max="100" step="1" /></label>
      </div>
      <div class="section-title" style="margin-top:0">Metode Pembayaran</div>
      <div class="form-row" style="margin-bottom:16px">
        <button class="btn ${method === 'cash' ? 'btn-primary' : 'btn-ghost'}" id="m-cash">Cash</button>
        <button class="btn ${method === 'qris' ? 'btn-primary' : 'btn-ghost'}" id="m-qris">QRIS</button>
      </div>
      ${method === 'cash' ? `
        <label class="field" style="margin-bottom:10px"><span>Uang diterima</span>
          <input type="text" inputmode="numeric" id="in-cash" value="${cashReceived ? cashReceived.toLocaleString('id-ID') : ''}" placeholder="0" /></label>
        <div style="display:flex;gap:8px;margin-bottom:16px">
          <button class="btn btn-ghost" data-quick="${t.total}">Pas</button>
          <button class="btn btn-ghost" data-quick="50000">50rb</button>
          <button class="btn btn-ghost" data-quick="100000">100rb</button>
        </div>
        <div class="summary-row" style="font-size:16px">
          <span>Kembalian</span>
          <span id="ck-change" style="color:${change >= 0 ? 'var(--cash)' : 'var(--text-muted)'};font-weight:700">${change >= 0 ? rupiah(change) : '—'}</span>
        </div>
      ` : `
        <div class="qris-proof-section">
          ${qrisProof ? `
            <div class="qris-proof-preview">
              <img src="${qrisProof.dataUrl}" alt="Bukti QRIS" id="qris-preview-img" />
            </div>
            <div class="qris-proof-meta">
              <span>${Math.round(qrisProof.fileSize / 1024)} KB</span>
              <span>${formatTimestamp(qrisProof.capturedAt)}</span>
            </div>
            <div style="display:flex;gap:8px;margin-top:12px">
              <button class="btn btn-ghost" id="qris-retake" style="flex:1">Foto ulang</button>
            </div>
          ` : `
            <div class="qris-proof-empty">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              <div style="font-weight:500;color:var(--text);margin-top:4px">Belum ada bukti QRIS</div>
              <div class="muted small">Bukti WAJIB dari kamera, tidak bisa dari galeri</div>
              <button class="btn btn-primary" id="qris-capture" style="margin-top:12px">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                Ambil Foto Bukti
              </button>
            </div>
          `}
        </div>
      `}
      <div class="summary-row"><span>Subtotal</span><span id="ck-subtotal">${rupiah(t.subtotal)}</span></div>
      <div class="summary-row"><span>Diskon</span><span id="ck-discount-row" style="color:var(--alert)">${t.discount > 0 ? '-' + rupiah(t.discount) : ''}</span></div>
      <div class="summary-row"><span>Pajak ${taxPct}%</span><span id="ck-tax-row">${t.tax > 0 ? rupiah(t.tax) : ''}</span></div>
      <div class="payment-sheet-footer">
        <div class="summary-row total"><span>Total</span><span id="ck-total">${rupiah(t.total)}</span></div>
        <button class="btn btn-primary btn-block" id="pay-btn" ${canPay ? '' : 'disabled'}>
          ${method === 'qris' && !qrisProof ? 'Ambil bukti QRIS dulu' : 'Bayar ' + rupiah(t.total)}
        </button>
      </div>
    `);

    bindRupiahInput('#in-disc', (val) => {
      discount = Math.min(val, t.subtotal);
      updateSummary();
    });
    $('#in-tax').oninput = (e) => {
      taxPct = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
      updateSummary();
    };
    if ($('#in-cash')) {
      bindRupiahInput('#in-cash', (val) => {
        cashReceived = val;
        updateSummary();
      });
      $$('[data-quick]').forEach(b => b.onclick = () => {
        cashReceived = parseInt(b.dataset.quick);
        const inp = $('#in-cash');
        if (inp) inp.value = cashReceived.toLocaleString('id-ID');
        updateSummary();
      });
    }
    $('#m-cash').onclick = () => { method = 'cash'; render(); };
    $('#m-qris').onclick = () => { method = 'qris'; render(); };

    if ($('#qris-capture')) {
      $('#qris-capture').onclick = () => {
        captureQrisProof((proof) => { qrisProof = proof; render(); toast('Bukti QRIS tersimpan', 'success'); });
      };
    }
    if ($('#qris-retake')) $('#qris-retake').onclick = () => { qrisProof = null; render(); };
    if ($('#qris-preview-img')) $('#qris-preview-img').onclick = () => imageViewer(qrisProof.dataUrl);

    if (canPay) {
      $('#pay-btn').onclick = () => {
        const t = calculateTotals(state.cart, discount, taxPct);
        const tx = {
          id: 'TRX-' + todayStr().replace(/-/g, '') + '-' + String(state.transactions.length + 1).padStart(4, '0'),
          time: nowTime(), date: todayStr(),
          createdAt: Date.now(),
          items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
          total: t.total, method,
          sync: state.online ? 'synced' : 'pending',
          cashier: state.user.displayName.split(' ')[0],
          cashierId: state.user.username,
          outlet: state.user.role === 'cashier' ? state.user.outlet : state.outlet.name,
          discount: t.discount, tax: t.tax, taxPct: t.taxPct,
          received: method === 'cash' ? cashReceived : null,
          change: method === 'cash' ? cashReceived - t.total : 0,
          status: 'completed',
          qrisProof: method === 'qris' && qrisProof ? {
            dataUrl: qrisProof.dataUrl,
            capturedAt: qrisProof.capturedAt,
            deviceModel: qrisProof.deviceModel,
            fileSize: qrisProof.fileSize,
            expiredAt: qrisProof.capturedAt + (state.settings.qris.retentionDays * 86400000),
          } : null,
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

// CHECKOUT VIEW
function renderCheckout(main) {
  const cartCount = state.cart.reduce((s, i) => s + i.qty, 0);
  const { subtotal } = calculateTotals(state.cart);

  main.innerHTML = `
    <div class="page-head">
      <div>
        <h2>Checkout</h2>
        <div class="sub">${cartCount ? cartCount + ' item siap dibayar' : 'Belum ada item di cart'}</div>
      </div>
      ${cartCount ? '<button class="btn btn-ghost" id="clear-cart-page">Kosongkan</button>' : ''}
    </div>

    ${cartCount ? `
      <div class="checkout-panel checkout-content">
        <div class="checkout-items">
          ${state.cart.map(item => `
            <div class="checkout-item">
              <div class="ci-main">
                <div class="ci-name">${item.name}</div>
                <div class="ci-price">${rupiah(item.price)} × ${item.qty}</div>
              </div>
              <div class="qty-ctrl">
                <button data-act="minus" data-id="${item.id}">−</button>
                <span class="qty-val">${item.qty}</span>
                <button data-act="plus" data-id="${item.id}">+</button>
              </div>
              <div class="ci-total">${rupiah(item.price * item.qty)}</div>
            </div>
          `).join('')}
        </div>
        <div class="summary-row"><span>Subtotal</span><span>${rupiah(subtotal)}</span></div>
        <div class="checkout-note muted small">Periksa item dan jumlah sebelum melanjutkan pembayaran.</div>
      </div>
      <div class="checkout-sticky-bar">
        <div class="checkout-sticky-total">
          <span>Total</span>
          <strong>${rupiah(subtotal)}</strong>
        </div>
        <button class="btn btn-primary btn-block" id="pay-now">Bayar sekarang</button>
      </div>
    ` : `
      <div class="empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <div class="empty-title">Cart masih kosong</div>
        <div class="empty-sub">Buka POS untuk memilih produk, lalu kembali ke checkout.</div>
        <button class="btn btn-primary" id="go-pos">Buka POS</button>
      </div>
    `}
  `;

  if ($('#go-pos')) $('#go-pos').onclick = () => {
    if (state.user.role === 'cashier') state.activeView = 'pos';
    else state.ownerTab = 'pos';
    renderNav(); renderMain();
  };
  if ($('#clear-cart-page')) $('#clear-cart-page').onclick = () => {
    confirmModal('Kosongkan cart?', 'Semua item akan dihapus.', 'Kosongkan', () => {
      state.cart = []; renderCheckout(main);
    });
  };
  if ($('#pay-now')) $('#pay-now').onclick = () => openCheckout();
  $$('.checkout-content [data-act]').forEach(btn => {
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
      renderCheckout(main);
      renderCartBar();
    };
  });
}


function renderTransactions(main) {
  const isOwner = state.user.role === 'owner';
  const list = isOwner ? state.transactions : state.transactions.filter(t => t.cashierId === state.user.username);
  main.innerHTML = `
    <div class="page-head">
      <div><h2>Transaksi</h2><div class="sub">Riwayat transaksi · ${list.length} transaksi</div></div>
    </div>
    <div class="filter-bar">
      <button class="chip active">Semua</button>
      <button class="chip">Cash</button>
      <button class="chip">QRIS</button>
      ${isOwner ? '<button class="chip">Semua outlet</button>' : ''}
    </div>
    <div class="tx-list">
      ${list.length ? list.map(renderTxItem).join('') : `
        <div class="empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>
          <div class="empty-title">Belum ada transaksi</div>
          <div class="empty-sub">Riwayat transaksi akan muncul di sini.</div>
        </div>`}
    </div>`;
  $$('.tx-item').forEach(el => el.onclick = () => showTxDetail(el.dataset.id));
}


function txStatusBadge(tx) {
  if (tx.status === 'void') return '<span class="tx-status void">⚠ VOID</span>';
  if (tx.status === 'refunded') return '<span class="tx-status refunded">↩ REFUND</span>';
  if (tx.status === 'partial_refund') return '<span class="tx-status partial">↩ PARTIAL</span>';
  return '';
}

function renderTxItem(tx) {
  const sl = { synced: '✓', pending: '⏳', error: '⚠' }[tx.sync];
  const statusClass = tx.status === 'void' ? 'void'
    : tx.status === 'refunded' ? 'refunded'
    : tx.status === 'partial_refund' ? 'partial'
    : '';
  const refundNote = tx.status === 'partial_refund'
    ? `<div class="tx-refund-note">Refund sebagian · ${rupiah(tx.refundAmount || 0)}</div>` : '';
  return `
    <button class="tx-item ${statusClass}" data-id="${tx.id}">
      <div class="tx-id">#${tx.id.slice(-4)} · ${tx.time}
        <span class="sync-badge ${tx.sync}">${sl} ${tx.sync}</span>
        ${txStatusBadge(tx)}
      </div>
      <div class="tx-total">${rupiah(tx.total)}</div>
      <div class="tx-meta">${tx.items.reduce((s,i)=>s+i.qty,0)} item · ${tx.method === 'cash' ? 'Cash' : 'QRIS'}</div>
      ${refundNote}
    </button>`;
}

function showTxDetail(id) {
  const tx = state.transactions.find(t => t.id === id);
  if (!tx) return;
  const isOwner = state.user.role === 'owner';
  const isToday = tx.date === todayStr();
  const isMyTx = tx.cashierId === state.user.username;
  const canVoidBase = tx.status === 'completed' && isToday;
  const canVoid = canVoidBase && (isOwner || (isMyTx && hasPerm('void')));
  const canRefund = (tx.status === 'completed' || tx.status === 'partial_refund') &&
    (isOwner || (isMyTx && hasPerm('refund')));

  let statusBanner = '';
  if (tx.status === 'void') {
    statusBanner = `<div class="status-banner void">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg>
      <div><strong>VOID</strong>${tx.voidReason || ''}<br><span style="font-size:11px;opacity:.8">oleh ${tx.voidedByName || '-'} · ${tx.voidedAt || ''}</span></div>
    </div>`;
  } else if (tx.status === 'refunded') {
    statusBanner = `<div class="status-banner refund">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/></svg>
      <div><strong>REFUND PENUH</strong>${rupiah(tx.refundAmount)} · ${tx.refundMethod === 'cash' ? 'Cash' : 'QRIS'} · ${tx.refundReason || ''}<br><span style="font-size:11px;opacity:.8">oleh ${tx.refundedByName || '-'} · ${tx.refundedAt || ''}</span></div>
    </div>`;
  } else if (tx.status === 'partial_refund') {
    statusBanner = `<div class="status-banner refund">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 4v5h5"/></svg>
      <div><strong>REFUND SEBAGIAN</strong>${rupiah(tx.refundAmount)} · ${tx.refundMethod === 'cash' ? 'Cash' : 'QRIS'} · ${tx.refundReason || ''}<br><span style="font-size:11px;opacity:.8">oleh ${tx.refundedByName || '-'} · ${tx.refundedAt || ''}</span></div>
    </div>`;
  }

  let proofHtml = '';
  if (tx.method === 'qris') {
    if (tx.qrisProof && tx.qrisProof.dataUrl) {
      const isExpired = tx.qrisProof.expiredAt && Date.now() > tx.qrisProof.expiredAt;
      if (isExpired) {
        proofHtml = `<div class="proof-viewer"><div class="proof-expired">⚠ Bukti QRIS kadaluarsa<br><span class="small">Retensi ${state.settings.qris.retentionDays} hari</span></div></div>`;
      } else {
        proofHtml = `<div class="proof-viewer">
          <div class="muted small" style="margin-bottom:6px">Bukti QRIS · ${formatTimestamp(tx.qrisProof.capturedAt)}</div>
          <img src="${tx.qrisProof.dataUrl}" id="tx-proof-img" />
        </div>`;
      }
    } else {
      proofHtml = `<div class="proof-viewer"><div class="proof-expired">Tidak ada bukti QRIS</div></div>`;
    }
  }

  openSheet(`
    <h3 style="font-size:17px;margin-bottom:4px">${tx.id}</h3>
    <p class="muted small" style="margin:0 0 16px">${tx.date} · ${tx.time} · ${tx.outlet}</p>
    ${statusBanner}
    <div class="shift-rows">
      <div class="shift-row"><span class="lbl">Kasir</span><span class="val">${tx.cashier}</span></div>
      <div class="shift-row"><span class="lbl">Metode</span><span class="val">${tx.method === 'cash' ? 'Cash' : 'QRIS'}</span></div>
      <div class="shift-row"><span class="lbl">Status sync</span><span class="val"><span class="sync-badge ${tx.sync}">${tx.sync}</span></span></div>
      ${tx.createdAt ? `<div class="shift-row"><span class="lbl">Umur</span><span class="val">${txAgeMinutes(tx)} menit lalu</span></div>` : ''}
    </div>
    ${proofHtml}
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
      ${(canVoid || canRefund) ? `
        <div class="tx-actions-2">
          ${canVoid ? '<button class="btn btn-danger" id="void-btn">Void</button>' : ''}
          ${canRefund ? '<button class="btn btn-ghost" id="refund-btn">Refund</button>' : ''}
        </div>` : ''}
    </div>
  `);
  $('#print-again').onclick = () => {
    if (state.settings.printer.connected) { toast('Mencetak ulang…'); printReceipt(tx); }
    else toast('Printer belum terhubung', 'error');
  };
  if ($('#tx-proof-img')) $('#tx-proof-img').onclick = () => imageViewer(tx.qrisProof.dataUrl);
  if (canVoid && $('#void-btn')) $('#void-btn').onclick = () => openVoidSheet(tx);
  if (canRefund && $('#refund-btn')) $('#refund-btn').onclick = () => openRefundSheet(tx);
}

// VOID
function openVoidSheet(tx) {
  const REASONS = ['Salah input', 'Customer batal', 'Double entry', 'Lainnya'];
  const isOwner = state.user.role === 'owner';
  const sec = state.settings.security;
  const withinWindow = isWithinVoidWindow(tx);
  const exceedsLimit = tx.total > sec.voidLimitCashier;

  if (!isOwner && !withinWindow) {
    return confirmModal('Void tidak bisa',
      `Window void kasir hanya ${sec.voidWindowMinutes} menit pertama. Transaksi ini sudah ${txAgeMinutes(tx)} menit. Hubungi owner.`,
      'OK', () => {}, false);
  }

  let reason = REASONS[0];

  const proceedVoid = (finalReason) => {
    tx.status = 'void';
    tx.voidReason = finalReason;
    tx.voidedAt = nowDateTime();
    tx.voidedBy = state.user.username;
    tx.voidedByName = state.user.displayName;
    pushAudit('void', { trxId: tx.id, amount: tx.total, reason: finalReason, outlet: tx.outlet, cashier: tx.cashier });
    pushNotif('void', 'Void transaksi', `${tx.id} · ${rupiah(tx.total)} · oleh ${state.user.displayName}`);
    closeSheet();
    toast('Transaksi di-void', 'success');
    renderMain();
  };

  const render = () => {
    openSheet(`
      <h3 style="font-size:17px;margin-bottom:4px">Void transaksi</h3>
      <p class="muted small" style="margin:0 0 16px">${tx.id} · ${rupiah(tx.total)} · ${tx.method === 'cash' ? 'Cash' : 'QRIS'}</p>
      <div class="status-banner void" style="margin-bottom:16px">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
        <div>Void tidak menghapus transaksi dari riwayat. Transaksi akan ditandai VOID dan tidak dihitung di penjualan.</div>
      </div>
      ${!isOwner && exceedsLimit ? `
        <div class="status-banner void" style="background:var(--warn-soft);color:var(--warn)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>
          <div>Nominal transaksi (${rupiah(tx.total)}) melebihi limit kasir (${rupiah(sec.voidLimitCashier)}). Butuh PIN owner.</div>
        </div>` : ''}
      <div class="section-title" style="margin-top:0">Alasan void</div>
      <div class="reason-grid" id="void-reasons">
        ${REASONS.map(r => `<button class="reason-chip ${r === reason ? 'active' : ''}" data-r="${r}">${r}</button>`).join('')}
      </div>
      ${reason === 'Lainnya' ? `
        <label class="field" style="margin-top:12px"><span>Keterangan</span>
          <input type="text" id="void-note" placeholder="Tulis alasan…" /></label>
      ` : ''}
      <div class="form-actions" style="margin-top:20px">
        <button class="btn btn-ghost" id="void-cancel">Batal</button>
        <button class="btn btn-danger" id="void-confirm">Void transaksi</button>
      </div>
    `);
    $$('#void-reasons .reason-chip').forEach(b => b.onclick = () => { reason = b.dataset.r; render(); });
    $('#void-cancel').onclick = closeSheet;
    $('#void-confirm').onclick = () => {
      let finalReason = reason;
      if (reason === 'Lainnya') {
        const note = ($('#void-note')?.value || '').trim();
        if (!note) return toast('Keterangan wajib diisi', 'error');
        finalReason = note;
      }
      if (!isOwner && exceedsLimit) {
        pinModal('PIN Owner', `Nominal ${rupiah(tx.total)} melebihi limit. Masukkan PIN owner.`, () => {
          proceedVoid(finalReason + ' [PIN owner]');
        });
      } else {
        proceedVoid(finalReason);
      }
    };
  };
  render();
}

// REFUND
function openRefundSheet(tx) {
  const REASONS = ['Barang rusak', 'Salah pesan', 'Komplain', 'Lainnya'];
  const isOwner = state.user.role === 'owner';
  const sec = state.settings.security;
  const alreadyRefunded = tx.refundedItems || [];
  const refundable = tx.items.map((it, idx) => ({
    idx, name: it.name, qty: it.qty, price: it.price,
    maxQty: it.qty - (alreadyRefunded.find(r => r.idx === idx)?.qty || 0),
  })).filter(it => it.maxQty > 0);

  const checked = new Set(refundable.map(it => it.idx));
  const qtyMap = {};
  refundable.forEach(it => qtyMap[it.idx] = it.maxQty);

  let method = tx.method === 'cash' ? 'cash' : 'qris';
  let reason = REASONS[0];

  const render = () => {
    const totalRefund = refundable
      .filter(it => checked.has(it.idx))
      .reduce((sum, it) => sum + it.price * (qtyMap[it.idx] || 0), 0);
    const allChecked = refundable.every(it => checked.has(it.idx));
    const isFull = allChecked && refundable.every(it => qtyMap[it.idx] === it.maxQty);
    const refundLabel = isFull ? 'Refund penuh' : 'Refund sebagian';
    const exceedsLimit = !isOwner && totalRefund > sec.refundLimitCashier;

    openSheet(`
      <h3 style="font-size:17px;margin-bottom:4px">Refund transaksi</h3>
      <p class="muted small" style="margin:0 0 16px">${tx.id} · Total asli ${rupiah(tx.total)}</p>
      <div class="section-title" style="margin-top:0">Pilih item yang di-refund</div>
      <div class="refund-items">
        ${refundable.map(it => `
          <div class="refund-item ${checked.has(it.idx) ? 'checked' : ''}" data-idx="${it.idx}">
            <div class="ri-check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div class="ri-body">
              <div class="ri-name">${it.name}</div>
              <div class="ri-sub">${rupiah(it.price)} × ${qtyMap[it.idx]} (max ${it.maxQty})</div>
            </div>
            <div class="ri-price">${rupiah(it.price * qtyMap[it.idx])}</div>
          </div>
        `).join('')}
      </div>
      <div class="summary-row total" style="margin-top:12px">
        <span>Total refund</span>
        <span style="color:var(--warn)">${rupiah(totalRefund)}</span>
      </div>
      ${exceedsLimit ? `
        <div class="status-banner refund" style="margin-top:12px">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>
          <div>Nominal refund (${rupiah(totalRefund)}) melebihi limit kasir (${rupiah(sec.refundLimitCashier)}). Butuh PIN owner.</div>
        </div>` : ''}
      <div class="section-title">Metode refund</div>
      <div class="form-row" style="margin-bottom:12px">
        <button class="btn ${method === 'cash' ? 'btn-primary' : 'btn-ghost'}" id="rf-cash">Cash</button>
        <button class="btn ${method === 'qris' ? 'btn-primary' : 'btn-ghost'}" id="rf-qris">QRIS</button>
      </div>
      <div class="section-title" style="margin-top:0">Alasan refund</div>
      <div class="reason-grid" id="rf-reasons">
        ${REASONS.map(r => `<button class="reason-chip ${r === reason ? 'active' : ''}" data-r="${r}">${r}</button>`).join('')}
      </div>
      ${reason === 'Lainnya' ? `
        <label class="field" style="margin-top:12px"><span>Keterangan</span>
          <input type="text" id="rf-note" placeholder="Tulis alasan…" /></label>
      ` : ''}
      <div class="form-actions" style="margin-top:20px">
        <button class="btn btn-ghost" id="rf-cancel">Batal</button>
        <button class="btn btn-primary" id="rf-confirm" ${totalRefund > 0 ? '' : 'disabled'}>
          ${refundLabel} · ${rupiah(totalRefund)}
        </button>
      </div>
    `);

    $$('.refund-item').forEach(el => {
      el.onclick = () => {
        const idx = parseInt(el.dataset.idx);
        if (checked.has(idx)) checked.delete(idx);
        else checked.add(idx);
        render();
      };
    });
    $('#rf-cash').onclick = () => { method = 'cash'; render(); };
    $('#rf-qris').onclick = () => { method = 'qris'; render(); };
    $$('#rf-reasons .reason-chip').forEach(b => b.onclick = () => { reason = b.dataset.r; render(); });
    $('#rf-cancel').onclick = closeSheet;

    if (totalRefund > 0) {
      $('#rf-confirm').onclick = () => {
        let finalReason = reason;
        if (reason === 'Lainnya') {
          const note = ($('#rf-note')?.value || '').trim();
          if (!note) return toast('Keterangan wajib diisi', 'error');
          finalReason = note;
        }
        const doRefund = () => {
          const selectedItems = refundable
            .filter(it => checked.has(it.idx))
            .map(it => ({ idx: it.idx, name: it.name, qty: qtyMap[it.idx], amount: it.price * qtyMap[it.idx] }));
          const prevRefund = tx.refundAmount || 0;
          const newRefund = prevRefund + totalRefund;
          const prevItems = tx.refundedItems || [];
          const merged = [...prevItems];
          selectedItems.forEach(si => {
            const existing = merged.find(m => m.idx === si.idx);
            if (existing) existing.qty += si.qty;
            else merged.push(si);
          });
          tx.refundedItems = merged;
          tx.refundAmount = newRefund;
          tx.refundMethod = method;
          tx.refundReason = finalReason;
          tx.refundedAt = nowDateTime();
          tx.refundedBy = state.user.username;
          tx.refundedByName = state.user.displayName;
          const allRefunded = tx.items.every((it, idx) => {
            const r = merged.find(m => m.idx === idx);
            return r && r.qty >= it.qty;
          });
          tx.status = allRefunded ? 'refunded' : 'partial_refund';
          pushAudit('refund', { trxId: tx.id, amount: totalRefund, method, reason: finalReason, isFull: allRefunded, outlet: tx.outlet, cashier: tx.cashier });
          pushNotif('refund', 'Refund transaksi', `${tx.id} · ${rupiah(totalRefund)} · ${allRefunded ? 'Penuh' : 'Sebagian'}`);
          closeSheet();
          toast(allRefunded ? 'Refund penuh berhasil' : 'Refund sebagian berhasil', 'success');
          renderMain();
        };
        if (exceedsLimit) {
          pinModal('PIN Owner', `Nominal refund ${rupiah(totalRefund)} melebihi limit. Masukkan PIN owner.`, () => doRefund());
        } else {
          doRefund();
        }
      };
    }
  };
  render();
}

// SHIFT
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
          <input type="text" inputmode="numeric" id="close-cash" value="${expected.toLocaleString('id-ID')}" /></label>
        <button class="btn btn-primary btn-block" id="do-close">Tutup shift</button>
      `);
      bindRupiahInput('#close-cash', () => {});
      $('#do-close').onclick = () => {
        const closing = parseRupiahInput($('#close-cash').value);
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

// DASHBOARD
function renderDashboard(main) {
  const today = todayStr();
  const todayTx = state.transactions.filter(t => t.date === today);
  const active = todayTx.filter(t => t.status !== 'void');
  const voided = todayTx.filter(t => t.status === 'void');
  const refunded = todayTx.filter(t => t.status === 'refunded' || t.status === 'partial_refund');

  const totalSales = active.reduce((s, t) => s + (t.total - (t.refundAmount || 0)), 0);
  const cash = active.filter(t => t.method === 'cash').reduce((s, t) => s + (t.total - (t.refundAmount || 0)), 0);
  const qris = active.filter(t => t.method === 'qris').reduce((s, t) => s + (t.total - (t.refundAmount || 0)), 0);
  const expense = state.expenses.filter(e => e.date.startsWith(today)).reduce((s, e) => s + e.amount, 0);
  const voidAmount = voided.reduce((s, t) => s + t.total, 0);
  const refundAmount = refunded.reduce((s, t) => s + (t.refundAmount || 0), 0);
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
        <div class="delta">${active.length} transaksi</div>
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

  const cashierRecap = {};
  todayTx.forEach(t => {
    const key = t.cashier;
    if (!cashierRecap[key]) cashierRecap[key] = { voidCount: 0, voidAmount: 0, refundCount: 0, refundAmount: 0 };
    if (t.status === 'void') { cashierRecap[key].voidCount++; cashierRecap[key].voidAmount += t.total; }
    if (t.status === 'refunded' || t.status === 'partial_refund') {
      cashierRecap[key].refundCount++;
      cashierRecap[key].refundAmount += (t.refundAmount || 0);
    }
  });

  const threshold = state.settings.security.alertVoidPerDay;
  const alerts = Object.entries(cashierRecap).filter(([_, r]) => r.voidCount >= threshold);
  const alertHtml = alerts.map(([name, r]) => `
    <div class="alert-card">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg>
      <div>
        <div class="ac-title">Alert: ${name} void ${r.voidCount}× hari ini</div>
        <div class="ac-body">Total ${rupiah(r.voidAmount)}. Melebihi ambang batas ${threshold}×/hari.</div>
      </div>
    </div>`).join('');

  main.innerHTML = `
    <div class="page-head">
      <div><h2>Halo, ${state.user.displayName.split(' ')[0]}</h2>
        <div class="sub">Ringkasan hari ini</div></div>
    </div>
    ${alertHtml}
    <div class="kpi-hero">
      <div class="label">Penjualan hari ini</div>
      <div class="amount">${rupiah(totalSales)}</div>
      <div class="delta">${active.length} transaksi</div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
      <div class="kpi-card"><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
      <div class="kpi-card"><div class="label">Void</div><div class="amount" style="color:var(--alert)">${rupiah(voidAmount)}</div></div>
      <div class="kpi-card"><div class="label">Refund</div><div class="amount" style="color:var(--warn)">${rupiah(refundAmount)}</div></div>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="label">Pengeluaran</div><div class="amount">${rupiah(expense)}</div></div>
      <div class="kpi-card"><div class="label">Laba bersih</div><div class="amount">${rupiah(net)}</div></div>
    </div>
    ${Object.keys(cashierRecap).length ? `
      <div class="section-title">Rekap void/refund per kasir</div>
      <div class="tx-list">
        ${Object.entries(cashierRecap).map(([name, r]) => `
          <div class="cashier-recap-row">
            <div>
              <div class="cr-name">${name}</div>
              <div class="cr-sub">Void ${r.voidCount}× · Refund ${r.refundCount}×</div>
            </div>
            <div class="cr-amount">
              ${r.voidAmount + r.refundAmount > 0 ? '-' + rupiah(r.voidAmount + r.refundAmount) : rupiah(0)}
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
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

// REPORTS
function renderReports(main) {
  let tab = 'reports';
  const TABS = [
    { id: 'reports', label: 'Laporan', icon: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-7"/>' },
    { id: 'expenses', label: 'Pengeluaran', icon: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M2 10h20"/><circle cx="17" cy="14" r="1"/>' },
  ];
  let period = 'today';
  let userFilter = 'all';

  const getRange = () => {
    const today = todayStr();
    const d = new Date(today + 'T00:00:00');
    if (period === '7d') d.setDate(d.getDate() - 6);
    if (period === '30d') d.setDate(d.getDate() - 29);
    return { from: d.toISOString().slice(0,10), to: today };
  };
  const periodLabel = () => ({ today: 'Hari ini', '7d': '7 hari terakhir', '30d': '30 hari terakhir' }[period] || 'Hari ini');

  const render = () => {
    const range = getRange();
    let filteredTx = state.transactions.filter(t => t.date >= range.from && t.date <= range.to);
    if (userFilter !== 'all') filteredTx = filteredTx.filter(t => t.cashierId === userFilter);
    let filteredExpenses = state.expenses.filter(e => e.date.slice(0,10) >= range.from && e.date.slice(0,10) <= range.to);
    if (userFilter !== 'all') filteredExpenses = filteredExpenses.filter(e => {
      const w = state.workers.find(x => x.username === userFilter);
      return !w || e.by === w.displayName || e.by === w.displayName.split(' ')[0];
    });

    const active = filteredTx.filter(t => t.status !== 'void');
    const sales = active.reduce((s, t) => s + (t.total - (t.refundAmount || 0)), 0);
    const cash = active.filter(t => t.method === 'cash').reduce((s, t) => s + (t.total - (t.refundAmount || 0)), 0);
    const qris = active.filter(t => t.method === 'qris').reduce((s, t) => s + (t.total - (t.refundAmount || 0)), 0);
    const discount = filteredTx.reduce((s, t) => s + (t.discount || 0), 0);
    const tax = filteredTx.reduce((s, t) => s + (t.tax || 0), 0);
    const voidAmount = filteredTx.filter(t => t.status === 'void').reduce((s, t) => s + t.total, 0);
    const refundAmount = filteredTx.reduce((s, t) => s + (t.refundAmount || 0), 0);
    const expense = filteredExpenses.reduce((s, e) => s + e.amount, 0);
    const net = sales - expense;
    const gross = sales + discount;

    const byOutlet = {};
    active.forEach(t => { byOutlet[t.outlet] = (byOutlet[t.outlet] || 0) + (t.total - (t.refundAmount || 0)); });
    const byCashier = {};
    active.forEach(t => { byCashier[t.cashier] = (byCashier[t.cashier] || 0) + (t.total - (t.refundAmount || 0)); });
    const cashierRecap = {};
    filteredTx.forEach(t => {
      const k = t.cashier;
      if (!cashierRecap[k]) cashierRecap[k] = { voidCount: 0, voidAmount: 0, refundCount: 0, refundAmount: 0 };
      if (t.status === 'void') { cashierRecap[k].voidCount++; cashierRecap[k].voidAmount += t.total; }
      if (t.status === 'refunded' || t.status === 'partial_refund') {
        cashierRecap[k].refundCount++; cashierRecap[k].refundAmount += (t.refundAmount || 0);
      }
    });

    main.innerHTML = `
      <div class="page-head">
        <div><h2>Laporan</h2><div class="sub">${periodLabel()}${userFilter !== 'all' ? ' · ' + (state.workers.find(w => w.username === userFilter)?.displayName || userFilter) : ''}</div></div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-ghost" id="report-filter">Filter</button>
          <button class="btn btn-ghost" id="export">Export XLSX</button>
        </div>
      </div>

      <div class="seg-tabs" role="tablist">
        ${TABS.map(t => `<button class="seg-tab ${tab === t.id ? 'active' : ''}" data-tab="${t.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg><span>${t.label}</span>
        </button>`).join('')}
      </div>

      ${tab === 'reports' ? `
        <div class="kpi-hero"><div class="label">Penjualan</div><div class="amount">${rupiah(sales)}</div><div class="delta">${active.length} transaksi</div></div>
        <div class="kpi-grid">
          <div class="kpi-card"><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div>
          <div class="kpi-card"><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div>
          <div class="kpi-card"><div class="label">Void</div><div class="amount" style="color:var(--alert)">${rupiah(voidAmount)}</div></div>
          <div class="kpi-card"><div class="label">Refund</div><div class="amount" style="color:var(--warn)">${rupiah(refundAmount)}</div></div>
        </div>
        <div class="section-title">Rekap per kasir</div>
        <div class="tx-list">
          ${Object.entries(cashierRecap).map(([name, r]) => `<div class="cashier-recap-row"><div><div class="cr-name">${name}</div><div class="cr-sub">Void ${r.voidCount}× · Refund ${r.refundCount}×</div></div><div class="cr-amount">${r.voidAmount + r.refundAmount > 0 ? '-' + rupiah(r.voidAmount + r.refundAmount) : rupiah(0)}</div></div>`).join('') || '<div class="empty"><div class="empty-title">Belum ada data rekap</div></div>'}
        </div>
        <div class="section-title">Ringkasan keuangan</div>
        <div class="waterfall">
          <div class="shift-row"><span class="lbl">Gross sales</span><span class="val">${rupiah(gross)}</span></div>
          <div class="shift-row"><span class="lbl">Diskon</span><span class="val" style="color:var(--alert)">- ${rupiah(discount)}</span></div>
          <div class="shift-row"><span class="lbl">Pajak</span><span class="val" style="color:var(--alert)">- ${rupiah(tax)}</span></div>
          ${voidAmount > 0 ? `<div class="shift-row"><span class="lbl">Void</span><span class="val" style="color:var(--alert)">- ${rupiah(voidAmount)}</span></div>` : ''}
          ${refundAmount > 0 ? `<div class="shift-row"><span class="lbl">Refund</span><span class="val" style="color:var(--warn)">- ${rupiah(refundAmount)}</span></div>` : ''}
          <div class="shift-row"><span class="lbl">Net sales</span><span class="val">${rupiah(sales)}</span></div>
          <div class="shift-row"><span class="lbl">Pengeluaran</span><span class="val" style="color:var(--alert)">- ${rupiah(expense)}</span></div>
          <div class="shift-row" style="border-top:1px solid var(--border);margin-top:4px;padding-top:10px"><span class="lbl" style="font-weight:600;color:var(--text)">Net profit</span><span class="val" style="color:var(--primary);font-size:16px">${rupiah(net)}</span></div>
        </div>
        <div class="kpi-compact"><div><div class="label">Cash</div><div class="amount">${rupiah(cash)}</div></div><div><div class="label">QRIS</div><div class="amount">${rupiah(qris)}</div></div></div>
        <div class="section-title">Penjualan per outlet</div>
        <div class="tx-list">${Object.entries(byOutlet).map(([name,total]) => `<div class="list-row"><div class="row-title">${name}</div><div class="row-amount">${rupiah(total)}</div></div>`).join('') || '<div class="empty"><div class="empty-title">Belum ada data</div></div>'}</div>
        <div class="section-title">Penjualan per kasir</div>
        <div class="tx-list">${Object.entries(byCashier).map(([name,total]) => `<div class="list-row"><div class="row-title">${name}</div><div class="row-amount">${rupiah(total)}</div></div>`).join('') || '<div class="empty"><div class="empty-title">Belum ada data</div></div>'}</div>
        <div class="chart-card"><div class="chart-title">7 hari terakhir</div><div class="bar-chart">
          ${[1200,1800,1400,2100,1900,2200,Math.round(sales/1000)].map((v,i)=>{const max=Math.max(2200,Math.round(sales/1000),1000);const h=Math.max(8,(v/max)*100);const days=['S','S','R','K','J','S','M'];return `<div class="bar-col"><div class="bar ${i===6?'today':''}" style="height:${h}%"></div><div class="bar-day">${days[i]}</div></div>`}).join('')}
        </div></div>
        <div class="chart-card"><div class="chart-title">Metode pembayaran</div>
          <div class="method-row"><span class="method-label">Cash</span><div class="method-bar"><div class="method-fill cash" style="width:${sales ? cash/sales*100 : 0}%"></div></div><span class="method-amount">${rupiah(cash)}</span></div>
          <div class="method-row"><span class="method-label">QRIS</span><div class="method-bar"><div class="method-fill qris" style="width:${sales ? qris/sales*100 : 0}%"></div></div><span class="method-amount">${rupiah(qris)}</span></div>
        </div>
      ` : `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px">
          <div><div style="font-weight:600">Pengeluaran</div><div class="muted small">${filteredExpenses.length} catatan · ${periodLabel()}</div></div>
          <button class="btn btn-primary" id="add-exp-report" style="min-height:36px;padding:8px 14px;font-size:13px">+ Tambah</button>
        </div>
        <div class="kpi-hero"><div class="label">Total pengeluaran</div><div class="amount amount-expense">${rupiah(expense)}</div></div>
        <div class="kpi-compact" style="margin-bottom:16px">${['Bahan','Operasional','Gaji','Lainnya'].map(cat=>{const sum=filteredExpenses.filter(e=>e.category===cat).reduce((s,e)=>s+e.amount,0);return `<div><div class="label">${cat}</div><div class="amount">${rupiah(sum)}</div></div>`}).join('')}</div>
        <div class="tx-list">${filteredExpenses.length ? filteredExpenses.map(e=>`<div class="list-row"><div><div class="row-title">${e.note || e.category}</div><div class="row-sub">${e.category} · ${e.date} · ${e.by}</div></div><div style="display:flex;align-items:center;gap:8px"><div class="row-amount amount-expense">-${rupiah(e.amount)}</div><div class="row-actions"><button class="icon-btn sm" data-edit-exp="${e.id}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg></button><button class="icon-btn sm" data-del-exp="${e.id}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button></div></div></div>`).join('') : '<div class="empty"><div class="empty-title">Belum ada pengeluaran</div></div>'}</div>
      `}
    `;

    $$('[data-tab]').forEach(b => b.onclick = () => { tab = b.dataset.tab; render(); });
    $('#export').onclick = () => toast('Export XLSX diproses backend', 'success');
    $('#report-filter').onclick = () => openReportFilter();

    if (tab === 'expenses') {
      const CATS = ['Bahan','Operasional','Gaji','Lainnya'];
      $('#add-exp-report').onclick = () => expForm(null, CATS, render);
      $$('[data-edit-exp]').forEach(b => b.onclick = () => expForm(b.getAttribute('data-edit-exp'), CATS, render));
      $$('[data-del-exp]').forEach(b => b.onclick = () => {
        const id = b.getAttribute('data-del-exp'); const e = state.expenses.find(x => x.id === id); if (!e) return;
        confirmModal('Hapus pengeluaran?', `"${e.note || e.category}" akan dihapus.`, 'Hapus', () => { state.expenses = state.expenses.filter(x => x.id !== id); render(); toast('Pengeluaran dihapus'); });
      });
    }
    $$('.tx-item').forEach(el => el.onclick = () => showTxDetail(el.dataset.id));
  };

  function openReportFilter() {
    openSheet(`
      <h3 style="font-size:17px;margin-bottom:14px">Filter laporan</h3>
      <div class="section-title" style="margin-top:0">Periode waktu</div>
      <div class="filter-choice-grid">
        <button class="btn ${period==='today'?'btn-primary':'btn-ghost'}" data-period="today">Hari ini</button>
        <button class="btn ${period==='7d'?'btn-primary':'btn-ghost'}" data-period="7d">7 hari</button>
        <button class="btn ${period==='30d'?'btn-primary':'btn-ghost'}" data-period="30d">30 hari</button>
      </div>
      <div class="section-title">User / kasir</div>
      <label class="field"><span>Filter per user</span><select id="report-user-filter"><option value="all">Semua user</option>${state.workers.filter(w=>w.active).map(w=>`<option value="${w.username}" ${userFilter===w.username?'selected':''}>${w.displayName}</option>`).join('')}</select></label>
      <button class="btn btn-primary btn-block" id="apply-report-filter" style="margin-top:16px">Terapkan filter</button>
    `);
    $$('[data-period]').forEach(b => b.onclick = () => { period=b.dataset.period; openReportFilter(); });
    $('#apply-report-filter').onclick = () => { userFilter=$('#report-user-filter').value; closeSheet(); render(); };
  }
  render();
}


function renderSidebar() {
  const body = $('#sidebar-body');
  if (!body) return;
  const isOwner = state.user.role === 'owner';

  if (isOwner) {
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
        { label: 'Keamanan', route: 'security-settings' },
        { label: 'Audit Log', route: 'audit-log', count: state.auditLog.length || null },
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
      el.onclick = () => { closeSidebar(); routeManage(el.dataset.route); };
    });
    return;
  }

  const items = [];
  if (hasPerm('profile')) items.push({ label: 'Profil', route: 'cashier-profile' });
  if (hasPerm('printer')) items.push({ label: 'Printer', route: 'cashier-printer' });
  if (hasPerm('sync')) items.push({ label: 'Sinkronisasi', route: 'cashier-sync', count: state.syncQueue.length || null });
  if (hasPerm('expense')) items.push({ label: 'Pengeluaran', route: 'cashier-expenses' });
  if (hasPerm('theme')) items.push({ label: 'Tema', route: 'cashier-theme', badge: { text: state.theme === 'dark' ? 'Gelap' : 'Terang', cls: 'muted' } });
  items.push({ label: 'Tentang', route: 'about' });

  body.innerHTML = items.map(it => `
    <button class="sidebar-item" data-route="${it.route}">
      <span class="si-label">${it.label}</span>
      ${it.badge ? `<span class="si-badge ${it.badge.cls}">${it.badge.text}</span>` : ''}
      ${it.count != null && it.count !== 0 ? `<span class="si-count">${it.count}</span>` : ''}
    </button>
  `).join('');
  body.querySelectorAll('[data-route]').forEach(el => {
    el.onclick = () => { closeSidebar(); routeManage(el.dataset.route); };
  });
}

let _sidebarScrollY = 0;
function openSidebar() {
  if (!state.user) return;
  const isOwner = state.user.role === 'owner';
  const titleEl = document.querySelector('#sidebar .sidebar-header > div:nth-child(2) > div:first-child');
  const subEl = document.querySelector('#sidebar .sidebar-header > div:nth-child(2) > div:last-child');
  if (titleEl) titleEl.textContent = isOwner ? 'Kelola' : 'Akun Saya';
  if (subEl) subEl.textContent = isOwner ? 'Menu owner' : 'Pengaturan kasir';
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

// ROUTER SIDEBAR
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
  if (route === 'security-settings') return pageSecuritySettings();
  if (route === 'audit-log') return pageAuditLog();
  if (route === 'theme-settings') return pageThemeSettings();
  if (route === 'profile') return pageProfile();
  if (route === 'about') return pageAbout();
  if (route === 'cashier-profile') return pageProfile();
  if (route === 'cashier-printer') return pagePrinterSettings();
  if (route === 'cashier-sync') return pageSyncSettings();
  if (route === 'cashier-theme') return pageThemeSettings();
  if (route === 'cashier-expenses') return pageExpenses();
}

function backHome() {
  if (state.user.role === 'cashier') {
    if (hasPerm('pos')) state.activeView = 'pos';
    else if (hasPerm('dashboard')) state.activeView = 'dashboard';
    else if (hasPerm('transactions')) state.activeView = 'transactions';
    else if (hasPerm('shift')) state.activeView = 'shift';
  } else {
    state.ownerTab = 'pos';
  }
  renderNav();
  renderMain();
}

// PRODUCTS
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
    confirmModal('Hapus produk?', `"${p.name}" akan dihapus permanen.`, 'Hapus', () => {
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
      <label class="field"><span>Harga jual (Rp)</span>
        <input type="text" inputmode="numeric" id="p-price" value="${data.price ? data.price.toLocaleString('id-ID') : ''}" placeholder="0" /></label>
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
  let track = data.track, active = data.active, priceVal = data.price;
  bindRupiahInput('#p-price', (val) => { priceVal = val; });
  $('#p-track').onclick = e => { track = !track; e.target.classList.toggle('on', track); $('#p-stock-section').hidden = !track; };
  $('#p-active').onclick = e => { active = !active; e.target.classList.toggle('on', active); };
  $('#p-cancel').onclick = closeSheet;
  $('#p-save').onclick = () => {
    const name = $('#p-name').value.trim();
    if (!name || priceVal <= 0) return toast('Nama dan harga wajib diisi', 'error');
    const obj = {
      name, price: priceVal,
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

// CATEGORIES
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

// INVENTORY
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

// OUTLETS
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

// WORKERS
function pageWorkers() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Kasir</h2><div class="sub">${state.workers.length} pekerja</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="tx-list">
        ${state.workers.map(w => {
          const permCount = (w.permissions || []).length;
          return `
            <div class="list-row">
              <div>
                <div class="row-title">${w.displayName} ${w.active ? '<span class="pill pill-active">aktif</span>' : '<span class="pill pill-inactive">nonaktif</span>'}</div>
                <div class="row-sub">@${w.username} · ${w.outlet} · ${permCount} fitur</div>
              </div>
              <div class="row-actions">
                <button class="icon-btn sm" data-edit="${w.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button class="icon-btn sm" data-toggle="${w.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </button>
              </div>
            </div>`;
        }).join('')}
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
  const data = w || {
    username: '', displayName: '', outlet: state.outlets[0]?.name || '', whatsapp: '', active: true, password: '',
    permissions: ['pos','transactions','shift','printer','theme','profile'],
  };
  const currentPerms = data.permissions || [];

  openSheet(`
    <h3 style="font-size:17px;margin-bottom:16px">${isEdit ? 'Edit kasir' : 'Kasir baru'}</h3>
    <div class="form-page">
      <label class="field"><span>Nama tampilan</span><input type="text" id="w-name" value="${data.displayName}" /></label>
      <label class="field"><span>Username</span><input type="text" id="w-user" value="${data.username}" ${isEdit ? 'disabled' : ''} /></label>
      <label class="field"><span>${isEdit ? 'Password baru (kosongkan jika tidak diubah)' : 'Password'}</span>
        <input type="password" id="w-pass" placeholder="${isEdit ? '••••••• (tidak diubah)' : 'Minimal 6 karakter'}" autocomplete="new-password" /></label>
      ${!isEdit ? `
        <label class="field"><span>Konfirmasi password</span>
          <input type="password" id="w-pass2" placeholder="Ulangi password" autocomplete="new-password" /></label>
      ` : ''}
      <label class="field"><span>Outlet</span>
        <select id="w-outlet">${state.outlets.map(o => `<option ${o.name===data.outlet?'selected':''}>${o.name}</option>`).join('')}</select>
      </label>
      <label class="field"><span>Nomor WhatsApp (opsional)</span><input type="tel" id="w-wa" value="${data.whatsapp || ''}" /></label>
      <div class="switch-row">
        <div style="font-weight:500">Akun aktif</div>
        <button class="switch ${data.active ? 'on' : ''}" id="w-active"></button>
      </div>
      <div class="section-title" style="margin:16px 0 8px">Akses Fitur</div>
      <p class="muted small" style="margin:-6px 0 8px">Pilih fitur yang boleh dipakai kasir ini.</p>
      <div id="w-perms">
        ${PERMISSIONS.map(p => `
          <div class="switch-row" style="align-items:flex-start;gap:12px">
            <div style="flex:1">
              <div style="font-weight:500">${p.label}</div>
              <div class="muted small">${p.desc}</div>
            </div>
            <button class="switch ${currentPerms.includes(p.id) ? 'on' : ''}" data-perm="${p.id}"></button>
          </div>
        `).join('')}
      </div>
      <div class="form-actions">
        <button class="btn btn-ghost" id="w-cancel">Batal</button>
        <button class="btn btn-primary" id="w-save">${isEdit ? 'Simpan' : 'Tambah'}</button>
      </div>
    </div>
  `);

  let active = data.active;
  let perms = [...currentPerms];

  $('#w-active').onclick = e => { active = !active; e.target.classList.toggle('on', active); };
  $$('#w-perms [data-perm]').forEach(btn => {
    btn.onclick = e => {
      const pid = btn.dataset.perm;
      if (perms.includes(pid)) perms = perms.filter(x => x !== pid);
      else perms.push(pid);
      e.target.classList.toggle('on', perms.includes(pid));
    };
  });

  $('#w-cancel').onclick = closeSheet;
  $('#w-save').onclick = () => {
    const displayName = $('#w-name').value.trim();
    const username = $('#w-user').value.trim();
    const password = $('#w-pass').value;
    const password2 = $('#w-pass2') ? $('#w-pass2').value : password;

    if (!displayName || !username) return toast('Nama dan username wajib', 'error');

    if (!isEdit) {
      if (!password || password.length < 6) return toast('Password minimal 6 karakter', 'error');
      if (password !== password2) return toast('Konfirmasi password tidak cocok', 'error');
    } else {
      if (password && password.length < 6) return toast('Password minimal 6 karakter', 'error');
    }

    if (!perms.length) return toast('Minimal 1 fitur harus diaktifkan', 'error');

    const obj = {
      displayName, username,
      outlet: $('#w-outlet').value,
      whatsapp: $('#w-wa').value.trim(),
      active,
      permissions: perms,
    };
    if (password) obj.password = password;

    if (isEdit) Object.assign(w, obj);
    else state.workers.push({ id: Date.now(), ...obj });

    closeSheet();
    pageWorkers();
    toast(isEdit ? 'Kasir diperbarui' : 'Kasir ditambahkan', 'success');
  };
}

// QRIS
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
      <div class="form-section">
        <div class="security-info">
          <b>Retensi bukti QRIS</b><br>
          Bukti QRIS otomatis dihapus setelah ${state.settings.qris.retentionDays} hari. Data transaksi tetap tersimpan.
        </div>
        <label class="field"><span>Retensi (hari)</span>
          <input type="number" id="q-retention" value="${state.settings.qris.retentionDays}" min="1" max="365" /></label>
        <button class="btn btn-primary" id="q-save-retention">Simpan retensi</button>
      </div>
    `;
    $('#back-home').onclick = backHome;
    $('#q-active').onclick = e => {
      state.settings.qris.active = !state.settings.qris.active;
      e.target.classList.toggle('on', state.settings.qris.active);
    };
    $('#q-upload').onclick = () => { state.settings.qris.image = 'qris.png'; render(); toast('QRIS diunggah', 'success'); };
    if ($('#q-del')) {
      $('#q-del').onclick = () => confirmModal('Hapus QRIS?', 'QRIS tidak akan tampil di POS.', 'Hapus', () => {
        state.settings.qris.image = null;
        render();
      });
    }
    $('#q-save-retention').onclick = () => {
      const v = parseInt($('#q-retention').value) || 35;
      state.settings.qris.retentionDays = Math.max(1, Math.min(365, v));
      render();
      toast('Retensi disimpan', 'success');
    };
  };
  render();
}

// PRINTER
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

// RECEIPT
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

// NOTIF
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

// SYNC
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

// SECURITY
function pageSecuritySettings() {
  const main = $('#main');
  const sec = state.settings.security;
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Keamanan</h2><div class="sub">Aturan void & refund</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="security-info">
        Aturan ini membatasi kasir untuk void/refund supaya tidak bisa menghilangkan uang dari kas.
        Void/refund yang melebihi limit akan butuh PIN owner.
      </div>
      <div class="form-section">
        <label class="field"><span>Window void untuk kasir (menit)</span>
          <input type="number" id="sec-window" value="${sec.voidWindowMinutes}" min="1" max="60" /></label>
        <p class="muted small" style="margin:-6px 0 12px">Kasir hanya bisa void dalam X menit pertama setelah transaksi.</p>
        <label class="field"><span>Limit void kasir (Rp)</span>
          <input type="text" inputmode="numeric" id="sec-void-limit" value="${sec.voidLimitCashier.toLocaleString('id-ID')}" /></label>
        <label class="field"><span>Limit refund kasir (Rp)</span>
          <input type="text" inputmode="numeric" id="sec-refund-limit" value="${sec.refundLimitCashier.toLocaleString('id-ID')}" /></label>
        <label class="field"><span>PIN Owner (4 digit)</span>
          <input type="text" id="sec-pin" value="${sec.ownerPin}" maxlength="4" inputmode="numeric" /></label>
        <label class="field"><span>Alert kalau kasir void ≥ X kali/hari</span>
          <input type="number" id="sec-alert" value="${sec.alertVoidPerDay}" min="1" max="100" /></label>
        <div class="form-actions" style="margin-top:8px">
          <button class="btn btn-primary btn-block" id="sec-save">Simpan</button>
        </div>
      </div>
    `;
    $('#back-home').onclick = backHome;
    bindRupiahInput('#sec-void-limit', () => {});
    bindRupiahInput('#sec-refund-limit', () => {});
    $('#sec-save').onclick = () => {
      const pin = $('#sec-pin').value.trim();
      if (!/^\d{4}$/.test(pin)) return toast('PIN harus 4 digit angka', 'error');
      sec.voidWindowMinutes = parseInt($('#sec-window').value) || 5;
      sec.voidLimitCashier = parseRupiahInput($('#sec-void-limit').value);
      sec.refundLimitCashier = parseRupiahInput($('#sec-refund-limit').value);
      sec.ownerPin = pin;
      sec.alertVoidPerDay = parseInt($('#sec-alert').value) || 5;
      toast('Pengaturan keamanan disimpan', 'success');
    };
  };
  render();
}

// AUDIT LOG
function pageAuditLog() {
  const main = $('#main');
  const render = () => {
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Audit Log</h2><div class="sub">${state.auditLog.length} catatan</div></div>
        <button class="btn btn-ghost" id="back-home">← Beranda</button>
      </div>
      <div class="tx-list">
        ${state.auditLog.length ? state.auditLog.map(a => `
          <div class="audit-row">
            <div class="a-head">
              <span class="a-badge ${a.type}">${a.type === 'void' ? '⚠ VOID' : '↩ REFUND'}</span>
              <span class="a-time">${formatTimestamp(a.at)}</span>
            </div>
            <div class="a-body">
              <b>${a.trxId || '-'}</b> · ${rupiah(a.amount || 0)}
              ${a.isFull === false ? ' <span style="color:var(--warn)">(partial)</span>' : ''}
            </div>
            <div class="a-meta">
              <span>oleh ${a.byName || a.by}</span>
              <span>${a.reason || '-'}</span>
              ${a.device ? `<span>${a.device}</span>` : ''}
            </div>
          </div>
        `).join('') : '<div class="empty"><div class="empty-title">Belum ada catatan</div><div class="empty-sub">Void/refund yang dilakukan akan tercatat di sini.</div></div>'}
      </div>
    `;
    $('#back-home').onclick = backHome;
  };
  render();
}

// THEME
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

// PROFILE
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
      ${state.user.role === 'cashier' ? `<div class="field"><span>Outlet</span><input type="text" value="${state.user.outlet || '-'}" disabled /></div>` : ''}
    </div>
    <div class="form-actions" style="margin-top:16px">
      <button class="btn btn-ghost btn-block" id="p-logout">Keluar</button>
    </div>
  `;
  $('#back-home').onclick = backHome;
  $('#p-logout').onclick = handleLogout;
}

// ABOUT
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

// EXPENSES
function pageExpenses() {
  const main = $('#main');
  const CATS = ['Bahan', 'Operasional', 'Gaji', 'Lainnya'];
  const render = () => {
    const total = state.expenses.reduce((s, e) => s + e.amount, 0);
    main.innerHTML = `
      <div class="page-head">
        <div><h2>Pengeluaran</h2><div class="sub">${state.expenses.length} catatan</div></div>
        <button class="btn btn-ghost" id="back-home">← Kembali</button>
      </div>
      <div class="kpi-hero">
        <div class="label">Total pengeluaran</div>
        <div class="amount amount-expense">${rupiah(total)}</div>
      </div>
      <div class="kpi-compact" style="margin-bottom:16px">
        ${CATS.map(cat => {
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
                <button class="icon-btn sm" data-edit="${e.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
                <button class="icon-btn sm" data-del="${e.id}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>
                </button>
              </div>
            </div>
          </div>`).join('')
        : '<div class="empty"><div class="empty-title">Belum ada pengeluaran</div><div class="empty-sub">Tap + untuk catat pengeluaran.</div></div>'}
      </div>
      <button class="fab" id="add-exp">+</button>
    `;
    $('#back-home').onclick = backHome;
    $('#add-exp').onclick = () => expForm(null, CATS, render);
    $$('[data-edit]').forEach(b => b.onclick = () => expForm(b.dataset.edit, CATS, render));
    $$('[data-del]').forEach(b => b.onclick = () => {
      const e = state.expenses.find(x => x.id === b.dataset.del);
      if (!e) return;
      confirmModal('Hapus pengeluaran?', `"${e.note || e.category}" akan dihapus.`, 'Hapus', () => {
        state.expenses = state.expenses.filter(x => x.id !== e.id);
        render();
        toast('Pengeluaran dihapus');
      });
    });
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
      <label class="field"><span>Nominal (Rp)</span>
        <input type="text" inputmode="numeric" id="e-amount" value="${data.amount ? data.amount.toLocaleString('id-ID') : ''}" placeholder="0" /></label>
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
  let amountVal = data.amount;
  bindRupiahInput('#e-amount', (val) => { amountVal = val; });
  $('#e-cancel').onclick = closeSheet;
  $('#e-save').onclick = () => {
    if (amountVal <= 0) return toast('Nominal harus > 0', 'error');
    const obj = {
      amount: amountVal,
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

// HEADER ACTIONS
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
  if (state.user.role === 'owner') {
    pagePrinterSettings();
  } else {
    if (!hasPerm('printer')) return toast('Tidak ada akses printer', 'error');
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
          <div class="tx-id" style="color:${n.type === 'stock_low' ? 'var(--warn)' : n.type === 'out_of_stock' ? 'var(--alert)' : n.type === 'void' ? 'var(--alert)' : n.type === 'refund' ? 'var(--warn)' : 'var(--primary)'}">
            ${n.type === 'stock_low' ? '⚠ STOK MENIPIS'
              : n.type === 'out_of_stock' ? '⚠ STOK HABIS'
              : n.type === 'void' ? '⚠ VOID TRANSAKSI'
              : n.type === 'refund' ? '↩ REFUND'
              : 'ℹ SISTEM'}
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

$('#sheet-backdrop').onclick = closeSheet;

// PRINT RECEIPT
function printReceipt(tx) {
  const r = state.settings.receipt;
  const lines = [];
  lines.push(r.bizName);
  lines.push('──────────────────────────');
  if (r.showTxNumber) lines.push(tx.id);
  lines.push(`${tx.date} · ${tx.time}`);
  if (r.showOutlet) lines.push(tx.outlet);
  if (r.showCashier) lines.push('Kasir: ' + tx.cashier);
  lines.push('──────────────────────────');
  tx.items.forEach(i => {
    lines.push(`${i.name}`);
    lines.push(`  ${i.qty}×${i.price}    ${i.price * i.qty}`);
  });
  lines.push('──────────────────────────');
  const subtotal = tx.items.reduce((s, i) => s + i.price * i.qty, 0);
  lines.push(`Subtotal        ${subtotal}`);
  if (tx.discount) lines.push(`Diskon         -${tx.discount}`);
  if (tx.tax) lines.push(`Pajak ${tx.taxPct}%      ${tx.tax}`);
  lines.push(`Total           ${tx.total}`);
  if (r.showPayment) lines.push(`${tx.method === 'cash' ? 'Cash' : 'QRIS'}            ${tx.received || tx.total}`);
  if (r.showChange && tx.method === 'cash') lines.push(`Kembali         ${tx.change}`);
  if (tx.status === 'void') lines.push(`*** VOID ***`);
  if (tx.status === 'refunded') lines.push(`*** REFUND ***`);
  if (tx.status === 'partial_refund') lines.push(`*** REFUND SEBAGIAN ***`);
  lines.push('──────────────────────────');
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

// INIT
updateSyncIndicator();