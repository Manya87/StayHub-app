# StayHub App

StayHub App is a web application built with **React** and **Next.js** on the frontend, with a **Spring Boot** backend. The project appears to be a hotel/stay booking style application focused on a modern, responsive user experience.

## Features

- React + Next.js frontend (App Router)
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
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- HTML / CSS

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

- `backend/` - Spring Boot backend
- `frontend-owner/` - Next.js frontend

## Getting Started

### Prerequisites
- Node.js and npm
- Java 21
- Maven
- PostgreSQL

### Frontend Setup

```bash
cd frontend-owner
npm install
npm run dev
```

The frontend will be running at [http://localhost:3000](http://localhost:3000).

### Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

If you do not have Maven Wrapper, use:

```bash
mvn spring-boot:run
```

## Available Scripts

### Frontend
- `npm run dev` — Start Next.js development server
- `npm run build` — Build the Next.js app for production
- `npm run start` — Start Next.js production server
- `npm run lint` — Run ESLint

## Backend
- Spring Boot application entry point: `StayHubAppApplication`
- Test context is configured with a basic Spring Boot test

## Notes

- The frontend uses Next.js with App Router and Tailwind CSS.
- The backend is set up with core Spring dependencies and PostgreSQL support.
- You can expand this README with app-specific features, environment variables, and deployment instructions as the project evolves.

## License

No license has been specified yet.
