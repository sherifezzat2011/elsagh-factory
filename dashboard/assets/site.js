const themeToggle = document.querySelector('[data-theme-toggle]');
const savedTheme = localStorage.getItem('elsagh-erp-theme');

if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
}

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('elsagh-erp-theme', nextTheme);
});

document.querySelectorAll('[data-upload-zone]').forEach((zone) => {
  const input = zone.querySelector('input[type="file"]');
  const strip = zone.querySelector('[data-preview-strip]');

  input?.addEventListener('change', () => {
    strip.innerHTML = '';
    Array.from(input.files ?? []).forEach((file, index) => {
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const caption = document.createElement('figcaption');

      image.src = URL.createObjectURL(file);
      image.alt = file.name;
      caption.textContent = index === 0 ? 'الصورة الرئيسية' : `صورة ${index + 1}`;
      figure.append(image, caption);
      strip.append(figure);
    });
  });
});

const rawWeight = document.querySelector('[data-raw-weight]');
const finishedWeight = document.querySelector('[data-finished-weight]');
const wasteRule = document.querySelector('[data-waste-rule]');
const expectedWaste = document.querySelector('[data-expected-waste]');
const actualWaste = document.querySelector('[data-actual-waste]');
const wasteDiff = document.querySelector('[data-waste-diff]');

function updateWasteCalculation() {
  if (!rawWeight || !finishedWeight || !wasteRule || !expectedWaste || !actualWaste || !wasteDiff) return;

  const raw = Number(rawWeight.value || 0);
  const finished = Number(finishedWeight.value || 0);
  const selected = wasteRule.options[wasteRule.selectedIndex];
  const rate = Number(selected?.dataset.rate || 0);
  const expected = (raw * rate) / 1000;
  const actual = raw - finished;
  const diff = actual - expected;

  expectedWaste.textContent = `${expected.toFixed(3)} جرام`;
  actualWaste.textContent = `${actual.toFixed(3)} جرام`;
  wasteDiff.textContent = `${diff.toFixed(3)} جرام`;
  wasteDiff.classList.toggle('danger', diff > 0);
  wasteDiff.classList.toggle('success', diff <= 0);
}

[rawWeight, finishedWeight, wasteRule].forEach((element) => {
  element?.addEventListener('input', updateWasteCalculation);
  element?.addEventListener('change', updateWasteCalculation);
});

updateWasteCalculation();

const sidebar = document.querySelector('[data-sidebar]');
const sidebarToggle = document.querySelector('[data-sidebar-toggle]') ?? document.querySelector('.topbar-tools .menu-button');
const sidebarClose = document.querySelector('[data-sidebar-close]');

function setSidebar(open) {
  document.body.classList.toggle('sidebar-open', open);
  sidebar?.setAttribute('aria-hidden', open ? 'false' : 'true');
}

sidebarToggle?.addEventListener('click', (event) => {
  event.stopPropagation();
  setSidebar(!document.body.classList.contains('sidebar-open'));
});

sidebarClose?.addEventListener('click', () => setSidebar(false));

sidebar?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setSidebar(false));
});

const productDrawer = document.querySelector('[data-product-drawer]');
const openProductDrawerButtons = document.querySelectorAll('[data-open-product-drawer]');
const closeProductDrawerButtons = document.querySelectorAll('[data-close-product-drawer]');
const categoryDrawer = document.querySelector('[data-category-drawer]');
const openCategoryDrawerButtons = document.querySelectorAll('[data-open-category-drawer]');
const closeCategoryDrawerButtons = document.querySelectorAll('[data-close-category-drawer]');
const manufacturingDrawer = document.querySelector('[data-manufacturing-drawer]');
const openManufacturingDrawerButtons = document.querySelectorAll('[data-open-manufacturing-drawer]');
const closeManufacturingDrawerButtons = document.querySelectorAll('[data-close-manufacturing-drawer]');

function setDrawer(drawer, open) {
  if (!drawer) return;

  drawer.classList.toggle('open', open);
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  document.body.style.overflow = document.querySelector('.product-drawer.open') ? 'hidden' : '';
}

function setProductDrawer(open) {
  setDrawer(productDrawer, open);
}

function setCategoryDrawer(open) {
  setDrawer(categoryDrawer, open);
}

function setManufacturingDrawer(open) {
  setDrawer(manufacturingDrawer, open);
}

openProductDrawerButtons.forEach((button) => {
  button.addEventListener('click', () => setProductDrawer(true));
});

closeProductDrawerButtons.forEach((button) => {
  button.addEventListener('click', () => setProductDrawer(false));
});

openCategoryDrawerButtons.forEach((button) => {
  button.addEventListener('click', () => setCategoryDrawer(true));
});

closeCategoryDrawerButtons.forEach((button) => {
  button.addEventListener('click', () => setCategoryDrawer(false));
});

openManufacturingDrawerButtons.forEach((button) => {
  button.addEventListener('click', () => setManufacturingDrawer(true));
});

closeManufacturingDrawerButtons.forEach((button) => {
  button.addEventListener('click', () => setManufacturingDrawer(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setProductDrawer(false);
    setCategoryDrawer(false);
    setManufacturingDrawer(false);
    setSidebar(false);
    closeActionMenus();
  }
});

document.querySelectorAll('[data-product-row]').forEach((row) => {
  row.addEventListener('click', (event) => {
    if (event.target.closest('button, a, input, select, textarea')) return;

    const detailsRow = row.nextElementSibling;
    if (!detailsRow?.classList.contains('product-details-row')) return;

    detailsRow.classList.toggle('open');
    row.classList.toggle('expanded', detailsRow.classList.contains('open'));
  });
});

function closeActionMenus(except) {
  document.querySelectorAll('[data-action-menu].open').forEach((menu) => {
    if (menu !== except) {
      menu.classList.remove('open');
    }
  });
}

document.querySelectorAll('[data-action-menu-trigger]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.stopPropagation();
    const menu = trigger.parentElement?.querySelector('[data-action-menu]');
    if (!menu) return;

    const willOpen = !menu.classList.contains('open');
    closeActionMenus(menu);
    menu.classList.toggle('open', willOpen);
  });
});

document.querySelectorAll('[data-action-menu] button').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    closeActionMenus();
  });
});

document.addEventListener('click', () => {
  closeActionMenus();
});
