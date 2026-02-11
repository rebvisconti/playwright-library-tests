## 📚 Library Management – UI & API Test Automation
Automated UI and API test project for a Library Management System, built with **Playwright** using modern test architecture and real-world QA practices.
This project was developed as part of a mentorship program and served as the base application for building and validating automated test suites, focusing on:
* Real-world business scenarios
* Role-based access control
* UI + API integration
* Clean and maintainable test design

## 🔗 Repository:
https://github.com/rebvisconti/playwright-library-tests

---

## 🚀 Tech Stack
* **Playwright**
* **JavaScript (ES6+)**
* **Node.js**
* **Page Object Model (POM)**
* **Service Layer Pattern (API Helpers)**
* HTML5 Validations
* Git & GitHub

---

## 🧠 QA Concepts Applied
* End-to-End (E2E) Testing
* API Testing
* Positive and Negative Scenarios
* Business Rule Validation
* Route Protection
* Role-based behavior validation
* Test Data Isolation
* Clean Architecture & Separation of Concerns
* Reusable automation components

---

## 🏗️ Project Architecture
The project is structured to separate UI and API concerns clearly.

```
PLAYWRIGHT-LIBRARY-TESTS
│
├── helpers/                # API service layer
│   ├── book.api.js
│   ├── usuario.api.js
│   └── capturarAlert.js
│
├── POM/                    # Page Object Model (UI abstraction)
│   ├── loginpage.js
│   ├── registerpage.js
│   ├── bookspage.js
│   ├── bookdetailspage.js
│   ├── dashboardpage.js
│   ├── favoritepage.js
│   └── headerpage.js
│
├── tests/
│   ├── api/                # API test suite
│   │   ├── books-api.spec.js
│   │   ├── dashboard-api.spec.js
│   │   ├── favorites-api.spec.js
│   │   └── users-api.spec.js
│   │
│   ├── ui-auth/
│   ├── ui-books/
│   ├── ui-dashboard/
│   ├── ui-favorites/
│   └── ui-navigation/
│
├── playwright.config.js
└── README.md
```
---

## 🧪 Test Coverage
### 🔐 Authentication (UI)
* Successful login
* Invalid credentials validation
* Logout flow
* Route protection

### 📝 Registration (UI)
* Successful registration
* Password policy validation
* Short password validation

### 📚 Books Management
UI
* Add new book
* Mandatory field validation
* View book details
* Delete book
* Cancel delete action

### API
* Create book
* Update book
* Delete book
* List books
* Get book by ID

### ❤️ Favorites
### UI
* Add book to favorites
* List favorite books
* Remove from favorites
### API
* Add to favorites
* Remove from favorites
* List favorites by user
## 📊 Dashboard
### UI
* View statistics dashboard
### API
* Retrieve system statistics

---

## ⚙️ Pre requisites
Make sure you have installed:
* Node.js (v18+ recommended)
* npm
* The backend running locally at:
```
http://localhost:3000
```

---

## 📥 Clone the Project
```
git clone https://github.com/rebvisconti/playwright-library-tests.git
cd playwright-library-tests
```
---

## 📦 Install Dependencies
```
npm install
Install Playwright browsers:
npx playwright install
```
---

## ▶️ Run the Tests
**Run all tests**
```
npx playwright test
```
**Run only API tests**
```
npx playwright test tests/api
```
**Run only UI tests**
```
npx playwright test tests/ui-*
```
**Run a specific test file**
```
npx playwright test tests/api/books-api.spec.js
```

---

## 📊 Test Report
After execution:
```
npx playwright show-report
```

---

## 🏛️ Design Decisions
✔ Separation of UI and API layers

✔ Page Object Model for UI maintainability

✔ Service layer abstraction for API

✔ Base URL configured in playwright.config.js

✔ Independent tests with controlled test data

✔ Clean naming conventions and scalable structure

This structure allows easy expansion and CI/CD integration.

---

## 🌱 Professional Growth
This project strengthened my ability to:
* Architect scalable automation frameworks
* Combine UI and API automation in a single project
* Apply real QA strategy beyond “tests passing”
* Design maintainable and reusable test structures
* Think critically about system behavior and risk

---

## 👩‍💻 Author
**Rebeca Visconti**
Quality Assurance | Test Automation

GitHub: @rebvisconti

https://github.com/rebvisconti

LinkedIn:

https://www.linkedin.com/in/rebecavisconti/

---

## 📌 Note
This is a study-driven project built to simulate real-world QA practices within a mentorship program.
Continuous refactoring and improvements reflect ongoing professional growth.

