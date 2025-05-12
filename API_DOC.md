# 📚 Book Store API Documentation

مرحبًا بك في توثيق API الخاص بباك إند مشروع Book Store! 💡

---

## 🛠️ Authentication (تسجيل الدخول وتسجيل المستخدم)

### ✅ Register

* **Route:** `POST /register`
* **Description:** تسجيل مستخدم جديد
* **Request Body:**

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "123456"
}
```

* **Response:** توكن JWT + بيانات المستخدم

### ✅ Login

* **Route:** `POST /login`
* **Description:** تسجيل الدخول
* **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

* **Response:** توكن JWT + بيانات المستخدم

---

## 📚 Books API

### 📖 Get All Books

* **Route:** `GET /api/books`
* **Description:** جلب كل الكتب من قاعدة البيانات
* **Response:**

```json
[
  {
    "_id": "...",
    "title": "Book Title",
    "price": 10,
    "author": { ... }
  }
]
```

---

## 🛒 Cart API

### ➕ Add to Cart

* **Route:** `POST /cart`
* **Description:** إضافة كتاب إلى سلة المستخدم
* **Request Body:**

```json
{
  "bookId": "BOOK_ID",
  "quantity": 2
}
```

### 🧺 Get User Cart

* **Route:** `GET /cart`
* **Description:** جلب محتويات سلة المستخدم

### 🗑️ Remove Book

* **Route:** `DELETE /cart/:bookId`
* **Description:** حذف كتاب واحد من السلة

### ❌ Clear Cart

* **Route:** `PUT /cart-clear`
* **Description:** حذف كل محتويات السلة

---

## 📦 Orders API

### 🧾 Create Order

* **Route:** `POST /order`
* **Description:** إنشاء طلب من سلة المشتريات (Pending)

### 📑 Get My Orders

* **Route:** `GET /my-orders`
* **Description:** جلب الطلبات الخاصة بالمستخدم

---

## 💳 Stripe Payment API

### 💰 Create Checkout Session

* **Route:** `POST /create-checkout-session`
* **Description:** إنشاء رابط دفع باستخدام Stripe بناءً على سلة المستخدم
* **Response:**

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

---

## 🧠 Middleware & Errors

* أي طلب غير معروف يتم معالجته بـ `Not Found 😅`
* الأخطاء تتم معالجتها بـ `errorHandler`

---

## 🔐 Authorization

* معظم الراوتات تتطلب توكن JWT يتم تمريره في الهيدر:

```
Authorization: Bearer TOKEN_HERE
```

---

> تم تنفيذ هذا المشروع باستخدام **Node.js + MongoDB + Stripe + JWT + EJS** من قبل روزانة شقورة.
