# StayHub System Architecture

## High-Level Architecture Overview

StayHub is engineered as a cloud-native, microservices-ready modular platform:

```
[ Client Browser / Mobile ]
            │
            │ HTTPS (Port 443 / 80)
            ▼
┌───────────────────────────────────────┐
│     Cloud Application Load Balancer   │
└──────────────────┬────────────────────┘
                   │
         ┌─────────┴─────────┐
         │                   │
         ▼                   ▼
┌─────────────────┐ ┌──────────────────────────────────────┐
│  React SPA App  │ │          API Gateway                 │
│  (Nginx / Vite) │ │    (Spring Cloud Gateway :8082)      │
└─────────────────┘ └──────────────────┬───────────────────┘
                                       │
                                       ▼  Reverse Proxy / Routing
                    ┌──────────────────────────────────────┐
                    │      Core Spring Boot Backend        │
                    │        (Java 21 / REST :8080)        │
                    └──────────┬──────────────────┬────────┘
                               │                  │
                      JPA / SQL│                  │Cache
                               ▼                  ▼
                    ┌──────────────────┐ ┌─────────────────┐
                    │ PostgreSQL 16 DB │ │  Redis 7 Cache  │
                    │ (Flyway Migrated)│ │(Tokens/Sessions)│
                    └──────────────────┘ └─────────────────┘
```

## Security & Authentication Protocol
- **Stateless Bearer Tokens**: JSON Web Tokens (JWT) using HMAC-SHA256.
- **Route Filtering**: Spring Security Filter Chain intercepting incoming requests, extracting claims and verifying validity.
- **Password Hashing**: BCrypt hashing with salt factor 12.
- **Role-Based Access Control (RBAC)**: Support for `SUPER_ADMIN`, `PROPERTY_OWNER`, `MANAGER`, `TENANT`, and `STAFF`.
