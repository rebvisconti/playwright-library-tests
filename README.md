# 📚 Biblioteca – End-to-End Test Automation

Automated end-to-end testing project for a **Library Management System**, developed with **Playwright** and focused on real-world QA practices, reliability, and clean test architecture.

This project was created as part of my learning journey as a **Quality Assurance professional**, applying both technical skills and a strong QA mindset.

---

## 🚀 Technologies & Tools

* **Playwright** – End-to-End test automation
* **JavaScript (ES6+)**
* **Page Object Model (POM)** – Test organization and reusability
* **Helpers** – Reusable utilities (dialogs/alerts handling)
* **HTML5 validations**
* **Git & GitHub** – Version control

---

## 🧠 QA Concepts Applied

* End-to-end (E2E) testing
* Positive and negative scenarios
* Business rule validation
* HTML5 form validations
* Route protection testing
* Dialog and alert handling
* Clean test structure and naming conventions

---

## 🧪 Test Scenarios Covered

### 🔐 Authentication

* Login successfully
* Login with invalid credentials
* Logout from the system
* Route protection validation

### 📝 Registration

* Complete registration flow
* Invalid password validation
* Short password validation

### 📚 Books Management

* Add new book
* Mandatory field validation
* View book details
* Delete book with confirmation
* Cancel delete book

### ❤️ Favorites

* Add book to favorites
* List favorite books
* Remove book from favorites

### 📊 Dashboard & Navigation

* View dashboard with statistics
* Screen navigation validation

---

## 🏗️ Project Structure

```
├── helpers
│   └── capturarAlert.js
├── POM
│   ├── login.js
│   ├── register.js
│   ├── bookspage.js
│   └── bookdetailspage.js
├── tests
│   ├── login.spec.js
│   ├── register.spec.js
│   ├── books.spec.js
│   └── favorites.spec.js
├── playwright.config.js
└── README.md


## 🌱 Learning Highlights

This project helped me:

* Improve test automation skills
* Write more reliable and readable tests
* Understand application behavior deeply
* Think beyond "tests passing" and focus on **software quality**

It represents continuous learning, practice, and growth as a QA professional.

---

## 👩‍💻 Author

**Rebeca Visconti**
Quality Assurance | Software Testing | Test Automation

---

## 📌 Notes

This is a learning-focused project. Improvements and refactoring are part of the continuous evolution process.
