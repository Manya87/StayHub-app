# StayHub App

StayHub App is a web application built with **React** and **Vite** on the frontend, with a **Spring Boot** backend. The project appears to be a hotel/stay booking style application focused on a modern, responsive user experience.

## Features

- React + Vite frontend
- Spring Boot backend
- Java-based server application
- PostgreSQL-ready persistence setup
- Flyway database migration support
- Form validation support
- Spring Security integration
- Responsive UI starter structure

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS

### Backend
- Java 21
- Spring Boot
- Spring Data JPA
- Spring Security
- Spring Validation
- Flyway
- PostgreSQL
- Lombok

## Project Structure

- `StayHub-app/backend` - Spring Boot backend
- `StayHub-app/frontend-owner` - React frontend

## Getting Started

### Prerequisites
- Node.js and npm
- Java 21
- Maven
- PostgreSQL

### Frontend Setup

```bash
cd StayHub-app/frontend-owner
npm install
npm run dev
```

### Backend Setup

```bash
cd StayHub-app/backend
./mvnw spring-boot:run
```

If you do not have Maven Wrapper, use:

```bash
mvn spring-boot:run
```

## Available Scripts

### Frontend
- `npm run dev` — Start the development server
- `npm run build` — Build the app for production
- `npm run lint` — Run ESLint
- `npm run preview` — Preview the production build

## Backend
- Spring Boot application entry point: `StayHubAppApplication`
- Test context is configured with a basic Spring Boot test

## Notes

- The frontend currently uses a starter Vite/React layout.
- The backend is set up with core Spring dependencies and PostgreSQL support.
- You can expand this README with app-specific features, environment variables, and deployment instructions as the project evolves.

## License

No license has been specified yet.
