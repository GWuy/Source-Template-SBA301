# 📋 SBA301 PE - Source Code Template V2 (React + Vite + Bootstrap)

> **Mục đích:** Copy nhanh các template để triển khai 1 trang web React + Vite + React-Bootstrap.
> **Stack:** React 19 + Vite 8 + React-Bootstrap 2 + Axios + React Router DOM 7
> **Theme:** Employee Management System style — Dark navy header, clean white body, professional layout

---

## 📁 Cấu trúc thư mục (Best Practice)

```
project-root/
├── .env                          ← API URL config (1 chỗ duy nhất)
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                  ← Entry point + BrowserRouter
│   ├── App.jsx                   ← Layout + Routes
│   ├── App.css                   ← Custom styles (nếu cần)
│   ├── index.css                 ← Bootstrap import (global)
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── layouts/
│   │   ├── AppLayout.jsx         ← Layout chung (Header + Outlet + Footer)
│   │   └── AppLayout.css         ← Responsive styles cho layout
│   ├── pages/
│   │   ├── [Entity]List.jsx      ← Trang list + filter + view + delete
│   │   ├── Detail[Entity].jsx    ← Trang detail (view chi tiết)
│   │   ├── Create[Entity].jsx    ← Trang create form (navigate từ Add New)
│   │   └── Delete[Entity].jsx    ← Trang xác nhận xóa (standalone page)
│   └── services/
│       ├── api.js                ← ⭐ Centralized Axios (đổi URL 1 chỗ)
│       ├── [Entity]Service.js
│       └── CategoryService.js
```

### Luồng kiến trúc:

```
.env (VITE_API_URL)
  └→ services/api.js (axios instance dùng chung)
       └→ services/EntityService.js (CRUD methods)
            └→ pages/EntityList.jsx (UI + logic)
                 └→ App.jsx (Routes)
                      └→ main.jsx (BrowserRouter + render)
```

> **✅ Nguyên tắc:** Đổi API URL → chỉ sửa `.env`. Đổi entity → chỉ sửa Service + Page.

---

## 1. 🔧 Cấu hình dự án

### `.env`

```env
VITE_API_URL=http://localhost:8080
```

### `package.json`

```json
{
  "name": "sba301_se1xxxxx_project",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.18.1",
    "bootstrap": "^5.3.8",
    "react": "^19.2.7",
    "react-bootstrap": "^2.10.10",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.18.1"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "vite": "^8.1.1"
  }
}
```

### `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

### `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SBA301 Project</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 2. 🚀 Entry Points

### `src/main.jsx` — ⭐ Router ở đây

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

### `src/index.css` — Bootstrap (import 1 lần duy nhất)

```css
@import "bootstrap/dist/css/bootstrap.css";
```

### `src/App.css` — Custom styles

```css
@import "bootstrap/dist/css/bootstrap.css";
/* Thêm custom styles ở đây nếu cần */
```

---

## 2.5 🧱 AppLayout (Layout + Outlet)

> **Mục đích:** Tạo layout chung bọc Header + `<Outlet />` + Footer, dùng React Router v7 nested routes.
> **Khi nào dùng:** Khi muốn Header/Footer luôn hiển thị, chỉ thay đổi nội dung `<main>` theo route.

### `src/layouts/AppLayout.css`

> **⚠️ Mã màu mặc định dùng trong template này:**
>
> - Header/Table header background: `#2c3e6b` (navy blue đậm)
> - Header/Table header text: `#ffffff` (trắng)
> - Body background: `#f5f5f5` (xám nhạt)
> - App container background: `#ffffff` (trắng)
> - Border: `#dee2e6` (xám nhạt)
> - Title text: `#2c3e6b` (navy blue)
> - Link View: `#2c3e6b` (navy blue)
> - Link Delete: `#c0392b` (đỏ)
> - Filter button background: `#2c3e6b`
> - Footer text: `#6c757d` (xám)
>
> 👉 **Xem file `color-codes.md` để đổi mã màu theo ý muốn.**

