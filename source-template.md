# 📋 SBA301 PE - Source Code Template (React + Vite + Bootstrap)

> **Mục đích:** Copy nhanh các template để triển khai 1 trang web React + Vite + React-Bootstrap.
> **Stack:** React 19 + Vite 8 + React-Bootstrap 2 + Axios + React Router DOM 7

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
│   │   └── Create[Entity].jsx    ← Trang create form (navigate từ Add New)
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

### `src/App.jsx` — Layout + Routes

```jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import EntityList from "./pages/EntityList.jsx"; // ← Đổi tên entity
import CreateEntity from "./pages/CreateEntity.jsx"; // ← Trang create

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<EntityList />} />
        <Route path="/create" element={<CreateEntity />} />
        {/* <Route path="/edit/:id" element={<EditEntity/>}/> */}
      </Routes>

      <Footer />
    </>
  );
}

export default App;
```

### `src/index.css` — Bootstrap (import 1 lần duy nhất)

```css
@import "bootstrap/dist/css/bootstrap.css";
```

### `src/App.css` — Custom styles (tuỳ chọn)

```css
@import "bootstrap/dist/css/bootstrap.css";
/* Thêm custom styles ở đây nếu cần */
```

---

## 2.5 🧱 AppLayout (Layout + Outlet)

> **Mục đích:** Tạo layout chung bọc Header + `<Outlet />` + Footer, dùng React Router v7 nested routes.
> **Khi nào dùng:** Khi muốn Header/Footer luôn hiển thị, chỉ thay đổi nội dung `<main>` theo route.

### Cấu trúc thư mục

```
src/
├── layouts/
│   ├── AppLayout.jsx    ← Layout component
│   └── AppLayout.css    ← Responsive styles
```

### `src/layouts/AppLayout.css`

```css
.app-body {
  width: 1150px;
  max-width: 1200px;
  min-height: 650px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #999;
  background: #ffffff;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
}

.app-body main {
  flex-grow: 1;
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
import EntityList from "./pages/EntityList.jsx"; // ← Đổi tên entity
import CreateEntity from "./pages/CreateEntity.jsx"; // ← Trang create

function App() {
  return (
    <Routes>
      {/* AppLayout là route cha — Header + Footer tự động render */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<EntityList />} />
        <Route path="/create" element={<CreateEntity />} />
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
  ├── <Header />               ← Luôn hiển thị
  ├── <main>
  │     └── <Outlet />         ← React Router inject page con vào đây
  │           ├── path="/"       → <EntityList />
  │           └── path="/create" → <CreateEntity />
  └── <Footer />               ← Luôn hiển thị
```

- Truy cập `/` → `<Outlet />` render `<EntityList />`
- Truy cập `/create` → `<Outlet />` render `<CreateEntity />`
- **Header và Footer không bị re-render khi chuyển trang**

---

## 3. 🧩 Components

### `src/components/Header.jsx`

```jsx
import { Col, Container, Row } from "react-bootstrap";

function Header() {
  return (
    <>
      <Container fluid className={"px-3 border-bottom border-dark"}>
        <Row>
          <Col md={6} className={"text-start"}>
            Logo
          </Col>
          <Col md={6} className={"text-end"}>
            Date: yyyy-MM-dd
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Header;
```

### `src/components/Footer.jsx`

