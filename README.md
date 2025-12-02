# Student Profile Management System

A web application for managing student profiles, guardian information, and emergency contacts.

## Features

- Create, read, update, and delete student profiles
- Manage guardian/parent information
- Store multiple emergency contacts per student
- Local SQLite database for data persistence
- Web-based form interface
- REST API endpoints

## Prerequisites

Before running this application, you need to install Node.js:

### Installing Node.js on macOS

1. **Using Homebrew (Recommended):**
   ```bash
   brew install node
   ```

2. **Or download from official website:**
   - Visit https://nodejs.org/
   - Download the LTS version for macOS
   - Run the installer and follow the instructions

3. **Verify installation:**
   ```bash
   node --version
   npm --version
   ```

## Installation

1. Open Terminal and navigate to the project directory:
   ```bash
   cd /Users/suryaayuvaraj/Desktop/nodejs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

1. Start the server:
   ```bash
   npm start
   ```

2. Open your browser and visit:
   ```
   http://localhost:3000
   ```

## API Endpoints

### Create Student
- **POST** `/api/students`
- Body: JSON with student, guardian, and emergency contact information

### Get All Students
- **GET** `/api/students`

### Get Single Student
- **GET** `/api/students/:id`

### Update Student
- **PUT** `/api/students/:id`

### Delete Student
- **DELETE** `/api/students/:id`

## Database

The application uses SQLite database (`student_management.db`) with three tables:

1. **students** - Student information
2. **guardians** - Parent/guardian information
3. **emergency_contacts** - Emergency contact information

## Project Structure

```
nodejs/
├── server.js              # Express server and API routes
├── database.js            # Database setup and configuration
├── package.json           # Project dependencies
├── student_management.db  # SQLite database (created automatically)
├── public/
│   └── index.html        # Web form interface
└── README.md             # This file
```

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## Notes

- All data is stored locally in `student_management.db`
- The database is created automatically on first run
- Emergency contacts are optional but at least one is recommended
- Guardian information is required for each student