```css
/* ========== BODY BACKGROUND ========== */
body {
  background-color: #f5f5f5;
}

/* ========== APP CONTAINER ========== */
.app-body {
  width: 1150px;
  max-width: 1200px;
  min-height: 650px;
  margin: 20px auto;
  padding: 0;
  background: #ffffff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.app-body main {
  flex-grow: 1;
  padding: 20px 30px;
}

/* ========== HEADER ========== */
.app-header {
  background-color: #2c3e6b;
  color: #ffffff;
  padding: 12px 30px;
  font-size: 18px;
  font-weight: bold;
}

.app-header .header-date {
  color: #cbd5e1;
  font-size: 14px;
  font-weight: normal;
}

/* ========== FOOTER ========== */
.app-footer {
  text-align: center;
  padding: 15px 30px;
  border-top: 1px solid #dee2e6;
  color: #6c757d;
  font-size: 14px;
}

/* ========== PAGE TITLE ========== */
.page-title {
  color: #2c3e6b;
  font-weight: bold;
  font-size: 22px;
  margin-bottom: 20px;
}

/* ========== FILTER SECTION ========== */
.filter-section label {
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.filter-btn {
  background-color: #2c3e6b;
  border-color: #2c3e6b;
  color: #ffffff;
  font-weight: bold;
  padding: 6px 30px;
}

.filter-btn:hover {
  background-color: #1e2d52;
  border-color: #1e2d52;
}

.add-new-btn {
  border: 1px solid #333;
  color: #333;
  background: #ffffff;
  font-weight: 500;
  padding: 6px 20px;
}

.add-new-btn:hover {
  background: #f0f0f0;
  color: #333;
  border-color: #333;
}

/* ========== TABLE ========== */
.entity-table {
  border: 1px solid #dee2e6;
}

.entity-table thead th {
  background-color: #2c3e6b;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  padding: 10px 12px;
  border: 1px solid #2c3e6b;
}

.entity-table tbody td {
  padding: 10px 12px;
  font-size: 14px;
  vertical-align: middle;
  border: 1px solid #dee2e6;
}

.entity-table tbody tr:hover {
  background-color: #f8f9fa;
}

/* ========== CATEGORY BADGE ========== */
.badge-category {
  padding: 3px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: #ffffff;
  display: inline-block;
}

/* ========== ACTION LINKS ========== */
.action-link-view {
  color: #2c3e6b;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.action-link-view:hover {
  text-decoration: underline;
  color: #1e2d52;
}

.action-link-delete {
  color: #c0392b;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.action-link-delete:hover {
  text-decoration: underline;
  color: #a93226;
}

/* ========== PAGINATION ========== */
.pagination-info {
  font-size: 14px;
  color: #6c757d;
}

.custom-pagination .page-item .page-link {
  color: #2c3e6b;
  border: 1px solid #dee2e6;
  padding: 4px 12px;
  font-size: 14px;
}

.custom-pagination .page-item.active .page-link {
  background-color: #2c3e6b;
  border-color: #2c3e6b;
  color: #ffffff;
}

/* ========== DETAIL PAGE ========== */
.detail-label {
  font-weight: bold;
  color: #333;
  font-size: 14px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.detail-value {
  font-size: 14px;
  color: #333;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.back-link {
  color: #2c3e6b;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
}

.back-link:hover {
  text-decoration: underline;
}

/* ========== CREATE/EDIT FORM ========== */
.form-section label {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.form-section .form-control,
.form-section .form-select {
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.save-btn {
  background-color: #2c3e6b;
  border-color: #2c3e6b;
  color: #ffffff;
  font-weight: bold;
  padding: 6px 30px;
}

.save-btn:hover {
  background-color: #1e2d52;
  border-color: #1e2d52;
}

.back-btn {
  border: 1px solid #ccc;
  color: #333;
  background: #ffffff;
  font-weight: 500;
  padding: 6px 25px;
}

.back-btn:hover {
  background: #f0f0f0;
  color: #333;
}

/* ========== SUCCESS MESSAGE ========== */
.success-message {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 12px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
}

/* ========== DELETE CONFIRMATION MODAL ========== */
.delete-modal .modal-header {
  border-bottom: 1px solid #dee2e6;
  padding: 12px 20px;
}

.delete-modal .modal-title {
  color: #c0392b;
  font-weight: bold;
  font-size: 18px;
}

.delete-modal .modal-title .warning-icon {
  color: #e67e22;
  margin-right: 8px;
}

.delete-modal .modal-body {
  padding: 20px;
  font-size: 14px;
}

.delete-modal .modal-body .delete-name {
  font-weight: bold;
  color: #2c3e6b;
}

.delete-modal .modal-body .delete-warning {
  color: #6c757d;
  font-size: 13px;
  margin-top: 5px;
}

.delete-modal .modal-footer {
  border-top: 1px solid #dee2e6;
  padding: 12px 20px;
}

.yes-btn {
  background-color: #e74c3c;
  border-color: #e74c3c;
  color: #ffffff;
  font-weight: bold;
  padding: 6px 25px;
  border: 2px solid #e74c3c;
}

.yes-btn:hover {
  background-color: #c0392b;
  border-color: #c0392b;
}

.close-btn {
  border: 2px solid #333;
  color: #333;
  background: #ffffff;
  font-weight: bold;
  padding: 6px 20px;
}

.close-btn:hover {
  background: #f0f0f0;
  color: #333;
  border-color: #333;
}

/* ========== DELETE CONFIRMATION PAGE ========== */
.delete-page-card {
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 30px;
  max-width: 500px;
  margin: 40px auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.delete-page-title {
  color: #c0392b;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 12px;
  margin-bottom: 20px;
}

.delete-page-message {
  font-size: 15px;
  color: #333;
}

.delete-page-message .entity-name {
  font-weight: bold;
  color: #2c3e6b;
}

.delete-page-warning {
  color: #6c757d;
  font-size: 13px;
  margin-top: 8px;
}
```

### `src/layouts/AppLayout.jsx`

```jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./AppLayout.css";

function AppLayout() {
  return (
    <div className="app-body">
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
```

### `src/App.jsx` — Cách dùng AppLayout (Nested Routes)

> **⚠️ Quan trọng:** Khi dùng AppLayout, `App.jsx` KHÔNG import Header/Footer nữa.
> AppLayout đã bọc sẵn → chỉ cần định nghĩa routes con bên trong.

```jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import EntityList from "./pages/EntityList.jsx";       // ← Đổi tên entity
import CreateEntity from "./pages/CreateEntity.jsx";   // ← Trang create
import DetailEntity from "./pages/DetailEntity.jsx";   // ← Trang detail
import DeleteEntity from "./pages/DeleteEntity.jsx";   // ← Trang delete (page version)

function App() {
  return (
    <Routes>
      {/* AppLayout là route cha — Header + Footer tự động render */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<EntityList />} />
        <Route path="/create" element={<CreateEntity />} />
        <Route path="/detail/:id" element={<DetailEntity />} />
        <Route path="/delete/:id" element={<DeleteEntity />} />
        {/* <Route path="/edit/:id" element={<EditEntity />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
```

### Luồng hoạt động

