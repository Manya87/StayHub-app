# Local Development Guide

This guide walks you through setting up and running the complete **StayHub** platform locally.

---

## 1. Prerequisites

Ensure you have the following installed on your host machine:
- **Git**: `git --version` (>= 2.30)
- **Node.js**: `node --version` (>= 20.x) & `npm` (>= 10.x)
- **Java**: `java --version` (Java 21 LTS - e.g., Eclipse Temurin or Amazon Corretto)
- **Maven**: `mvn --version` (>= 3.9)
- **Docker & Docker Compose**: `docker compose version` (Docker Desktop 4.x+)

---

## 2. Quickstart with Docker Compose (Recommended)

The easiest way to spin up the complete ecosystem (Database, Cache, Backend, Gateway, Frontend) is using root Docker Compose.

```bash
# 1. Clone repository
git clone https://github.com/your-org/stayhub.git
cd stayhub/StayHub-app

# 2. Copy root environment template
cp .env.example .env

# 3. Build and launch all services
docker compose up --build
```

### Services & Port Mapping

| Service | Port | Description |
| :--- | :--- | :--- |
| **Frontend** | `http://localhost:5173` | React 18 + Vite Web Application |
| **API Gateway** | `http://localhost:8080` | Spring Cloud Gateway (Unified ingress) |
| **Backend API** | `http://localhost:8081` | Spring Boot 3.3.4 REST API Service |
| **PostgreSQL** | `localhost:5432` | Postgres 16 with preconfigured schemas |
| **Redis** | `localhost:6379` | In-memory cache & session store |
| **Swagger UI** | `http://localhost:8081/swagger-ui.html` | Interactive OpenAPI 3 explorer |

---

## 3. Running Services Independently for Development

If you prefer hot-reloading frontend code and fast debugging backend code in your IDE (IntelliJ IDEA / VS Code / Antigravity):

### Step 1: Start PostgreSQL and Redis Only
```bash
docker compose up -d postgres redis
```

### Step 2: Start Spring Boot Backend
```bash
cd backend
mvn clean spring-boot:run -Dspring-boot.run.profiles=dev
```
- Flyway automatically applies all database migrations (`V1` to `V10`).
- Backend listens on `http://localhost:8081`.

### Step 3: Start Spring Cloud Gateway
```bash
cd gateway
mvn clean spring-boot:run
```
- Gateway listens on `http://localhost:8080` and proxies `/api/**` to backend port 8081.

### Step 4: Start Frontend Development Server
```bash
cd frontend
npm install
npm run dev
```
- Vite hot-reloading dev server runs on `http://localhost:5173`.
- Proxies requests to API Gateway at `http://localhost:8080`.

---

## 4. Running Backend & Frontend Tests

### Backend Unit Tests
```bash
cd backend
mvn clean test
```

### Frontend Typecheck & Build Validation
```bash
cd frontend
npm run typecheck
npm run build
```
