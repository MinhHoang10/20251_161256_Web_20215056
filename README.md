#  ỨNG DỤNG QUẢN LÝ HỌC SINH

Ứng dụng web quản lý học sinh được xây dựng theo MERN Stack (MongoDB, Express, React, Node.js)

##  Mục Lục
- [Tính Năng](#tính-năng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cài Đặt](#cài-đặt)
- [Hướng Dẫn Sử Dụng](#hướng-dẫn-sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [API Endpoints](#api-endpoints)

## Tính Năng

Ứng dụng hoàn thiện 6 bài tập theo yêu cầu:

### Bài 1: Hiển Thị Danh Sách Học Sinh
-  Kết nối MongoDB qua Docker
-  Tạo RESTful API với Express
-  Hiển thị danh sách học sinh trên React

### Bài 2: Thêm Học Sinh Mới
-  Form nhập liệu với validation
-  Gửi POST request tới API
-  Cập nhật danh sách real-time

### Bài 3: Chỉnh Sửa Thông Tin
-  Trang chỉnh sửa riêng với React Router
-  PUT request để cập nhật dữ liệu
-  Navigation giữa các trang

### Bài 4: Xóa Học Sinh
-  DELETE request với xác nhận
-  Cập nhật danh sách sau khi xóa
-  Thông báo trực quan

### Bài 5: Tìm Kiếm Học Sinh
-  Tìm kiếm real-time theo tên
-  Không phân biệt hoa thường
-  Hiển thị số kết quả

### Bài 6: Sắp Xếp Danh Sách
-  Sắp xếp theo tên (A→Z / Z→A)
-  Toggle giữa các chế độ
-  Kết hợp với tìm kiếm

## Công Nghệ Sử Dụng

### Backend
- **Node.js** & **Express.js** - Server và RESTful API
- **MongoDB** - Cơ sở dữ liệu NoSQL
- **Mongoose** - ODM cho MongoDB
- **Docker** - Container hóa MongoDB

### Frontend
- **React** (v18) - Thư viện UI
- **React Router DOM** - Routing
- **Axios** - HTTP Client
- **CSS3** - Styling với gradient và animations

##  Cài Đặt

### Yêu Cầu
- Node.js (v14 trở lên)
- Docker & Docker Compose
- npm hoặc yarn

### Bước 1: Clone Dự Án
```bash
# Tải về dự án (hoặc giải nén file đã tạo)
cd student-management
```

### Bước 2: Cài Đặt Backend

```bash
cd backend

# Cài đặt dependencies
npm install

# Khởi động MongoDB bằng Docker
docker-compose up -d

# Chạy server
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

### Bước 3: Cài Đặt Frontend

Mở terminal mới:

```bash
cd frontend

# Cài đặt dependencies
npm install

# Chạy ứng dụng React
npm start
```

Ứng dụng sẽ mở tại: `http://localhost:3000`

##  Hướng Dẫn Sử Dụng

### 1. Khởi Động Ứng Dụng

**Bước 1:** Khởi động MongoDB
```bash
cd backend
docker-compose up -d
```

**Bước 2:** Khởi động Backend
```bash
# Trong thư mục backend
npm start
```

**Bước 3:** Khởi động Frontend
```bash
# Trong thư mục frontend (terminal mới)
npm start
```

### 2. Sử Dụng Các Tính Năng

#### Thêm Học Sinh
1. Điền thông tin vào form "Thêm Học Sinh Mới"
2. Nhập: Họ tên, Tuổi, Lớp
3. Click nút "Thêm Học Sinh"
4. Học sinh mới xuất hiện trong bảng

#### Tìm Kiếm
1. Nhập tên (hoặc một phần) vào ô tìm kiếm
2. Danh sách tự động lọc theo từ khóa
3. Xóa nội dung để hiển thị lại toàn bộ

#### Sắp Xếp
1. Click nút "Sắp xếp: A → Z" để đổi thứ tự
2. Nút sẽ chuyển thành "Sắp xếp: Z → A"
3. Danh sách sắp xếp ngay lập tức

#### Chỉnh Sửa
1. Click nút "✏️ Sửa" bên cạnh học sinh
2. Màn hình chuyển sang trang chỉnh sửa
3. Thay đổi thông tin cần thiết
4. Click " Lưu Thay Đổi"
5. Quay về trang chính với dữ liệu đã cập nhật

#### Xóa Học Sinh
1. Click nút "🗑️ Xóa" bên cạnh học sinh
2. Xác nhận trong hộp thoại
3. Học sinh bị xóa khỏi danh sách

**Version:** 1.0.0
