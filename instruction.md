# 📘 Hướng Dẫn Sử Dụng Source Code EMS (Config-Driven)

## 1. Tổng Quan Kiến Trúc

Source code này là một **template quản lý CRUD dạng config-driven** — toàn bộ logic entity (field, API, label, layout...) được cấu hình tập trung trong **một file duy nhất**: `src/services/config.js`.

> **QUAN TRỌNG:** Bạn **chỉ cần sửa file `config.js`** để chuyển đổi ứng dụng sang quản lý bất kỳ entity nào (Product, Student, Book, Course...). **Không cần sửa các file khác.**

### Cấu trúc thư mục

```
src/
├── services/
│   ├── config.js       ← ⭐ FILE DUY NHẤT CẦN SỬA
│   ├── api.js           ← Tự động đọc config, KHÔNG CẦN SỬA
│   └── utils.js         ← Tiện ích xử lý ngày tháng, KHÔNG CẦN SỬA
├── components/
│   ├── Header.jsx       ← Trả về null (header nằm trong ListPage)
│   ├── Footer.jsx       ← Trả về null (footer nằm trong ListPage)
│   └── ItemForm.jsx     ← Form component tự render theo config, KHÔNG CẦN SỬA
├── pages/
│   ├── ItemListPage.jsx         ← Trang danh sách, KHÔNG CẦN SỬA
│   ├── ItemFormPage.jsx         ← Trang thêm/sửa, KHÔNG CẦN SỬA
│   ├── ItemDetailPage.jsx       ← Trang xem chi tiết, KHÔNG CẦN SỬA
│   └── ItemDeleteConfirmPage.jsx ← Trang xác nhận xóa, KHÔNG CẦN SỬA
└── App.jsx              ← Router, tự đọc basePath từ config, KHÔNG CẦN SỬA
```

---

## 2. Cấu Trúc File `config.js` — Chi Tiết Từng Phần

File `src/services/config.js` export một object `appConfig` gồm các phần sau:

---

### 2.1. Thông Tin Chung (General)

```js
export const appConfig = {
  brandName: '',                            // Tên thương hiệu hiển thị ở header (trái)
  appTitle: '',                             // Tiêu đề app hiển thị ở giữa header
  footerText: '@ 2026 FU University',      // Nội dung footer
  dateFormat: 'yyyy-MM-dd',                // Định dạng ngày: 'yyyy-MM-dd' | 'dd-MM-yyyy' | 'dd/MM/yyyy'
  basePath: '/employees',                  // Route gốc cho ứng dụng
  apiBaseUrl: 'http://localhost:8080/api',  // URL gốc của backend API
  // ...
}
```

| Thuộc tính   | Mô tả                           | Ví dụ                          |
| -------------- | --------------------------------- | -------------------------------- |
| `brandName`  | Tên hiển thị góc trái header | `'Student Management System'`  |
| `appTitle`   | Tiêu đề giữa header           | `'SBA301 - PE'`                |
| `footerText` | Nội dung footer                  | `'@ 2026 FPT University'`      |
| `dateFormat` | Định dạng ngày tháng         | `'dd/MM/yyyy'`                 |
| `basePath`   | Route URL chính                  | `'/students'`, `'/products'` |
| `apiBaseUrl` | URL gốc API backend              | `'http://localhost:8080/api'`  |

---

### 2.2. Layout

```js
layout: {
  headerItems: ['brand', 'date'],       // Các phần tử header
  footerClassName: 'text-center',       // Class CSS cho footer
  pageTitleClassName: 'text-start',     // Class cho tiêu đề trang
  tableTitleClassName: 'text-start',    // Class cho tiêu đề bảng
  appTitleClassName: 'text-start',      // Class cho tiêu đề app
  appTitleMarginLeft: 0,                // Margin trái tiêu đề
  appTitleMarginRight: 0                // Margin phải tiêu đề
}
```

---

### 2.3. Entity — Cấu Hình Entity Chính

