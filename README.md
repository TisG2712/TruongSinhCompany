# 🏗️ Trường Sinh Company - Website

Website công ty TNHH Tư vấn XD và TM Trường Sinh - Chuyên về thiết kế, thi công xây dựng và các dịch vụ liên quan.

## 📁 Cấu trúc dự án

```
Truong_Sinh_Company/
├── 📄 index.html                 # Trang chủ chính
├── 📁 pages/                     # Các trang con (12 trang)
│   ├── 📄 about.html             # Trang giới thiệu
│   ├── 📄 services.html          # Trang dịch vụ chính
│   ├── 📄 detail-service-construction.html  # Chi tiết xây nhà trọn gói
│   ├── 📄 project.html           # Trang dự án
│   ├── 📄 news.html              # Trang tin tức
│   └── ...                       # (7 trang khác)
├── 📁 assets/                    # Thư mục tài nguyên
│   ├── 📁 css/                   # Stylesheets
│   │   ├── 📄 base.css           # CSS cơ bản, biến, reset, scrollbar
│   │   ├── 📄 index.css          # CSS cho trang chủ
│   │   ├── 📄 about.css          # CSS cho trang about
│   │   ├── 📁 responsive/        # CSS responsive cho tất cả trang
│   │   │   ├── 📄 index_responsive.css
│   │   │   ├── 📄 about_responsive.css
│   │   │   └── ...               # (10+ file responsive khác)
│   │   └── 📁 ui/                # CSS cho components
│   │       ├── 📄 header.css     # CSS cho header
│   │       ├── 📄 navbar.css     # CSS cho navbar
│   │       └── 📄 footer.css     # CSS cho footer
│   ├── 📁 js/                    # JavaScript
│   │   ├── 📄 index.js           # JS chính cho trang chủ
│   │   ├── 📄 about.js           # JS cho trang about
│   │   ├── 📄 detail_service.js  # JS dịch vụ chi tiết
│   │   └── ...                   # (10+ file JS khác)
│   ├── 📁 images/                # Hình ảnh
│   │   ├── 📁 index_images/      # Ảnh cho trang chủ
│   │   ├── 📁 about_images/      # Ảnh cho trang about
│   │   ├── 📁 services_images/   # Ảnh cho trang services
│   │   └── ...                   # (5+ thư mục ảnh khác)
│   └── 📁 video/                 # Video (đã xóa Architect.mp4)
├── 📁 components/                # HTML components
│   ├── 📄 header.html            # Component header
│   ├── 📄 navbar.html            # Component navbar
│   └── 📄 footer.html            # Component footer
├── 📁 public/                    # Thư mục public
│   └── 📁 images/                # Ảnh public
└── 📄 README.md                  # Tài liệu dự án
```

## 🎨 Tính năng chính

### **🏠 Trang chủ (index.html)**

- **Header Slider**: Video background với text overlay
- **About Us**: Giới thiệu công ty với animation
- **Work Experience**: Kinh nghiệm và cam kết
- **Main Services**: Slider dịch vụ tự động với navigation buttons
- **Working Process**: Quy trình làm việc 5 bước
- **Our Projects**: Filter dự án theo danh mục với load more
- **Feedback Company**: Slider video phản hồi khách hàng
- **Team Experts**: Đội ngũ chuyên gia
- **Contact Form**: Form liên hệ
- **Sharing Blog**: Blog chia sẻ kiến thức với dropdown filter
- **Footer**: Thông tin liên hệ và fanpage

### **📄 Các trang con**

#### **🏢 Trang About (about.html)**

- **Company Overview**: Tổng quan công ty
- **Mission & Vision**: Sứ mệnh và tầm nhìn
- **Company Images**: Gallery ảnh với staggered layout
- **Awards Section**: Giải thưởng và chứng nhận
- **Fade-in Animation**: Hiệu ứng xuất hiện từ dưới lên cho ảnh

#### **🛠️ Trang Services**

