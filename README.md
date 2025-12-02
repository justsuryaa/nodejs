# 🎓 Student Profile Management System

A full-stack web application built with Node.js and Express for managing student profiles, guardian information, and emergency contacts. This system provides a user-friendly interface for parents to register their children and maintain accurate contact information for educational institutions.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [What Has Been Implemented](#what-has-been-implemented)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)

## 🎯 Overview

This application was created to streamline the student registration process for schools. It allows parents/guardians to:
- Register student information online
- Add multiple emergency contacts
- Update student details as needed
- View all registered students

The backend stores all data securely in a SQLite database, and the frontend provides an intuitive form-based interface.

## ✨ Features

### Student Management
- ✅ Create new student profiles with complete information
- ✅ Update existing student records
- ✅ View all registered students
- ✅ Delete student profiles
- ✅ Track enrollment status (Active/Inactive/Pending)

### Guardian/Parent Information
- ✅ Store primary guardian details
- ✅ Multiple relationship types (Mother, Father, Legal Guardian, etc.)
- ✅ Complete contact information (phone, email, address)

### Emergency Contacts
- ✅ Add unlimited emergency contacts per student
- ✅ Store relationship and contact details
- ✅ Separate from guardian information for flexibility

### Technical Features
- ✅ RESTful API architecture
- ✅ Real-time form validation
- ✅ Responsive web design
- ✅ SQLite database with proper foreign key relationships
- ✅ CORS enabled for cross-origin requests
- ✅ Beautiful gradient UI with modern styling

## 🛠️ Technology Stack

### Backend
- **Node.js** (v20.19.5) - JavaScript runtime
- **Express.js** (v4.18.2) - Web application framework
- **SQLite3** (v5.1.6) - Embedded database
- **Body-Parser** (v1.20.2) - Request body parsing middleware
- **CORS** (v2.8.5) - Cross-Origin Resource Sharing middleware

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradients and animations
- **Vanilla JavaScript** - Dynamic form handling and API calls
- **Fetch API** - Asynchronous HTTP requests

### Development Tools
- **Nodemon** (v3.0.1) - Auto-restart server during development
- **Git** - Version control

## 📝 What Has Been Implemented

### 1. Database Layer (`database.js`)
- Created SQLite database with three interconnected tables
- Implemented foreign key relationships with CASCADE delete
- Auto-initialization of database schema on server start
- Proper error handling for database operations

### 2. Backend API (`server.js`)
Implemented complete REST API with the following endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students` | Create new student with guardian and emergency contacts |
| GET | `/api/students` | Get all students with their guardian information |
| GET | `/api/students/:id` | Get single student with all related data |
| PUT | `/api/students/:id` | Update student and guardian information |
| DELETE | `/api/students/:id` | Delete student (cascades to related records) |

**Features:**
- Input validation for required fields
- Transaction-based inserts for data integrity
- Detailed error responses
- Success confirmations with student IDs

### 3. Frontend Interface (`public/index.html`)
- **Registration Form** with sections for:
  - Student Information (name, grade, contact, status)
  - Guardian Information (name, relationship, contact, address)
  - Emergency Contacts (dynamically add/remove multiple contacts)
- **Student List Display** showing all registered students
- **Form Validation** with required field indicators
- **Success/Error Messages** for user feedback
- **Dynamic UI** for adding/removing emergency contacts
- **Responsive Design** that works on all screen sizes

### 4. Data Validation
- Required field validation on both frontend and backend
- Email format validation
- Phone number input fields
- Enrollment status dropdown with predefined options
- Relationship type selection with common options

### 5. User Experience Enhancements
- Color-coded sections with gradient backgrounds
- Hover effects on buttons
- Smooth transitions and animations
- Clear visual hierarchy
- Intuitive form layout
- Real-time feedback on submissions

## 🚀 Installation

### Prerequisites

Before running this application, ensure you have:
- **Node.js** (v20.x or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Installing Node.js on macOS

**Option 1: Using Homebrew (Recommended)**
```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node@20

# Add to PATH
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Option 2: Direct Download**
- Visit [nodejs.org](https://nodejs.org/)
- Download the LTS version for macOS
- Run the installer and follow instructions

**Verify Installation:**
```bash
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Setup Instructions

**1. Clone the Repository**
```bash
git clone https://github.com/justsuryaa/nodejs.git
cd nodejs
```

**2. Install Dependencies**
```bash
npm install
```

This will install:
- express
- sqlite3
- body-parser
- cors
- nodemon (dev dependency)

**3. Start the Server**
```bash
# Production mode
npm start

# Development mode (auto-restart on file changes)
npm run dev
```

**4. Access the Application**
```
Open your browser and navigate to: http://localhost:3000
```

The database file (`student_management.db`) will be created automatically on first run.

## 📖 Usage

### For Parents/Guardians

1. **Open the Application**
   - Navigate to `http://localhost:3000` in your web browser

2. **Fill Out the Registration Form**
   - **Student Information**: Enter your child's name, grade, and contact details
   - **Guardian Information**: Provide your details as the primary guardian
   - **Emergency Contacts**: Add at least one emergency contact (click "+ Add Emergency Contact" for more)

3. **Submit the Form**
   - Click "Submit Registration"
   - You'll see a success message if everything is saved correctly
   - The student will appear in the "Registered Students" list at the bottom

4. **View Registered Students**
   - All registered students are displayed at the bottom of the page
   - Shows student name, grade, status, and guardian information

### For Developers

**Start Development Server:**
```bash
npm run dev
```

**Test API Endpoints:**
```bash
# Create a student
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"student":{"name":"John Doe","grade":"5th Grade"},"guardian":{"name":"Jane Doe","relationship":"Mother","phone":"123-456-7890"}}'

# Get all students
curl http://localhost:3000/api/students

# Get specific student
curl http://localhost:3000/api/students/1
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 1. Create Student Profile
```http
POST /api/students
Content-Type: application/json
```

**Request Body:**
```json
{
  "student": {
    "name": "John Doe",
    "grade": "5th Grade",
    "contactPhone": "555-1234",
    "contactEmail": "john.doe@email.com",
    "enrollmentStatus": "Active"
  },
  "guardian": {
    "name": "Jane Doe",
    "relationship": "Mother",
    "phone": "555-5678",
    "email": "jane.doe@email.com",
    "address": "123 Main St, City, State 12345"
  },
  "emergencyContacts": [
    {
      "name": "Bob Smith",
      "relationship": "Uncle",
      "phone": "555-9012",
      "email": "bob.smith@email.com"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Student profile created successfully",
  "studentId": 1
}
```

#### 2. Get All Students
```http
GET /api/students
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "grade": "5th Grade",
    "contact_phone": "555-1234",
    "contact_email": "john.doe@email.com",
    "enrollment_status": "Active",
    "guardian_id": 1,
    "guardian_name": "Jane Doe",
    "relationship": "Mother",
    "guardian_phone": "555-5678",
    "guardian_email": "jane.doe@email.com",
    "guardian_address": "123 Main St, City, State 12345"
  }
]
```

#### 3. Get Single Student
```http
GET /api/students/:id
```

**Response (200 OK):**
```json
{
  "student": {
    "id": 1,
    "name": "John Doe",
    "grade": "5th Grade",
    "contact_phone": "555-1234",
    "contact_email": "john.doe@email.com",
    "enrollment_status": "Active"
  },
  "guardian": {
    "id": 1,
    "student_id": 1,
    "name": "Jane Doe",
    "relationship": "Mother",
    "phone": "555-5678",
    "email": "jane.doe@email.com",
    "address": "123 Main St, City, State 12345"
  },
  "emergencyContacts": [
    {
      "id": 1,
      "student_id": 1,
      "name": "Bob Smith",
      "relationship": "Uncle",
      "phone": "555-9012",
      "email": "bob.smith@email.com"
    }
  ]
}
```

#### 4. Update Student Profile
```http
PUT /api/students/:id
Content-Type: application/json
```

**Request Body:** (Same structure as Create)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student profile updated successfully"
}
```

#### 5. Delete Student Profile
```http
DELETE /api/students/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Student profile deleted successfully"
}
```

### Error Responses

**400 Bad Request:**
```json
{
  "error": "Missing required fields"
}
```

**404 Not Found:**
```json
{
  "error": "Student not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to create student: [error details]"
}
```

## 💾 Database Schema

The application uses SQLite with three interconnected tables:

### 1. Students Table
```sql
CREATE TABLE students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  contact_phone TEXT,
  contact_email TEXT,
  enrollment_status TEXT DEFAULT 'Active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Guardians Table
```sql
CREATE TABLE guardians (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

### 3. Emergency Contacts Table
```sql
CREATE TABLE emergency_contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
```

**Key Features:**
- ✅ Auto-incrementing primary keys
- ✅ Foreign key relationships with CASCADE delete
- ✅ Automatic timestamp tracking
- ✅ NOT NULL constraints on required fields
- ✅ Default values for enrollment status

## 📁 Project Structure

```
nodejs/
├── .gitignore                 # Git ignore rules (node_modules, database)
├── README.md                  # This documentation file
├── package.json               # NPM dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── server.js                  # Express server & REST API routes
├── database.js                # SQLite database configuration & schema
├── nodejs.js                  # Additional JavaScript utilities
├── student_management.db      # SQLite database (auto-generated)
└── public/
    └── index.html             # Frontend form interface & UI
```

### File Descriptions

**`server.js`** (216 lines)
- Express.js server setup
- REST API endpoint definitions
- Request validation and error handling
- JSON parsing middleware
- Static file serving

**`database.js`** (82 lines)
- SQLite database connection
- Database initialization function
- Table schema creation
- Error handling for database operations

**`public/index.html`** (450+ lines)
- Complete web form interface
- Student information section
- Guardian information section
- Dynamic emergency contact fields
- Client-side form validation
- API integration with Fetch
- Responsive CSS styling
- JavaScript for form handling

**`package.json`**
- Project metadata
- Dependency management
- NPM scripts (start, dev)

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```
This uses Nodemon to automatically restart the server when you make code changes.

### Making Changes

**Backend Changes:**
- Edit `server.js` for API endpoints
- Edit `database.js` for database schema
- Server auto-restarts in dev mode

**Frontend Changes:**
- Edit `public/index.html` for UI changes
- Refresh browser to see changes
- No build process needed

### Adding New Features

**Example: Add a new API endpoint**
```javascript
// In server.js
app.get('/api/students/search/:name', (req, res) => {
  const name = req.params.name;
  db.all('SELECT * FROM students WHERE name LIKE ?', [`%${name}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
```

## 🚀 Deployment Options

### Option 1: Deploy to Render (Recommended - Free)
1. Push code to GitHub (already done!)
2. Visit [render.com](https://render.com) and sign up
3. Create new "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Deploy and get your public URL

### Option 2: Deploy to Railway
1. Visit [railway.app](https://railway.app)
2. Login with GitHub
3. "New Project" → Deploy from GitHub repo
4. Select `justsuryaa/nodejs`
5. Automatic deployment with public URL

### Option 3: Deploy to Heroku
```bash
heroku login
heroku create student-profile-system
git push heroku main
heroku open
```

### Option 4: Run on Local Network
Share with devices on the same WiFi network:
```bash
# Find your local IP
ipconfig getifaddr en0  # Usually something like 192.168.1.x

# Others can access via: http://192.168.1.x:3000
```

## 🧪 Testing

### Manual Testing Checklist

**Student Registration:**
- [ ] Create student with all required fields
- [ ] Create student with optional fields empty
- [ ] Add multiple emergency contacts
- [ ] Remove emergency contacts before submission
- [ ] Submit form and verify success message
- [ ] Check if student appears in list below

**Data Validation:**
- [ ] Try submitting without required fields
- [ ] Verify email format validation
- [ ] Check phone number field behavior
- [ ] Test enrollment status dropdown

**API Testing:**
```bash
# Test GET all students
curl http://localhost:3000/api/students

# Test GET single student
curl http://localhost:3000/api/students/1

# Test POST (create student)
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"student":{"name":"Test Student","grade":"1st"},"guardian":{"name":"Test Guardian","relationship":"Parent","phone":"555-0000"},"emergencyContacts":[]}'

# Test DELETE
curl -X DELETE http://localhost:3000/api/students/1
```

## 🛡️ Security Considerations

**Current Implementation:**
- ✅ Input validation on required fields
- ✅ SQL injection protection (parameterized queries)
- ✅ CORS enabled for cross-origin requests

**Future Enhancements:**
- 🔒 Add user authentication
- 🔒 Implement rate limiting
- 🔒 Add data encryption for sensitive information
- 🔒 Implement HTTPS in production
- 🔒 Add input sanitization middleware
- 🔒 Implement role-based access control

## 🐛 Troubleshooting

### Issue: `npm: command not found`
**Solution:** Install Node.js following the prerequisites section

### Issue: Port 3000 already in use
**Solution:** 
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or change port in server.js:
const PORT = 3001;
```

### Issue: Database file not found
**Solution:** The database is created automatically. Ensure write permissions in the project directory.

### Issue: Changes not reflecting
**Solution:** 
- Clear browser cache (Cmd+Shift+R on Mac)
- Restart the server
- Check browser console for errors

## 📚 Learning Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [MDN Web Docs - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Surya Ayuvaraj**
- GitHub: [@justsuryaa](https://github.com/justsuryaa)
- Repository: [nodejs](https://github.com/justsuryaa/nodejs)

## 🙏 Acknowledgments

- Built with Node.js and Express.js
- Database powered by SQLite3
- UI inspired by modern web design principles
- Created for educational purposes

## 📞 Support

If you have any questions or run into issues:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Review the [API Documentation](#-api-documentation)

---

**Last Updated:** December 2025

**Version:** 1.0.0

⭐ If you find this project helpful, please give it a star on GitHub!
