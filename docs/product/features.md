# StayHub Product Features & Capabilities Matrix

A comprehensive index of features built across the StayHub Web Application and Backend Platform.

---

## 1. Domain Feature Capabilities

### 🏢 Properties & Multi-Location Management
- **Central Portfolio Dashboard**: Switch between properties seamlessly or view aggregated metrics.
- **Physical Hierarchy**: Define buildings, floors, room configurations, and individual bed spaces.
- **Occupancy Heatmaps**: Real-time visual metrics showing occupied, reserved, available, and maintenance beds.

### 🛏️ Rooms & Bed Inventory
- **Room Categorization**: Single private, double sharing, triple sharing, four sharing, and dormitories.
- **Amenity Tagging**: Air conditioning, attached balconies, private washrooms, study desks, geysers.
- **Bed Status State Machine**: `AVAILABLE` -> `OCCUPIED` -> `MAINTENANCE` with automated state transitions upon tenant check-in or checkout.

### 👥 Tenant Lifecycle & Document Vault
- **Digital Onboarding**: Capture personal details, permanent address, blood group, and emergency contacts.
- **Cloud Document Storage**: Store encrypted PDF/JPEG identity documents with verification status tags.
- **Lease Dates & Exit Notice Tracking**: Automatic status change from `ACTIVE` to `NOTICE_PERIOD`.
- **Checkout & Deposit Reconciliation**: Calculate net refundable deposit after damage or utility deductions.

### 💳 Payments & Rent Collections
- **Automated Monthly Invoicing**: Auto-generate recurring rent records with due dates.
- **Multi-Method Reconciliation**: Track UPI, NEFT/RTGS, Credit/Debit card, and cash collections.
- **Payment Receipts**: Generate downloadable, formatted PDF payment receipts for tenants.
- **Delinquency Management**: Flag overdue accounts, calculate overdue duration, and surface late fees.

### 📊 Expense Tracking & Net Operating Income (NOI)
- **Granular Expense Categories**: Utility bills (Electricity, Water), Internet/WiFi, Staff Salaries, Maintenance & Grocery.
- **Receipt Attachments**: Attach invoices and receipts directly to expense records.
- **Financial Analytics**: Compare gross collected rent vs. operational expenditures to calculate net monthly profit.

### 🛠️ Helpdesk & Complaints Management
- **Categorized Tickets**: Electrical, Plumbing, Cleaning, WiFi, Noise, or Food issues.
- **Severity Levels**: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`.
- **Resolution Tracking**: Assignment to maintenance staff, resolution notes, and resident closure confirmation.

### 🍽️ Mess & Dining Management
- **Interactive Daily Menu**: Post daily meal schedules with dishes and timings.
- **Headcount Opt-in / Opt-out**: Residents can mark meal participation in advance to reduce food wastage and optimize kitchen budgeting.

### 👮 Staff Management
- **Staff Profiles**: Directory of wardens, housekeeping staff, security guards, and culinary teams.
- **Salary Tracking**: Monthly compensation records and contact directory.

### 📈 Reports & Analytics
- **Occupancy Trends**: Historical occupancy rates across months and individual properties.
- **Revenue & Expense Breakdown**: Visual charts and tables exportable to CSV/Excel.
- **Tenant Turnover Metrics**: Average length of stay, vacancy duration, and retention rates.

---

## 2. Frontend UI / UX Highlights

- **Dark & Glassmorphic Visual System**: Custom HSL color palette tailored with sleek dark themes, high-contrast typography, and backdrop-blur cards.
- **Responsive Navigation**: Collapsible sidebar, mobile slide-over drawer, and quick breadcrumbs.
- **State Management**: Powered by Zustand for lightweight, reactive global stores (`authStore`, `propertyStore`, `uiStore`).
- **Interactive Modals & Drawers**: Full accessibility, escape-key dismissal, smooth spring transitions, and focus management.
- **Instant Search & Debouncing**: Live search filtering on tables with debounced input handling.