```js
entity: {
  label: 'Employee',            // Tên hiển thị (số nhiều): "Employee List"
  singularLabel: 'Employee',    // Tên hiển thị (số ít): "Add New Employee"
  endpoint: '/employees',       // API endpoint cho CRUD
  searchEndpoint: '/employees', // API endpoint cho tìm kiếm (có thể khác endpoint chính)
  idField: 'employeeId',       // Tên trường ID từ API response
  nameField: 'employeeCode',   // Tên trường hiển thị khi xác nhận xóa
  defaultSort: 'fullName',     // Trường mặc định để sắp xếp
  pageSize: 5,                 // Số bản ghi mỗi trang
  duplicateCheckSize: 100,     // Số bản ghi lấy về để kiểm tra trùng (unique field)
  rowActions: ['view','delete'] // Hành động trên mỗi dòng: 'view' | 'edit' | 'delete'
}
```

**`rowActions`** quyết định các nút hành động trên mỗi dòng bảng:

- `['view', 'delete']` → Hiển thị nút **View** và **Delete**
- `['view', 'edit', 'delete']` → Hiển thị cả 3 nút
- `['edit', 'delete']` → Chỉ **Edit** và **Delete**

---

### 2.4. Category — Cấu Hình Bảng Phụ (FK / Dropdown)

Đây là phần cấu hình cho **quan hệ khóa ngoại** (ví dụ: Employee thuộc Department, Product thuộc Category...).

```js
category: {
  enabled: true,                    // true = có bảng phụ, false = không có
  label: 'Employee Name',          // Label hiển thị cho dropdown filter ở trang danh sách
  endpoint: '/departments',        // API endpoint lấy danh sách category
  idField: 'departmentId',         // Trường ID trong response category
  nameField: 'departmentName',     // Trường tên hiển thị trong dropdown
  formField: 'departmentId',       // Tên field trong form (khớp với formFields)
  displayField: 'departmentName',  // Trường để match khi load form edit
  searchParam: 'departmentId',     // Tên query param gửi lên API khi filter
  searchValueField: 'departmentId',// Giá trị lấy từ category khi filter
  payloadField: 'departmentId'     // Tên field trong payload khi POST/PUT
}
```

> Nếu entity **không có khóa ngoại** (không có dropdown), đặt `enabled: false` và bỏ qua các trường còn lại.

---

### 2.5. Search Fields — Cấu Hình Ô Tìm Kiếm

```js
searchFields: [
  { name: 'fullName', label: 'Employee Name', param: 'name' }
]
```

| Thuộc tính | Mô tả                                        |
| ------------ | ---------------------------------------------- |
| `name`     | Tên field trong state filter                  |
| `label`    | Label hiển thị bên cạnh ô tìm kiếm      |
| `param`    | Tên query param gửi lên API (`?name=...`) |

Có thể thêm **nhiều ô tìm kiếm**:

```js
searchFields: [
  { name: 'fullName', label: 'Name', param: 'name' },
  { name: 'email', label: 'Email', param: 'email' }
]
```

---

### 2.6. Form Fields — Cấu Hình Các Field Trong Form Thêm/Sửa

Đây là phần **quan trọng nhất**, quyết định form Add/Edit có những field gì.

```js
formFields: [
  { name: 'fullName',     label: 'Full Name',    type: 'text',     required: true, unique: true, maxLength: 100 },
  { name: 'email',        label: 'Email',         type: 'text',     required: true, maxLength: 100 },
  { name: 'phone',        label: 'Phone',         type: 'number',   required: true, maxLength: 11 },
  { name: 'departmentId', label: 'Department',    type: 'category', required: true },
  { name: 'position',     label: 'Position',      type: 'text',     required: true, maxLength: 100 },
  { name: 'dateOfBirth',  label: 'Date of Birth', type: 'date',     required: true, maxDate: 'today' },
  { name: 'startDate',    label: 'Start Date',    type: 'date',     required: true, maxDate: 'today' },
  { name: 'salary',       label: 'Salary (VND)',  type: 'number',   required: true, min: 1000000, max: 100000000, maxLength: 9 }
]
```

