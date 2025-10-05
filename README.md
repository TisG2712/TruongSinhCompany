# 🏗️ Trường Sinh Company - Website

Website công ty TNHH Tư vấn XD và TM Trường Sinh - Chuyên về thiết kế, thi công xây dựng và các dịch vụ liên quan.

## 📁 Cấu trúc dự án

```
Truong_Sinh_Company/
├── 📄 index.html                 # Trang chủ chính
├── 📁 assets/                    # Thư mục tài nguyên
│   ├── 📁 css/                   # Stylesheets
│   │   ├── 📄 base.css           # CSS cơ bản, biến, reset
│   │   ├── 📄 index.css          # CSS cho trang chủ
│   │   └── 📁 ui/                # CSS cho components
│   │       ├── 📄 header.css     # CSS cho header
│   │       ├── 📄 navbar.css     # CSS cho navbar
│   │       └── 📄 footer.css     # CSS cho footer
│   ├── 📁 js/                    # JavaScript
│   │   └── 📄 index.js           # JS chính cho trang chủ
│   ├── 📁 images/                # Hình ảnh
│   │   └── 📁 index_images/      # Ảnh cho trang chủ
│   └── 📁 video/                 # Video
│       └── 📄 Architect.mp4      # Video background
├── 📁 components/                # HTML components
│   ├── 📄 header.html            # Component header
│   ├── 📄 navbar.html            # Component navbar
│   └── 📄 footer.html            # Component footer
└── 📄 README.md                  # Tài liệu dự án
```

## 🎨 Tính năng chính

### **🏠 Trang chủ (index.html)**

- **Header Slider**: Video background với text overlay
- **About Us**: Giới thiệu công ty với animation
- **Work Experience**: Kinh nghiệm và cam kết
- **Main Services**: Slider dịch vụ tự động
- **Working Process**: Quy trình làm việc 5 bước
- **Our Projects**: Filter dự án theo danh mục
- **Feedback Company**: Slider video phản hồi khách hàng
- **Team Experts**: Đội ngũ chuyên gia
- **Contact Form**: Form liên hệ
- **Sharing Blog**: Blog chia sẻ kiến thức
- **Footer**: Thông tin liên hệ và fanpage

### **⚡ JavaScript Features**

- **Auto-sliders**: Services và feedback sliders
- **Project filtering**: Lọc dự án theo tab
- **Scroll animations**: Animation khi cuộn đến section
- **Scroll to top**: Nút cuộn lên đầu trang
- **Navbar active**: Highlight menu hiện tại
- **Hover effects**: Hiệu ứng hover cho cards

### **📱 Responsive Design**

- **Mobile-first**: Thiết kế ưu tiên mobile
- **Breakpoints**: sm, md, lg, xl
- **Flexible layouts**: Grid và Flexbox
- **Touch-friendly**: Tối ưu cho touch devices

## 🛠️ Công nghệ sử dụng

### **Frontend**

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Animations, Variables
- **Vanilla JavaScript**: ES6+, Fetch API, Intersection Observer
- **Remix Icons**: Icon font library

### **Libraries & CDN**

- **Google Fonts**: Roboto Condensed
- **Remix Icons**: Icon fonts
- **Facebook Plugin**: Fanpage embed

## 📋 Hướng dẫn phát triển

### **1. Thêm section mới**

```html
<!-- 1. Thêm HTML section -->
<section class="new-section">
  <div class="container">
    <!-- Nội dung section -->
  </div>
</section>

<!-- 2. Thêm CSS vào index.css -->
.new-section { /* Styles cho section */ }

<!-- 3. Thêm JavaScript nếu cần -->
function initNewSection() { // Logic cho section mới }
```

### **2. Thêm component mới**

```javascript
// 1. Tạo file HTML component
// components/new-component.html

// 2. Tạo file CSS
// assets/css/ui/new-component.css

// 3. Thêm vào index.js
loadComponent("new-component", "components/new-component.html");

// 4. Thêm CSS link vào index.html
<link rel="stylesheet" href="./assets/css/ui/new-component.css" />;
```

### **3. Cập nhật nội dung**

- **Text content**: Chỉnh sửa trực tiếp trong HTML
- **Images**: Thay thế trong `assets/images/`
- **Colors**: Cập nhật CSS variables trong `base.css`
- **Fonts**: Thay đổi trong `base.css`
