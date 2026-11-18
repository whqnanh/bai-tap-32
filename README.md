# Bài tập 32 - Thiết lập Cửa hàng Trực tuyến Đơn giản bằng Squarespace

> **Môn học:** Lập trình Web  
> **Sinh viên:** Nguyễn Hoàng Anh  
> **GitHub:** [@whqnanh](https://github.com/whqnanh)  
> **Repository:** [https://github.com/whqnanh/bai-tap-32](https://github.com/whqnanh/bai-tap-32)  
> **Link Deploy GitHub Pages:** [https://whqnanh.github.io/bai-tap-32/](https://whqnanh.github.io/bai-tap-32/)

---

## 📌 Tổng Quan Yêu Cầu Đề Bài & Kết Quả Đạt Được

| Bước | Yêu Cầu Đề Bài | Kết Quả Thực Hiện |
| :---: | :--- | :--- |
| **Bước 1** | **Chọn Template Thương mại:** Đăng nhập Squarespace, chọn Template có sẵn tính năng Store trong danh mục Online Store. | Thiết lập giao diện mẫu thương mại điện tử chuẩn Squarespace 7.1 Commerce Grid phong cách Bắc Âu tối giản. |
| **Bước 2** | **Thêm 3 Sản phẩm mới:** Thêm Áo phông, Cốc, Túi xách kèm tên, mô tả ngắn, ảnh đại diện và giá niêm yết. | Đã hoàn thiện 3 sản phẩm mẫu: Áo phông Cotton 100%, Cốc sứ tráng men mờ, Túi xách canvas cao cấp. |
| **Bước 3** | **Chỉnh sửa Thanh điều hướng (Navigation):** Ẩn trang Blog khỏi Primary Navigation; Đổi tên trang Contact thành "Get In Touch". | Trang Blog đã được ẩn khỏi thanh Menu chính; Trang Contact được đổi tên trang trọng thành "Get In Touch". |
| **Bước 4** | **Tùy biến Màu sắc:** Vào Design > Site Styles > Colors > Thay đổi Color Palette chính thành 3 màu tùy chọn. | Áp dụng bảng màu 3 sắc độ hài hòa: `#1E3A2F` (Xanh rừng trầm), `#D97706` (Hổ phách ấm), `#F9F7F2` (Màu kem ngà). Tích hợp công cụ tùy biến màu sắc trực tiếp trên website. |

---

## 🚀 Truy Cập & Kiểm Tra Dự Án

- **Website Trực Tuyến (Deploy):** [https://whqnanh.github.io/bai-tap-32/](https://whqnanh.github.io/bai-tap-32/)
- **Mã Nguồn (Git Repository):** [https://github.com/whqnanh/bai-tap-32](https://github.com/whqnanh/bai-tap-32)
- **Tài liệu Báo Cáo Chi Tiết:** Xem tệp [BAO_CAO_BAI_TAP_32.md](BAO_CAO_BAI_TAP_32.md)

---

## 🛠️ Cấu Trúc Thư Mục
```
.
├── index.html               # Trang chủ E-commerce hoàn chỉnh
├── css/
│   └── style.css            # Bộ định dạng phong cách Squarespace 7.1
├── js/
│   └── main.js              # Logic giỏ hàng, modal và live palette changer
├── images/                  # Thư mục hình ảnh độ nét cao
│   ├── hero-banner.jpg
│   ├── ao-phong.jpg
│   ├── coc-su.jpg
│   ├── tui-xach.jpg
│   └── about.jpg
├── BAO_CAO_BAI_TAP_32.md    # Báo cáo thực hành chi tiết từng thao tác
└── README.md                # Tài liệu tổng quan dự án
```

---

## 💡 Hướng Dẫn Chạy Cục Bộ (Local Preview)

Mở tệp `index.html` trực tiếp trên bất kỳ trình duyệt web nào (Chrome, Edge, Safari, Firefox), hoặc sử dụng Live Server trên Visual Studio Code:
```bash
# Hoặc khởi chạy máy chủ thử nghiệm nhanh bằng Python:
python3 -m http.server 8000
# Truy cập: http://localhost:8000
```