#### Các thuộc tính của mỗi field

| Thuộc tính  | Bắt buộc | Mô tả                                                          |
| ------------- | ---------- | ---------------------------------------------------------------- |
| `name`      | ✅         | Tên field (khớp với key trong API response/request)           |
| `label`     | ✅         | Label hiển thị trên form                                      |
| `type`      | ✅         | Loại field:`'text'`, `'number'`, `'date'`, `'category'` |
| `required`  | ❌         | `true` = bắt buộc nhập                                      |
| `unique`    | ❌         | `true` = kiểm tra trùng trước khi lưu                     |
| `maxLength` | ❌         | Giới hạn ký tự tối đa                                      |
| `min`       | ❌         | Giá trị số tối thiểu (chỉ cho`type: 'number'`)           |
| `max`       | ❌         | Giá trị số tối đa (chỉ cho`type: 'number'`)              |
| `maxDate`   | ❌         | `'today'` = không được chọn ngày trong tương lai       |

#### Các type field

| Type         | Mô tả                 | Input control                                      |
| ------------ | ----------------------- | -------------------------------------------------- |
| `text`     | Văn bản thường      | `<input type="text">`                            |
| `number`   | Số                     | `<input type="number">`                          |
| `date`     | Ngày tháng            | `<input type="text">` (nhập theo dateFormat)    |
| `category` | Dropdown từ bảng phụ | `<select>` (lấy data từ `category.endpoint`) |

---

### 2.7. Form Layout — Bố Cục Form

```js
formLayout: {
  width: 560,           // Chiều rộng form (px)
  paddingTop: 34,       // Padding trên form (px)
  columnGap: 16,        // Khoảng cách giữa các cột (px)
  rows: [
    { fields: ['fullName'],                 columns: '155px 360px' },
    { fields: ['email', 'phone'],           columns: '153px 130px 70px 130px' },
    { fields: ['departmentId', 'position'], columns: '155px 130px 70px 130px' },
    { fields: ['dateOfBirth', 'startDate'], columns: '155px 130px 70px 130px' },
    { fields: ['salary'],                   columns: '155px 130px' },
  ]
}
```

Mỗi row trong `rows`:

| Thuộc tính | Mô tả                                                          |
| ------------ | ---------------------------------------------------------------- |
| `fields`   | Mảng tên các field hiển thị trên dòng đó                |
| `columns`  | CSS`grid-template-columns` — quy định độ rộng từng cột |

**Quy tắc bố cục:**

- Mỗi field cần **2 cột**: **label** + **input**
- **1 field** trên 1 dòng → `columns: '155px 360px'`
- **2 field** trên 1 dòng → `columns: '155px 130px 70px 130px'`

---

### 2.8. Hidden Payload Fields

```js
hiddenPayloadFields: {
  // Các field ẩn sẽ được tự động thêm vào payload khi POST/PUT
  // Ví dụ:
  // status: 'ACTIVE',
  // createdBy: 'admin'
}
```

Dùng khi API yêu cầu gửi thêm field mà **không hiển thị trên form**.

---

### 2.9. List Columns — Cột Hiển Thị Trong Bảng Danh Sách

```js
listColumns: [
  { label: 'Full Name',  field: 'fullName' },
  { label: 'Department', field: 'departmentName' },
  { label: 'Position',   field: 'position' },
  { label: 'Email',      field: 'email' },
  { label: 'Phone',      field: 'phone' }
]
```

| Thuộc tính  | Mô tả                                                                    |
| ------------- | -------------------------------------------------------------------------- |
| `label`     | Tiêu đề cột trong bảng                                                |
| `field`     | Tên field từ API response                                                |
| `fields`    | *(Tùy chọn)* Ghép nhiều field: `fields: ['firstName', 'lastName']` |
| `separator` | *(Tùy chọn)* Ký tự nối khi dùng `fields`, mặc định `' '`    |