```
<AppLayout>                    ← Route cha (không có path)
  ├── <Header />               ← Luôn hiển thị (navy bar)
  ├── <main>
  │     └── <Outlet />         ← React Router inject page con vào đây
  │           ├── path="/"                → <EntityList />
  │           ├── path="/create"          → <CreateEntity />
  │           ├── path="/detail/:id"      → <DetailEntity />
  │           └── path="/delete/:id"      → <DeleteEntity />
  └── <Footer />               ← Luôn hiển thị (© 2026 FU University)
```

---

## 3. 🧩 Components

### `src/components/Header.jsx`

> **Theo hình:** Header có nền navy đậm, bên trái là tên hệ thống (bold, trắng), bên phải là ngày (nhạt hơn).

```jsx
import { Col, Container, Row } from "react-bootstrap";

function Header() {
  // Format ngày hiện tại: yyyy-MM-dd
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  return (
    <div className="app-header">
      <Container fluid className="px-0">
        <Row className="align-items-center">
          <Col md={8} className="text-start">
            Employee Management System {/* ← Đổi tên hệ thống */}
          </Col>
          <Col md={4} className="text-end">
            <span className="header-date">{formattedDate}</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
```

### `src/components/Footer.jsx`

> **Theo hình:** Footer nhỏ, có border trên, text "© 2026 FU University" căn giữa, màu xám.

```jsx
function Footer() {
  return (
    <div className="app-footer">
      © 2026 FU University
    </div>
  );
}

export default Footer;
```

---

## 4. 🌐 Services (API Calls)

### `src/services/api.js` — ⭐ QUAN TRỌNG NHẤT (Centralized Axios)

> **Tạo file này đầu tiên!** Tất cả service khác đều import từ đây. Đổi URL API chỉ cần sửa `.env`.

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

export default api;
```

### `src/services/EntityService.js` — Template CRUD Service

> **Hướng dẫn:** Đổi `entity` / `entities` → tên thực thể (vd: `employee` → `employees`)

```js
import api from "./api.js";

const BASE_URL = "/api/entities"; // ← Đổi endpoint (chỉ path, không cần domain)

// GET ALL (paginated)
const getAllEntityList = () => {
  return api.get(BASE_URL);
};

