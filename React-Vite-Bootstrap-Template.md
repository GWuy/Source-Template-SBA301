# 🚀 React + JavaScript + Bootstrap Template

> Template dùng để tạo nhanh một project React sử dụng Vite, Bootstrap, React Router và Axios.

---

# 1. Khởi tạo Project

## Tạo project bằng Vite

```bash
npm create vite@latest my-project -- --template react
```

Ví dụ

```bash
npm create vite@latest student-management -- --template react
```

Di chuyển vào project

```bash
cd student-management
```

Cài đặt dependencies

```bash
npm install
```

Chạy project

```bash
npm run dev
```

---

# 2. Cài đặt thư viện

## Bootstrap

```bash
npm install react-bootstrap bootstrap
```

## React Router

```bash
npm install react-router-dom
```

## Axios

```bash
npm install axios
```

---

# 3. Import Bootstrap

Mở file

```
src/index.css
```

Thêm

```css
@import 'bootstrap/dist/css/bootstrap.css';
```

---

# 4. Cấu trúc Project

```
src
│
├── assets
│
├── components
│     ├── Navbar.jsx
│     ├── Footer.jsx
│     └── Loading.jsx
│
├── pages
│     ├── Home.jsx
│     ├── Login.jsx
│     └── User.jsx
│
├── services
│     ├── AuthService.js
│     └── UserService.js
│
├── routes
│     └── AppRouter.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## Ý nghĩa

| Folder     | Mục đích           |
| ---------- | --------------------- |
| assets     | Hình ảnh, icon      |
| components | Component dùng chung |
| pages      | Các màn hình       |
| services   | Gọi API              |
| routes     | Khai báo Router      |

---

# 5. Bootstrap Components

## Container

```jsx
<Container>

</Container>
```

Dùng để căn giữa nội dung.

---

## Alert

```jsx
<Alert variant="success">
    Thành công
</Alert>
```

Các variant

```Java
primary
secondary
success
danger
warning
info
light
dark
```

---

## Button

```jsx
<Button variant="primary">
    Save
</Button>
```

---

## Dropdown

```jsx
<Dropdown>

    <Dropdown.Toggle variant="success">
        Menu
    </Dropdown.Toggle>

    <Dropdown.Menu>

        <Dropdown.Item>
            Edit
        </Dropdown.Item>

        <Dropdown.Item>
            Delete
        </Dropdown.Item>

    </Dropdown.Menu>

</Dropdown>
```

---

# 6. Form

## TextBox

```jsx
<Form.Control
    type="text"
/>
```

---

## Password

```jsx
<Form.Control
    type="password"
/>
```

---

## TextArea

```jsx
<Form.Control
    as="textarea"
/>
```

---

## Radio Button

```jsx
<Form.Check
    type="radio"
    name="gender"
    label="Male"
/>

<Form.Check
    type="radio"
    name="gender"
    label="Female"
/>
```

**Lưu ý**

- Cùng `name`
- Chỉ chọn được một

---

## Checkbox

```jsx
<Form.Check
    type="checkbox"
    label="Java"
/>
```

Có thể chọn nhiều.

---

## Select

```jsx
<Form.Select>

    <option>Java</option>

    <option>C#</option>

</Form.Select>
```

---

## Form đầy đủ

```jsx
<Form>

    <Form.Group className="mb-3">

        <Form.Label>Email</Form.Label>

        <Form.Control
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
        />

    </Form.Group>

    <Form.Group>

        <Form.Label>Password</Form.Label>

        <Form.Control
            type="password"
        />

    </Form.Group>

</Form>
```

---

# 7. Routing

## main.jsx

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

createRoot(document.getElementById("root")).render(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>}/>

<Route path="/login" element={<Login/>}/>

</Routes>

</BrowserRouter>

);
```

---

## Link

```jsx
import { Link } from "react-router-dom";

<Link to="/login">

Login

</Link>
```

---

## Navigate

```jsx
const navigate = useNavigate();

navigate("/home");
```

---

# 8. Axios

## POST

```jsx
const response = await axios.post(

"/api/v1/auth/login",

{

email,

password

}

);
```

---

## GET

```jsx
const response = await axios.get(

"/api/v1/users"

);
```

---

# 9. Service Layer

## AuthService.js

```jsx
import axios from "axios";

const login = (email,password)=>{

return axios.post(

"http://localhost:8080/api/v1/auth/login",

{

email,

password

}

);

};

export const authService = {

login

};
```

---

## Login.jsx

```jsx
authService.login(email,password)

.then((response)=>{

localStorage.setItem(

"token",

response.data.accessToken

);

navigate("/home");

})

.catch((error)=>{

console.log(error);

});
```

