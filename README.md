# SaaS Analytics Dashboard

A modern, responsive analytics dashboard for a fictional SaaS product. This project demonstrates best practices in React, TypeScript, modular design, and data visualization, providing a polished user experience and scalable codebase.

---

## 🚀 Features

### 1. Authentication (Mocked)

- **Login Page:** Simple, clean UI for email and password entry.
- **Validation:** Simulated authentication; stores a mock token in `localStorage`.
- **State Management:** Uses Zustand and React Context.
- **Routing:** Redirects authenticated users to the dashboard using React Router.

### 2. Dashboard Layout

- **Modular Structure:** Reusable components for layout, navigation, and content.
- **Sidebar Navigation:** Collapsible sidebar or hamburger menu with intuitive links.
- **Top Bar:** Includes user profile dropdown for account actions.
- **Responsive Design:** Built with Shadcn & Tailwind CSS for seamless scaling across devices, including tablets.

### 3. Metrics Visualization

- **Charts:** Integrates Shadcn Chart with Recharts for dynamic data visualization.
  - **Active Users:** Displays user count for selected timeframes.
  - **Waiting Duration per Location:** Compares average wait times across sections.
  - **Workforce Utilization:** Shows staff allocation percentages per section.
- **Timeframe Selection:** Interactive controls for daily, weekly, or monthly views.
- **Mocked API:** Fetches data from a mock json-server.

### 4. Data Tables

- **Tabular Display:** Uses Shadcn & TanStack Table for metrics.
- **Sorting:** Clickable column headers for sorting.
- **Pagination:** Client-side pagination.

### 5. Additional Features

- **User Notifications:** Periodic, subtle overlays for data updates or scheduled reports.
- **Feedback/Bug Reporting:** Discreet buttons near charts/tables for user feedback.

> Note: Some sidebar menu items and other features are included for demonstration purposes only and are not functional.

---

## 🛠️ Setup & Run Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/majeeddl/analytics-dashboard-yq.git
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Start the development server and local mock server:**

   ```bash
   pnpm dev:all
   # or
   npm run dev:all
   # or
   yarn dev:all
   ```

4. **Open in your browser:**

   ```
   http://localhost:5173
   ```

   > Use email : 'admin@example.com' and Password : 'password' to login.

## 🛠️ Setup & Run Tests

I developed some test as an example with Vitest and React Testing Library.

### Unit & Component Tests (Vitest)

- **Run all tests:**
  ```bash
  pnpm test
  # or
  npm run test
  # or
  yarn test
  ```
- **Watch mode:**
  ```bash
  pnpm test:watch
  # or
  npm run test:watch
  # or
  yarn test:watch
  ```
- **Interactive UI:**
  ```bash
  pnpm test:ui
  # or
  npm run test:ui
  # or
  yarn test:ui
  ```
  This opens the Vitest UI for interactive test running and debugging.

### End-to-End (E2E) Tests (Playwright)

One E2E test has been implement by Playwright for showing how we can implement E2E test in React Application.

> Ensure the development server and Mock API are running before executing E2E tests.

- **Run all E2E tests:**
  ```bash
  pnpm e2e
  # or
  npm run e2e
  # or
  yarn e2e
  ```
- **Open Playwright Test Runner UI:**
  ```bash
  pnpm e2e:ui
  # or
  npm run e2e:ui
  # or
  yarn e2e:ui
  ```
  This opens the Playwright UI for running and inspecting E2E tests interactively.

## Live Demo

This project is deployed on Vercel. You can view the live demo at the following link:

> https://analytics-dashboard-yq.vercel.app/

## 🧑‍💻 Key Assumptions

- Authentication is fully mocked; no real backend is used.
- All data is fetched from local JSON API.
- The dashboard is designed for modern browsers and responsive across devices.
- State management is handled via Zustand and React Context API.
- Charting and table libraries are chosen for their flexibility and TypeScript support.

---

## 🌱 Potential Improvements

- Integrate real authentication and backend API.
- Add role-based access control for different user types.
- Implement server-side pagination and filtering for large datasets.
- Enhance accessibility (a11y) and add more comprehensive tests.

---

## 📁 Project Structure

```
/src
  /components      # Reusable UI components
  /pages           # Page components (login, dashboard, etc.)
  /assets          # Assets folder
  /data            # Mock API handlers or data fetching logic
  /hooks           # Hooks folder
  /utils           # Utility functions and helpers
  /store           # For State Management (Zustand & React Context API)

/e2e/              # E2e Testing folder
```

---

## 📊 Tech Stack

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn UI**
- **Shadcn Charts (Recharts)**
- **Shadcn Data Table (TanStack Table)**
- **State Management: (Zustand, React Context)**
- **Mock API: json-server with local JSON**
- **Testing (Vitest, React Testing Library)**
- **E2E Testing (playwright)**

---

## 👤 Creator

Created by [Majeed Dourandeesh](https://github.com/majeeddl)

---
