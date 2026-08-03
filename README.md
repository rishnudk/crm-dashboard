# NexusCRM — Modern Customer Relationship Management Dashboard

NexusCRM is a high-performance, feature-rich Customer Relationship Management (CRM) dashboard application built with **Next.js 14 (App Router)**, **TypeScript**, **shadcn/ui**, **TanStack Query**, **TanStack Table**, **dnd-kit**, and **Vitest**.

Designed with **Clean Architecture** and **Feature-First Architecture** principles, this project demonstrates real-world frontend craft, responsive design, interactive search/filtering, full client-side CRUD operations, drag-and-drop row reordering, and automated unit/integration testing.

---

## 🌟 Features Overview

### 📊 Interactive Dashboard Overview
- **4 Live KPI Stats Cards**: Real-time aggregation of Total Customers, Active Customers, Inactive Customers, and New Customers This Month.
- **Recent Activity Feed**: Quick summary of newly added customers with direct navigation links.
- **Skeleton Loading States**: Smooth shimmer loaders while server queries resolve.

### 🔍 Global Search & Debouncing
- **300ms Debounced Input**: Instant search across Customer Name, Email, and Company fields without unnecessary re-renders.
- **Clear Search Button**: One-click input reset.

### 🎛️ Advanced Filters Panel (Key Feature)
- **Slide-Over Sheet Interface**: Dedicated filter panel accessible from the toolbar.
- **Status Checkboxes**: Multi-select filter by `Active`, `Inactive`, and `Lead`.
- **Company Multi-Select**: Dynamic autocomplete list generated from active customer company records.
- **Date Range Filter (Last Contact Date)**: Date pickers (`From Date` and `To Date`) filtering contacts within custom time windows.
- **Phone Number Filter**: Partial string match algorithm for phone numbers.
- **Email Filter**: Partial string match for email addresses.
- **Save Custom Filter Presets**: Users can name and save custom filter combinations (persisted in `localStorage`) for instant re-use.
- **Pre-Built Filter Templates**: One-click built-in presets:
  - *"Active Customers"* (Status = Active)
  - *"Recent Contacts"* (Contacted in last 7 days)
  - *"Inactive Leads"* (Status = Inactive or Lead)
- **Clear All & Apply Buttons**: Flexible real-time or manual filter application.
- **Active Filters Badge**: Counter showing total applied filters with removable inline chips.

### 📋 Data Table & Date Formatting
- **TanStack Table Engine**: Column sorting (asc/desc) on Name, Email, Company, and Last Contact.
- **Date Formatting (`DD-MM-YYYY`)**: Customer last contact dates are explicitly formatted in `DD-MM-YYYY` (Day-Month-Year) format.
- **Status Badges**: Visual color-coded badges for status types.
- **Pagination**: Configurable page sizes (5, 10, 20, 50 rows per page) with total count indicators.

### ⚡ Full Client-Side CRUD Operations
- **Create**: Slide-over form with Zod schema validation (`name`, `email`, `phone`, `company`, `status`, `industry`, `priority`, `notes`).
- **Read**: Infinite/paginated data table with loading skeletons and empty states.
- **Update**: Pre-filled modal dialog to update existing customer details.
- **Delete**: Alert dialog prompt before removing records.

### 🖐️ Drag & Drop Row Reordering
- **dnd-kit Integration**: Reorder table rows vertically with `@dnd-kit/sortable`.
- **Grip Handle**: Dedicated drag handle icon (`GripVertical`) preventing accidental drags.
- **Visual Feedback**: Elevated shadow and row opacity drop during active dragging.
- **In-Memory Store Persistence**: Updated row index positions persist across session state.

### 🔔 Toast Notifications & Polish
- **Sonner Toaster**: Rich color toasts for all CRUD operations, filter presets, and reordering actions.
- **Responsive Layout**: Desktop collapsible sidebar + mobile slide-over sheet drawer menu.

---

## 🧪 Testing & Test Setup

