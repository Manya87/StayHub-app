# Authentication API Reference

Base URL: `/api/v1/auth`

Authentication uses JSON Web Tokens (JWT). All secured endpoints require the `Authorization: Bearer <token>` header.

---

### 1. Register User

Creates a new owner or admin account.

- **URL**: `/api/v1/auth/register`
- **Method**: `POST`
- **Auth Required**: No

#### Request Body
```json
{
  "email": "owner@stayhub.com",
  "password": "SecurePassword123!",
  "firstName": "Alex",
  "lastName": "Rivera",
  "phone": "+14155552671",
  "role": "OWNER"
}
```

#### Success Response (`201 Created`)
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "tokenType": "Bearer",
    "expiresIn": 86400000,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "owner@stayhub.com",
      "firstName": "Alex",
      "lastName": "Rivera",
      "phone": "+14155552671",
      "role": "OWNER",
      "isActive": true
    }
  }
}
```

---

### 2. Login

Authenticates user credentials and returns tokens.

- **URL**: `/api/v1/auth/login`
- **Method**: `POST`
- **Auth Required**: No

#### Request Body
```json
{
  "email": "owner@stayhub.com",
  "password": "SecurePassword123!"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "tokenType": "Bearer",
    "expiresIn": 86400000,
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "owner@stayhub.com",
      "firstName": "Alex",
      "lastName": "Rivera",
      "phone": "+14155552671",
      "role": "OWNER",
      "isActive": true
    }
  }
}
```

---

### 3. Refresh Access Token

Exchanges an active refresh token for a newly signed access token.

- **URL**: `/api/v1/auth/refresh`
- **Method**: `POST`
- **Auth Required**: No

#### Request Body
```json
{
  "refreshToken": "7c9e6679-7425-40de-944b-e07fc1f90ae7"
}
```

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "9d8e7768-6314-49ab-833a-d16eb0e89bf6",
    "tokenType": "Bearer",
    "expiresIn": 86400000
  }
}
```

---

### 4. Get Current User Profile

Retrieves the authenticated user's profile details.

- **URL**: `/api/v1/auth/me`
- **Method**: `GET`
- **Auth Required**: Yes (`Bearer <token>`)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "owner@stayhub.com",
    "firstName": "Alex",
    "lastName": "Rivera",
    "phone": "+14155552671",
    "role": "OWNER",
    "isActive": true
  }
}
```

---

### 5. Logout

Revokes the refresh token and invalidates user session.

- **URL**: `/api/v1/auth/logout`
- **Method**: `POST`
- **Auth Required**: Yes (`Bearer <token>`)

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
