# STAYHUB — Hostel, PG & Co-Living Property Management Platform

<p align="center">
  <img src="frontend/public/logo.svg" alt="StayHub Logo" width="120" height="120" />
</p>

<p align="center">
  <strong>An enterprise-grade, cloud-native monorepo platform designed for student hostels, PG accommodations, and co-living communities.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-21_LTS-orange.svg" alt="Java 21" />
  <img src="https://img.shields.io/badge/Spring_Boot-3.3.4-brightgreen.svg" alt="Spring Boot 3.3" />
  <img src="https://img.shields.io/badge/React-18.3-blue.svg" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5.4-purple.svg" alt="Vite" />
  <img src="https://img.shields.io/badge/TypeScript-5.5-blue.svg" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue.svg" alt="PostgreSQL 16" />
  <img src="https://img.shields.io/badge/Redis-7.2-red.svg" alt="Redis 7" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED.svg" alt="Docker Ready" />
</p>

---

## 📑 Table of Contents
1. [Platform Overview](#-platform-overview)
2. [Monorepo Directory Structure](#-monorepo-directory-structure)
3. [Technology Stack](#-technology-stack)
4. [Architectural Flow — How Everything Connects](#-architectural-flow--how-everything-connects)
5. [Getting Started & Local Development](#-getting-started--local-development)
6. [Docker Orchestration](#-docker-orchestration)
7. [Database & Migrations](#-database--migrations)
8. [API Documentation](#-api-documentation)
9. [Infrastructure & Cloud Deployment](#-infrastructure--cloud-deployment)
10. [CI/CD Automation](#-cicd-automation)

---

## 🌟 Platform Overview

**StayHub** solves the operational friction in property hospitality by uniting tenant onboarding, room & bed allocation, digital KYC records, automated rent billing, expense auditing, mess/dining management, staff payroll, and maintenance ticketing under a unified modern dashboard.

### Core Capabilities
- **Multi-Property Hierarchy**: Manage portfolios across cities with granular Property -> Floor -> Room -> Bed granularity.
- **Tenant Lifecycle**: Digital KYC upload, check-in, bed assignment, lease agreements, and deposit settlement upon check-out.
- **Financial Engine**: Automated rent generation, multi-mode payment tracking (UPI, Cards, Bank Transfer, Cash), overdue alerts, and operating expense breakdown.
- **Mess & Kitchen Operations**: Daily menus, meal opt-in/opt-out counters, and kitchen budgeting.
- **Helpdesk & Maintenance**: Priority-based complaint tickets, assignments, and resolution notes.
- **Staff Administration**: Role-based employee directory and payroll logs.

---

## 🗂️ Monorepo Directory Structure

```
STAYHUB/
│
├── README.md                           # Main repository documentation
├── .gitignore                          # Global git ignores
├── .env.example                        # Monorepo environment configuration template
├── docker-compose.yml                  # Root multi-container orchestration
├── package.json                        # Root helper scripts
│
├── frontend/                           # React 18 + Vite + TypeScript Web Application
│   ├── public/                         # Static assets (logo.svg, favicon)
│   ├── src/
│   │   ├── assets/                     # Images, icons, and fonts
│   │   ├── components/
│   │   │   ├── ui/                     # 15 Reusable UI components (Button, Input, Modal, Table...)
│   │   │   ├── layout/                 # Sidebar, Header, MobileNav, PageContainer, AppLayout
│   │   │   └── common/                 # SearchBar, DatePicker, FilterBar, FileUpload, LoadingScreen
│   │   ├── features/                   # 11 Modular domain features
│   │   │   ├── auth/                   # Login, register, profile
│   │   │   ├── dashboard/              # Metrics, occupancy charts, revenue stats
│   │   │   ├── properties/             # Property lists, cards, form modal
│   │   │   ├── rooms/                  # Floor plans, room lists, bed status badges
│   │   │   ├── tenants/                # Tenant list, onboarding modal, KYC documents
│   │   │   ├── payments/               # Payment table, record modal, receipts
│   │   │   ├── expenses/               # Expense log, category breakdowns
│   │   │   ├── complaints/             # SLA ticket tracking, status updates
│   │   │   ├── mess/                   # Meal schedules, tenant attendance opt-in
│   │   │   ├── staff/                  # Staff directory and attendance
│   │   │   └── reports/                # Financial and occupancy analytics
│   │   ├── hooks/                      # Custom hooks (useDebounce, usePagination, useModal)
│   │   ├── store/                      # Zustand state stores (authStore, propertyStore, uiStore)
│   │   ├── services/                   # Axios client, auth/property/tenant/payment API services
│   │   ├── types/                      # Common, User, API TypeScript interfaces
│   │   ├── utils/                      # Currency formatters, date utilities, validators
│   │   ├── pages/                      # Page route views
│   │   ├── routes/                     # React Router 6, ProtectedRoute, AppRoutes
│   │   ├── index.css                   # Tailwind CSS & Glassmorphism design tokens
│   │   ├── App.tsx                     # Top-level React App
│   │   └── main.tsx                    # React DOM entry point
│   ├── Dockerfile                      # Multi-stage production Nginx container
│   ├── nginx.conf                      # SPA routing and reverse-proxy config
│   ├── tailwind.config.ts              # Tailwind design system configuration
│   └── vite.config.ts                  # Vite build and proxy configuration
│
├── backend/                            # Spring Boot 3.3.4 (Java 21 LTS) REST API
│   ├── src/main/java/com/stayhub/
│   │   ├── common/                     # Global constants, enums, ApiResponse, PageResponse
│   │   ├── config/                     # Security, CORS, Redis, S3, JPA, OpenAPI configs
│   │   ├── exception/                  # GlobalExceptionHandler, Custom domain exceptions
│   │   ├── security/                   # JwtService, JwtFilter, CustomUserDetailsService
│   │   ├── domain/                     # Layered domain modules (Entity, Repo, Service, DTO, Controller)
│   │   │   ├── auth/                   # User authentication & token management
│   │   │   ├── property/               # Property portfolio management
│   │   │   ├── room/                   # Rooms & floor layouts
│   │   │   ├── bed/                    # Bed allocations & inventory
│   │   │   ├── tenant/                 # Tenant lifecycle & onboarding
│   │   │   ├── document/               # KYC document verification & S3 uploads
│   │   │   ├── payment/                # Invoicing, payments, and receipts
│   │   │   ├── expense/                # Categorized operational expenses
│   │   │   ├── complaint/              # Maintenance ticketing
│   │   │   ├── mess/                   # Meal menus and tenant dining attendance
│   │   │   ├── staff/                  # Staff directory & compensation
│   │   │   ├── notification/           # User alert delivery
│   │   │   ├── dashboard/              # High-performance analytics aggregation
│   │   │   └── report/                 # Exportable business reports
│   │   └── StayHubApplication.java     # Main Spring Boot Application entrypoint
│   ├── src/main/resources/
│   │   ├── application.yml             # Primary Spring Boot configuration
│   │   ├── application-dev.yml         # Local development profile
│   │   ├── application-prod.yml        # Cloud production profile
│   │   └── db/migration/               # Flyway SQL migrations (V1__create_users.sql to V10)
│   ├── src/test/java/com/stayhub/      # Unit & Integration test suites
│   ├── pom.xml                         # Maven dependencies & plugins
│   └── Dockerfile                      # Multi-stage container build
│
├── gateway/                            # Spring Cloud Gateway Service
│   ├── src/main/java/com/stayhub/gateway/
│   │   ├── config/                     # Gateway routing & CORS configurations
│   │   └── GatewayApplication.java     # Gateway entrypoint
│   ├── src/main/resources/application.yml # Route definitions & timeouts
│   ├── pom.xml                         # Spring Cloud dependencies
│   └── Dockerfile                      # Gateway container build
│
├── infrastructure/                     # Cloud Infrastructure & Docker Configurations
│   ├── docker/
│   │   ├── docker-compose.dev.yml      # Local dev overrides
│   │   ├── docker-compose.prod.yml     # Production orchestration
│   │   ├── postgres/init.sql           # Database initialization scripts
│   │   └── redis/redis.conf            # Redis cache settings
│   ├── terraform/                      # AWS Infrastructure as Code (VPC, ECS, RDS, S3, ALB)
│   └── aws/README.md                   # AWS deployment manual
│
├── docs/                               # Engineering & Product Documentation
│   ├── architecture/                   # Architecture diagrams & request lifecycle flow
│   ├── database/                       # Schema dictionary & Mermaid ER diagram
│   ├── api/                            # OpenAPI / REST markdown endpoint references
│   ├── deployment/                     # Local setup, AWS deployment, CI/CD guides
│   └── product/                        # PRD and feature specifications
│
└── .github/workflows/                  # GitHub Actions CI/CD Pipelines
    ├── frontend-ci.yml                 # React test, lint, and build validation
    ├── backend-ci.yml                  # Java 21 build, test, and checkstyle
    ├── gateway-ci.yml                  # API Gateway build and route test
    ├── docker-build.yml                # Docker image build and vulnerability scan
    ├── deploy-dev.yml                  # Continuous deployment to dev ECS cluster
    └── deploy-prod.yml                 # Production rolling deployment pipeline
```

---

## ⚡ Technology Stack

| Tier | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript 5.5, Vite 5.4, Tailwind CSS, Lucide Icons, Zustand, Axios |
| **Backend** | Java 21 LTS, Spring Boot 3.3.4, Spring Data JPA, Spring Security, JJWT 0.12.6, Flyway 10, Lombok |
| **API Gateway** | Spring Cloud Gateway (Netty Non-Blocking Reactive Engine) |
| **Database & Cache** | PostgreSQL 16, Redis 7 (Alpine) |
| **Documentation & API** | SpringDoc OpenAPI 3.0 / Swagger UI |
| **Infrastructure** | Docker, Docker Compose, AWS (ECS Fargate, ALB, RDS Multi-AZ, S3, ElastiCache, CloudFront), Terraform |
| **CI/CD** | GitHub Actions (6 automated workflows) |

---

## 🔄 Architectural Flow — How Everything Connects

Below is the step-by-step trace of what happens when a property manager clicks **"Add Tenant"** in the React application:

```
[ Browser / React SPA ]
         │  (1) User submits "Add Tenant" form
         │  (2) Axios attaches Bearer eyJhbGci...
         ▼
[ API Gateway (:8080) ]
         │  (3) Matches Path=/api/v1/tenants/**
         │  (4) Verifies CORS origin & injects trace headers
         ▼
[ Spring Security Filter Chain (:8081) ]
         │  (5) JwtAuthenticationFilter validates signature & expiry
         │  (6) Redis checked for token revocation
         │  (7) Populates SecurityContext with ROLE_OWNER
         ▼
[ TenantController.java ]
         │  (8) @Valid triggers JSR-380 bean validation
         ▼
[ TenantServiceImpl.java (@Transactional) ]
         │  (9) Checks property ownership & bed availability
         │  (10) Inserts Tenant record
         │  (11) Transitions Bed status from AVAILABLE to OCCUPIED
         ▼
[ PostgreSQL 16 Database ]
         │  (12) Atomic ACID commit
         ▼
[ Redis Cache ]
         │  (13) Invalidates stale occupancy cache keys
         ▼
[ Return Trip ]
         │  (14) TenantResponse DTO returned as HTTP 201 Created
         │  (15) React updates local state, shows success toast, and closes modal
```

*For complete details, see [docs/architecture/request-lifecycle-flow.md](docs/architecture/request-lifecycle-flow.md).*

---

## 🚀 Getting Started & Local Development

### 1. Prerequisites
- **Git** (>= 2.30)
- **Node.js** (>= 20.x) & **npm** (>= 10.x)
- **Java 21 LTS** & **Maven** (>= 3.9)
- **Docker & Docker Compose** (Docker Desktop 4.x+)

### 2. Environment Setup
```bash
# Clone the repository
git clone https://github.com/your-org/stayhub.git
cd stayhub/StayHub-app

# Copy the environment file
cp .env.example .env
```

### 3. Running with Docker Compose (Recommended)
Launch the entire platform (PostgreSQL, Redis, Backend, Gateway, and Frontend) in one command:
```bash
docker compose up --build
```

Access the services:
- **Web App**: [http://localhost:5173](http://localhost:5173)
- **API Gateway**: [http://localhost:8080](http://localhost:8080)
- **Backend API**: [http://localhost:8081](http://localhost:8081)
- **Swagger UI**: [http://localhost:8081/swagger-ui.html](http://localhost:8081/swagger-ui.html)

---

## 🛠️ Running Services Independently for Development

If you prefer to debug code locally with hot-reloading:

### 1. Start Database & Cache
```bash
docker compose up -d postgres redis
```

### 2. Start Spring Boot Backend
```bash
cd backend
mvn clean spring-boot:run -Dspring-boot.run.profiles=dev
```

### 3. Start Spring Cloud Gateway
```bash
cd gateway
mvn clean spring-boot:run
```

### 4. Start React Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Testing & Quality Assurance

### Run Backend Unit & Integration Tests
```bash
cd backend
mvn clean test
```

### Run Frontend Linting & Type Checking
```bash
cd frontend
npm run typecheck
npm run build
```

---

## 📚 Complete Documentation Index

- **Architecture**:
  - [System Architecture](docs/architecture/system-architecture.md)
  - [Backend Architecture](docs/architecture/backend-architecture.md)
  - [Frontend Architecture](docs/architecture/frontend-architecture.md)
  - [Request Lifecycle Flow](docs/architecture/request-lifecycle-flow.md)
- **Database**:
  - [Database Schema Reference](docs/database/schema.md)
  - [Mermaid ER Diagram](docs/database/er-diagram.md)
- **API Documentation**:
  - [Authentication API](docs/api/authentication.md)
  - [Properties API](docs/api/properties.md)
  - [Rooms & Beds API](docs/api/rooms.md)
  - [Tenants API](docs/api/tenants.md)
  - [Payments API](docs/api/payments.md)
  - [Expenses API](docs/api/expenses.md)
- **Deployment & Cloud**:
  - [Local Development Guide](docs/deployment/local-development.md)
  - [AWS Production Deployment](docs/deployment/aws-deployment.md)
  - [CI/CD Automation](docs/deployment/ci-cd.md)
- **Product**:
  - [Product Requirements Document](docs/product/requirements.md)
  - [Features Matrix](docs/product/features.md)

---

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