The project includes an automated unit and component integration testing suite built with **Vitest**, **React Testing Library**, and **jsdom**.

### Test Suite Structure

```
src/
├── data/
│   └── __tests__/
│       ├── store.test.ts          # Drag & Drop row reordering unit test
│       ├── crudStore.test.ts      # Create, Update, Delete store unit tests
│       └── advancedFilters.test.ts # Status, Company, Phone, Email, Date Range tests
├── features/
│   └── customers/
│       ├── api/__tests__/
│       │   └── customerApi.test.ts # Async API promise layer tests
│       └── components/__tests__/
│           └── CustomerTable.test.tsx # Component integration test with DOM rendering
```

### Running Tests

```bash
# Run all Vitest test suites once
npm run test

# Run tests in watch mode
npx vitest
```

### Verified Test Cases (13 Passed)
- ✅ **Store Reordering**: Verifies `reorderCustomersStore` swaps array indices and updates numerical positions.
- ✅ **CRUD Operations**: Tests `createCustomerStore`, `updateCustomerStore`, and `deleteCustomerStore`.
- ✅ **Advanced Filters**: Tests filtering by status checkboxes, company multi-select, phone partial match, email partial match, and date ranges.
- ✅ **Async API Layer**: Tests async promises with simulated delay (`createCustomer`, `updateCustomer`, `deleteCustomer`).
- ✅ **CustomerTable Component**: Tests DOM rendering of table rows, status badges, and action menus inside jsdom.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4, Lucide Icons |
| **UI Components** | shadcn/ui (Radix UI / Base UI primitives) |
| **Server State** | TanStack Query v5 (`@tanstack/react-query`) |
| **Table Engine** | TanStack Table (`@tanstack/react-table`) |
| **Drag & Drop** | `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/modifiers` |
| **Testing** | Vitest, React Testing Library, jsdom |
| **Form Handling** | React Hook Form + Zod Resolver (`zod`) |
| **Notifications** | Sonner (`sonner`) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.17.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/crm-dashboard.git
   cd crm-dashboard
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm run test
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 📐 Design & Architectural Decisions

1. **Client-Side Mock Data Store vs Backend DB**:
   - For hosting on platforms like Vercel without requiring a persistent database server, the application uses an in-memory data store with simulated 300ms network delay.
   - The API layer (`customerApi.ts`) returns Promises matching real `fetch()` signatures, making it trivial to swap for real REST/GraphQL endpoints in the future without touching UI components.

2. **TanStack Query for State Management**:
   - All server data is fetched and cached via TanStack Query.
   - Mutations (`create`, `update`, `delete`, `reorder`) automatically invalidate query caches (`['customers']`, `['dashboardStats']`), ensuring immediate UI updates across all components.

3. **Single Filter Object Pattern**:
   - `useCustomerFilters` maintains a single consolidated filter state (`search`, `status`, `industry`, `company`, `phone`, `email`, `dateRange`, `sort`, `page`, `pageSize`) passed directly into the query key `['customers', filters, sort, page, pageSize]`.

---

## 📜 Git Commit History & Branching Workflow

This project was built incrementally following **Conventional Commits**:

- `feat/project-setup` — Next.js project initialization & shadcn/ui configuration
- `feat/mock-data` — Mock customer dataset & in-memory CRUD store
- `feat/layout-shell` — App shell layout with sidebar and top navbar
- `feat/customer-table` — Customer table with sorting & pagination controls
- `feat/search-filters` — Debounced search & popover filter controls
- `feat/crud` — Create, edit, and delete customer dialogs with Zod validation
- `feat/drag-drop` — Drag-and-drop row reordering using dnd-kit
- `feat/dashboard-stats` — Dashboard overview with KPI cards
- `feat/polish` — Toast notifications & mobile drawer
- `feat/advanced-filters` — Advanced Filters Panel (Company multi-select, date range, phone/email search, custom saved presets)
- `docs/readme` — Documentation & README
