# Properties API Reference

Base URL: `/api/v1/properties`

Manage hostels, PG buildings, and co-living properties. All endpoints require authentication (`Bearer <token>`).

---

### 1. List Properties (Paginated)

Retrieves all properties owned or managed by the authenticated user.

- **URL**: `/api/v1/properties`
- **Method**: `GET`
- **Query Parameters**:
  - `page` (integer, default: 0)
  - `size` (integer, default: 10)
  - `search` (string, optional)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "prop-101",
        "name": "StayHub Silicon Heights",
        "code": "SH-BLR-01",
        "address": "120 5th Main, Indiranagar",
        "city": "Bengaluru",
        "state": "Karnataka",
        "pincode": "560038",
        "contactNumber": "+918023456789",
        "status": "ACTIVE",
        "totalRooms": 24,
        "totalBeds": 48,
        "occupiedBeds": 42
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 1,
    "totalPages": 1,
    "last": true
  }
}
```

---

### 2. Get Property Details

Retrieves detailed information for a specific property.

- **URL**: `/api/v1/properties/{id}`
- **Method**: `GET`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "id": "prop-101",
    "name": "StayHub Silicon Heights",
    "code": "SH-BLR-01",
    "address": "120 5th Main, Indiranagar",
    "city": "Bengaluru",
    "state": "Karnataka",
    "pincode": "560038",
    "contactNumber": "+918023456789",
    "status": "ACTIVE"
  }
}
```

---

### 3. Create Property

Creates a new property entry.

- **URL**: `/api/v1/properties`
- **Method**: `POST`

#### Request Body
```json
{
  "name": "StayHub Silicon Heights",
  "code": "SH-BLR-01",
  "address": "120 5th Main, Indiranagar",
  "city": "Bengaluru",
  "state": "Karnataka",
  "pincode": "560038",
  "contactNumber": "+918023456789",
  "status": "ACTIVE"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Property created successfully",
  "data": {
    "id": "prop-101",
    "name": "StayHub Silicon Heights",
    "code": "SH-BLR-01",
    "city": "Bengaluru"
  }
}
```

---

### 4. Update Property

Modifies details of an existing property.

- **URL**: `/api/v1/properties/{id}`
- **Method**: `PUT`

#### Request Body
```json
{
  "name": "StayHub Silicon Heights (Tower A)",
  "contactNumber": "+918099887766",
  "status": "ACTIVE"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Property updated successfully",
  "data": {
    "id": "prop-101",
    "name": "StayHub Silicon Heights (Tower A)"
  }
}
```

---

### 5. Delete Property

Deactivates or deletes an existing property.

- **URL**: `/api/v1/properties/{id}`
- **Method**: `DELETE`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Property deleted successfully"
}
```

---

### 6. Get Occupancy Analytics

Returns room and bed occupancy statistics for a property.

- **URL**: `/api/v1/properties/{id}/occupancy`
- **Method**: `GET`

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "propertyId": "prop-101",
    "totalBeds": 48,
    "occupiedBeds": 42,
    "availableBeds": 6,
    "occupancyRate": 87.5
  }
}
```
