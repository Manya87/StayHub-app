# Expenses API Reference

Base URL: `/api/v1/expenses`

Track and categorize operational property expenditures (maintenance, electricity, WiFi, housekeeping, repairs).

---

### 1. List Expenses (Paginated & Filterable)

- **URL**: `/api/v1/expenses`
- **Method**: `GET`
- **Query Parameters**:
  - `propertyId` (string, optional)
  - `category` (string, optional: `ELECTRICITY`, `WATER`, `WIFI`, `MAINTENANCE`, `SALARY`, `GROCERY`, `MISCELLANEOUS`)
  - `startDate` (ISO-8601 date, optional)
  - `endDate` (ISO-8601 date, optional)
  - `page` (integer, default: 0)
  - `size` (integer, default: 10)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "exp-901",
        "propertyId": "prop-101",
        "propertyName": "StayHub Silicon Heights",
        "title": "Commercial High-Speed Fiber Internet",
        "category": "WIFI",
        "amount": 4500.00,
        "expenseDate": "2026-03-01",
        "paidTo": "Airtel Broadband Ltd",
        "receiptUrl": "https://storage.stayhub.com/receipts/exp-901.pdf"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1
  }
}
```

---

### 2. Log New Expense

- **URL**: `/api/v1/expenses`
- **Method**: `POST`

#### Request Body
```json
{
  "propertyId": "prop-101",
  "title": "Commercial High-Speed Fiber Internet",
  "category": "WIFI",
  "amount": 4500.00,
  "expenseDate": "2026-03-01",
  "paidTo": "Airtel Broadband Ltd"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Expense recorded successfully",
  "data": {
    "id": "exp-901",
    "title": "Commercial High-Speed Fiber Internet",
    "amount": 4500.00
  }
}
```

---

### 3. Delete Expense

- **URL**: `/api/v1/expenses/{id}`
- **Method**: `DELETE`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Expense record deleted successfully"
}
```

---

### 4. Expense Categorical Breakdown

- **URL**: `/api/v1/expenses/stats`
- **Method**: `GET`
- **Query Parameters**:
  - `propertyId` (string, optional)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "totalExpenses": 68500.00,
    "byCategory": {
      "ELECTRICITY": 28000.00,
      "SALARY": 22000.00,
      "MAINTENANCE": 14000.00,
      "WIFI": 4500.00
    }
  }
}
```
