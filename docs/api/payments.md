# Payments API Reference

Base URL: `/api/v1/payments`

Manage rent invoices, security deposits, payment status, receipts, and revenue reconciliation.

---

### 1. List Payments (Paginated & Filterable)

- **URL**: `/api/v1/payments`
- **Method**: `GET`
- **Query Parameters**:
  - `propertyId` (string, optional)
  - `tenantId` (string, optional)
  - `status` (string, optional: `PAID`, `PENDING`, `OVERDUE`, `PARTIAL`, `FAILED`)
  - `page` (integer, default: 0)
  - `size` (integer, default: 10)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "pay-801",
        "tenantId": "tenant-301",
        "tenantName": "Rohan Sharma",
        "propertyId": "prop-101",
        "propertyName": "StayHub Silicon Heights",
        "amount": 8500.00,
        "paidAmount": 8500.00,
        "paymentType": "RENT",
        "paymentMode": "UPI",
        "status": "PAID",
        "transactionReference": "UPI/20260305/982341",
        "dueDate": "2026-03-05",
        "paymentDate": "2026-03-04T10:15:30"
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

### 2. Record / Ingest Payment

- **URL**: `/api/v1/payments`
- **Method**: `POST`

#### Request Body
```json
{
  "tenantId": "tenant-301",
  "propertyId": "prop-101",
  "amount": 8500.00,
  "paidAmount": 8500.00,
  "paymentType": "RENT",
  "paymentMode": "BANK_TRANSFER",
  "status": "PAID",
  "transactionReference": "NEFT/20260401/887612",
  "dueDate": "2026-04-05",
  "paymentDate": "2026-04-03"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Payment recorded successfully",
  "data": {
    "id": "pay-802",
    "amount": 8500.00,
    "status": "PAID"
  }
}
```

---

### 3. Update Payment Status

- **URL**: `/api/v1/payments/{id}/status`
- **Method**: `PUT`

#### Request Body
```json
{
  "status": "PAID",
  "transactionReference": "MANUAL/CASH/REC-092"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Payment status updated successfully"
}
```

---

### 4. Financial Revenue Analytics

- **URL**: `/api/v1/payments/stats`
- **Method**: `GET`
- **Query Parameters**:
  - `propertyId` (string, optional)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "totalCollected": 425000.00,
    "totalPending": 34000.00,
    "totalOverdue": 17000.00,
    "collectionRate": 92.6
  }
}
```
