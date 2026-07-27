# 📋 Validation Field Templates — React + React-Bootstrap

> **Mục đích:** Copy nhanh các validation phổ biến cho form trong PE.
> **Cách dùng:** Copy function `validate()` + sửa field name + bỏ comment validation cần dùng.

---

## 🔧 Cấu trúc cơ bản

```jsx
const [errors, setErrors] = useState({});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  // Clear error khi user sửa
  if (errors[name]) {
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }
};

const validate = () => {
  const newErrors = {};

  // ... các rule validation ở đây ...

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Gọi trước khi submit:
const handleSubmit = async () => {
  if (!validate()) return;
  // ... gọi API ...
};
```

### JSX hiển thị lỗi:

```jsx
<Form.Control
    type="text"
    name="fieldName"
    value={formData.fieldName}
    onChange={handleChange}
    isInvalid={!!errors.fieldName}       /* ← highlight đỏ khi có lỗi */
/>
<Form.Control.Feedback type="invalid">
    {errors.fieldName}                    /* ← hiển thị message lỗi */
</Form.Control.Feedback>
```

---

## 📝 Các Validation Rules Phổ Biến

### 1. Required — Bắt buộc nhập

```js
// ===== REQUIRED: Bắt buộc nhập =====
if (!formData.fieldName.trim()) {
  newErrors.fieldName = "Field name is required";
}
```

### 2. Max Length — Giới hạn độ dài

```js
// ===== MAX LENGTH: Giới hạn ký tự tối đa =====
if (formData.fieldName.trim().length > 100) {
  newErrors.fieldName = "Field name must not exceed 100 characters";
}
```

### 3. Min Length — Độ dài tối thiểu

```js
// ===== MIN LENGTH: Ít nhất N ký tự =====
if (formData.fieldName.trim().length < 3) {
  newErrors.fieldName = "Field name must be at least 3 characters";
}
```

### 4. Combined Required + Max Length (hay dùng nhất)

```js
// ===== REQUIRED + MAX LENGTH =====
if (!formData.fieldName.trim()) {
  newErrors.fieldName = "Field name is required";
} else if (formData.fieldName.trim().length > 100) {
  newErrors.fieldName = "Field name must not exceed 100 characters";
}
```

### 5. Positive Number — Số dương

```js
// ===== POSITIVE NUMBER: Số > 0 =====
if (!formData.price) {
  newErrors.price = "Price is required";
} else if (isNaN(formData.price) || Number(formData.price) <= 0) {
  newErrors.price = "Price must be a positive number";
}
```

### 6. Number Range — Số trong khoảng

```js
// ===== NUMBER RANGE: Số trong khoảng min-max =====
if (!formData.quantity) {
  newErrors.quantity = "Quantity is required";
} else if (
  isNaN(formData.quantity) ||
  Number(formData.quantity) < 1 ||
  Number(formData.quantity) > 1000
) {
  newErrors.quantity = "Quantity must be between 1 and 1000";
}
```

### 7. Integer Only — Chỉ số nguyên

```js
// ===== INTEGER ONLY: Chỉ chấp nhận số nguyên =====
if (!formData.quantity) {
  newErrors.quantity = "Quantity is required";
} else if (
  !Number.isInteger(Number(formData.quantity)) ||
  Number(formData.quantity) <= 0
) {
  newErrors.quantity = "Quantity must be a positive integer";
}
```

### 8. Required Dropdown — Dropdown bắt buộc chọn

```js
// ===== REQUIRED DROPDOWN: Bắt buộc chọn từ dropdown =====
if (!formData.categoryId) {
  newErrors.categoryId = "Category is required";
}
```

### 9. Email Format

```js
// ===== EMAIL: Định dạng email =====
if (!formData.email.trim()) {
  newErrors.email = "Email is required";
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  newErrors.email = "Invalid email format";
}
```

### 10. Phone Number — Số điện thoại

```js
// ===== PHONE: Chỉ số, 10-11 ký tự =====
if (!formData.phone.trim()) {
  newErrors.phone = "Phone is required";
} else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
  newErrors.phone = "Phone must be 10-11 digits";
}
```

### 11. Date — Ngày không được để trống

```js
// ===== REQUIRED DATE =====
if (!formData.dateField) {
  newErrors.dateField = "Date is required";
}
```

### 12. Date — Không được ở tương lai

```js
// ===== DATE NOT IN FUTURE =====
if (formData.dateField && new Date(formData.dateField) > new Date()) {
  newErrors.dateField = "Date cannot be in the future";
}
```

### 13. Date — Không được ở quá khứ

