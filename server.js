const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes

// Create a new student with guardian and emergency contacts
app.post('/api/students', (req, res) => {
  const { student, guardian, emergencyContacts } = req.body;

  // Validate required fields
  if (!student.name || !student.grade || !guardian.name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.serialize(() => {
    // Insert student
    const studentQuery = `
      INSERT INTO students (name, grade, contact_phone, contact_email, enrollment_status)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(
      studentQuery,
      [student.name, student.grade, student.contactPhone, student.contactEmail, student.enrollmentStatus || 'Active'],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to create student: ' + err.message });
        }

        const studentId = this.lastID;

        // Insert guardian
        const guardianQuery = `
          INSERT INTO guardians (student_id, name, relationship, phone, email, address)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.run(
          guardianQuery,
          [studentId, guardian.name, guardian.relationship, guardian.phone, guardian.email, guardian.address],
          function(err) {
            if (err) {
              return res.status(500).json({ error: 'Failed to create guardian: ' + err.message });
            }

            // Insert emergency contacts
            if (emergencyContacts && emergencyContacts.length > 0) {
              const contactQuery = `
                INSERT INTO emergency_contacts (student_id, name, relationship, phone, email)
                VALUES (?, ?, ?, ?, ?)
              `;

              const stmt = db.prepare(contactQuery);
              emergencyContacts.forEach(contact => {
                stmt.run([studentId, contact.name, contact.relationship, contact.phone, contact.email]);
              });
              stmt.finalize();
            }

            res.status(201).json({
              success: true,
              message: 'Student profile created successfully',
              studentId: studentId
            });
          }
        );
      }
    );
  });
});

// Get all students
app.get('/api/students', (req, res) => {
  const query = `
    SELECT s.*, 
           g.id as guardian_id, g.name as guardian_name, g.relationship, 
           g.phone as guardian_phone, g.email as guardian_email, g.address as guardian_address
    FROM students s
    LEFT JOIN guardians g ON s.id = g.student_id
    ORDER BY s.id DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get a single student by ID with all related data
app.get('/api/students/:id', (req, res) => {
  const studentId = req.params.id;

  const studentQuery = 'SELECT * FROM students WHERE id = ?';
  const guardianQuery = 'SELECT * FROM guardians WHERE student_id = ?';
  const emergencyQuery = 'SELECT * FROM emergency_contacts WHERE student_id = ?';

  db.get(studentQuery, [studentId], (err, student) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    db.get(guardianQuery, [studentId], (err, guardian) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      db.all(emergencyQuery, [studentId], (err, emergencyContacts) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          student,
          guardian,
          emergencyContacts
        });
      });
    });
  });
});

// Update student
app.put('/api/students/:id', (req, res) => {
  const studentId = req.params.id;
  const { student, guardian, emergencyContacts } = req.body;

  db.serialize(() => {
    // Update student
    const studentQuery = `
      UPDATE students 
      SET name = ?, grade = ?, contact_phone = ?, contact_email = ?, enrollment_status = ?
      WHERE id = ?
    `;

    db.run(
      studentQuery,
      [student.name, student.grade, student.contactPhone, student.contactEmail, student.enrollmentStatus, studentId],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Failed to update student: ' + err.message });
        }

        // Update guardian
        if (guardian) {
          const guardianQuery = `
            UPDATE guardians 
            SET name = ?, relationship = ?, phone = ?, email = ?, address = ?
            WHERE student_id = ?
          `;

          db.run(
            guardianQuery,
            [guardian.name, guardian.relationship, guardian.phone, guardian.email, guardian.address, studentId],
            (err) => {
              if (err) {
                return res.status(500).json({ error: 'Failed to update guardian: ' + err.message });
              }
            }
          );
        }

        res.json({
          success: true,
          message: 'Student profile updated successfully'
        });
      }
    );
  });
});

// Delete student (also deletes related guardian and emergency contacts due to CASCADE)
app.delete('/api/students/:id', (req, res) => {
  const studentId = req.params.id;

  db.run('DELETE FROM students WHERE id = ?', [studentId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({
      success: true,
      message: 'Student profile deleted successfully'
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Open your browser and visit http://localhost:${PORT}`);
});