// SEARCH / FILTER (có phân trang)
// Cách A: Truyền categoryId
const searchEntities = (
  name,
  categoryId,
  page = 0,
  size = 5,
  sortBy = "name",
) => {
  let url = `${BASE_URL}/search?page=${page}&size=${size}&sortBy=${sortBy}`;
  if (name) url += `&name=${name}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  return api.get(url);
};

// Cách B: Truyền categoryName (nếu backend nhận tên thay vì ID)
// const searchEntities = (name, category, page = 0, size = 5, sortBy = "name") => {
//   let url = `${BASE_URL}/search?page=${page}&size=${size}&sortBy=${sortBy}`;
//   if (name) url += `&name=${name}`;
//   if (category) url += `&category=${category}`;
//   return api.get(url);
// };

// GET BY ID
const getEntityById = (id) => {
  return api.get(`${BASE_URL}/${id}`);
};

// DELETE
const deleteEntity = (id) => {
  return api.delete(`${BASE_URL}/${id}`);
};

// CREATE (POST)
const createEntity = (data) => {
  return api.post(BASE_URL, data);
};

// UPDATE (PUT)
const updateEntity = (id, data) => {
  return api.put(`${BASE_URL}/${id}`, data);
};

export const entityService = {
  getAllEntityList,
  searchEntities,
  getEntityById,
  deleteEntity,
  createEntity,
  updateEntity,
};
```

### `src/services/CategoryService.js` — Service cho Dropdown/Filter

```js
import api from "./api.js";

const getAllCategoryList = () => {
  return api.get("/api/categories"); // ← Chỉ cần path
};

export const categoryService = {
  getAllCategoryList,
};
```

---

## 5. 📄 Pages — CRUD List + View + Delete + Create/Edit Template

### `src/pages/EntityList.jsx` — **TEMPLATE CHÍNH (Full CRUD)**

> **Hướng dẫn sử dụng:**
>
> 1. Copy file này
> 2. Đổi `Entity` → tên thực thể (vd: `Employee`)
> 3. Đổi các field → field thực tế
> 4. Đổi service import
> 5. Thêm/bớt field trong table
> 6. **Filter:** Hỗ trợ filter theo `categoryId` (truyền trực tiếp ID)
> 7. **Pagination:** Phân trang server-side, dùng `Pagination` component
>    - Backend trả về `PageDTO` / `Page<>` (Spring Boot) gồm: `content`, `totalPages`, `number`, `totalElements`
>    - Default: 5 items/trang (theo hình). Đổi `pageSize` nếu cần
> 8. **Delete:** Có 2 cách — popup Modal hoặc navigate sang trang riêng (xem bên dưới)

> **⚠️ Lưu ý:** Template này hỗ trợ **CẢ HAI** cách delete:
>
> - **Popup Modal:** Dùng `handleOpenDeleteModal()` (mặc định)
> - **Page riêng:** Dùng `navigate('/delete/...')` (comment sẵn)

#### Cách A: Delete bằng Popup Modal (mặc định — theo hình thứ 2)

```jsx
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../services/CategoryService.js";
import { entityService } from "../services/EntityService.js"; // ← Đổi service

// ========== BADGE MÀU THEO CATEGORY ==========
// ⚠️ Đổi mapping này theo category thực tế
const CATEGORY_COLORS = {
  IT: "#2980b9",          // Xanh dương
  HR: "#8e44ad",          // Tím
  Finance: "#27ae60",     // Xanh lá
  Marketing: "#e67e22",   // Cam
  Sales: "#c0392b",       // Đỏ
  // Thêm category khác...
};

function EntityList() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [entities, setEntities] = useState([]);

  // Filter states
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState(""); // categoryId

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0); // 0-based (theo Spring Boot)
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(5); // ← 5 items/trang (theo hình)

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");

  // Delete Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState(null);

  // ========== FETCH DATA ==========
  const fetchEntities = useCallback(
    async (page = 0) => {
      try {
        const response = await entityService.searchEntities(
          searchName || "",
          searchCategory || "",
          page,
          pageSize,
        );
        const data = response.data;
        setEntities(data.content || data || []);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
        setCurrentPage(data.number ?? page);
      } catch (error) {
        console.error("Error fetching entities:", error);
        setEntities([]);
        setTotalPages(0);
        setTotalElements(0);
      }
    },
    [searchName, searchCategory, pageSize],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAllCategoryList();
        setCategories(res.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    fetchCategories();
    fetchEntities(0);
  }, [fetchEntities]);

  // ========== FILTER / SEARCH ==========
  const handleFilter = async () => {
    try {
      const response = await entityService.searchEntities(
        searchName,
        searchCategory,
        0,
        pageSize,
      );
      const data = response.data;
      setEntities(data.content || data || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
      setCurrentPage(data.number ?? 0);
    } catch (error) {
      console.error("Error filtering:", error);
      setEntities([]);
      setTotalPages(0);
      setTotalElements(0);
    }
  };

  // ========== PAGINATION ==========
  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) return;
    fetchEntities(page);
  };

  // ========== DELETE MODAL ==========
  const handleOpenDeleteModal = (entity) => {
    setEntityToDelete(entity);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setEntityToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!entityToDelete) return;
    try {
      await entityService.deleteEntity(
        entityToDelete.id || entityToDelete.entityId,
      );
      handleCloseDeleteModal();
      fetchEntities(currentPage); // Reload trang hiện tại
      setSuccessMessage("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete");
    }
  };

  // ========== RENDER ==========
  return (
    <Container fluid className="px-0">
      {/* ===== SUCCESS MESSAGE ===== */}
      {successMessage && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccessMessage("")}
        >
          {successMessage}
        </Alert>
      )}

      {/* ===== TITLE ===== */}
      <h4 className="page-title">Employee List</h4> {/* ← Đổi title */}

      {/* ===== FILTER SECTION ===== */}
      <Row className="filter-section align-items-end mb-4">
        {/* Employee Name */}
        <Col md={3}>
          <label>Employee Name</label> {/* ← Đổi label */}
          <Form.Control
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder=""
          />
        </Col>

        {/* Department dropdown */}
        <Col md={3}>
          <label>Department</label> {/* ← Đổi label (Category/Department) */}
          <Form.Select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">-- All --</option>
            {categories &&
              categories.length > 0 &&
              categories.map((category, index) => (
                <option
                  key={category.id || category.categoryId || index}
                  value={category.id || category.categoryId}
                >
                  {category.categoryName}
                </option>
              ))}
          </Form.Select>
        </Col>

        {/* Filter button */}
        <Col md={2}>
          <Button className="filter-btn" onClick={handleFilter}>
            Filter
          </Button>
        </Col>

        {/* Spacer */}
        <Col md={2}></Col>

        {/* Add New button */}
        <Col md={2} className="text-end">
          <Button className="add-new-btn" onClick={() => navigate("/create")}>
            + Add New
          </Button>
        </Col>
      </Row>

      {/* ===== TABLE ===== */}
      <Table className="entity-table" bordered>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "18%" }}>Full Name</th>    {/* ← Đổi column headers */}
            <th style={{ width: "14%" }}>Department</th>
            <th style={{ width: "16%" }}>Position</th>
            <th style={{ width: "17%" }}>Email</th>
            <th style={{ width: "14%" }}>Phone</th>
            <th style={{ width: "16%" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {entities && Array.isArray(entities) && entities.length > 0 ? (
            entities.map((entity, index) => (
              <tr key={entity.id || entity.entityId}>
                <td>{currentPage * pageSize + index + 1}</td>
                <td>{entity.fullName || entity.entityName}</td> {/* ← Đổi field */}
                <td>
                  {/* Badge màu theo category */}
                  <span
                    className="badge-category"
                    style={{
                      backgroundColor:
                        CATEGORY_COLORS[entity.departmentName || entity.categoryName] ||
                        "#6c757d",
                    }}
                  >
                    {entity.departmentName || entity.categoryName}
                  </span>
                </td>
                <td>{entity.position}</td>       {/* ← Đổi field */}
                <td>{entity.email}</td>           {/* ← Đổi field */}
                <td>{entity.phone}</td>           {/* ← Đổi field */}
                <td>
                  {/* View link */}
                  <a
                    className="action-link-view"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/detail/${entity.id || entity.entityId}`);
                    }}
                    href="#"
                  >
                    View
                  </a>
                  <span className="mx-1" style={{ color: "#ccc" }}>|</span>
                  {/* Delete link — POPUP MODAL */}
                  <a
                    className="action-link-delete"
                    onClick={(e) => {
                      e.preventDefault();
                      handleOpenDeleteModal(entity);
                    }}
                    href="#"
                  >
                    Delete
                  </a>
                  {/* Delete link — PAGE (thay thế nếu cần) */}
                  {/*
                  <a
                    className="action-link-delete"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/delete/${entity.id || entity.entityId}`);
                    }}
                    href="#"
                  >
                    Delete
                  </a>
                  */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ===== PAGINATION ===== */}
      <Row className="align-items-center mt-3">
        <Col md={6} className="text-start">
          <span className="pagination-info">
            Page {currentPage + 1} / {totalPages || 1} ({totalElements} records)
          </span>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Pagination className="mb-0 custom-pagination">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <
            </Pagination.Prev>

            {[...Array(totalPages || 1)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index === currentPage}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1 || totalPages === 0}
            >
              >
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>

      {/* ===== DELETE CONFIRMATION MODAL (Popup) ===== */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        className="delete-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="warning-icon">⚠</span> Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete<br />
            employee "<span className="delete-name">
              {entityToDelete?.fullName || entityToDelete?.entityName}
            </span>"?
            {/* ← Đổi "employee" và field name */}
          </p>
          <p className="delete-warning">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="yes-btn" onClick={handleConfirmDelete}>
            Yes
          </Button>
          <Button className="close-btn" onClick={handleCloseDeleteModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EntityList;
```

#### Cách B: Delete bằng navigate sang Page riêng

> Trong `EntityList.jsx`, thay `handleOpenDeleteModal(entity)` → `navigate('/delete/...')`:

```jsx
{/* Thay block Delete link trong Action column: */}
<a
  className="action-link-delete"
  onClick={(e) => {
    e.preventDefault();
    navigate(`/delete/${entity.id || entity.entityId}`);
  }}
  href="#"
>
  Delete
</a>
```

> Và **KHÔNG cần** phần Modal state, `handleOpenDeleteModal`, `handleCloseDeleteModal`, `handleConfirmDelete`, và block `<Modal>` ở cuối.

---

### `src/pages/CreateEntity.jsx` — **TEMPLATE TRANG CREATE (Form theo hình)**

> **Hướng dẫn:**
>
> 1. Copy file này
> 2. Đổi `Entity` → tên thực thể (vd: `Employee`)
> 3. Đổi fields trong `formData` + JSX + `validate()`
> 4. Đổi service import
> 5. **Layout form:** 2 cột (theo hình — Email/Phone, Department/Position, DOB/StartDate cùng 1 row)

> **⚠️ Theo hình:** Form có:
>
> - Full Name (full width)
> - Email + Phone (2 cột)
> - Department (dropdown) + Position (2 cột)
> - Date of Birth + Start Date (2 cột, type="date")
> - Salary (VND) (nửa width)
> - Success message bar màu xanh lá khi tạo thành công
> - Nút Save (navy) + Back (outline)

```jsx
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../services/CategoryService.js";
import { entityService } from "../services/EntityService.js"; // ← Đổi service

function CreateEntity() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // ← Thông báo thành công

  // Form data — ← Đổi fields theo entity
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    departmentId: "", // hoặc categoryId
    position: "",
    dateOfBirth: "",  // type="date" → browser trả về yyyy-MM-dd
    startDate: "",    // type="date" → browser trả về yyyy-MM-dd
    salary: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch categories/departments cho dropdown
  useEffect(() => {
    categoryService
      .getAllCategoryList()
      .then((res) => setCategories(res.data || []))
      .catch(() => setCategories([]));
  }, []);

  // Handle input change + clear error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ========== VALIDATION ==========
  const validate = () => {
    const newErrors = {};

    // Full Name: required
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email: required
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    // Phone: required
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    }

    // Department: required
    if (!formData.departmentId) {
      newErrors.departmentId = "Department is required";
    }

    // Position: required
    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    // Date of Birth: required
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    // Start Date: required
    if (!formData.startDate) {
      newErrors.startDate = "Start Date is required";
    }

    // Date comparison: dateOfBirth < startDate
    if (formData.dateOfBirth && formData.startDate) {
      if (new Date(formData.dateOfBirth) >= new Date(formData.startDate)) {
        newErrors.dateOfBirth = "Date of Birth must be before Start Date";
      }
    }

    // Salary: required, positive number
    if (!formData.salary) {
      newErrors.salary = "Salary is required";
    } else if (isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = "Salary must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Save
  const handleSave = async () => {
    if (!validate()) return;
    try {
      await entityService.createEntity(formData);
      setSuccessMessage("Created new employee successfully.");
      // ← Đổi message
    } catch (error) {
      console.error("Error creating:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrors((prev) => ({
          ...prev,
          fullName: error.response.data.message,
        }));
      } else {
        alert("Failed to create. Please try again.");
      }
    }
  };

  return (
    <Container fluid className="px-0">
      {/* ===== TITLE ===== */}
      <h4 className="page-title">Add New Employee</h4>
      {/* ← Đổi title */}

      {/* ===== SUCCESS MESSAGE ===== */}
      {successMessage && (
        <div className="success-message">
          ✓ {successMessage}
        </div>
      )}

      {/* ===== FORM ===== */}
      <div className="form-section">
        {/* Full Name (full width) */}
        <Form.Group className="mb-3">
          <Form.Label>Full Name *</Form.Label> {/* ← Đổi label */}
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email + Phone (2 columns) */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone *</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Department + Position (2 columns) */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Department *</Form.Label>
              {/* ← Đổi label */}
              <Form.Select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                isInvalid={!!errors.departmentId}
              >
                <option value="">-- Select --</option>
                {categories.map((cat, i) => (
                  <option
                    key={cat.id || cat.categoryId || i}
                    value={cat.id || cat.categoryId}
                  >
                    {cat.categoryName}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.departmentId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Position *</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                isInvalid={!!errors.position}
              />
              <Form.Control.Feedback type="invalid">
                {errors.position}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Date of Birth + Start Date (2 columns) */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth *</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                isInvalid={!!errors.dateOfBirth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dateOfBirth}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Start Date *</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                isInvalid={!!errors.startDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.startDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Salary (half width) */}
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label>Salary (VND) *</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                isInvalid={!!errors.salary}
              />
              <Form.Control.Feedback type="invalid">
                {errors.salary}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons: Save + Back */}
        <div className="d-flex gap-3">
          <Button className="save-btn" onClick={handleSave}>
            Save
          </Button>
          <Button className="back-btn" onClick={() => navigate("/")}>
            Back
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default CreateEntity;
```

---

### `src/pages/DetailEntity.jsx` — **TEMPLATE TRANG DETAIL (View + Back)**

> **Theo hình:** Trang detail hiển thị dạng bảng 2 cột (Label | Value), mỗi row có border dưới.
> Nút "← Back" ở dưới cùng bên trái.

> **Hướng dẫn:**
>
> 1. Copy file này → đổi `Entity` → tên thực thể
> 2. Đổi fields hiển thị trong JSX
> 3. Đổi service import + method name

```jsx
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { entityService } from "../services/EntityService.js"; // ← Đổi service

function DetailEntity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== FETCH DATA ==========
  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await entityService.getEntityById(id);
        setEntity(response.data);
      } catch (error) {
        console.error("Error fetching entity:", error);
        setEntity(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEntity();
  }, [id]);

  // ========== FORMAT DATE (yyyy-MM-dd) ==========
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // ========== FORMAT SALARY ==========
  const formatSalary = (value) => {
    if (!value) return "";
    return Number(value).toLocaleString("en-US");
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h4>Loading...</h4>
      </Container>
    );
  }

  // ========== NOT FOUND STATE ==========
  if (!entity) {
    return (
      <Container className="mt-5 text-center">
        <h4>Employee not found</h4>
        {/* ← Đổi message */}
        <Button
          className="back-btn mt-3"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Container>
    );
  }

  // ========== CATEGORY BADGE COLOR ==========
  const CATEGORY_COLORS = {
    IT: "#2980b9",
    HR: "#8e44ad",
    Finance: "#27ae60",
    Marketing: "#e67e22",
    Sales: "#c0392b",
  };

  // ========== RENDER ==========
  return (
    <Container fluid className="px-0">
      {/* ===== TITLE ===== */}
      <h4 className="page-title">Employee Details</h4>
      {/* ← Đổi title */}

      {/* ===== DETAIL TABLE ===== */}
      <Row>
        <Col md={8}>
          {/* Field 1 */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Full Name</Col>
            {/* ← Đổi label */}
            <Col md={9} className="detail-value">
              {entity.fullName || entity.entityName}
            </Col>
          </Row>

          {/* Field 2 */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Employee ID</Col>
            <Col md={9} className="detail-value">
              {entity.employeeId || entity.entityId || entity.id}
            </Col>
          </Row>

          {/* Field 3 — Category Badge */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Department</Col>
            <Col md={9} className="detail-value">
              <span
                className="badge-category"
                style={{
                  backgroundColor:
                    CATEGORY_COLORS[entity.departmentName || entity.categoryName] ||
                    "#6c757d",
                }}
              >
                {entity.departmentName || entity.categoryName}
              </span>
            </Col>
          </Row>

          {/* Field 4 */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Position</Col>
            <Col md={9} className="detail-value">
              {entity.position}
            </Col>
          </Row>

          {/* Field 5 */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Email</Col>
            <Col md={9} className="detail-value">
              {entity.email}
            </Col>
          </Row>

          {/* Field 6 */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Phone</Col>
            <Col md={9} className="detail-value">
              {entity.phone}
            </Col>
          </Row>

          {/* Field 7 — Date */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Date of Birth</Col>
            <Col md={9} className="detail-value">
              {formatDate(entity.dateOfBirth)}
            </Col>
          </Row>

          {/* Field 8 — Date */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Start Date</Col>
            <Col md={9} className="detail-value">
              {formatDate(entity.startDate)}
            </Col>
          </Row>

          {/* Field 9 — Salary */}
          <Row className="align-items-center">
            <Col md={3} className="detail-label">Salary (VND)</Col>
            <Col md={9} className="detail-value">
              {formatSalary(entity.salary)}
            </Col>
          </Row>
        </Col>
      </Row>

      {/* ===== BACK LINK ===== */}
      <Row className="mt-4">
        <Col>
          <a
            className="back-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            ← Back
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailEntity;
```

---

## 5.3 🗑️ DeleteConfirmation — 2 DẠNG: Popup Modal + Standalone Page

### Dạng A: Popup Modal (đã có trong `EntityList.jsx` ở trên)

> **Mô tả:** Khi bấm "Delete" trên list → hiện popup Modal ngay trên list page.
> Không chuyển trang, background mờ, có nút Yes + Close.

> **Code đã được tích hợp sẵn trong `EntityList.jsx` Cách A ở trên.**
> Bao gồm:
>
> - State: `showDeleteModal`, `entityToDelete`
> - Handlers: `handleOpenDeleteModal`, `handleCloseDeleteModal`, `handleConfirmDelete`
> - JSX: `<Modal>` component ở cuối return

**Tóm tắt hoạt động:**

```
User bấm "Delete" trên row
  └→ handleOpenDeleteModal(entity)
       └→ setShowDeleteModal(true) + setEntityToDelete(entity)
            └→ Modal hiện lên: "Are you sure you want to delete employee 'Bob Tran'?"
                 ├── Bấm "Yes"   → handleConfirmDelete() → deleteEntity API → close modal → reload list
                 └── Bấm "Close" → handleCloseDeleteModal() → close modal
```

---

### Dạng B: Standalone Page (`src/pages/DeleteEntity.jsx`)

> **Mô tả:** Khi bấm "Delete" trên list → navigate tới `/delete/:id` → hiển thị trang xác nhận riêng.
> Trang này render bên trong `<Outlet />` của AppLayout.

> **Hướng dẫn:**
>
> 1. Copy file này
> 2. Đổi `Entity` → tên thực thể
> 3. Đổi `fullName` / `entityName` → field hiển thị tên
> 4. Đổi service import + method name

```jsx
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { entityService } from "../services/EntityService.js"; // ← Đổi service

function DeleteEntity() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== FETCH ENTITY BY ID ==========
  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await entityService.getEntityById(id);
        setEntity(response.data);
      } catch (error) {
        console.error("Error fetching entity:", error);
        setEntity(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEntity();
  }, [id]);

  // ========== CONFIRM DELETE ==========
  const handleConfirmDelete = async () => {
    try {
      await entityService.deleteEntity(id);
      alert("Deleted successfully!");
      navigate("/"); // ← Quay về trang list sau khi xóa
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete");
    }
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <p>Loading...</p>
      </Container>
    );
  }

  // ========== NOT FOUND STATE ==========
  if (!entity) {
    return (
      <Container className="mt-5 text-center">
        <h4>Employee not found</h4>
        {/* ← Đổi message */}
        <Button className="back-btn mt-3" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Container>
    );
  }

  // ========== RENDER ==========
  return (
    <Container fluid className="px-0">
      <div className="delete-page-card">
        {/* ===== TITLE ===== */}
        <div className="delete-page-title">
          ⚠ Confirmation
        </div>

        {/* ===== MESSAGE ===== */}
        <p className="delete-page-message">
          Are you sure you want to delete<br />
          employee "<span className="entity-name">
            {entity.fullName || entity.entityName}
          </span>"?
          {/* ← Đổi "employee" và field name */}
        </p>
        <p className="delete-page-warning">
          This action cannot be undone.
        </p>

        {/* ===== BUTTONS ===== */}
        <div className="d-flex gap-3 mt-4">
          <Button className="yes-btn" onClick={handleConfirmDelete}>
            Yes
          </Button>
          <Button className="close-btn" onClick={() => navigate(-1)}>
            Close
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default DeleteEntity;
```

---

### 🔗 Cách kết hợp với AppLayout (Nested Routes)

#### `src/App.jsx` — Route cho cả 2 dạng

```jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import EntityList from "./pages/EntityList.jsx";
import CreateEntity from "./pages/CreateEntity.jsx";
import DetailEntity from "./pages/DetailEntity.jsx";
import DeleteEntity from "./pages/DeleteEntity.jsx"; // ← Chỉ cần nếu dùng Dạng B (Page)

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<EntityList />} />
        <Route path="/create" element={<CreateEntity />} />
        <Route path="/detail/:id" element={<DetailEntity />} />
        <Route path="/delete/:id" element={<DeleteEntity />} />
        {/* ↑ Chỉ cần route này nếu dùng Dạng B (Page) */}
        {/* Nếu dùng Dạng A (Popup) thì KHÔNG cần route /delete/:id */}
      </Route>
    </Routes>
  );
}

export default App;
```

#### Luồng hoạt động

```
=== DẠNG A: Popup Modal ===
User bấm "Delete" trên EntityList
  └→ Popup Modal hiện lên (không đổi URL)
       ├── Yes  → API delete → close modal → reload list
       └── Close → close modal

=== DẠNG B: Standalone Page ===
User bấm "Delete" trên EntityList
  └→ navigate("/delete/:id")
       └→ Render DeleteEntity trong <Outlet />
            ├── Yes  → API delete → navigate("/") → về list
            └── Close → navigate(-1) → quay lại list
```

---

## 6. 🔥 Quick Start (Khởi tạo nhanh)

```bash
# 1. Tạo project Vite + React
npm create vite@latest ./ -- --template react

# 2. Cài dependencies
npm install axios bootstrap react-bootstrap react-router-dom

# 3. Chạy dev server
npm run dev
```

---

## 7. 📝 Checklist triển khai nhanh

| #  | Bước                                 | File                                | Thời gian        |
| -- | -------------------------------------- | ----------------------------------- | ----------------- |
| 1  | Tạo project Vite React                | Terminal                            | 30s               |
| 2  | Cài packages                          | Terminal                            | 30s               |
| 3  | Tạo`.env`                           | `.env`                            | 10s               |
| 4  | Sửa`index.css` thêm bootstrap      | `src/index.css`                   | 10s               |
| 5  | Tạo`api.js` (copy template)         | `src/services/api.js`             | 15s               |
| 6  | Tạo Service (copy & đổi tên)       | `src/services/EntityService.js`   | 1min              |
| 7  | Tạo CategoryService (nếu cần)       | `src/services/CategoryService.js` | 30s               |
| 8  | Tạo AppLayout.css (copy styles)       | `src/layouts/AppLayout.css`       | 30s               |
| 9  | Tạo AppLayout.jsx                     | `src/layouts/AppLayout.jsx`       | 15s               |
| 10 | Tạo Header & Footer                   | `src/components/`                 | 1min              |
| 11 | Tạo Page CRUD (copy template)         | `src/pages/EntityList.jsx`        | 3min              |
| 12 | Tạo CreateEntity (copy template)      | `src/pages/CreateEntity.jsx`      | 2min              |
| 13 | Tạo DetailEntity (copy template)      | `src/pages/DetailEntity.jsx`      | 1min              |
| 14 | Tạo DeleteEntity (nếu dùng Page)    | `src/pages/DeleteEntity.jsx`      | 1min              |
| 15 | Sửa`main.jsx` (thêm BrowserRouter) | `src/main.jsx`                    | 30s               |
| 16 | Sửa`App.jsx` (import + route)       | `src/App.jsx`                     | 30s               |
| 17 | Test & chạy                           | `npm run dev`                     | 30s               |
|    | **Tổng thời gian ước tính** |                                     | **~12 min** |

---

## 8. 🎯 Patterns hay dùng trong PE

### Pattern: Centralized Axios (BẮT BUỘC dùng)

```js
// src/services/api.js
import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});
export default api;

// Trong service: chỉ import api, dùng path tương đối
import api from "./api.js";
const getAllEntities = () => api.get("/api/entities");
```

### Pattern: Fetch data + useCallback

```jsx
const fetchData = useCallback(async () => {
  try {
    const response = await service.getAll();
    setData(response.data.content || response.data || []);
  } catch (error) {
    console.error("Error:", error);
    setData([]);
  }
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

### Pattern: Dropdown filter từ API

```jsx
const [categories, setCategories] = useState([]);

useEffect(() => {
  categoryService
    .getAllCategoryList()
    .then((res) => setCategories(res.data || []))
    .catch(() => setCategories([]));
}, []);

// Trong JSX:
<Form.Select value={selected} onChange={(e) => setSelected(e.target.value)}>
  <option value="">-- All --</option>
  {categories.map((cat, i) => (
    <option key={cat.id || i} value={cat.id}>
      {cat.categoryName}
    </option>
  ))}
</Form.Select>;
```

### Pattern: Delete với Confirmation Modal (Popup)

```jsx
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [itemToDelete, setItemToDelete] = useState(null);

const handleOpenDeleteModal = (item) => {
  setItemToDelete(item);
  setShowDeleteModal(true);
};
const handleCloseDeleteModal = () => {
  setShowDeleteModal(false);
  setItemToDelete(null);
};

const handleConfirmDelete = async () => {
  if (!itemToDelete) return;
  try {
    await service.deleteItem(itemToDelete.id);
    handleCloseDeleteModal();
    fetchData();
  } catch (error) {
    alert("Failed to delete");
  }
};
```

### Pattern: Badge màu theo Category

```jsx
const CATEGORY_COLORS = {
  IT: "#2980b9",
  HR: "#8e44ad",
  Finance: "#27ae60",
  Marketing: "#e67e22",
  Sales: "#c0392b",
};

// Trong JSX:
<span
  className="badge-category"
  style={{
    backgroundColor: CATEGORY_COLORS[entity.categoryName] || "#6c757d",
  }}
>
  {entity.categoryName}
</span>;
```

### Pattern: Format Date (yyyy-MM-dd)

```jsx
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
```

### Pattern: Format Salary (number → comma-separated)

```jsx
const formatSalary = (value) => {
  if (!value) return "";
  return Number(value).toLocaleString("en-US");
};
// 25000000 → "25,000,000"
```

### Pattern: Search với nhiều params

```js
const searchEntities = (name, category) => {
  let url = `${BASE_URL}/search?`;
  if (name) url += `name=${name}&`;
  if (category) url += `category=${category}&`;
  return api.get(url);
};
```

---

## 9. ⚡ Bootstrap Class hay dùng

| Class                                                               | Mô tả                            |
| ------------------------------------------------------------------- | ---------------------------------- |
| `container` / `container fluid`                                 | Container có padding / full width |
| `px-3`, `py-4`, `mb-3`, `mt-4`                              | Padding/margin                     |
| `text-start`, `text-end`, `text-center`                       | Căn chữ                          |
| `fw-bold`, `fw-semibold`                                        | Font weight                        |
| `border-bottom`, `border-top`, `border-dark`                  | Border                             |
| `d-flex`, `justify-content-between`, `justify-content-center` | Flexbox                            |
| `gap-3`, `gap-4`                                                | Gap giữa flex items               |
| `w-100`                                                           | Width 100%                         |
| `fs-5`                                                            | Font size                          |
| `align-items-center`                                              | Căn giữa theo trục dọc         |

---

## 10. 📋 React-Bootstrap Components hay dùng

| Component                                                   | Import              | Dùng cho              |
| ----------------------------------------------------------- | ------------------- | ---------------------- |
| `Container, Row, Col`                                     | `react-bootstrap` | Layout grid            |
| `Table`                                                   | `react-bootstrap` | Data table             |
| `Button`                                                  | `react-bootstrap` | Buttons                |
| `Form, Form.Control, Form.Select, Form.Group, Form.Label` | `react-bootstrap` | Form inputs            |
| `Modal, Modal.Header, Modal.Body, Modal.Footer`           | `react-bootstrap` | Delete popup modals    |
| `Pagination`                                              | `react-bootstrap` | Phân trang            |
| `Form.Control.Feedback`                                   | `react-bootstrap` | Validation errors      |
| `Alert`                                                   | `react-bootstrap` | Success/error messages |

---

> **💡 Tips PE:**
>
> - Copy **Section 4 (api.js)** đầu tiên → rồi Service → rồi Page
> - Đổi entity name bằng **Ctrl+H** (Find & Replace) cho nhanh
> - Luôn dùng `response.data.content || response.data || []` để handle cả paginated và non-paginated API
> - Form validation: dùng `isInvalid` prop + `Form.Control.Feedback`
> - **Delete có 2 cách:** Popup Modal (không đổi URL) hoặc Page riêng (navigate sang `/delete/:id`)
> - **Badge màu:** Dùng `CATEGORY_COLORS` map để gán màu cho từng category
> - **Xem `color-codes.md`** để đổi mã màu theo ý muốn