---

# 10. JWT

## Lưu token

```jsx
localStorage.setItem(

"token",

response.data.accessToken

);
```

---

## Lấy token

```jsx
const token = localStorage.getItem("token");
```

---

# 11. Gọi API có JWT

```jsx
axios.get(

"http://localhost:8080/api/v1/users",

{

headers:{

Authorization:`Bearer ${token}`

}

}

)
```

---

# 12. useEffect

```jsx
useEffect(()=>{

loadUsers();

},[]);
```

Giải thích

- Chỉ chạy một lần khi component được render.

---

# 13. Hiển thị dữ liệu

```jsx
<table>

<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Email</th>

</tr>

</thead>

<tbody>

{

users.map(user=>(

<tr key={user.id}>

<td>{user.id}</td>

<td>{user.fullName}</td>

<td>{user.email}</td>

</tr>

))

}

</tbody>

</table>
```

---

# 14. Environment Variables

Tạo file

```
.env
```

Nội dung

```env
VITE_API_URL=http://localhost:8080
```

---

# 15. Sử dụng .env

```jsx
const response = await axios.post(

`${import.meta.env.VITE_API_URL}/api/v1/auth/login`,

{

email,

password

}

);
```

## Lợi ích

- Không hard-code URL
- Dễ chuyển môi trường
- Chỉ sửa một nơi

---

# 16. Flow Login

```
User nhập Email

↓

User nhập Password

↓

Click Login

↓

Login.jsx

↓

AuthService

↓

Axios

↓

Spring Boot API

↓

JWT

↓

localStorage

↓

Navigate("/home")
```

---

# 17. Flow CRUD

```
Button Click

↓

Service

↓

Axios

↓

Backend

↓

Response

↓

State

↓

Render UI
```

---

# 18. Các Bootstrap Component quan trọng

- Container
- Row
- Col
- Card
- Button
- Form
- Form.Control
- Form.Select
- Form.Check
- Table
- Modal
- Alert
- Navbar
- Dropdown
- Pagination
- Spinner
- Badge
- Toast
- Accordion

---

# 19. Checklist tạo project mới

```text
☐ npm create vite

☐ npm install

☐ npm install react-bootstrap bootstrap

☐ npm install react-router-dom

☐ npm install axios

☐ Import bootstrap css

☐ Tạo folder pages

☐ Tạo folder services

☐ Tạo folder components

☐ Tạo folder assets

☐ Tạo .env

☐ Cấu hình Router

☐ Tạo AuthService

☐ Tạo Login Page

☐ Lưu JWT

☐ Gọi API bằng Bearer Token
```

---

# 20. Best Practices

## Không nên

❌ Hard-code URL

```js
axios.get("http://localhost:8080/api/users");
```

---

❌ Gọi API trực tiếp ở nhiều nơi

```jsx
axios.post(...)

axios.post(...)

axios.post(...)
```

---

## Nên

✔ Dùng Service

```jsx
UserService.getAll();
```

---

✔ Dùng Environment

```env
VITE_API_URL=http://localhost:8080
```

---

✔ Lưu JWT

```js
localStorage.setItem("token", token);
```

---

✔ Luôn gửi Authorization

```http
Authorization: Bearer <token>
```

---

✔ Chia project theo module

```
pages

components

services

assets
```

---

# 21. Quy trình phát triển Front-end

```
Khởi tạo Project
        │
        ▼
Cài đặt Dependencies
        │
        ▼
Bootstrap
        │
        ▼
Router
        │
        ▼
Thiết kế UI
        │
        ▼
Service Layer
        │
        ▼
Axios
        │
        ▼
Spring Boot API
        │
        ▼
JWT
        │
        ▼
Hiển thị dữ liệu
        │
        ▼
CRUD
        │
        ▼
Deploy
```

---

# 22. Ghi nhớ nhanh

## Tạo project

```bash
npm create vite@latest
```

## Bootstrap

```bash
npm install react-bootstrap bootstrap
```

## Router

```bash
npm install react-router-dom
```

## Axios

```bash
npm install axios
```

## Chạy

```bash
npm run dev
```

## Lưu Token

```js
localStorage.setItem("token", token);
```

## Đọc Token

```js
localStorage.getItem("token");
```

## Header JWT

```js
headers: {
    Authorization: `Bearer ${token}`
}
```

## Điều hướng

```jsx
navigate("/home");
```

## Link

```jsx
<Link to="/login">
    Login
</Link>
```

---

# 📚 Tài liệu tham khảo

- https://react.dev/
- https://vitejs.dev/
- https://react-bootstrap.github.io/
- https://reactrouter.com/
- https://axios-http.com/
