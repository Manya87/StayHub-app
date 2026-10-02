# StayHub Backend Architecture

## Layered Design Pattern

The backend follows clean architectural layering:

1. **Controller Layer (`com.stayhub.*.*Controller`)**:
   - Handles HTTP endpoints, query params, request body deserialization.
   - Applies `@Valid` validation constraints.
   - Returns standardized `ApiResponse<T>` envelopes.

2. **Service Layer (`com.stayhub.*.*Service`)**:
   - Implements transactional business rules (`@Transactional`).
   - Cross-entity consistency (e.g., automatically marking bed as OCCUPIED when tenant is onboarded).
   - Domain exception throwing (`ResourceNotFoundException`, `BadRequestException`).

3. **Repository Layer (`com.stayhub.*.*Repository`)**:
   - Extends Spring Data JPA `JpaRepository`.
   - Optimized indexed queries.

4. **Persistence & Migration (`db/migration`)**:
   - Controlled by Flyway with versioned migration scripts `V1` through `V10`.

5. **Security & Gateway**:
   - JWT stateless token validation filter.
   - Spring Cloud Gateway routing requests from `:8082` to `:8080`.
