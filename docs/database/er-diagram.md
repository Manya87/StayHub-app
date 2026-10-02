# StayHub Entity-Relationship Diagram

This document illustrates the data architecture and relational structure across PostgreSQL tables in the **StayHub** property management ecosystem.

```mermaid
erDiagram
    USERS ||--o{ PROPERTIES : "owns / manages"
    USERS ||--o{ REFRESH_TOKENS : "issues"
    PROPERTIES ||--o{ ROOMS : "contains"
    ROOMS ||--o{ BEDS : "contains"
    PROPERTIES ||--o{ TENANTS : "houses"
    ROOMS ||--o{ TENANTS : "allocates"
    BEDS ||--o| TENANTS : "reserves"
    TENANTS ||--o{ DOCUMENTS : "provides"
    TENANTS ||--o{ PAYMENTS : "incurred by"
    PROPERTIES ||--o{ PAYMENTS : "credited to"
    PROPERTIES ||--o{ EXPENSES : "incurred by"
    TENANTS ||--o{ COMPLAINTS : "files"
    PROPERTIES ||--o{ COMPLAINTS : "belongs to"
    PROPERTIES ||--o{ MEAL_MENUS : "schedules"
    TENANTS ||--o{ MEAL_ATTENDANCES : "logs"
    PROPERTIES ||--o{ STAFF : "employs"
    USERS ||--o{ NOTIFICATIONS : "receives"

    USERS {
        VARCHAR id PK
        VARCHAR email UK
        VARCHAR password_hash
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR phone
        VARCHAR role
        BOOLEAN is_active
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    PROPERTIES {
        VARCHAR id PK
        VARCHAR owner_id FK
        VARCHAR name
        VARCHAR code UK
        TEXT address
        VARCHAR city
        VARCHAR state
        VARCHAR pincode
        VARCHAR contact_number
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    ROOMS {
        VARCHAR id PK
        VARCHAR property_id FK
        VARCHAR room_number
        INTEGER floor
        VARCHAR type
        INTEGER capacity
        NUMERIC base_rent
        BOOLEAN has_attached_bathroom
        BOOLEAN has_balcony
        BOOLEAN has_ac
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    BEDS {
        VARCHAR id PK
        VARCHAR room_id FK
        VARCHAR bed_number
        VARCHAR status
        NUMERIC monthly_rent
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    TENANTS {
        VARCHAR id PK
        VARCHAR property_id FK
        VARCHAR room_id FK
        VARCHAR bed_id FK
        VARCHAR first_name
        VARCHAR last_name
        VARCHAR email
        VARCHAR phone
        VARCHAR emergency_contact
        NUMERIC monthly_rent
        NUMERIC security_deposit
        DATE check_in_date
        DATE check_out_date
        VARCHAR status
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    DOCUMENTS {
        VARCHAR id PK
        VARCHAR tenant_id FK
        VARCHAR document_type
        VARCHAR document_number
        VARCHAR document_url
        VARCHAR verification_status
        TIMESTAMP created_at
    }

    PAYMENTS {
        VARCHAR id PK
        VARCHAR tenant_id FK
        VARCHAR property_id FK
        NUMERIC amount
        NUMERIC paid_amount
        VARCHAR payment_type
        VARCHAR payment_mode
        VARCHAR status
        VARCHAR transaction_reference
        DATE due_date
        TIMESTAMP payment_date
        TIMESTAMP created_at
    }

    EXPENSES {
        VARCHAR id PK
        VARCHAR property_id FK
        VARCHAR title
        VARCHAR category
        NUMERIC amount
        DATE expense_date
        VARCHAR paid_to
        VARCHAR receipt_url
        VARCHAR status
        TIMESTAMP created_at
    }

    COMPLAINTS {
        VARCHAR id PK
        VARCHAR property_id FK
        VARCHAR tenant_id FK
        VARCHAR title
        TEXT description
        VARCHAR category
        VARCHAR priority
        VARCHAR status
        TEXT resolution_notes
        TIMESTAMP resolved_at
        TIMESTAMP created_at
    }

    MEAL_MENUS {
        VARCHAR id PK
        VARCHAR property_id FK
        DATE menu_date
        VARCHAR meal_type
        TEXT items
        VARCHAR notes
        TIMESTAMP created_at
    }

    MEAL_ATTENDANCES {
        VARCHAR id PK
        VARCHAR property_id FK
        VARCHAR tenant_id FK
        DATE attendance_date
        VARCHAR meal_type
        BOOLEAN opted_in
        TIMESTAMP created_at
    }

    STAFF {
        VARCHAR id PK
        VARCHAR property_id FK
        VARCHAR full_name
        VARCHAR role
        VARCHAR phone
        VARCHAR email
        NUMERIC salary
        DATE join_date
        VARCHAR status
        TIMESTAMP created_at
    }

    NOTIFICATIONS {
        VARCHAR id PK
        VARCHAR user_id FK
        VARCHAR title
        TEXT message
        VARCHAR type
        BOOLEAN is_read
        TIMESTAMP created_at
    }
```

## Relational Key Design Rules
- **Referential Integrity**: All child relationships (`rooms`, `tenants`, `payments`, `expenses`, `complaints`, `staff`) enforce `ON DELETE CASCADE` or `RESTRICT` depending on operational safety.
- **Audit Columns**: All primary domain tables maintain `created_at` and `updated_at` audit timestamps.
- **UUID Identifiers**: UUID v4 strings (36 characters) provide decentralized ID generation avoiding key collisions across distributed deployments.