- **Services Overview**: Tổng quan dịch vụ với counter animation
- **Main Services**: Dịch vụ chính với slider
- **Service Details**: Chi tiết từng dịch vụ
- **Contact CTA**: Call-to-action liên hệ

#### **🏗️ Trang Dịch vụ Xây nhà (detail-service-construction.html)**

- **Blog-style Layout**: Thiết kế như bài báo chuyên nghiệp
- **Table of Contents**: Mục lục có thể thu gọn
- **Process Timeline**: Timeline quy trình xây dựng
- **Cost Table**: Bảng giá chi tiết
- **Materials Grid**: Lưới vật liệu
- **Tips & FAQ**: Mẹo và câu hỏi thường gặp
- **Author Bio**: Thông tin tác giả

#### **🎨 Trang Dịch vụ Nội thất (detail-service-interior.html)**

- **Interior Design Focus**: Nội dung chuyên về thiết kế nội thất
- **Design Process**: Quy trình thiết kế nội thất
- **Style Categories**: Các phong cách thiết kế
- **Material Selection**: Lựa chọn vật liệu nội thất

#### **📁 Trang Dự án (project.html)**

- **Project Grid**: Lưới dự án responsive
- **Load More**: Nút "Hiển thị thêm dự án"
- **Project Links**: Liên kết đến chi tiết dự án
- **Hidden Projects**: Dự án ẩn ban đầu

#### **📰 Trang Tin tức (news.html)**

- **News Grid**: Lưới tin tức
- **Filter Tabs**: Lọc tin tức theo danh mục
- **Mobile Dropdown**: Dropdown cho mobile
- **Pagination**: Phân trang tin tức

#### **📝 Trang Blog (detail_blog1.html)**

- **Article Layout**: Layout bài viết chuyên nghiệp
- **Comment System**: Hệ thống bình luận
- **Comment Form**: Form gửi bình luận
- **Pagination**: Phân trang bình luận

#### **📞 Trang Liên hệ (contact.html)**

- **Contact Form**: Form liên hệ đầy đủ
- **Company Info**: Thông tin công ty
- **Map Integration**: Tích hợp bản đồ

#### **👥 Trang Tuyển dụng (recruitment.html)**

- **Job Listings**: Danh sách việc làm
- **Application Form**: Form ứng tuyển
- **Company Benefits**: Phúc lợi công ty

### **⚡ JavaScript Features**

#### **🎬 Animation & Effects**

- **Counter Animation**: Số đếm mượt mà từ 0 đến mục tiêu
- **Fade-in Animation**: Hiệu ứng xuất hiện từ dưới lên
- **Scroll Animations**: Animation khi cuộn đến section
- **Hover Effects**: Hiệu ứng hover cho cards và buttons

#### **🎛️ Interactive Features**

- **Auto-sliders**: Services, feedback, và experts sliders
- **Manual Navigation**: Nút prev/next cho sliders
- **Project Filtering**: Lọc dự án theo tab với smooth transition
- **Load More**: Tải thêm nội dung với collapse
- **Dropdown Menus**: Menu dropdown với click/arrow logic
- **Table of Contents**: TOC có thể thu gọn với smooth scroll

#### **📱 UI/UX Features**

- **Scroll to Top**: Nút cuộn lên đầu trang
- **Navbar Active**: Highlight menu hiện tại
- **Mobile Sidebar**: Sidebar responsive cho mobile
- **Form Validation**: Validation form liên hệ và bình luận
- **Gallery Navigation**: Điều hướng gallery ảnh

### **📱 Responsive Design**

- **Mobile-first**: Thiết kế ưu tiên mobile
- **Breakpoints**: sm, md, lg, xl
- **Flexible layouts**: Grid và Flexbox
- **Touch-friendly**: Tối ưu cho touch devices
- **Custom Scrollbar**: Thanh scroll màu cam với overlay design

## 🛠️ Công nghệ sử dụng

### **Frontend**

- **HTML5**: Semantic markup với accessibility
- **CSS3**: Flexbox, Grid, Animations, Variables, Custom Properties
- **Vanilla JavaScript**: ES6+, Fetch API, Intersection Observer, DOM Manipulation
- **Remix Icons**: Icon font library cho UI elements