```js
// ===== DATE NOT IN PAST =====
if (formData.dateField && new Date(formData.dateField) < new Date()) {
  newErrors.dateField = "Date cannot be in the past";
}
```

### 14. Date Comparison — So sánh 2 ngày (Start < End)

```js
// ===== DATE COMPARISON: startDate phải trước endDate =====
if (formData.startDate && formData.endDate) {
  if (new Date(formData.startDate) >= new Date(formData.endDate)) {
    newErrors.startDate = "Start date must be before end date";
  }
}
```

### 15. Password — Mật khẩu

```js
// ===== PASSWORD: Ít nhất 6 ký tự, có chữ và số =====
if (!formData.password) {
  newErrors.password = "Password is required";
} else if (formData.password.length < 6) {
  newErrors.password = "Password must be at least 6 characters";
} else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.password)) {
  newErrors.password = "Password must contain both letters and numbers";
}
```

### 16. Confirm Password — Xác nhận mật khẩu

```js
// ===== CONFIRM PASSWORD: Phải trùng với password =====
if (!formData.confirmPassword) {
  newErrors.confirmPassword = "Please confirm your password";
} else if (formData.password !== formData.confirmPassword) {
  newErrors.confirmPassword = "Passwords do not match";
}
```

### 17. URL Format

```js
// ===== URL: Định dạng URL =====
if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
  newErrors.website =
    "Invalid URL format (must start with http:// or https://)";
}
```

### 18. No Special Characters — Không ký tự đặc biệt

```js
// ===== NO SPECIAL CHARS: Chỉ chữ, số, khoảng trắng =====
if (formData.fieldName && !/^[a-zA-Z0-9\s]+$/.test(formData.fieldName)) {
  newErrors.fieldName = "Only letters, numbers and spaces are allowed";
}
```

### 19. Alphabetic Only — Chỉ chữ cái

```js
// ===== ALPHABETIC ONLY: Chỉ chữ cái và khoảng trắng =====
if (formData.name && !/^[a-zA-Z\s]+$/.test(formData.name)) {
  newErrors.name = "Only letters and spaces are allowed";
}
```

### 20. Decimal — Số thập phân (2 chữ số sau dấu phẩy)

```js
// ===== DECIMAL: Tối đa 2 số thập phân =====
if (formData.price && !/^\d+(\.\d{1,2})?$/.test(formData.price)) {
  newErrors.price = "Price must have at most 2 decimal places";
}
```

### 21. Date Format — yyyy/MM/dd (dấu `/` hoặc `-`)

```js
// ===== DATE FORMAT: yyyy/MM/dd hoặc yyyy-MM-dd =====
if (
  formData.dateField &&
  !/^\d{4}[\/\-](0[1-9]|1[0-2])[\/\-](0[1-9]|[12]\d|3[01])$/.test(
    formData.dateField,
  )
) {
  newErrors.dateField = "Date must be in yyyy/MM/dd or yyyy-MM-dd format";
}
```

### 22. Date Format — yyyy/dd/MM (dấu `/` hoặc `-`)

```js
// ===== DATE FORMAT: yyyy/dd/MM hoặc yyyy-dd-MM =====
if (
  formData.dateField &&
  !/^\d{4}[\/\-](0[1-9]|[12]\d|3[01])[\/\-](0[1-9]|1[0-2])$/.test(
    formData.dateField,
  )
) {
  newErrors.dateField = "Date must be in yyyy/dd/MM or yyyy-dd-MM format";
}
```

### 23. Date Format — MM/dd/yyyy (dấu `/` hoặc `-`)

```js
// ===== DATE FORMAT: MM/dd/yyyy hoặc MM-dd-yyyy =====
if (
  formData.dateField &&
  !/^(0[1-9]|1[0-2])[\/\-](0[1-9]|[12]\d|3[01])[\/\-]\d{4}$/.test(
    formData.dateField,
  )
) {
  newErrors.dateField = "Date must be in MM/dd/yyyy or MM-dd-yyyy format";
}
```

### 24. Date Format — dd/MM/yyyy (dấu `/` hoặc `-`)

```js
// ===== DATE FORMAT: dd/MM/yyyy hoặc dd-MM-yyyy =====
if (
  formData.dateField &&
  !/^(0[1-9]|[12]\d|3[01])[\/\-](0[1-9]|1[0-2])[\/\-]\d{4}$/.test(
    formData.dateField,
  )
) {
  newErrors.dateField = "Date must be in dd/MM/yyyy or dd-MM-yyyy format";
}
```

### 25. Parse Date String — Chuyển chuỗi ngày thành Date object