---

### 2.10. Detail Fields — Thông Tin Hiển Thị Trang Chi Tiết

```js
detailFields: [
  { label: 'Full Name',     field: 'fullName' },
  { label: 'Employee ID',   field: 'employeeCode' },
  { label: 'Department',    field: 'departmentName' },
  { label: 'Position',      field: 'position' },
  { label: 'Email',         field: 'email' },
  { label: 'Phone',         field: 'phone' },
  { label: 'Date of Birth', field: 'dateOfBirth', type: 'date' },
  { label: 'Start Date',    field: 'startDate',   type: 'date' },
  { label: 'Salary',        field: 'salary' }
]
```

> Nếu field có `type: 'date'`, giá trị sẽ được tự động format theo `dateFormat` đã cấu hình.

---

## 3. API Backend Cần Đáp Ứng

Source code frontend này tự động gọi các API sau dựa trên config:

### 3.1. Các API CRUD

| Method     | URL                                     | Mô tả                | Params                                                 |
| ---------- | --------------------------------------- | ---------------------- | ------------------------------------------------------ |
| `GET`    | `{apiBaseUrl}{entity.endpoint}`       | Lấy danh sách        | `page`, `size`, `sortBy`, `direction`          |
| `GET`    | `{apiBaseUrl}{entity.searchEndpoint}` | Tìm kiếm             | `page`, `size`, `sortBy`, `direction` + search |
| `GET`    | `{apiBaseUrl}{entity.endpoint}/{id}`  | Lấy chi tiết theo ID | —                                                     |
| `POST`   | `{apiBaseUrl}{entity.endpoint}`       | Tạo mới              | JSON body                                              |
| `PUT`    | `{apiBaseUrl}{entity.endpoint}/{id}`  | Cập nhật             | JSON body                                              |
| `DELETE` | `{apiBaseUrl}{entity.endpoint}/{id}`  | Xóa                   | —                                                     |
| `GET`    | `{apiBaseUrl}{category.endpoint}`     | Lấy danh sách FK     | —                                                     |

### 3.2. Format Response — Danh Sách (Phân Trang)

API GET danh sách phải trả về JSON theo format **Spring Boot Page**:

```json
{
  "content": [
    { "employeeId": 1, "fullName": "Nguyen Van A", "departmentName": "IT", ... }
  ],
  "currentPage": 0,
  "totalElements": 50,
  "totalPages": 10,
  "first": true,
  "last": false
}
```

> `currentPage` hoặc `pageNumber` đều được chấp nhận (code tự xử lý cả hai).

### 3.3. Format Response — Chi Tiết

API GET chi tiết trả về **trực tiếp object** (không wrap):

```json
{
  "employeeId": 1,
  "fullName": "Nguyen Van A",
  "email": "a@mail.com",
  "departmentName": "IT",
  "dateOfBirth": "1990-01-15",
  ...
}
```

### 3.4. Format Response — Category

API GET category trả về **mảng**:

```json
[
  { "departmentId": 1, "departmentName": "IT" },
  { "departmentId": 2, "departmentName": "HR" }
]
```

### 3.5. Format Request Payload (POST / PUT)

```json
{
  "fullName": "Nguyen Van A",
  "email": "a@mail.com",
  "phone": 123456789,
  "departmentId": 1,
  "position": "Developer",
  "dateOfBirth": "1990-01-15",
  "startDate": "2020-06-01",
  "salary": 15000000
}
```

**Lưu ý quan trọng:**

- Field `type: 'number'` → gửi dạng **Number** (không phải string)
- Field `type: 'date'` → luôn gửi dạng **`yyyy-MM-dd`** bất kể `dateFormat` hiển thị
- Field `type: 'category'` → gửi theo `payloadField` với giá trị **Number** (ID)

