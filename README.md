# Nestly - Server Side 🛠️
**Backend of BasaFinder (Smart Rental & Housing Solution)**  
Built with **Node.js + Express + MongoDB**

## 📘 Overview
Nestly backend is a secure and RESTful API server handling **authentication**, **role-based access**, **rental house data**, **rental requests**, and **admin management**.

## 🔐 Authentication
- JWT-based authentication system
- Password hashing using `bcrypt`
- Role-based middleware: Admin, Landlord, Tenant

## 🧠 Features by Role

### 👮 Admin
- Manage all users and listings
- Modify user roles
- Moderate rental posts

### 🏠 Landlord
- Create/update/delete rental listings
- Approve/reject rental requests
- Provide contact details after approval

### 👤 Tenant
- Search listings
- Submit rental requests
- Make payment if request approved

---

## 🧱 Collections (MongoDB)

### 🔹 Users
- name, email, phone, hashed password, role (admin, landlord, tenant)

### 🔹 Listings
- location, description, rent, bedrooms, images, landlord ID, amenities

### 🔹 Requests
- tenant ID, listing ID, status, payment status, contact number (if approved)

---


## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (No Mongoose)**
- **JWT** for Authentication
- **bcrypt** for Password Hashing

---

```bash
git clone https://github.com/isaiful508/nestly-server.git
cd nestly/server

npm install
# or
yarn install
cp .env.example .env

npm run start:dev