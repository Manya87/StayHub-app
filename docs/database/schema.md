# Database Schema Reference

### 1. `users`
- `id` (VARCHAR(36), PK)
- `email` (VARCHAR(100), UNIQUE)
- `password_hash` (VARCHAR(255))
- `first_name` (VARCHAR(50))
- `last_name` (VARCHAR(50))
- `phone` (VARCHAR(20))
- `role` (VARCHAR(30))
- `is_active` (BOOLEAN)

### 2. `properties`
- `id` (VARCHAR(36), PK)
- `owner_id` (FK -> users.id)
- `name` (VARCHAR(150))
- `code` (VARCHAR(50), UNIQUE)
- `address` (TEXT)
- `city`, `state`, `pincode` (VARCHAR)
- `contact_number` (VARCHAR(25))
- `status` (VARCHAR(30))

### 3. `rooms`
- `id` (VARCHAR(36), PK)
- `property_id` (FK -> properties.id)
- `room_number` (VARCHAR(30))
- `floor` (INTEGER)
- `type` (VARCHAR(30))
- `capacity` (INTEGER)
- `base_rent` (NUMERIC(10,2))
- `has_attached_bathroom`, `has_balcony`, `has_ac` (BOOLEAN)

### 4. `beds`
- `id` (VARCHAR(36), PK)
- `room_id` (FK -> rooms.id)
- `bed_number` (VARCHAR(30))
- `status` (VARCHAR(30) -> AVAILABLE, OCCUPIED, MAINTENANCE)
- `monthly_rent` (NUMERIC(10,2))

### 5. `tenants`
- `id` (VARCHAR(36), PK)
- `property_id` (FK -> properties.id)
- `room_id` (FK -> rooms.id)
- `bed_id` (FK -> beds.id)
- `first_name`, `last_name` (VARCHAR(50))
- `email`, `phone`, `emergency_contact`
- `monthly_rent`, `security_deposit` (NUMERIC)
- `check_in_date`, `check_out_date` (DATE)
- `status` (VARCHAR(30) -> ACTIVE, NOTICE_PERIOD, CHECKED_OUT)

### 6. `payments`
- `id` (VARCHAR(36), PK)
- `tenant_id` (FK -> tenants.id)
- `property_id` (FK -> properties.id)
- `amount`, `paid_amount` (NUMERIC)
- `payment_type`, `mode`, `status`
- `transaction_reference`, `payment_date`, `due_date`

### 7. `expenses`
- `id` (VARCHAR(36), PK)
- `property_id` (FK -> properties.id)
- `title`, `category`, `amount`, `expense_date`, `paid_to`

### 8. `complaints`
- `id` (VARCHAR(36), PK)
- `property_id`, `tenant_id`
- `title`, `description`, `category`, `priority`, `status`

### 9. `meals` & `mess_attendance`
- Daily menus and attendance counters per property.
