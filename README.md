# HRMS Assignment Submission

## Setup Instructions

### 1. Clone the repository

git clone <your-repo-link>
cd <project-folder>

---

### 2. Install dependencies

#### Backend

cd Backend
npm install

#### Frontend

cd ../Frontend
npm install

---

### 3. Configure Database

- Ensure MySQL is installed and running
- Create a database named: `db_penggajian3`
- Update credentials in:
  `Backend/config/Database.js`

Example:
- Username: root
- Password: (your local MySQL password, if any)

---

### 4. Run Backend

cd Backend
npm start

---

### 5. Run Frontend

cd Frontend
npm run dev

---

### 6. Access the App

Frontend:
http://localhost:5173

Backend:
http://localhost:5000

---

## HRMS Choice

I worked with the provided HRMS codebase as part of the assignment to implement and fix real-world features within an existing system.

---

## AI Tools Used

- ChatGPT: Used for debugging issues, structuring feature implementations, validation logic, and improving code clarity.

---

## Notes on Ticket Implementation

- **LF-103 (Designation Field)**  
  Implemented full-stack support including backend validation to ensure only allowed values are stored, since the requirement included persistence.

- **LF-104 (CSV Export)**  
  Export includes fields based on the actual employee list UI (e.g., NIK, name, status, designation) to make the feature more practical for real-world use.

- **LF-105 (Mobile Layout)**  
  Implemented a mobile-friendly stacked layout instead of only horizontal scrolling to improve usability on smaller screens.

- Temporary mock data and auth bypasses were used during development for testing purposes but have been removed in the final submission.

---
