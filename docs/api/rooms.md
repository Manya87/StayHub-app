# Rooms & Beds API Reference

Base URL: `/api/v1/rooms` and `/api/v1/beds`

Manage rooms, layouts, amenities, and bed allocations within properties.

---

### 1. List Rooms for Property

- **URL**: `/api/v1/rooms`
- **Method**: `GET`
- **Query Parameters**:
  - `propertyId` (string, required)
  - `floor` (integer, optional)
  - `type` (string, optional: `SINGLE`, `DOUBLE`, `TRIPLE`, `FOUR_SHARING`, `DORMITORY`)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": [
    {
      "id": "room-201",
      "propertyId": "prop-101",
      "roomNumber": "101",
      "floor": 1,
      "type": "DOUBLE",
      "capacity": 2,
      "baseRent": 8500.00,
      "hasAttachedBathroom": true,
      "hasBalcony": false,
      "hasAc": true,
      "beds": [
        {
          "id": "bed-01",
          "bedNumber": "101-A",
          "status": "OCCUPIED",
          "monthlyRent": 8500.00
        },
        {
          "id": "bed-02",
          "bedNumber": "101-B",
          "status": "AVAILABLE",
          "monthlyRent": 8500.00
        }
      ]
    }
  ]
}
```

---

### 2. Create Room

- **URL**: `/api/v1/rooms`
- **Method**: `POST`

#### Request Body
```json
{
  "propertyId": "prop-101",
  "roomNumber": "102",
  "floor": 1,
  "type": "DOUBLE",
  "capacity": 2,
  "baseRent": 9000.00,
  "hasAttachedBathroom": true,
  "hasBalcony": true,
  "hasAc": true
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Room created successfully",
  "data": {
    "id": "room-202",
    "roomNumber": "102",
    "capacity": 2
  }
}
```

---

### 3. Add Bed to Room

- **URL**: `/api/v1/rooms/{roomId}/beds`
- **Method**: `POST`

#### Request Body
```json
{
  "bedNumber": "102-A",
  "status": "AVAILABLE",
  "monthlyRent": 9000.00
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "Bed added successfully",
  "data": {
    "id": "bed-03",
    "bedNumber": "102-A",
    "status": "AVAILABLE",
    "monthlyRent": 9000.00
  }
}
```

---

### 4. Update Bed Status

- **URL**: `/api/v1/beds/{bedId}/status`
- **Method**: `PUT`

#### Request Body
```json
{
  "status": "MAINTENANCE"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Bed status updated successfully"
}
```
