# Tenants API Reference

Base URL: `/api/v1/tenants`

Manage onboarding, bed allocation, KYC verification, lease dates, and checkout workflows for tenants.

---

### 1. List Tenants (Paginated & Filterable)

- **URL**: `/api/v1/tenants`
- **Method**: `GET`
- **Query Parameters**:
  - `propertyId` (string, optional)
  - `status` (string, optional: `ACTIVE`, `NOTICE_PERIOD`, `CHECKED_OUT`)
  - `search` (string, optional)
  - `page` (integer, default: 0)
  - `size` (integer, default: 10)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "tenant-301",
        "firstName": "Rohan",
        "lastName": "Sharma",
        "email": "rohan.sharma@example.com",
        "phone": "+919876543210",
        "emergencyContact": "+919876543211",
        "propertyId": "prop-101",
        "propertyName": "StayHub Silicon Heights",
        "roomNumber": "101",
        "bedNumber": "101-A",
        "monthlyRent": 8500.00,
        "securityDeposit": 17000.00,
        "checkInDate": "2026-01-15",
        "status": "ACTIVE"
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

### 2. Onboard New Tenant

Enrolls a tenant and marks the assigned bed as `OCCUPIED`.

- **URL**: `/api/v1/tenants`
- **Method**: `POST`

#### Request Body
```json
{
  "propertyId": "prop-101",
  "roomId": "room-201",
  "bedId": "bed-02",
  "firstName": "Priya",
  "lastName": "Nair",
  "email": "priya.nair@example.com",
  "phone": "+919123456780",
  "emergencyContact": "+919123456789",
  "monthlyRent": 8500.00,
  "securityDeposit": 17000.00,
  "checkInDate": "2026-03-01"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Tenant onboarded successfully",
  "data": {
    "id": "tenant-302",
    "firstName": "Priya",
    "lastName": "Nair",
    "status": "ACTIVE"
  }
}
```

---

### 3. Check-Out Tenant

Processes tenant exit, vacates the bed, and calculates deposit settlement.

- **URL**: `/api/v1/tenants/{id}/checkout`
- **Method**: `POST`

#### Request Body
```json
{
  "checkOutDate": "2026-09-30",
  "deductions": 1500.00,
  "remarks": "Cleaning & minor wall repaint deductions"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Tenant checked out successfully",
  "data": {
    "tenantId": "tenant-301",
    "status": "CHECKED_OUT",
    "refundableDeposit": 15500.00
  }
}
```

---

### 4. Upload Tenant Document

- **URL**: `/api/v1/tenants/{id}/documents`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`

#### Form Parameters
- `file`: Binary file (PDF, PNG, JPEG)
- `type`: `AADHAAR`, `PASSPORT`, `DRIVING_LICENSE`, `COLLEGE_ID`, `EMPLOYMENT_LETTER`
- `documentNumber`: Identifier string

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Document uploaded and verified",
  "data": {
    "id": "doc-501",
    "documentType": "AADHAAR",
    "verificationStatus": "VERIFIED",
    "documentUrl": "https://storage.stayhub.com/documents/tenants/301/aadhaar.pdf"
  }
}
```
