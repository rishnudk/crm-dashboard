# NexusCRM — Modern Customer Relationship Management Dashboard

NexusCRM is a high-performance, feature-rich Customer Relationship Management (CRM) dashboard application built with **Next.js 14 (App Router)**, **TypeScript**, **shadcn/ui**, **TanStack Query**, **TanStack Table**, and **dnd-kit**.

Designed with **Clean Architecture** and **Feature-First Architecture** principles, this project demonstrates real-world frontend craft, responsive design, interactive search/filtering, full client-side CRUD operations, and drag-and-drop row reordering.

---

## 🌟 Key Features

- 📊 **Interactive Dashboard Overview**: 4 live KPI stats cards (Total Customers, Active, Inactive, New This Month) + Recent Customers feed.
- 📋 **Data Table**: Built with `@tanstack/react-table` featuring column sorting (asc/desc), status badges, and relative date formatting.
- 🔍 **Debounced Search**: Real-time customer search matching Name, Email, or Company with a 300ms debounce buffer to optimize performance.
- 🏷️ **Multi-Select Filtering**: Filter customers simultaneously by Status (Active, Lead, Inactive) and Industry with active filter chips and one-click reset.
- ⚡ **Full Client-Side CRUD**:
  - **Create**: Dialog form with Zod schema validation.
  - **Read**: Dynamic customer list with loading skeletons and empty states.
  - **Update**: Pre-filled modal to edit customer details.
  - **Delete**: Confirmation alert dialog before deletion.
- 🖐️ **Drag & Drop Reordering**: Reorder customer rows vertically using `@dnd-kit/sortable` with a dedicated drag handle and visual elevation feedback.
- 🔔 **Toast Notifications**: Feedback toasts via `Sonner` for all CRUD and reorder actions.
- 📱 **Fully Responsive Layout**: Collapsible desktop sidebar + slide-over sheet drawer for mobile viewports.
- 🎨 **Modern Aesthetics**: Sleek dark mode styling using Tailwind CSS v4 and shadcn/ui components.

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
| **Form Handling** | React Hook Form + Zod Resolver (`zod`) |
| **Notifications** | Sonner (`sonner`) |

---

## 🏗️ Architecture & Folder Structure

The repository follows **Clean Architecture** principles with a feature-first folder organization:

```
src/
├── app/                          # Next.js App Router (Layouts & Pages)
│   ├── layout.tsx                # Root layout (Providers, Fonts, Toaster)
│   ├── page.tsx                  # Dashboard Home Page
│   └── customers/
│       └── page.tsx              # Customers Management Page
├── features/
│   └── customers/                # Customer Feature Domain (Feature Isolation)
│       ├── api/                  # customerApi.ts (Mock API layer)
│       ├── components/           # CustomerTable, CustomerForm, FilterSidebar, etc.
│       ├── hooks/                # useCustomers, useCustomerMutations, useCustomerFilters
│       ├── schemas/              # customerSchema.ts (Zod validation)
│       ├── types/                # customer.ts (TypeScript domain models)
│       └── constants/            # Options, status colors, pagination defaults
├── components/                   # Shared UI Components (Sidebar, Navbar, SearchBar, Pagination)
│   └── ui/                       # shadcn/ui generated primitives
├── data/                         # Mock Data Layer
│   ├── customers.ts              # Initial 50+ seed customer records
│   └── store.ts                  # In-memory CRUD data store & reordering logic
├── hooks/                        # Global Custom Hooks (useDebounce)
├── providers/                    # QueryProvider (TanStack Query Client)
└── lib/                          # Utility functions (cn helper)
```

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

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧪 Verification & Quality Checks

Run the following commands to verify code quality:

```bash
# Type check TypeScript files
npx tsc --noEmit

# Run ESLint checks
npm run lint

# Build production bundle
npm run build
```

---

## 📐 Design & Architectural Decisions

1. **Client-Side Mock Data Store vs Backend DB**:
   - For hosting on platforms like Vercel without requiring a persistent database server, the application uses an in-memory data store with simulated 300ms network delay.
   - The API layer (`customerApi.ts`) returns Promises matching real `fetch()` signatures, making it trivial to swap for real REST/GraphQL endpoints in the future without touching UI components.

2. **TanStack Query for State Management**:
   - All server data is fetched and cached via TanStack Query.
   - Mutations (`create`, `update`, `delete`, `reorder`) automatically invalidate query caches (`['customers']`, `['dashboardStats']`), ensuring immediate UI updates across all components.

3. **Single Filter Object Pattern**:
   - `useCustomerFilters` maintains a single consolidated filter state (`search`, `status`, `industry`, `sort`, `page`, `pageSize`) passed directly into the query key `['customers', filters, sort, page, pageSize]`.

4. **Accessibility & Responsive First**:
   - All interactive controls feature keyboard navigation support, high contrast ratios, and responsive breakpoints down to mobile viewports.

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
- `docs/readme` — Documentation & README