> **Dùng khi:** Đề bài yêu cầu nhập ngày dạng text (không dùng `<input type="date">`), cần parse để so sánh hoặc lưu DB.
> **Lưu ý:** Mỗi function chỉ hỗ trợ **một loại separator** duy nhất (`/` hoặc `-`). KHÔNG dùng `split(/[\/\-]/)`.

```js
// ===== PARSE DATE: Mỗi function chỉ hỗ trợ 1 separator =====

// Parse yyyy/MM/dd (chỉ dấu /)
const parseYMDSlash = (str) => {
  const [y, m, d] = str.split("/");
  return new Date(y, m - 1, d);
};

// Parse yyyy-MM-dd (chỉ dấu -)
const parseYMDDash = (str) => {
  const [y, m, d] = str.split("-");
  return new Date(y, m - 1, d);
};

// Parse dd/MM/yyyy (chỉ dấu /)
const parseDMYSlash = (str) => {
  const [d, m, y] = str.split("/");
  return new Date(y, m - 1, d);
};

// Parse dd-MM-yyyy (chỉ dấu -)
const parseDMYDash = (str) => {
  const [d, m, y] = str.split("-");
  return new Date(y, m - 1, d);
};

// Parse MM/dd/yyyy (chỉ dấu /)
const parseMDYSlash = (str) => {
  const [m, d, y] = str.split("/");
  return new Date(y, m - 1, d);
};

// Parse MM-dd-yyyy (chỉ dấu -)
const parseMDYDash = (str) => {
  const [m, d, y] = str.split("-");
  return new Date(y, m - 1, d);
};
```

### 26. Date Formatting — Chuyển chuỗi ngày về format `yyyy-MM-dd` trước khi gửi API

> **Dùng khi:** Backend yêu cầu nhận ngày dạng `yyyy-MM-dd`, nhưng form nhập dạng khác.
> **Lưu ý:** Mỗi function chỉ hỗ trợ **một format + một separator** duy nhất. KHÔNG dùng `split(/[\/\-]/)`.

```js
// ===== DATE FORMAT FUNCTIONS: Chuyển về yyyy-MM-dd =====

// yyyy/MM/dd -> yyyy-MM-dd (chỉ dấu /)
const formatYMDSlash = (str) => {
  if (!str) return "";
  const parts = str.split("/");
  if (parts.length !== 3)
    throw new Error("Invalid format, expected yyyy/MM/dd");
  const [y, m, d] = parts;
  return `${y}-${m}-${d}`;
};

// yyyy-MM-dd -> yyyy-MM-dd (chỉ dấu -, giữ nguyên)
const formatYMDDash = (str) => {
  if (!str) return "";
  const parts = str.split("-");
  if (parts.length !== 3)
    throw new Error("Invalid format, expected yyyy-MM-dd");
  const [y, m, d] = parts;
  return `${y}-${m}-${d}`;
};

// dd/MM/yyyy -> yyyy-MM-dd (chỉ dấu /)
const formatDMYSlash = (str) => {
  if (!str) return "";
  const parts = str.split("/");
  if (parts.length !== 3)
    throw new Error("Invalid format, expected dd/MM/yyyy");
  const [d, m, y] = parts;
  return `${y}-${m}-${d}`;
};

// dd-MM-yyyy -> yyyy-MM-dd (chỉ dấu -)
const formatDMYDash = (str) => {
  if (!str) return "";
  const parts = str.split("-");
  if (parts.length !== 3)
    throw new Error("Invalid format, expected dd-MM-yyyy");
  const [d, m, y] = parts;
  return `${y}-${m}-${d}`;
};

// MM/dd/yyyy -> yyyy-MM-dd (chỉ dấu /)
const formatMDYSlash = (str) => {
  if (!str) return "";
  const parts = str.split("/");
  if (parts.length !== 3)
    throw new Error("Invalid format, expected MM/dd/yyyy");
  const [m, d, y] = parts;
  return `${y}-${m}-${d}`;
};

// MM-dd-yyyy -> yyyy-MM-dd (chỉ dấu -)
const formatMDYDash = (str) => {
  if (!str) return "";
  const parts = str.split("-");
  if (parts.length !== 3)
    throw new Error("Invalid format, expected MM-dd-yyyy");
  const [m, d, y] = parts;
  return `${y}-${m}-${d}`;
};
```

### 27. Ví dụ sử dụng Date Formatting trước khi gọi API

> **Dùng khi:** Cần format lại ngày trước khi gửi dữ liệu lên backend.

