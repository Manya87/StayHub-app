# StayHub App

StayHub is a full-stack stay/hotel booking application with a React + Vite frontend and a Spring Boot backend.

## Tech stack

- **Frontend:** React, Vite, JavaScript, CSS, ESLint
- **Backend:** Java 21, Spring Boot, Spring Security, Spring Data JPA, Validation, Flyway, PostgreSQL, Lombok

## Repository structure

This repository root contains the actual app workspace in the `StayHub-app/` folder:

- `StayHub-app/frontend-owner` - React + Vite client
- `StayHub-app/backend` - Spring Boot API

## Prerequisites

- Node.js 18+ and npm
- Java 21
- PostgreSQL

## Local setup

### 1) Clone and enter workspace

```bash
git clone <repository-url>
cd StayHub-app/StayHub-app
```

### 2) Frontend

```bash
cd StayHub-app/frontend-owner
npm install
npm run dev
```

Frontend runs on Vite's default dev server (usually `http://localhost:5173`).

### 3) Backend

```bash
cd StayHub-app/backend
./mvnw spring-boot:run
```

If Maven Wrapper is unavailable on your machine:

```bash
mvn spring-boot:run
```

## Scripts and useful commands

### Frontend (`StayHub-app/frontend-owner`)

- `npm run dev` - start development server
- `npm run build` - build production assets
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

### Backend (`StayHub-app/backend`)

- `./mvnw spring-boot:run` - run backend locally
- `./mvnw test` - run backend tests

## Backend configuration notes

The backend uses PostgreSQL and Flyway. Configure datasource properties (URL, username, password) for your local database using Spring Boot configuration files or environment variables before running non-trivial backend features.

## Current project status

- Frontend currently includes starter UI scaffolding
- Backend currently includes base Spring Boot setup with security, persistence, and migration dependencies

## Contributing

1. Create a feature branch from `prajwal`
2. Keep changes scoped and focused
3. Run lint/tests for the area you changed before opening or updating a PR
