-- StayHub PostgreSQL Initialization Script
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ensure user database permissions
GRANT ALL PRIVILEGES ON DATABASE stayhub_db TO stayhub_admin;
