STUDENTHUB - STUDENT MANAGEMENT SYSTEM

FEATURES
- Modern blue responsive design with icons and emoji labels.
- Dashboard with student count.
- CRUD pages for List, Search, Insert, Update, and Delete.
- Student number dropdowns are loaded from MySQL on Search, Update, and Delete pages.
- Selecting a student number automatically shows/fills the saved student details.
- After inserting a student, the page displays a success message and the inserted details.
- Shared responsive stylesheet: public/styles.css

DATABASE REQUIREMENTS
Database: school
Table: student
Columns: sno INT, Name VARCHAR(20), Total INT

If needed, run in MySQL Workbench:
CREATE DATABASE IF NOT EXISTS school;
USE school;
CREATE TABLE IF NOT EXISTS student (
  sno INT PRIMARY KEY,
  Name VARCHAR(20),
  Total INT
);

SETUP
1. Open the project folder in VS Code.
2. Check the MySQL password in server.js and change it if your root password differs.
3. In the VS Code terminal run: npm install
4. Start the server: npm start
5. Open http://localhost:3000/

IMPORTANT
- This project uses mysql2 and the exact database columns sno, Name, Total.
- It does not use student_id or student_name.
- Keep MySQL running before starting the server.


All pages now share the StudentHub dashboard sidebar layout. Open index.html, insert.html, list.html, listOne.html, update.html, and delete.html through the Express server.