---

## 4. Ví Dụ — Chuyển Đổi Từ Employee Sang Product

Giả sử bạn muốn chuyển sang quản lý **Product** với category là **Brand**:

```js
export const appConfig = {
  brandName: 'Product Management System',
  appTitle: 'SBA301 - PE',
  footerText: '@ 2026 FU University',
  dateFormat: 'yyyy-MM-dd',
  basePath: '/products',
  apiBaseUrl: 'http://localhost:8080/api',

  layout: {
    headerItems: ['brand', 'date'],
    footerClassName: 'text-center',
    pageTitleClassName: 'text-start',
    tableTitleClassName: 'text-start',
    appTitleClassName: 'text-start',
    appTitleMarginLeft: 0,
    appTitleMarginRight: 0
  },

  entity: {
    label: 'Product',
    singularLabel: 'Product',
    endpoint: '/products',
    searchEndpoint: '/products',
    idField: 'productId',
    nameField: 'productName',
    defaultSort: 'productName',
    pageSize: 5,
    duplicateCheckSize: 100,
    rowActions: ['view', 'edit', 'delete']
  },

  category: {
    enabled: true,
    label: 'Brand',
    endpoint: '/brands',
    idField: 'brandId',
    nameField: 'brandName',
    formField: 'brandId',
    displayField: 'brandName',
    searchParam: 'brandId',
    searchValueField: 'brandId',
    payloadField: 'brandId'
  },

  searchFields: [
    { name: 'productName', label: 'Product Name', param: 'name' }
  ],

  formFields: [
    { name: 'productName', label: 'Product Name', type: 'text',     required: true, unique: true, maxLength: 100 },
    { name: 'brandId',     label: 'Brand',        type: 'category', required: true },
    { name: 'price',       label: 'Price (VND)',   type: 'number',   required: true, min: 1000, max: 999999999, maxLength: 10 },
    { name: 'quantity',    label: 'Quantity',      type: 'number',   required: true, min: 0, max: 99999, maxLength: 5 },
    { name: 'releaseDate', label: 'Release Date',  type: 'date',     required: true, maxDate: 'today' },
    { name: 'description', label: 'Description',   type: 'text',     required: false, maxLength: 500 }
  ],

  formLayout: {
    width: 560,
    paddingTop: 34,
    columnGap: 16,
    rows: [
      { fields: ['productName'],             columns: '155px 360px' },
      { fields: ['brandId', 'price'],        columns: '155px 130px 70px 130px' },
      { fields: ['quantity', 'releaseDate'], columns: '155px 130px 70px 130px' },
      { fields: ['description'],             columns: '155px 360px' }
    ]
  },

  hiddenPayloadFields: {},

  listColumns: [
    { label: 'Product Name', field: 'productName' },
    { label: 'Brand',        field: 'brandName' },
    { label: 'Price',        field: 'price' },
    { label: 'Quantity',     field: 'quantity' },
    { label: 'Release Date', field: 'releaseDate' }
  ],

  detailFields: [
    { label: 'Product Name', field: 'productName' },
    { label: 'Brand',        field: 'brandName' },
    { label: 'Price (VND)',  field: 'price' },
    { label: 'Quantity',     field: 'quantity' },
    { label: 'Release Date', field: 'releaseDate', type: 'date' },
    { label: 'Description',  field: 'description' }
  ]
}
```

---

## 5. Ví Dụ — Entity Không Có Category (Không FK)

Nếu entity **không có bảng phụ** (ví dụ quản lý Task đơn giản):

```js
category: {
  enabled: false   // ← Tắt category, bỏ qua các trường khác
},
```

Và **không dùng** `type: 'category'` trong `formFields`.

---

## 6. Chạy Ứng Dụng