```jsx
import { Container, Row } from "react-bootstrap";

function Footer() {
  return (
    <>
      <Container fluid className={"px-3"}>
        <Row className={"border-top border-dark"}>@ 2026 FU University</Row>
      </Container>
    </>
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

> **Hướng dẫn:** Đổi `entity` / `entities` → tên thực thể (vd: `shoe` → `shoes`, `book` → `books`)

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
  size = 10,
  sortBy = "name",
) => {
  let url = `${BASE_URL}/search?page=${page}&size=${size}&sortBy=${sortBy}`;
  if (name) url += `&name=${name}`;
  if (categoryId) url += `&categoryId=${categoryId}`;
  return api.get(url);
};

// Cách B: Truyền categoryName (nếu backend nhận tên thay vì ID)
// const searchEntities = (name, category, page = 0, size = 10, sortBy = "name") => {
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

### `src/pages/EntityList.jsx` — **TEMPLATE CHÍNH (Full CRUD — No Modals)**

> **Hướng dẫn sử dụng:**
>
> 1. Copy file này
> 2. Đổi `Entity` → tên thực thể (vd: `Shoe`, `Book`, `Student`)
> 3. Đổi các field (`entityName`, `entityId`, `price`, ...) → field thực tế
> 4. Đổi service import
> 5. Thêm/bớt field trong table
> 6. **Yêu cầu:** Đã có sẵn các trang riêng: `CreateEntity`, `EntityDetail`, `DeleteEntity` (hoặc `EditEntity`)
> 7. **Filter:** Hỗ trợ filter theo `categoryId` (truyền trực tiếp ID, không cần convert sang tên)
> 8. **Pagination:** Phân trang server-side, dùng `Pagination` component của React-Bootstrap
>    - Backend trả về `PageDTO` / `Page<>` (Spring Boot) gồm: `content`, `totalPages`, `number`, `totalElements`
>    - Default: 10 items/trang, sort by `name`. Đổi `pageSize` và `sortBy` nếu cần
> 9. **Fetch Data:** `fetchEntities` luôn dùng `searchEntities()` với params trống để load tất cả (có phân trang)

> **⚠️ Lưu ý:** Template này **KHÔNG dùng Modal**. Tất cả action (View, Delete, Edit, Create) đều navigate sang trang riêng.
> Nếu cần dùng Modal, xem phiên bản cũ hoặc tự thêm lại.

```jsx
import {
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { categoryService } from "../services/CategoryService.js";
import { entityService } from "../services/EntityService.js"; // ← Đổi service

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
  const [pageSize] = useState(10); // ← Đổi số lượng item/trang nếu cần

  // ========== FETCH DATA ==========
  // ✅ Cách A: Có API getAllEntityList() — Dùng khi backend có endpoint GET /api/entities
  // Load trang đầu bằng getAllEntityList, các trang sau dùng searchEntities
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

  /*
  // ✅ Cách B: KHÔNG có API getAllEntityList() — Dùng searchEntities("", "") để load tất cả
  // Khi backend KHÔNG có endpoint GET /api/entities, chỉ có GET /api/entities/search
  const fetchEntities = useCallback(
    async (page = 0) => {
      try {
        const response = await entityService.searchEntities("", "", page, pageSize);
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
    [pageSize],
  );
  */

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
  // Cách A: Filter bằng categoryId (truyền ID trực tiếp)
  // Khi bấm Filter → reset về trang 0
  const handleFilter = async () => {
    try {
      const response = await entityService.searchEntities(
        searchName,
        searchCategory, // ← Truyền categoryId trực tiếp
        0, // ← Reset về trang đầu khi filter
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

  /*
  // Cách B: Filter bằng categoryName (convert từ ID sang tên trước khi gọi API)
  // Dùng khi backend search API nhận categoryName thay vì categoryId
  const handleFilter = async () => {
    try {
      let categoryName = "";
      if (searchCategory) {
        const cat = categories.find(
          (c) =>
            (c.categoryId && c.categoryId.toString() === searchCategory) ||
            (c.id && c.id.toString() === searchCategory),
        );
        if (cat) categoryName = cat.categoryName;
      }

      const response = await entityService.searchEntities(
        searchName,
        categoryName,
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
  */

  // ========== PAGINATION ==========
  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) return;
    fetchEntities(page);
  };

  // ========== UTILS ==========
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // dd/MM/yyyy
  };

  // ========== RENDER ==========
  return (
    <Container>
      {/* ===== TITLE ===== */}
      <Row className="mb-4 mt-4">
        <Col>
          <h3 className="fw-bold">Entity List</h3> {/* ← Đổi title */}
        </Col>
      </Row>

      {/* ===== FILTER: Category Dropdown ===== */}
      <Row className="align-items-center mb-3">
        <Col md={2} className="text-end">
          <label className="fw-semibold">Category:</label>
        </Col>
        <Col md={3}>
          <Form.Select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">All Categories</option>
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
      </Row>

      {/* ===== FILTER: Search + Buttons ===== */}
      <Row className="align-items-center mb-5">
        <Col md={2} className="text-end">
          <label className="fw-semibold">Entity Name:</label>{" "}
          {/* ← Đổi label */}
        </Col>

        <Col md={5}>
          <Form.Control
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Search by name"
          />
        </Col>

        <Col md={2}>
          <Button
            variant="outline-primary"
            className="w-100 fw-bold"
            onClick={handleFilter}
          >
            Filter
          </Button>
        </Col>

        <Col md={2}>
          <Button
            variant="outline-primary"
            className="w-100 fw-bold"
            onClick={() => navigate("/create")}
          >
            Add New
          </Button>
        </Col>
      </Row>

      {/* ===== TABLE ===== */}
      <Row>
        <Col>
          <h4 className="fw-bold">Entity List</h4>
        </Col>{" "}
        {/* ← Đổi title */}
      </Row>

      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th> {/* ← Đổi column headers */}
            <th>Category</th>
            <th>Field3</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {entities && Array.isArray(entities) && entities.length > 0 ? (
            entities.map((entity) => (
              <tr key={entity.id || entity.entityId}>
                <td>{entity.entityId || entity.id}</td>
                <td>{entity.entityName}</td> {/* ← Đổi field names */}
                <td>{entity.categoryName}</td>
                <td>{entity.field3}</td>
                <td>{entity.price}</td>
                <td>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/delete/${entity.id || entity.entityId}`,
                      ); /* ← Đổi path */
                    }}
                  >
                    Delete
                  </a>
                  {" | "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/detail/${entity.id || entity.entityId}`,
                      ); /* ← Đổi path */
                    }}
                  >
                    View
                  </a>
                  {" | "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(
                        `/edit/${entity.id || entity.entityId}`,
                      ); /* ← Đổi path */
                    }}
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* ===== PAGINATION (Luôn hiển thị) ===== */}
      <Row className="align-items-center mt-3">
        <Col md={6} className="text-start">
          <span>
            Show {entities.length} of {totalElements} records
          </span>
        </Col>
        <Col md={6} className="d-flex justify-content-end">
          <Pagination className="mb-0">
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
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
              Next
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default EntityList;
```

### `src/pages/CreateEntity.jsx` — **TEMPLATE TRANG CREATE (Form + Validation)**

> **Hướng dẫn:**
>
> 1. Copy file này
> 2. Đổi `Entity` → tên thực thể (vd: `Shoe`, `Book`)
> 3. Đổi fields trong `formData` + JSX + `validate()`
> 4. Đổi service import
> 5. **Date fields:** Xem hướng dẫn bên dưới để chọn đúng cách dùng `type="date"` hay `type="text"`

> **⚠️ Lưu ý quan trọng về Date:**
>
> - **`type="date"` (HTML date picker):** Trình duyệt tự trả về `yyyy-MM-dd` → dùng `new Date()` trực tiếp được, **KHÔNG cần** parse function.
> - **`type="text"` (nhập tay):** Người dùng nhập dạng tùy ý (dd/MM/yyyy, MM-dd-yyyy, ...) → **BẮT BUỘC** dùng parse function để so sánh, và format function trước khi gửi API.
> - Mỗi parse/format function chỉ hỗ trợ **MỘT separator** duy nhất (`/` hoặc `-`). **KHÔNG** dùng `split(/[\/\-]/)`.
> - Xem chi tiết tại `validation-field.md` mục 25, 26, 27.

#### Cách A: Dùng `type="date"` (HTML date picker) — Đơn giản nhất

```jsx
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {categoryService} from "../services/CategoryService.js";
import {entityService} from "../services/EntityService.js";  // ← Đổi service

function CreateEntity() {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    // Form data — ← Đổi fields theo entity
    const [formData, setFormData] = useState({
        entityName: "",
        price: "",
        field3: "",
        date1: "",      // type="date" → browser trả về yyyy-MM-dd
        date2: "",      // type="date" → browser trả về yyyy-MM-dd
        categoryId: "",
    });

    const [errors, setErrors] = useState({});

    // Fetch categories cho dropdown
    useEffect(() => {
        categoryService.getAllCategoryList()
            .then(res => setCategories(res.data || []))
            .catch(() => setCategories([]));
    }, []);

    // Handle input change + clear error
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name]) setErrors(prev => ({...prev, [name]: ""}));
    };

    // ========== VALIDATION ==========
    const validate = () => {
        const newErrors = {};

        // Required + Max Length 100
        if (!formData.entityName.trim()) {
            newErrors.entityName = "Name is required";
        } else if (formData.entityName.trim().length > 100) {
            newErrors.entityName = "Name must not exceed 100 characters";
        }

        // Positive number
        if (!formData.price) {
            newErrors.price = "Price is required";
        } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = "Price must be a positive number";
        }

        // Date comparison: date1 < date2
        // ✅ type="date" → browser trả về yyyy-MM-dd → new Date() parse đúng
        if (formData.date1 && formData.date2) {
            if (new Date(formData.date1) >= new Date(formData.date2)) {
                newErrors.date1 = "Date 1 must be before Date 2";
            }
        }

        // Required dropdown
        if (!formData.categoryId) {
            newErrors.categoryId = "Category is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Save
    // ✅ type="date" → value đã là yyyy-MM-dd → gửi thẳng, KHÔNG cần format
    const handleSave = async () => {
        if (!validate()) return;
        try {
            await entityService.createEntity(formData);  // ← Đổi method name
            alert("Created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating:", error);
            // Handle backend error: { status: 400, message: "Laptop name already exists: ..." }
            if (error.response && error.response.data && error.response.data.message) {
                // ← Đổi "entityName" thành field tương ứng với lỗi backend trả về
                setErrors(prev => ({...prev, entityName: error.response.data.message}));
            } else {
                alert("Failed to create. Please try again.");
            }
        }
    };

    return (
        <Container>
            <Row className="mb-4 mt-5">
                <Col md={{span: 8, offset: 2}}>


                    {/* ===== Text Field ===== */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Entity name:           {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="entityName"  {/* ← Đổi name */}
                                value={formData.entityName}
                                onChange={handleChange}
                                isInvalid={!!errors.entityName}
                                maxLength={100}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.entityName}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* ===== Number Field (short width) ===== */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Price:
                        </Form.Label>
                        <Col md={3}>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                isInvalid={!!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* ===== Text Field (full width) ===== */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Field3:                {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="field3"
                                value={formData.field3}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* ===== 2 Date Fields cùng 1 row (type="date") ===== */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Date 1             {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={3}>
                            <Form.Control
                                type="date"
                                name="date1"
                                value={formData.date1}
                                onChange={handleChange}
                                isInvalid={!!errors.date1}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date1}
                            </Form.Control.Feedback>
                        </Col>
                        <Form.Label column md={2} className="text-end fw-semibold">
                            Date 2             {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={3}>
                            <Form.Control
                                type="date"
                                name="date2"
                                value={formData.date2}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* ===== Dropdown ===== */}
                    <Form.Group as={Row} className="mb-4 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Category:
                        </Form.Label>
                        <Col md={4}>
                            <Form.Select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                isInvalid={!!errors.categoryId}
                            >
                                <option value="">-- Select --</option>
                                {categories.map((cat, i) => (
                                    <option key={cat.id || cat.categoryId || i} value={cat.id || cat.categoryId}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.categoryId}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* ===== Buttons ===== */}
                    <Row>
                        <Col md={{span: 8, offset: 4}}>
                            <div className="d-flex gap-3">
                                <Button variant="outline-dark" className="px-4 fw-bold" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button variant="primary" className="px-4 fw-bold" onClick={() => navigate("/")}>
                                    Back
                                </Button>
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    );
}

export default CreateEntity;
```

#### Cách B: Dùng `type="text"` (nhập tay) — Khi đề bài yêu cầu format cụ thể

> **Dùng khi:** Đề bài yêu cầu nhập ngày dạng text (vd: `dd/MM/yyyy`, `yyyy-MM-dd`, `MM/dd/yyyy`, ...).
> **BẮT BUỘC phải:**
>
> 1. Validate format bằng regex (xem `validation-field.md` mục 21-24)
> 2. Parse date bằng parse function để so sánh (xem `validation-field.md` mục 25)
> 3. Format date bằng format function trước khi gửi API (xem `validation-field.md` mục 26-27)
> 4. Mỗi function chỉ hỗ trợ **MỘT separator** (`/` hoặc `-`). **KHÔNG** dùng `split(/[\/\-]/)`.

```jsx
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {categoryService} from "../services/CategoryService.js";
import {entityService} from "../services/EntityService.js";  // ← Đổi service

function CreateEntity() {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    // Form data — ← Đổi fields theo entity
    const [formData, setFormData] = useState({
        entityName: "",
        price: "",
        field3: "",
        date1: "",      // type="text" → user nhập tay, vd: "25/12/2025"
        date2: "",      // type="text" → user nhập tay, vd: "30/12/2025"
        categoryId: "",
    });

    const [errors, setErrors] = useState({});

    // ========== PARSE DATE FUNCTIONS ==========
    // ⚠️ Chọn đúng function theo format đề bài yêu cầu!
    // ⚠️ Mỗi function chỉ hỗ trợ 1 separator. KHÔNG dùng split(/[\/\-]/)

    // Parse dd/MM/yyyy (chỉ dấu /)
    const parseDMYSlash = (str) => {
        const [d, m, y] = str.split("/");
        return new Date(y, m - 1, d);
    };

    // ========== FORMAT DATE FUNCTIONS ==========
    // Chuyển về yyyy-MM-dd trước khi gửi API

    // dd/MM/yyyy -> yyyy-MM-dd (chỉ dấu /)
    const formatDMYSlash = (str) => {
        if (!str) return "";
        const parts = str.split("/");
        if (parts.length !== 3) throw new Error("Invalid format, expected dd/MM/yyyy");
        const [d, m, y] = parts;
        return `${y}-${m}-${d}`;
    };

    // Fetch categories cho dropdown
    useEffect(() => {
        categoryService.getAllCategoryList()
            .then(res => setCategories(res.data || []))
            .catch(() => setCategories([]));
    }, []);

    // Handle input change + clear error
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name]) setErrors(prev => ({...prev, [name]: ""}));
    };

    // ========== VALIDATION ==========
    const validate = () => {
        const newErrors = {};

        // Required + Max Length 100
        if (!formData.entityName.trim()) {
            newErrors.entityName = "Name is required";
        } else if (formData.entityName.trim().length > 100) {
            newErrors.entityName = "Name must not exceed 100 characters";
        }

        // Positive number
        if (!formData.price) {
            newErrors.price = "Price is required";
        } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
            newErrors.price = "Price must be a positive number";
        }

        // ===== DATE FORMAT VALIDATION (dd/MM/yyyy, chỉ dấu /) =====
        // ⚠️ Đổi regex theo format đề bài! Xem validation-field.md mục 21-24
        const dateRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!formData.date1) {
            newErrors.date1 = "Date 1 is required";
        } else if (!dateRegex.test(formData.date1)) {
            newErrors.date1 = "Date 1 must be in dd/MM/yyyy format";
        }

        if (!formData.date2) {
            newErrors.date2 = "Date 2 is required";
        } else if (!dateRegex.test(formData.date2)) {
            newErrors.date2 = "Date 2 must be in dd/MM/yyyy format";
        }

        // ===== DATE COMPARISON: date1 < date2 =====
        // ⚠️ Dùng parse function thay vì new Date() trực tiếp!
        // ⚠️ Chỉ so sánh khi cả 2 date đều PASS format validation
        if (
            formData.date1 && formData.date2 &&
            !newErrors.date1 && !newErrors.date2
        ) {
            if (parseDMYSlash(formData.date1) >= parseDMYSlash(formData.date2)) {
                newErrors.date1 = "Date 1 must be before Date 2";
            }
        }

        // Required dropdown
        if (!formData.categoryId) {
            newErrors.categoryId = "Category is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ========== HANDLE SAVE ==========
    // ⚠️ Format date về yyyy-MM-dd trước khi gửi API!
    const handleSave = async () => {
        if (!validate()) return;
        try {
            const data = {
                ...formData,
                date1: formatDMYSlash(formData.date1),  // dd/MM/yyyy → yyyy-MM-dd
                date2: formatDMYSlash(formData.date2),  // dd/MM/yyyy → yyyy-MM-dd
            };
            await entityService.createEntity(data);  // ← Đổi method name
            alert("Created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating:", error);
            // Handle backend error: { status: 400, message: "Laptop name already exists: ..." }
            if (error.response && error.response.data && error.response.data.message) {
                // ← Đổi "entityName" thành field tương ứng với lỗi backend trả về
                setErrors(prev => ({...prev, entityName: error.response.data.message}));
            } else {
                alert("Failed to create. Please try again.");
            }
        }
    };

    return (
        <Container>
            <Row className="mb-4 mt-5">
                <Col md={{span: 8, offset: 2}}>

                    {/* ===== Text Field ===== */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Entity name:           {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="entityName"  {/* ← Đổi name */}
                                value={formData.entityName}
                                onChange={handleChange}
                                isInvalid={!!errors.entityName}
                                maxLength={100}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.entityName}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* ===== Number Field (short width) ===== */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Price:
                        </Form.Label>
                        <Col md={3}>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                isInvalid={!!errors.price}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* ===== Text Field (full width) ===== */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Field3:                {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                name="field3"
                                value={formData.field3}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>

                    {/* ===== 2 Date Fields cùng 1 row (type="text" — nhập tay) ===== */}
                    {/* ⚠️ placeholder ghi rõ format để user biết nhập đúng */}
                    <Form.Group as={Row} className="mb-3 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Date 1:            {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                name="date1"
                                value={formData.date1}
                                onChange={handleChange}
                                isInvalid={!!errors.date1}
                                placeholder="dd/MM/yyyy"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date1}
                            </Form.Control.Feedback>
                        </Col>
                        <Form.Label column md={2} className="text-end fw-semibold">
                            Date 2:            {/* ← Đổi label */}
                        </Form.Label>
                        <Col md={3}>
                            <Form.Control
                                type="text"
                                name="date2"
                                value={formData.date2}
                                onChange={handleChange}
                                isInvalid={!!errors.date2}
                                placeholder="dd/MM/yyyy"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.date2}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* ===== Dropdown ===== */}
                    <Form.Group as={Row} className="mb-4 align-items-center">
                        <Form.Label column md={4} className="text-end fw-semibold">
                            Category:
                        </Form.Label>
                        <Col md={4}>
                            <Form.Select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                isInvalid={!!errors.categoryId}
                            >
                                <option value="">-- Select --</option>
                                {categories.map((cat, i) => (
                                    <option key={cat.id || cat.categoryId || i} value={cat.id || cat.categoryId}>
                                        {cat.categoryName}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.categoryId}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    {/* ===== Buttons ===== */}
                    <Row>
                        <Col md={{span: 8, offset: 4}}>
                            <div className="d-flex gap-3">
                                <Button variant="outline-dark" className="px-4 fw-bold" onClick={handleSave}>
                                    Save
                                </Button>
                                <Button variant="primary" className="px-4 fw-bold" onClick={() => navigate("/")}>
                                    Back
                                </Button>
                            </div>
                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    );
}

export default CreateEntity;
```

#### 📋 Bảng chọn nhanh Parse + Format function theo format đề bài

| Format đề bài | Separator | Parse function  | Format function  | Regex (validation-field.md) |
| ------------- | --------- | --------------- | ---------------- | --------------------------- |
| `dd/MM/yyyy`  | `/`       | `parseDMYSlash` | `formatDMYSlash` | Mục 24                      |
| `dd-MM-yyyy`  | `-`       | `parseDMYDash`  | `formatDMYDash`  | Mục 24                      |
| `MM/dd/yyyy`  | `/`       | `parseMDYSlash` | `formatMDYSlash` | Mục 23                      |
| `MM-dd-yyyy`  | `-`       | `parseMDYDash`  | `formatMDYDash`  | Mục 23                      |
| `yyyy/MM/dd`  | `/`       | `parseYMDSlash` | `formatYMDSlash` | Mục 21                      |
| `yyyy-MM-dd`  | `-`       | `parseYMDDash`  | `formatYMDDash`  | Mục 21                      |
| `yyyy/dd/MM`  | `/`       | _(xem mục 22)_  | _(custom)_       | Mục 22                      |
| `yyyy-dd-MM`  | `-`       | _(xem mục 22)_  | _(custom)_       | Mục 22                      |

> **💡 Tip:** Copy parse + format function từ `validation-field.md` mục 25-26, chỉ copy function đúng format đề bài. Tra regex ở mục 21-24.

---

### `src/pages/DetailEntity.jsx` — **TEMPLATE TRANG DETAIL (View + Back)**

> **Mục đích:** Hiển thị chi tiết 1 entity trên 1 page riêng (KHÔNG dùng Modal).
> Page này được render bên trong `<Outlet />` của `AppLayout`.
>
> **Khi nào dùng:** Khi đề bài yêu cầu trang detail riêng thay vì Modal popup.
>
> **Hướng dẫn:**
>
> 1. Copy file này → đổi `Entity` → tên thực thể (vd: `Restaurant`, `Shoe`)
> 2. Đổi fields hiển thị trong JSX
> 3. Đổi service import + method name
> 4. Đổi URL param (`:id`) nếu cần

```jsx
// ========== IMPORTS ==========
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { entityService } from "../services/EntityService.js"; // ← Đổi service

function DetailEntity() {
  // ========== HOOKS ==========
  const { id } = useParams(); // Lấy id từ URL: /entities/:id
  const navigate = useNavigate();

  // ========== STATE ==========
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== FETCH DATA ==========
  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await entityService.getEntityById(id); // ← Đổi method
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
        <h4>Entity not found</h4> {/* ← Đổi message: "Restaurant not found" */}
        <Button
          variant="outline-primary"
          className="mt-3 px-4 fw-bold"
          onClick={() => navigate(-1)}
        >
          Quay Lai
        </Button>
      </Container>
    );
  }

  // ========== RENDER ==========
  return (
    <Container>
      {/* ===== TITLE ===== */}
      <Row className="mt-4 mb-4">
        <Col>
          <h3 className="fw-bold text-uppercase">View Details</h3>
        </Col>
      </Row>

      {/* ===== DETAIL CONTENT (2 cột: Label + Value) ===== */}
      <Row className="justify-content-center">
        <Col md={8}>
          {/* --- Field 1 --- */}
          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Entity Name: {/* ← Đổi label */}
            </Col>
            <Col md={8} className="text-start">
              {entity.entityName} {/* ← Đổi field */}
            </Col>
          </Row>

          {/* --- Field 2 --- */}
          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Owner Name: {/* ← Đổi label */}
            </Col>
            <Col md={8} className="text-start">
              {entity.ownerName} {/* ← Đổi field */}
            </Col>
          </Row>

          {/* --- Field 3 --- */}
          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Category: {/* ← Đổi label */}
            </Col>
            <Col md={8} className="text-start">
              {entity.categoryName || entity.category?.categoryName || ""}
            </Col>
          </Row>

          {/* --- Field 4 (Number) --- */}
          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Price: {/* ← Đổi label */}
            </Col>
            <Col md={8} className="text-start">
              {entity.price} {/* ← Đổi field */}
            </Col>
          </Row>

          {/* --- Field 5 (Text) --- */}
          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Address: {/* ← Đổi label */}
            </Col>
            <Col md={8} className="text-start">
              {entity.address} {/* ← Đổi field */}
            </Col>
          </Row>

          {/* --- Field 6 (Date — yyyy-MM-dd) --- */}
          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Open Date: {/* ← Đổi label */}
            </Col>
            <Col md={8} className="text-start">
              {formatDate(entity.openDate)} {/* ← Đổi field */}
            </Col>
          </Row>

          {/* ===== BUTTON: Quay Lại ===== */}
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="outline-primary"
                className="px-5 fw-bold"
                onClick={() => navigate(-1)}
              >
                Quay Lai
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailEntity;
```

---

### 🍽️ Ví dụ thực tế: `DetailRestaurant.jsx` (Restaurant entity)

> Copy template trên, đổi Entity → Restaurant, đổi fields theo đề bài.

```jsx
// ========== IMPORTS ==========
import { Container, Row, Col, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { restaurantService } from "../services/RestaurantService.js";

function DetailRestaurant() {
  // ========== HOOKS ==========
  const { id } = useParams();
  const navigate = useNavigate();

  // ========== STATE ==========
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== FETCH DATA ==========
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await restaurantService.getRestaurantById(id);
        setRestaurant(response.data);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setRestaurant(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
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

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <h4>Loading...</h4>
      </Container>
    );
  }

  // ========== NOT FOUND STATE ==========
  if (!restaurant) {
    return (
      <Container className="mt-5 text-center">
        <h4>Restaurant not found</h4>
        <Button
          variant="outline-primary"
          className="mt-3 px-4 fw-bold"
          onClick={() => navigate(-1)}
        >
          Quay Lai
        </Button>
      </Container>
    );
  }

  // ========== RENDER ==========
  return (
    <Container>
      {/* ===== TITLE ===== */}
      <Row className="mt-4 mb-4">
        <Col>
          <h3 className="fw-bold text-uppercase">View Details</h3>
        </Col>
      </Row>

      {/* ===== DETAIL CONTENT (2 cột: Label căn phải + Value căn trái) ===== */}
      <Row className="justify-content-center">
        <Col md={8}>
          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Restaurant Name:
            </Col>
            <Col md={8} className="text-start">
              {restaurant.restaurantName}
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Owner Name:
            </Col>
            <Col md={8} className="text-start">
              {restaurant.ownerName}
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Category:
            </Col>
            <Col md={8} className="text-start">
              {restaurant.categoryName ||
                restaurant.category?.categoryName ||
                ""}
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Price Range:
            </Col>
            <Col md={8} className="text-start">
              {restaurant.priceRange}
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Address:
            </Col>
            <Col md={8} className="text-start">
              {restaurant.address}
            </Col>
          </Row>

          <Row className="mb-3 align-items-center">
            <Col md={4} className="text-end fw-semibold">
              Open Date:
            </Col>
            <Col md={8} className="text-start">
              {formatDate(restaurant.openDate)}
            </Col>
          </Row>

          {/* ===== BUTTON: Quay Lại ===== */}
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="outline-primary"
                className="px-5 fw-bold"
                onClick={() => navigate(-1)}
              >
                Quay Lai
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailRestaurant;
```

---

### 🔗 Cách kết hợp DetailEntity với AppLayout (Nested Routes)

> **⚠️ Quan trọng:** DetailEntity render bên trong `<Outlet />` của AppLayout.
> Chỉ cần thêm `<Route>` con bên trong `<Route element={<AppLayout />}>`.

#### `src/App.jsx` — Thêm route `/restaurants/:id`

```jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import RestaurantList from "./pages/RestaurantList.jsx";
import CreateRestaurant from "./pages/CreateRestaurant.jsx";
import DetailRestaurant from "./pages/DetailRestaurant.jsx"; // ← Import page detail

function App() {
  return (
    <Routes>
      {/* AppLayout là route cha — Header + Footer tự động render */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/create" element={<CreateRestaurant />} />
        <Route path="/restaurants/:id" element={<DetailRestaurant />} />
        {/* ↑ Thêm route detail — :id sẽ được useParams() lấy ra */}
      </Route>
    </Routes>
  );
}

export default App;
```

#### Luồng hoạt động với DetailEntity

```
<AppLayout>                         ← Route cha (không có path)
  ├── <Header />                    ← Luôn hiển thị
  ├── <main>
  │     └── <Outlet />              ← React Router inject page con vào đây
  │           ├── path="/"               → <RestaurantList />
  │           ├── path="/create"         → <CreateRestaurant />
  │           └── path="/restaurants/:id" → <DetailRestaurant />
  └── <Footer />                    ← Luôn hiển thị
```

#### Cách navigate tới DetailEntity từ List page

> Trong `EntityList.jsx`, thêm link "View" navigate tới detail page:

```jsx
// Cách 1: Dùng navigate()
const navigate = useNavigate();

<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    navigate(`/restaurants/${entity.id || entity.entityId}`);
  }}
>
  View
</a>;

// Cách 2: Dùng <Link> (React Router)
import { Link } from "react-router-dom";

<Link to={`/restaurants/${entity.id || entity.entityId}`}>View</Link>;
```

> **📌 Lưu ý:**
>
> - DetailEntity **KHÔNG** tạo Header, Footer, hay AppLayout
> - Nội dung chỉ render bên trong `<Outlet />` → layout giữ nguyên
> - Nút "Quay Lai" dùng `navigate(-1)` → quay về trang trước, không hardcode URL
> - Format ngày dùng `yyyy-MM-dd` (thủ công, không dùng thư viện ngoài)

---

### 5.3 🗑️ DeleteConfirmation Page (Trang xác nhận xóa — Standalone Page)

> **Mục đích:** Trang xác nhận xóa riêng biệt (không dùng Modal), render bên trong `<Outlet />` của AppLayout.
> **Khi nào dùng:** Khi đề yêu cầu chuyển sang trang mới để xác nhận xóa thay vì dùng popup Modal.

#### Cấu trúc thư mục

```
src/
├── pages/
│   └── DeleteEntity.jsx    ← Trang xác nhận xóa
```

#### `src/pages/DeleteEntity.jsx`

> **Hướng dẫn:**
>
> 1. Copy file này
> 2. Đổi `Entity` → tên thực thể (vd: `Restaurant`, `Book`)
> 3. Đổi `entityName` → field hiển thị tên (vd: `restaurantName`, `bookTitle`)
> 4. Đổi service import + method name

```jsx
import { Button, Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { entityService } from "../services/EntityService.js"; // ← Đổi service

function DeleteEntity() {
  const navigate = useNavigate();
  const { id } = useParams(); // ← Lấy id từ URL

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
        <h4>Entity not found</h4>
        <Button
          variant="outline-primary"
          className="mt-3 px-4 fw-bold"
          onClick={() => navigate(-1)}
        >
          Quay Lai
        </Button>
      </Container>
    );
  }

  // ========== RENDER ==========
  return (
    <Container>
      {/* ===== TITLE ===== */}
      <Row className="mt-5 mb-4">
        <Col className="text-center">
          <h4 className="fw-bold">Confirmation</h4>
        </Col>
      </Row>

      {/* ===== CONFIRMATION MESSAGE ===== */}
      <Row className="mb-4">
        <Col className="text-center">
          <p className="fs-5">
            Are you sure you want to delete "{entity.entityName}"?
            {/* ← Đổi entity.entityName → entity.restaurantName, entity.bookTitle, ... */}
          </p>
        </Col>
      </Row>

      {/* ===== BUTTONS: Yes + Close ===== */}
      <Row>
        <Col className="text-center">
          <div className="d-flex justify-content-center gap-4">
            <Button
              variant="outline-primary"
              className="px-5 fw-bold"
              onClick={handleConfirmDelete}
            >
              Yes
            </Button>
            <Button
              variant="outline-secondary"
              className="px-5 fw-bold"
              onClick={() => navigate(-1)}
            >
              Close
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DeleteEntity;
```

---

### 🔗 Cách kết hợp DeleteEntity với AppLayout (Nested Routes)

> **⚠️ Quan trọng:** DeleteEntity render bên trong `<Outlet />` của AppLayout.
> Chỉ cần thêm `<Route>` con bên trong `<Route element={<AppLayout />}>`.

#### `src/App.jsx` — Thêm route `/delete/:id`

```jsx
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import EntityList from "./pages/EntityList.jsx";
import CreateEntity from "./pages/CreateEntity.jsx";
import DetailEntity from "./pages/DetailEntity.jsx";
import DeleteEntity from "./pages/DeleteEntity.jsx"; // ← Import page delete

function App() {
  return (
    <Routes>
      {/* AppLayout là route cha — Header + Footer tự động render */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<EntityList />} />
        <Route path="/create" element={<CreateEntity />} />
        <Route path="/detail/:id" element={<DetailEntity />} />
        <Route path="/delete/:id" element={<DeleteEntity />} />
        {/* ↑ Thêm route delete — :id sẽ được useParams() lấy ra */}
      </Route>
    </Routes>
  );
}

export default App;
```

#### Luồng hoạt động với DeleteEntity

```
<AppLayout>                         ← Route cha (không có path)
  ├── <Header />                    ← Luôn hiển thị
  ├── <main>
  │     └── <Outlet />              ← React Router inject page con vào đây
  │           ├── path="/"               → <EntityList />
  │           ├── path="/create"         → <CreateEntity />
  │           ├── path="/detail/:id"     → <DetailEntity />
  │           └── path="/delete/:id"     → <DeleteEntity />
  └── <Footer />                    ← Luôn hiển thị
```

#### Cách navigate tới DeleteEntity từ List page

> Trong `EntityList.jsx`, thay đổi link "Delete" để navigate tới trang xác nhận:

```jsx
// Cách 1: Dùng navigate()
const navigate = useNavigate();

<a
  href="#"
  onClick={(e) => {
    e.preventDefault();
    navigate(`/delete/${entity.id || entity.entityId}`);
  }}
>
  Delete
</a>;

// Cách 2: Dùng <Link> (React Router)
import { Link } from "react-router-dom";

<Link to={`/delete/${entity.id || entity.entityId}`}>Delete</Link>;
```

> **📌 Lưu ý:**
>
> - DeleteEntity **KHÔNG** tạo Header, Footer, hay AppLayout
> - Nội dung chỉ render bên trong `<Outlet />` → layout giữ nguyên
> - Nút "Close" dùng `navigate(-1)` → quay về trang trước
> - Sau khi xóa thành công → `navigate("/")` quay về trang list

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

| #   | Bước                               | File                              | Thời gian  |
| --- | ---------------------------------- | --------------------------------- | ---------- |
| 1   | Tạo project Vite React             | Terminal                          | 30s        |
| 2   | Cài packages                       | Terminal                          | 30s        |
| 3   | Tạo`.env`                          | `.env`                            | 10s        |
| 4   | Sửa`index.css` thêm bootstrap      | `src/index.css`                   | 10s        |
| 5   | Tạo`api.js` (copy template)        | `src/services/api.js`             | 15s        |
| 6   | Tạo Service (copy & đổi tên)       | `src/services/EntityService.js`   | 1min       |
| 7   | Tạo CategoryService (nếu cần)      | `src/services/CategoryService.js` | 30s        |
| 8   | Tạo Header & Footer                | `src/components/`                 | 1min       |
| 9   | Tạo Page CRUD (copy template)      | `src/pages/EntityList.jsx`        | 3min       |
| 10  | Sửa`main.jsx` (thêm BrowserRouter) | `src/main.jsx`                    | 30s        |
| 11  | Sửa`App.jsx` (import + route)      | `src/App.jsx`                     | 30s        |
| 12  | Test & chạy                        | `npm run dev`                     | 30s        |
|     | **Tổng thời gian ước tính**        |                                   | **~8 min** |

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
  <option value="">All</option>
  {categories.map((cat, i) => (
    <option key={cat.id || i} value={cat.id}>
      {cat.categoryName}
    </option>
  ))}
</Form.Select>;
```

### Pattern: Delete với Confirmation Modal

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

### Pattern: Create/Edit Form Modal

```jsx
const [showFormModal, setShowFormModal] = useState(false);
const [editingEntity, setEditingEntity] = useState(null);
const [formData, setFormData] = useState({ name: "", price: "" });
const [formErrors, setFormErrors] = useState({});

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
};

const validateForm = () => {
  const errors = {};
  if (!formData.name.trim()) errors.name = "Required";
  if (!formData.price || Number(formData.price) <= 0)
    errors.price = "Must be > 0";
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  try {
    if (editingEntity) {
      await service.update(editingEntity.id, formData);
    } else {
      await service.create(formData);
    }
    closeModal();
    fetchData();
  } catch (error) {
    alert("Failed to save");
  }
};
```

### Pattern: Format Date (dd/MM/yyyy)

```jsx
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB");
};
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

| Class                                                         | Mô tả                             |
| ------------------------------------------------------------- | --------------------------------- |
| `container` / `container fluid`                               | Container có padding / full width |
| `px-3`, `py-4`, `mb-3`, `mt-4`                                | Padding/margin                    |
| `text-start`, `text-end`, `text-center`                       | Căn chữ                           |
| `fw-bold`, `fw-semibold`                                      | Font weight                       |
| `border-bottom`, `border-top`, `border-dark`                  | Border                            |
| `d-flex`, `justify-content-between`, `justify-content-center` | Flexbox                           |
| `gap-3`, `gap-4`                                              | Gap giữa flex items               |
| `w-100`                                                       | Width 100%                        |
| `fs-5`                                                        | Font size                         |
| `align-items-center`                                          | Căn giữa theo trục dọc            |

---

## 10. 📋 React-Bootstrap Components hay dùng

| Component                                                 | Import            | Dùng cho          |
| --------------------------------------------------------- | ----------------- | ----------------- |
| `Container, Row, Col`                                     | `react-bootstrap` | Layout grid       |
| `Table`                                                   | `react-bootstrap` | Data table        |
| `Button`                                                  | `react-bootstrap` | Buttons           |
| `Form, Form.Control, Form.Select, Form.Group, Form.Label` | `react-bootstrap` | Form inputs       |
| `Modal, Modal.Body`                                       | `react-bootstrap` | Popup modals      |
| `Form.Control.Feedback`                                   | `react-bootstrap` | Validation errors |

---

> **💡 Tips PE:**
>
> - Copy **Section 4 (api.js)** đầu tiên → rồi Service → rồi Page
> - Đổi entity name bằng **Ctrl+H** (Find & Replace) cho nhanh
> - Luôn dùng `response.data.content || response.data || []` để handle cả paginated và non-paginated API
> - Form validation: dùng `isInvalid` prop + `Form.Control.Feedback`
