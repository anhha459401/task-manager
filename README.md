# 📝 Task Manager App

## 🚀 Giới thiệu

Task Manager App là ứng dụng quản lý công việc cá nhân được xây dựng bằng React.
Ứng dụng cho phép người dùng tạo, chỉnh sửa, theo dõi và quản lý tiến độ công việc một cách trực quan.

Dự án tập trung vào:

- Trải nghiệm người dùng (UX)
- Giao diện responsive
- Kiến trúc component rõ ràng, dễ mở rộng

---

## 🛠️ Công nghệ sử dụng

- React (Hooks)
- Vite
- Tailwind CSS
- Custom Hook (`useLocalStorage`)
- LocalStorage

---

## ▶️ Hướng dẫn cài đặt và chạy local

### 1. Clone project

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy project

```bash
npm run dev
```

### 4. Truy cập

```
http://localhost:5173
```

---

## ✨ Tính năng chính

- ➕ Thêm công việc (Modal)
- ✏️ Chỉnh sửa công việc (title + deadline)
- ❌ Xóa công việc (Confirm Modal)
- 🔄 Cập nhật trạng thái
- 🔍 Tìm kiếm công việc
- 📂 Lọc theo trạng thái
- 📊 Phân trang danh sách task
- 📈 Thống kê nhanh
- ⏰ Deadline (ngày + giờ + phút)
- ⚠️ Highlight task quá hạn
- 💾 Lưu dữ liệu bằng localStorage
- 📱 Responsive (mobile & desktop)

---

## 🧩 Kiến trúc Component

Dự án được chia thành các component nhỏ, mỗi component đảm nhiệm một chức năng riêng:

### 🔹 `Header.jsx`

- Hiển thị tiêu đề ứng dụng
- Có thể mở rộng thêm navigation hoặc user info

---

### 🔹 `TaskColumn.jsx`

- Chia task theo từng trạng thái:
  - TODO
  - IN_PROGRESS
  - DONE

- Giúp UI rõ ràng, dễ quản lý

---

### 🔹 `TaskCard.jsx`

- Hiển thị thông tin từng task:
  - Title
  - Deadline
  - Status

- Hỗ trợ:
  - Click đổi trạng thái
  - Hiển thị overdue
  - Trigger edit/delete

---

### 🔹 `TaskModal.jsx`

- Modal dùng để:
  - Thêm task
  - Chỉnh sửa task

- Bao gồm:
  - Input title
  - Chọn ngày
  - Chọn giờ (TimePicker)

---

### 🔹 `ConfirmModal.jsx`

- Hiển thị khi xóa task
- Tránh thao tác nhầm
- Tăng UX chuyên nghiệp

---

### 🔹 `SearchFilter.jsx`

- Tìm kiếm theo tên task
- Lọc theo trạng thái
- Giúp quản lý task dễ hơn khi dữ liệu lớn

---

### 🔹 `StatsBar.jsx`

- Hiển thị thống kê:
  - Tổng số task
  - Task hoàn thành
  - Task quá hạn

- Cập nhật realtime theo state

---

### 🔹 `Pagination.jsx`

- Phân trang danh sách task
- Giúp UI gọn gàng khi có nhiều dữ liệu

---

### 🔹 `Login.jsx` (Optional / mở rộng)

- Component chuẩn bị cho việc:
  - Authentication
  - Phân quyền người dùng

---

## 🧠 Giải thích quyết định kỹ thuật

### 1. Tách component nhỏ

**Lý do:**

- Dễ maintain
- Dễ test
- Dễ mở rộng

---

### 2. Sử dụng Modal (TaskModal + ConfirmModal)

**Lý do:**

- UX tốt hơn
- Tách biệt luồng xử lý
- Giống ứng dụng thực tế

---

### 3. LocalStorage + Custom Hook

```js
const [tasks, setTasks] = useLocalStorage("tasks", []);
```

**Lý do:**

- Tái sử dụng logic
- Code sạch hơn
- Không phụ thuộc backend

---

### 4. Deadline chuẩn ISO

```txt
YYYY-MM-DDTHH:mm
```

**Lý do:**

- Dễ parse bằng JS Date
- So sánh chính xác

---

### 5. Kiến trúc dạng module

- Mỗi chức năng = 1 component
- Tách rõ UI và logic

➡️ Đây là cách tổ chức gần với project thực tế

---

## 🔮 Hướng phát triển

- Drag & Drop task
- Priority (High / Medium / Low)
- Dark mode
- Backend (API)
- Authentication (Login/Register)
- Realtime update (WebSocket)
- Deploy production

---

## 📌 Kết luận

Ứng dụng đã:

- Đáp ứng đầy đủ yêu cầu đề bài
- Có thêm nhiều tính năng nâng cao:
  - Modal
  - Pagination
  - Confirm action

- Kiến trúc rõ ràng, dễ mở rộng

➡️ Phù hợp với tiêu chuẩn của một ứng viên Frontend Intern

---
