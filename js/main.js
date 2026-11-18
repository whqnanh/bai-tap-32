/**
 * Bài tập 32: Thiết lập Cửa hàng Trực tuyến Đơn giản bằng Squarespace
 * Script xử lý: Giỏ hàng, Đổi màu giao diện (Site Styles), Modal xem nhanh & Form liên hệ
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // DỮ LIỆU SẢN PHẨM (Bước 2: 3 Sản Phẩm Mới)
  // ==========================================
  const products = [
    {
      id: 1,
      title: 'Áo phông Cotton Tối Giản (Minimalist T-Shirt)',
      category: 'Thời trang Unisex',
      price: 299000,
      image: 'images/ao-phong.jpg',
      badge: 'Bán chạy nhất',
      desc: 'Áo phông 100% sợi bông tự nhiên chải kỹ 220gsm, bề mặt mềm mịn, thoáng khí, đường may tỉ mỉ và bền màu qua thời gian. Form dáng suông chuẩn phong cách tối giản Bắc Âu.',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Trắng Vintage', 'Đen Tuyển', 'Xanh Rêu']
    },
    {
      id: 2,
      title: 'Cốc Sứ Tráng Men Mờ (Ceramic Craft Mug)',
      category: 'Đồ gia dụng & Đời sống',
      price: 189000,
      image: 'images/coc-su.jpg',
      badge: 'Thủ công nghệ nhân',
      desc: 'Cốc gốm sứ nung ở nhiệt độ 1280°C với lớp men nhám mờ độc bản, giữ trọn hương vị cà phê và trà ấm mỗi sớm mai. Quai cầm công thái học chắc chắn và thanh thoát.',
      sizes: ['Tiêu chuẩn 350ml'],
      colors: ['Xám Khói', 'Nâu Đất Nung', 'Trắng Kem']
    },
    {
      id: 3,
      title: 'Túi Xách Vải Canvas Cao Cấp (Eco Canvas Tote Bag)',
      category: 'Phụ kiện thường ngày',
      price: 249000,
      image: 'images/tui-xach.jpg',
      badge: 'Thân thiện môi trường',
      desc: 'Túi vải canvas 16oz dệt thoi mật độ cao siêu bền bỉ, quai đeo chịu lực gia cố đinh tán chắc chắn, vừa vặn laptop 14-inch và các vật dụng thường nhật năng động.',
      sizes: ['Kích thước 38x42cm'],
      colors: ['Be Tự Nhiên', 'Đen Minimal', 'Xanh Olive']
    }
  ];

  // ==========================================
  // QUẢN LÝ GIỎ HÀNG (Cart State)
  // ==========================================
  let cart = [];

  const cartOverlay = document.getElementById('cartOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartCountBadges = document.querySelectorAll('.cart-count-badge');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const openCartBtns = document.querySelectorAll('.btn-open-cart');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Mở/Đóng Cart Drawer
  function openCart() {
    cartOverlay.classList.add('active');
    cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  openCartBtns.forEach(btn => btn.addEventListener('click', openCart));
  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Thêm vào giỏ hàng
  window.addToCart = function(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        ...product,
        quantity: qty
      });
    }

    renderCart();
    showToast(`Đã thêm "${product.title}" vào giỏ hàng!`);
    openCart();
  };

  // Tăng giảm số lượng
  window.changeQty = function(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    renderCart();
  };

  // Xóa khỏi giỏ
  window.removeFromCart = function(productId) {
    cart = cart.filter(i => i.id !== productId);
    renderCart();
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  // Định dạng tiền tệ VND
  function formatMoney(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  // Render lại giỏ hàng
  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadges.forEach(badge => {
      badge.textContent = totalItems;
    });

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <p>Giỏ hàng của bạn đang trống</p>
          <button class="btn btn-primary" style="margin-top: 1rem; font-size: 0.85rem;" onclick="document.getElementById('closeCartBtn').click(); location.href='#store';">
            Khám phá 3 sản phẩm ngay
          </button>
        </div>
      `;
      cartSubtotalEl.textContent = '0₫';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    let subtotal = 0;
    cartItemsContainer.innerHTML = `
      <div class="cart-items-list">
        ${cart.map(item => {
          const itemTotal = item.price * item.quantity;
          subtotal += itemTotal;
          return `
            <div class="cart-item">
              <div class="cart-item-img">
                <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="cart-item-details">
                <h4>${item.title}</h4>
                <div class="cart-item-price">${formatMoney(item.price)}</div>
                <div class="cart-qty-ctrl">
                  <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                  <span class="qty-number">${item.quantity}</span>
                  <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
              </div>
              <button class="btn-remove-item" title="Xóa" onclick="removeFromCart(${item.id})">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;

    cartSubtotalEl.textContent = formatMoney(subtotal);
  }

  // Xử lý nút Thanh toán
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      closeCart();
      const modal = document.getElementById('checkoutModal');
      const checkoutTotal = document.getElementById('checkoutTotalText');
      if (checkoutTotal) checkoutTotal.textContent = cartSubtotalEl.textContent;
      if (modal) modal.classList.add('active');
    });
  }

  // ==========================================
  // BƯỚC 4: TÙY BIẾN MÀU SẮC (Site Styles Palette)
  // ==========================================
  const primaryPicker = document.getElementById('primaryColorPicker');
  const accentPicker = document.getElementById('accentColorPicker');
  const bgPicker = document.getElementById('bgColorPicker');

  const primaryHex = document.getElementById('primaryHex');
  const accentHex = document.getElementById('accentHex');
  const bgHex = document.getElementById('bgHex');

  const swatchPrimary = document.getElementById('swatchPrimary');
  const swatchAccent = document.getElementById('swatchAccent');
  const swatchBg = document.getElementById('swatchBg');

  const presetBtns = document.querySelectorAll('.btn-preset');

  // Các bộ Palette mẫu chuẩn thiết kế
  const palettePresets = {
    forest: {
      primary: '#1e3a2f',
      accent: '#d97706',
      bg: '#f9f7f2',
      name: 'Scandinavian Forest'
    },
    terracotta: {
      primary: '#c2593f',
      accent: '#2d3748',
      bg: '#faf8f5',
      name: 'Modern Terracotta'
    },
    indigo: {
      primary: '#1a2a44',
      accent: '#c5a880',
      bg: '#f4f6f8',
      name: 'Luxury Midnight'
    }
  };

  function applyPalette(primary, accent, bg, announce = true) {
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--accent-color', accent);
    document.documentElement.style.setProperty('--bg-color', bg);

    if (primaryPicker) primaryPicker.value = primary;
    if (accentPicker) accentPicker.value = accent;
    if (bgPicker) bgPicker.value = bg;

    if (primaryHex) primaryHex.textContent = primary.toUpperCase();
    if (accentHex) accentHex.textContent = accent.toUpperCase();
    if (bgHex) bgHex.textContent = bg.toUpperCase();

    if (swatchPrimary) {
      swatchPrimary.style.backgroundColor = primary;
      swatchPrimary.textContent = primary.toUpperCase();
    }
    if (swatchAccent) {
      swatchAccent.style.backgroundColor = accent;
      swatchAccent.textContent = accent.toUpperCase();
    }
    if (swatchBg) {
      swatchBg.style.backgroundColor = bg;
      swatchBg.textContent = bg.toUpperCase();
      swatchBg.style.color = '#333';
    }

    if (announce) {
      showToast(`Đã áp dụng bảng màu mới (Bước 4): ${primary} | ${accent} | ${bg}`);
    }
  }

  // Lắng nghe sự kiện Color Picker
  if (primaryPicker) {
    primaryPicker.addEventListener('input', (e) => {
      applyPalette(e.target.value, accentPicker.value, bgPicker.value, false);
      presetBtns.forEach(btn => btn.classList.remove('active'));
    });
  }

  if (accentPicker) {
    accentPicker.addEventListener('input', (e) => {
      applyPalette(primaryPicker.value, e.target.value, bgPicker.value, false);
      presetBtns.forEach(btn => btn.classList.remove('active'));
    });
  }

  if (bgPicker) {
    bgPicker.addEventListener('input', (e) => {
      applyPalette(primaryPicker.value, accentPicker.value, e.target.value, false);
      presetBtns.forEach(btn => btn.classList.remove('active'));
    });
  }

  // Chuyển preset mẫu
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const presetKey = btn.dataset.preset;
      const p = palettePresets[presetKey];
      if (p) {
        applyPalette(p.primary, p.accent, p.bg, true);
      }
    });
  });

  // Khởi tạo bảng màu ban đầu
  applyPalette('#1e3a2f', '#d97706', '#f9f7f2', false);

  // ==========================================
  // MODAL XEM NHANH SẢN PHẨM (Quick View)
  // ==========================================
  const quickViewModal = document.getElementById('quickViewModal');
  const qvImage = document.getElementById('qvImage');
  const qvCategory = document.getElementById('qvCategory');
  const qvTitle = document.getElementById('qvTitle');
  const qvPrice = document.getElementById('qvPrice');
  const qvDesc = document.getElementById('qvDesc');
  const qvSizes = document.getElementById('qvSizes');
  const qvColors = document.getElementById('qvColors');
  const qvQty = document.getElementById('qvQty');
  const qvAddBtn = document.getElementById('qvAddBtn');
  let currentQvProductId = null;

  window.openQuickView = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !quickViewModal) return;

    currentQvProductId = productId;
    qvImage.src = product.image;
    qvImage.alt = product.title;
    qvCategory.textContent = product.category;
    qvTitle.textContent = product.title;
    qvPrice.textContent = formatMoney(product.price);
    qvDesc.textContent = product.desc;

    // Sizes
    qvSizes.innerHTML = product.sizes.map((s, idx) => `
      <label class="size-pill ${idx === 0 ? 'selected' : ''}">
        <input type="radio" name="qvSize" value="${s}" ${idx === 0 ? 'checked' : ''} style="display:none;">
        ${s}
      </label>
    `).join('');

    // Colors
    qvColors.innerHTML = product.colors.map((c, idx) => `
      <label class="color-badge ${idx === 0 ? 'selected' : ''}">
        <input type="radio" name="qvColor" value="${c}" ${idx === 0 ? 'checked' : ''} style="display:none;">
        ${c}
      </label>
    `).join('');

    qvQty.value = 1;
    quickViewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  if (qvAddBtn) {
    qvAddBtn.addEventListener('click', () => {
      if (currentQvProductId) {
        const qty = parseInt(qvQty.value) || 1;
        addToCart(currentQvProductId, qty);
        closeAllModals();
      }
    });
  }

  // ==========================================
  // BƯỚC 3: FORM LIÊN HỆ "GET IN TOUCH"
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const contactAlert = document.getElementById('contactAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      if (!name || !email || !message) {
        alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
        return;
      }

      contactAlert.style.display = 'flex';
      contactAlert.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
        </svg>
        <span>Cảm ơn <strong>${name}</strong>! Yêu cầu của bạn đã được gửi đến trang <strong>Get In Touch</strong>. Chúng tôi sẽ phản hồi qua email <strong>${email}</strong> trong 24h.</span>
      `;

      contactForm.reset();
      showToast('Đã gửi thông tin liên hệ thành công!');

      setTimeout(() => {
        contactAlert.style.display = 'none';
      }, 7000);
    });
  }

  // ==========================================
  // ĐÓNG TẤT CẢ MODAL
  // ==========================================
  function closeAllModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.modal-close, .btn-modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeAllModals();
      }
    });
  });

  // ==========================================
  // TOAST THÔNG BÁO TIỆN ÍCH
  // ==========================================
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================
  // MOBILE MENU TOGGLE & ACTIVE LINKS
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const primaryNav = document.getElementById('primaryNav');

  if (mobileMenuBtn && primaryNav) {
    mobileMenuBtn.addEventListener('click', () => {
      primaryNav.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('active');
      });
    });
  }

  // Khởi tạo hiển thị giỏ ban đầu
  renderCart();
});