```bash
# Cài dependencies (lần đầu)
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

> **Lưu ý:** Đảm bảo backend API đang chạy tại `apiBaseUrl` trước khi mở ứng dụng, nếu không sẽ gặp lỗi kết nối.

---

## 7. Checklist Khi Chuyển Đổi Entity

1. ✅ Sửa `basePath` — route URL chính
2. ✅ Sửa `entity` — endpoint, idField, nameField, label...
3. ✅ Sửa `category` — nếu có FK, hoặc đặt `enabled: false`
4. ✅ Sửa `searchFields` — ô tìm kiếm
5. ✅ Sửa `formFields` — các field trong form Add/Edit
6. ✅ Sửa `formLayout` — bố cục form (grid columns)
7. ✅ Sửa `listColumns` — cột trong bảng danh sách
8. ✅ Sửa `detailFields` — thông tin trang chi tiết
9. ✅ Đảm bảo API backend trả về đúng format (xem mục 3)

---

## 8. Ghép Nhiều Field Hiển Thị (Combined Fields)

Cả `detailFields` và `listColumns` đều hỗ trợ **ghép nhiều field thành 1 giá trị** hiển thị bằng thuộc tính `fields` + `separator`.

### Cách hoạt động

Trong `ItemDetailPage.jsx`, hàm `getFieldValue` xử lý:

```js
function getFieldValue(item, field) {
    if (field.fields)  // Nếu có thuộc tính 'fields' (mảng)
        return field.fields.map((fieldName) => item[fieldName]).join(field.separator ?? ' ')
    return field.type === 'date' ? formatDate(item[field.field]) : item[field.field]
}
```

Trong `ItemListPage.jsx`, hàm `getColumnValue` xử lý tương tự:

```js
function getColumnValue(item, column) {
    if (column.fields) return column.fields.map((field) => item[field]).join(column.separator ?? ' ')
    return item[column.field]
}
```

### Cách cấu hình

**Ví dụ 1: Hiển thị `priceFrom-priceTo` trong trang chi tiết:**

```js
detailFields: [
    // Field thường (1 field)
    { label: 'Product Name', field: 'productName' },

    // Field ghép (nhiều field nối lại)
    { label: 'Price Range', fields: ['priceFrom', 'priceTo'], separator: '-' },
    //                      ^^^^^^                             ^^^^^^^^^^^^^
    //                      mảng field cần ghép                ký tự nối
]
```

Nếu API trả về `{ priceFrom: 100000, priceTo: 500000 }` → hiển thị: **`100000-500000`**

**Ví dụ 2: Hiển thị `firstName lastName` trong bảng danh sách:**

```js
listColumns: [
    { label: 'Full Name', fields: ['firstName', 'lastName'], separator: ' ' },
]
```

Nếu API trả về `{ firstName: 'Nguyen', lastName: 'Van A' }` → hiển thị: **`Nguyen Van A`**

**Ví dụ 3: Hiển thị `priceFrom-priceTo` trong bảng danh sách:**

```js
listColumns: [
    { label: 'Price Range', fields: ['priceFrom', 'priceTo'], separator: '-' },
]
```

### Tóm tắt thuộc tính

| Thuộc tính  | Dùng cho           | Mô tả                                                   |
| ----------- | ------------------- | --------------------------------------------------------- |
| `field`     | Field đơn           | Tên 1 field từ API response                               |
| `fields`    | Field ghép          | Mảng nhiều field cần nối lại                              |
| `separator` | Dùng cùng `fields`  | Ký tự nối giữa các field, mặc định `' '` (dấu cách)     |

> **Lưu ý:** Khi dùng `fields`, **không cần** khai báo `field`. Hai thuộc tính này dùng thay thế nhau.

---

## 9. Thêm Validation Tùy Chỉnh

### 9.1. Validation có sẵn (qua config)

Các loại validation sau được hỗ trợ sẵn — chỉ cần khai báo thuộc tính trong `formFields` của `config.js`:

| Thuộc tính  | Loại validation              | Thông báo lỗi                                              |
| ----------- | ----------------------------- | ------------------------------------------------------------ |
| `required`  | Bắt buộc nhập                | `"{label} is required."`                                     |
| `maxLength` | Giới hạn ký tự               | `"{label} must not exceed {maxLength} characters."`          |
| `min`/`max` | Khoảng giá trị số            | `"{label} must be from {min} to {max}."`                     |
| `maxDate`   | Ngày không được tương lai    | `"{label} must not be in future."`                           |
| `unique`    | Kiểm tra trùng (gọi API)    | `"{label} already exists."`                                  |

Ngoài ra, tự động validate:
- Field `type: 'number'` → kiểm tra phải là số hợp lệ
- Field `type: 'date'` → kiểm tra format ngày hợp lệ

### 9.2. Thêm validation mới (sửa `ItemFormPage.jsx`)

Để thêm validation **không có sẵn** trong config, bạn cần sửa hàm `validate()` trong file `src/pages/ItemFormPage.jsx`.

Hàm `validate()` có cấu trúc như sau:

```js
async function validate() {
    const next = {}  // Object chứa lỗi: { fieldName: 'error message' }

    appConfig.formFields.forEach((field) => {
        const value = form[field.name]

        // --- CÁC VALIDATION CÓ SẴN ---
        // 1. required
        // 2. maxLength
        // 3. ⬇️ THÊM VALIDATION MỚI VÀO ĐÂY (trong forEach) ⬇️
        // 4. number check
        // 5. min/max
        // 6. date format
        // 7. maxDate
    })

    // --- ⬇️ HOẶC THÊM VALIDATION SO SÁNH 2 FIELD VÀO ĐÂY (sau forEach) ⬇️ ---

    // unique check (gọi API)
    // ...

    setErrors(next)
    return Object.keys(next).length === 0
}
```

### 9.3. Ví dụ: Validate email format

Thêm **1 dòng** vào **trong** `forEach`, sau dòng kiểm tra `maxLength`:

```js
// Thêm sau dòng: if (!next[field.name] && field.maxLength && ...)
if (!next[field.name] && field.name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
    next[field.name] = 'Email is not valid.'
```

**Giải thích:**
- `!next[field.name]` → chỉ kiểm tra nếu chưa có lỗi khác
- `field.name === 'email'` → chỉ áp dụng cho field tên `email`
- `!/^[^\s@]+@[^\s@]+\.[^\s@]+$/` → regex kiểm tra email cơ bản (phải có `@` và `.`)

### 9.4. Ví dụ: Validate phone format (chỉ chấp nhận số)

```js
if (!next[field.name] && field.name === 'phone' && value && !/^\d+$/.test(value.trim()))
    next[field.name] = 'Phone must contain only digits.'
```

### 9.5. Ví dụ: So sánh 2 field (priceFrom <= priceTo)

Thêm **sau** `forEach` (đã có sẵn trong source):

```js
const priceFrom = Number(form.priceFrom)
const priceTo = Number(form.priceTo)
if (!next.priceTo && Number.isFinite(priceFrom) && Number.isFinite(priceTo) && priceTo < priceFrom)
    next.priceTo = 'Price To must be greater than or equal to Price From.'
```

### 9.6. Ví dụ: So sánh 2 ngày (startDate >= dateOfBirth)

Thêm **sau** `forEach`:

```js
const dob = parseDate(form.dateOfBirth, appConfig.dateFormat)
const start = parseDate(form.startDate, appConfig.dateFormat)
if (!next.startDate && dob && start && start < dob)
    next.startDate = 'Start Date must be after Date of Birth.'
```

### 9.7. Quy tắc khi thêm validation

1. Luôn kiểm tra `!next[field.name]` đầu tiên → tránh ghi đè lỗi đã có
2. Validation cho **1 field** → thêm **trong** `forEach`
3. Validation **so sánh 2 field** → thêm **sau** `forEach`
4. Thông báo lỗi hiển thị ngay dưới field tương ứng (tự động)

