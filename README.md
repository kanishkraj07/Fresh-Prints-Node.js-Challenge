# 🛍️ Apparel Stock Management - REST API (Node.js + TypeScript)  

## 📌 Project Overview  
- Developed a **REST API** using **Node.js with TypeScript**.  
- Stored data in a **local JSON file** to ensure persistence across server restarts.  
- Implemented **four APIs** to manage stock updates and order processing.  
- Used **Vitest** for unit testing.  

---

## 🚀 Implemented APIs  

### 1️⃣ Update Stock (Single Apparel)  
- **Method:** `PUT`  
- **Endpoint:** `http://localhost:3000/api/v1/vendor/stock/update`  
- **Description:** Allows the vendor to update stock quantity and price for a single **apparel code & size**.  

### 2️⃣ Bulk Update Stock  
- **Method:** `PUT`  
- **Endpoint:** `http://localhost:3000/api/v1/vendor/stock/bulk-update`  
- **Description:** Enables the vendor to update stock **for multiple apparel codes and sizes** in a single request.  

### 3️⃣ Check Order Availability  
- **Method:** `POST`  
- **Endpoint:** `http://localhost:3000/api/v1/order/check`  
- **Description:** Verifies if the stock can fulfill a customer order based on available quantity.  

### 4️⃣ Calculate Minimum Cost for Order  
- **Method:** `POST`  
- **Endpoint:** `http://localhost:3000/api/v1/order/cost`  
- **Description:** Computes the **lowest possible cost** at which an order can be fulfilled.  

---

## 🛠️ Steps to Run the Application  

### 🚀 Start the Server  
1. Install dependencies:  
   ```sh
   npm install
