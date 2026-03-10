# Students Management System

A full-stack CRUD application for managing students built with **React, TypeScript, TailwindCSS, NestJS, and PostgreSQL**.

This project was built as part of a full-stack assignment and demonstrates production-style architecture including validation, pagination, filtering, API documentation, and layered backend architecture.

---

# Live Demo

Frontend: https://students-management-beta.vercel.app

Backend API: https://students-management-44hd.onrender.com

github repo: https://github.com/dev-chandan-pandey/Students-Management

API Docs (Swagger):

```
/api
```

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* TailwindCSS
* React Hook Form
* Yup Validation
* Axios
* XLSX (Excel export)

## Backend

* NestJS
* TypeORM
* PostgreSQL
* DTO Validation
* Repository Pattern
* Swagger Documentation

## Infrastructure

Frontend Hosting: Vercel
Backend Hosting: Render
Database: Neon PostgreSQL

---

# Features

## Student Management

* View students in a table
* Add new student
* Edit student details
* Delete student with confirmation

## Form Validation

* Name required
* Email must be valid
* Age must be a number

Validation is implemented using:

* React Hook Form
* Yup
* NestJS DTO validation

---

# Advanced UI Features

* Search students by name or email
* Column sorting
* Pagination
* Excel export (full or filtered data)
* Loading state
* Empty state UI
* Row highlight effects

---

# Backend Features

* REST API with NestJS
* PostgreSQL database
* TypeORM ORM
* DTO validation
* Global error handling
* Pagination API
* Repository pattern architecture
* Swagger API documentation

---

# API Endpoints

GET

```
/students?page=1&limit=10
```

Returns paginated students.

POST

```
/students
```

Create student.

PATCH

```
/students/:id
```

Update student.

DELETE

```
/students/:id
```

Delete student.

---

# Project Structure

Frontend

```
src
 ├── components
 ├── pages
 ├── hooks
 ├── utils
 ├── types
 └── data
```

Backend

```
src
 ├── students
 │   ├── controller
 │   ├── service
 │   ├── repository
 │   └── entity
 ├── common
 │   └── filters
 └── app.module.ts
```

---

# Running Locally

## Backend

```
cd students-backend
npm install
npm run start:dev
```

## Frontend

```
cd students-frontend
npm install
npm run dev
```

---

# Architecture

```
React (Frontend)
       │
       │ Axios API Requests
       ▼
NestJS Backend
       │
       ▼
PostgreSQL Database
```

---

# Author

Built as part of a full-stack assignment demonstrating frontend and backend architecture using modern JavaScript frameworks.
