# Frontend Developer Challenge: SaaS Analytics Dashboard

Welcome to our frontend developer challenge! Your mission is to craft a sleek, responsive, and intuitive analytics dashboard for a fictional SaaS product. This task mirrors real-world demands, testing your ability to deliver clean, scalable code with a sharp user experience. While we encourage React and TypeScript, you're free to leverage other frameworks or tools if they better suit your vision—just justify your choices clearly.

---

## Objective

Create a web-based analytics dashboard that enables users to log in, explore key metrics, and interact with dynamic data visualizations (charts and tables). Focus on clean code, modularity, and a polished UX. Use any component libraries, tools, or AI assistance as needed, but ensure you can explain your approach and decisions. Prioritize critical thinking over rushing to complete every feature.

---

## Tasks

### 1. Authentication (Mocked)

* Build a streamlined login page accepting email and password.
* Simulate validation on submission, storing a mock token in `localStorage` and managing state via a suitable state management approach.
* Redirect to the dashboard upon successful login.
* Implement navigation using a router of your choice (e.g., React Router).

### 2. Dashboard Layout

* Construct a modular, reusable dashboard using your preferred frontend framework or library, with  **TypeScript** for type safety if applicable.
* Include a collapsible sidebar or hamburger menu with intuitive navigation links.
* Create a top bar with a user profile dropdown for quick account actions.
* Ensure a responsive, adaptive design using a CSS framework or utility like Tailwind CSS. Bonus points for seamless scaling across mobile devices, including tablets like iPads.

### 3. Metrics Visualization

* Integrate a charting library compatible with your chosen framework to display:
    * Active Users: A count of users for a selected time bucket.
    * Daily Store Section Data:
        * Waiting Duration per Location: Average wait time (in seconds) for each section, enabling comparisons.
        * Workforce Utilization: Percentage-based metric showing staff allocation per section.
* Fetch data from a mocked API (e.g., json-server or a local JSON file) using fetch, Axios, or similar. An example can be found attached.
* Provide interactive timeframe selection (e.g., daily, weekly, monthly) for dynamic data updates.
* Thoughtfully choose visualization types to best represent the data.

### 4. Data Tables

* Use a table library to display the JSON data from the metrics task.
* Include:
    * Sorting functionality for columns.
    * Pagination (client-side or simulated server-side with mock data as needed).

### 5. Additional Features and Visual Cues

* Implement periodic user notifications (e.g., a subtle overlay for data updates or scheduled reports).
* Add discreet "Send Feedback" or "Report a Bug" buttons near charts/tables, styled to blend seamlessly with the UI.

---

## Deliverables

* Git Repository containing:
    * Your complete solution.
    * A `README.md` explaining:
        * Setup and run instructions.
        * Key assumptions made.
        * Potential improvements with additional time.
    * A live demo link (if deployed).
* Ensure code is well-organized, commented, and adheres to best practices.
---

## Submission

Submit a link to your GitHub repository when complete.

Unleash your creativity, prioritize clarity and usability, and build something exceptional. Good luck!
