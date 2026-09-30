# StayHub Frontend Architecture

## React + Vite + TypeScript

The frontend is structured by domain feature boundaries rather than flat technical buckets:

- **`components/ui/`**: Reusable primitive design system components (Button, Input, Modal, Table, Badge, Drawer, Toast, etc.).
- **`components/layout/`**: Application shell, collapsible sidebar, responsive header, mobile navigation bar.
- **`features/<domain>/`**:
  - `components/`: Feature-scoped visual widgets.
  - `hooks/`: Feature custom hooks for data fetching and state encapsulation.
  - `services/`: Axios endpoints dedicated to that domain.
  - `types/`: Domain-specific TypeScript models.
  - `validation/`: Zod schemas for client-side form checking.
- **`store/`**: Lightweight reactive state management powered by Zustand (`authStore`, `propertyStore`, `uiStore`).
- **`routes/`**: ProtectedRoute wrapper checking authentication tokens and permissions before rendering authenticated pages.
