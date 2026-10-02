CREATE TABLE IF NOT EXISTS meal_plans (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    monthly_price NUMERIC(10, 2) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS meals (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    day_of_week VARCHAR(20) NOT NULL,
    breakfast TEXT,
    lunch TEXT,
    snacks TEXT,
    dinner TEXT
);

CREATE TABLE IF NOT EXISTS mess_attendance (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    attendance_date DATE NOT NULL,
    breakfast_count INTEGER NOT NULL DEFAULT 0,
    lunch_count INTEGER NOT NULL DEFAULT 0,
    dinner_count INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT uq_mess_attendance_date UNIQUE (property_id, attendance_date)
);

CREATE TABLE IF NOT EXISTS staff (
    id VARCHAR(36) PRIMARY KEY,
    property_id VARCHAR(36) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    salary NUMERIC(10, 2) NOT NULL,
    shift VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    joining_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
