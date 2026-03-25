# 🗂️ Task Manager App (React + Tailwind)

Ứng dụng quản lý công việc (To-Do List) hiện đại, hỗ trợ phân loại trạng thái, tìm kiếm, lọc, phân trang và nhiều tính năng nâng cao.

---

🌐 Demo Online

👉 Trải nghiệm trực tiếp ứng dụng tại:

🔗 Live Demo: https://your-vercel-link.vercel.app

### ✨ Chức năng chính

- 🔐 Đăng nhập đơn giản theo tên (lưu localStorage)
- 📝 Thêm / Sửa / Xóa công việc
- 📌 Phân loại trạng thái:
  - TODO (Chưa làm)
  - IN_PROGRESS (Đang làm)
  - DONE (Hoàn thành)

- 🔍 Tìm kiếm theo tên công việc
- 🎯 Lọc theo:
  - Trạng thái
  - Thời gian (Hôm nay / Tuần / Tháng / Năm)

- 📊 Thống kê:
  - Tổng công việc
  - Đã hoàn thành
  - Quá hạn

---

### 📱 Responsive (Mobile Friendly)

- Giao diện tối ưu cho mobile
- Tabs chuyển cột (TODO / IN_PROGRESS / DONE)
- Filter dạng dropdown (toggle bằng icon ☰)
- Tối ưu không gian hiển thị

---

### 🧠 Tính năng nâng cao

- 📄 Phân trang (Pagination)
- ⏰ Deadline + cảnh báo quá hạn
- 🎨 UI hiện đại với TailwindCSS
- 🔥 Custom Select (dropdown đẹp, thay thế `<select>` mặc định)
- 📅 Custom DatePicker + TimePicker

---

### 🖼️ Avatar người dùng

- Hiển thị chữ cái đầu nếu chưa có ảnh
- Click avatar để upload ảnh
- Lưu ảnh theo từng user bằng `localStorage`
- Tự động load lại khi đăng nhập

---

### ✅ Bulk Actions

- Chọn nhiều công việc
- Xóa nhiều công việc cùng lúc

---

## 🛠️ Công nghệ sử dụng

- ⚛️ ReactJS (Hooks)
- 🎨 TailwindCSS
- 🔔 React Toastify
- 📦 Day.js
- 🎯 Lucide Icons

---

## ⚙️ Cài đặt & chạy project

### 1. Clone project

```bash
git clone <repo-url>
cd task-manager
```

### 2. Cài đặt thư viện

```bash
npm install
```

### 3. Chạy project

```bash
npm run dev
```

---

## 💾 Lưu trữ dữ liệu

Ứng dụng sử dụng **localStorage**:

### Tasks

```js
taskManagerData = {
  username1: [...tasks],
  username2: [...tasks],
};
```

### Avatar

```js
avatar_<username> = "base64_image"
```

---

## 🎯 Hướng phát triển thêm

- 🌐 Kết nối backend (Django / Node.js)
- 🔐 Authentication (JWT, Google Login)
- 🖼️ Crop & resize avatar trước khi upload
- 📅 Drag & Drop task (Kanban)
- 📊 Dashboard nâng cao (biểu đồ)
- 🔔 Notification reminder

---