### **Libraries & CDN**

- **Google Fonts**: Roboto Condensed font family
- **Remix Icons**: Icon fonts cho buttons và UI elements
- **Facebook Plugin**: Fanpage embed integration

### **Advanced Features**

- **Intersection Observer**: Scroll animations và lazy loading
- **CSS Custom Properties**: Theme variables và dynamic styling
- **Component-based Architecture**: Reusable HTML components
- **Progressive Enhancement**: Graceful degradation cho older browsers
- **Performance Optimization**: Efficient DOM manipulation và event handling

## 📋 Hướng dẫn phát triển

### **1. Thêm trang mới**

```html
<!-- 1. Tạo file HTML mới trong pages/ -->
<!-- pages/new-page.html -->
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trang Mới - Trường Sinh Company</title>
    <link rel="stylesheet" href="../assets/css/base.css" />
    <link rel="stylesheet" href="../assets/css/new-page.css" />
  </head>
  <body>
    <!-- Component placeholders -->
    <div id="header-placeholder"></div>
    <div id="navbar-placeholder"></div>

    <!-- Main content -->
    <main class="main-content">
      <!-- Nội dung trang -->
    </main>

    <div id="footer-placeholder"></div>

    <!-- Scripts -->
    <script src="../assets/js/new-page.js"></script>
  </body>
</html>
```

### **2. Thêm CSS cho trang mới**

```css
/* 1. Tạo file CSS chính */
/* assets/css/new-page.css */
.new-page-section {
  padding: 60px 0;
  /* Styles cho trang mới */
}

/* 2. Tạo file CSS responsive */
/* assets/css/responsive/new-page_responsive.css */
@media (max-width: 768px) {
  .new-page-section {
    padding: 40px 0;
  }
}
```

### **3. Thêm JavaScript cho trang mới**

```javascript
// assets/js/new-page.js
function loadComponent(componentName, componentPath) {
  // Component loading logic
}

function initNewPageFeatures() {
  // Logic đặc biệt cho trang mới
}

document.addEventListener("DOMContentLoaded", function () {
  // Load components
  loadComponent("header", "../components/header.html");
  loadComponent("navbar", "../components/navbar.html");
  loadComponent("footer", "../components/footer.html");

  // Initialize features
  initNewPageFeatures();
});
```

### **4. Thêm section mới vào trang hiện có**

```html
<!-- 1. Thêm HTML section -->
<section class="new-section">
  <div class="container">
    <!-- Nội dung section -->
  </div>
</section>

<!-- 2. Thêm CSS vào file CSS tương ứng -->
.new-section { /* Styles cho section */ }

<!-- 3. Thêm JavaScript nếu cần -->
function initNewSection() { // Logic cho section mới }
```

### **5. Thêm component mới**

```javascript
// 1. Tạo file HTML component
// components/new-component.html

// 2. Tạo file CSS
// assets/css/ui/new-component.css

// 3. Thêm vào file JS tương ứng
loadComponent("new-component", "components/new-component.html");

// 4. Thêm CSS link vào HTML
<link rel="stylesheet" href="./assets/css/ui/new-component.css" />;
```

### **6. Cập nhật nội dung**

- **Text content**: Chỉnh sửa trực tiếp trong HTML files
- **Images**: Thay thế trong `assets/images/` theo thư mục tương ứng
- **Colors**: Cập nhật CSS variables trong `base.css`
- **Fonts**: Thay đổi trong `base.css`
- **Icons**: Sử dụng Remix Icons classes

### **7. Best Practices**

- **File Naming**: Sử dụng kebab-case cho tên file
- **CSS Organization**: Tách riêng CSS chính và responsive
- **JavaScript**: Sử dụng ES6+ syntax và modern APIs
- **Performance**: Optimize images và minimize CSS/JS
- **Accessibility**: Sử dụng semantic HTML và ARIA labels
- **SEO**: Thêm meta tags và structured data