```js
// ===== VÍ DỤ 1: Form nhập ngày dạng dd/MM/yyyy =====
const handleSubmit = async () => {
  if (!validate()) return;

  const data = {
    ...formData,
    entryDate: formatDMYSlash(formData.entryDate),
  };

  await service.create(data);
};

// ===== VÍ DỤ 2: Form nhập ngày dạng MM/dd/yyyy =====
const handleSubmit = async () => {
  if (!validate()) return;

  const data = {
    ...formData,
    birthDate: formatMDYSlash(formData.birthDate),
  };

  await service.create(data);
};

// ===== VÍ DỤ 3: Form nhập ngày dạng yyyy/MM/dd =====
const handleSubmit = async () => {
  if (!validate()) return;

  const data = {
    ...formData,
    productionDate: formatYMDSlash(formData.productionDate),
    importDate: formatYMDSlash(formData.importDate),
  };

  await service.create(data);
};

// ===== VÍ DỤ 4: Form nhập ngày dạng dd-MM-yyyy =====
const handleSubmit = async () => {
  if (!validate()) return;

  const data = {
    ...formData,
    startDate: formatDMYDash(formData.startDate),
    endDate: formatDMYDash(formData.endDate),
  };

  await service.create(data);
};
```

---

## ⚡ Ví dụ Full validate() cho PE

```js
const validate = () => {
  const newErrors = {};

  // Shoes Name: bắt buộc, max 100
  if (!formData.shoesName.trim()) {
    newErrors.shoesName = "Shoes name is required";
  } else if (formData.shoesName.trim().length > 100) {
    newErrors.shoesName = "Shoes name must not exceed 100 characters";
  }

  // Price: bắt buộc, số dương
  if (!formData.price) {
    newErrors.price = "Price is required";
  } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
    newErrors.price = "Price must be a positive number";
  }

  // Production Date < Import Date
  if (formData.productionDate && formData.importDate) {
    if (new Date(formData.productionDate) >= new Date(formData.importDate)) {
      newErrors.productionDate = "Production date must be before import date";
    }
  }

  // Category: bắt buộc
  if (!formData.categoryId) {
    newErrors.categoryId = "Category is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

---

## 📋 Bảng tham chiếu nhanh

| Rule              | Code snippet                                                  | Dùng cho                  |
| ----------------- | ------------------------------------------------------------- | -------------------------- |
| Required          | `!value.trim()`                                             | Text bắt buộc            |
| Required (number) | `!value`                                                    | Number/Dropdown bắt buộc |
| Max length        | `value.length > N`                                          | Text box                   |
| Min length        | `value.length < N`                                          | Password, username         |
| Positive number   | `isNaN(v) \|\| Number(v) <= 0`                                | Price, quantity            |
| Number range      | `Number(v) < min \|\| Number(v) > max`                        | Score, rating              |
| Integer           | `!Number.isInteger(Number(v))`                              | Quantity                   |
| Email             | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`                              | Email field                |
| Phone             | `/^[0-9]{10,11}$/`                                          | Phone field                |
| Date not future   | `new Date(v) > new Date()`                                  | Birthday                   |
| Date not past     | `new Date(v) < new Date()`                                  | Booking date               |
| Date compare      | `new Date(start) >= new Date(end)`                          | Date range                 |
| Date yyyy/MM/dd   | `/^\d{4}[\/\-](0[1-9]\|1[0-2])[\/\-](0[1-9]\|[12]\d\|3[01])$/` | Date text input            |
| Date yyyy/dd/MM   | `/^\d{4}[\/\-](0[1-9]\|[12]\d\|3[01])[\/\-](0[1-9]\|1[0-2])$/` | Date text input            |
| Date MM/dd/yyyy   | `/^(0[1-9]\|1[0-2])[\/\-](0[1-9]\|[12]\d\|3[01])[\/\-]\d{4}$/` | Date text input            |
| Date dd/MM/yyyy   | `/^(0[1-9]\|[12]\d\|3[01])[\/\-](0[1-9]\|1[0-2])[\/\-]\d{4}$/` | Date text input            |
| URL               | `/^https?:\/\/.+/`                                          | Website link               |
| No special chars  | `/^[a-zA-Z0-9\s]+$/`                                        | Username                   |
| Alphabetic        | `/^[a-zA-Z\s]+$/`                                           | Name field                 |
| Decimal 2 places  | `/^\d+(\.\d{1,2})?$/`                                       | Price                      |

---

> **💡 Tip:** Trong PE, thường chỉ cần **Required + Max Length + Dropdown Required**. Nếu có 2 date field thì thêm **Date Comparison**.
