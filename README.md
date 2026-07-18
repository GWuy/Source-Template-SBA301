# 📋 SBA301 PE — Source Code Template

> **Bộ template copy-paste nhanh** để triển khai ứng dụng web React trong kỳ thi PE môn SBA301 tại FPT University.

---

## 🚀 Tech Stack

| Công nghệ            | Phiên bản | Mô tả                       |
| -------------------- | --------- | --------------------------- |
| **React**            | 19        | UI Library                  |
| **Vite**             | 8         | Build tool & Dev server     |
| **React-Bootstrap**  | 2         | UI Components (Bootstrap 5) |
| **React Router DOM** | 7         | Client-side routing         |
| **Axios**            | latest    | HTTP client cho API calls   |

---

## 📁 Cấu trúc Repository

```
source-template/
├── README.md                          ← Bạn đang đọc file này
├── source-template.md                 ← ⭐ Template chính (Full CRUD)
├── React-Vite-Bootstrap-Template.md   ← Hướng dẫn cơ bản React + Bootstrap
├── validation-field.md                ← Tổng hợp Validation rules
└── src/
    └── layouts/
        ├── AppLayout.jsx              ← Layout component (Header + Outlet + Footer)
        └── AppLayout.css              ← Responsive styles cho layout
```

---

## 📄 Mô tả từng file

### [`source-template.md`](source-template.md) — ⭐ Template chính

Tài liệu **tất-cả-trong-một**, chứa toàn bộ source code template có thể copy-paste để xây dựng ứng dụng CRUD hoàn chỉnh.

**Nội dung bao gồm:**

| Section              | Nội dung                                                               |
| -------------------- | ---------------------------------------------------------------------- |
| **1. Cấu hình**      | `.env`, `package.json`, `vite.config.js`, `index.html`                 |
| **2. Entry Points**  | `main.jsx`, `App.jsx`, `index.css`                                     |
| **2.5 AppLayout**    | Layout chung với `<Outlet />` (Nested Routes)                          |
| **3. Components**    | `Header.jsx`, `Footer.jsx`                                             |
| **4. Services**      | `api.js` (Centralized Axios), `EntityService.js`, `CategoryService.js` |
| **5. Pages**         | `EntityList.jsx` (List + Filter + View + Delete + Create/Edit Modal)   |
| **5.1 CreateEntity** | Trang Create form riêng với Validation                                 |
| **5.2 DetailEntity** | Trang View Detail riêng (standalone page)                              |
| **5.3 DeleteEntity** | Trang Delete Confirmation riêng (standalone page)                      |
| **6–10**             | Quick Start, Checklist, Patterns, Bootstrap Classes, Components        |

---

### [`React-Vite-Bootstrap-Template.md`](React-Vite-Bootstrap-Template.md) — Hướng dẫn cơ bản

Tài liệu tham khảo nhanh về các khái niệm cơ bản:

- Khởi tạo project Vite + React
- Cài đặt thư viện (Bootstrap, Router, Axios)
- Bootstrap Components (Container, Button, Form, Table, Modal...)
- Routing & Navigation
- Axios (GET, POST)
- Service Layer pattern
- JWT Authentication
- Environment Variables
- Best Practices

---

### [`validation-field.md`](validation-field.md) — Validation Templates

Tổng hợp **20 validation rules** phổ biến, copy-paste vào function `validate()`:

| #     | Rule                                       | Dùng cho        |
| ----- | ------------------------------------------ | --------------- |
| 1–4   | Required, Max/Min Length                   | Text fields     |
| 5–7   | Positive Number, Range, Integer            | Number fields   |
| 8     | Required Dropdown                          | Select/Dropdown |
| 9–10  | Email, Phone                               | Contact fields  |
| 11–14 | Date Required, Future/Past, Comparison     | Date fields     |
| 15–16 | Password, Confirm Password                 | Auth forms      |
| 17–20 | URL, No Special Chars, Alphabetic, Decimal | Misc            |

---

### `src/layouts/` — AppLayout Component

Source code thực tế cho layout component:

- **`AppLayout.jsx`** — Bọc `Header + <Outlet /> + Footer`, dùng React Router nested routes
- **`AppLayout.css`** — Styles responsive với Flexbox (footer luôn ở dưới cùng)

---

## ⚡ Quick Start — Triển khai trong 8 phút

```bash
# 1. Tạo project
npm create vite@latest ./ -- --template react

# 2. Cài dependencies
npm install axios bootstrap react-bootstrap react-router-dom

# 3. Chạy dev server
npm run dev
```

**Sau đó:**

1. Mở `source-template.md`
2. Copy từng section theo thứ tự: `.env` → `api.js` → Service → Components → Pages → Routes
3. Đổi tên `Entity` → tên thực thể thực tế bằng **Ctrl+H**
4. Sửa fields trong form/table cho phù hợp với đề

---

## 🏗️ Kiến trúc ứng dụng

```
.env (VITE_API_URL)
  └→ services/api.js          (Centralized Axios instance)
       └→ services/EntityService.js   (CRUD API methods)
            └→ pages/EntityList.jsx    (UI + Business Logic)
                 └→ App.jsx           (Routes config)
                      └→ main.jsx     (BrowserRouter + Render)
```

```
<AppLayout>                      ← Route cha
  ├── <Header />                 ← Luôn hiển thị
  ├── <main>
  │     └── <Outlet />           ← Page con render ở đây
  │           ├── /              → EntityList
  │           ├── /create        → CreateEntity
  │           ├── /detail/:id    → DetailEntity
  │           └── /delete/:id    → DeleteEntity
  └── <Footer />                 ← Luôn hiển thị
```

---

## 📌 Nguyên tắc sử dụng

| Thay đổi        | Chỉ cần sửa                               |
| --------------- | ----------------------------------------- |
| Đổi API URL     | `.env`                                    |
| Đổi entity      | Service + Page                            |
| Thêm validation | `validate()` trong Page                   |
| Thêm page mới   | Tạo file + thêm `<Route>` trong `App.jsx` |

---

## 👤 Tác giả

- **Bùi Gia Huy** — FPT University
- Môn: **SBA301** — Semester CN7

---

> 💡 **Tips:** Luôn dùng `response.data.content || response.data || []` để handle cả paginated và non-paginated API response.
