-- Connect to the correct database
\c employee_db;

-- Clear out old data (optional, for resets)
TRUNCATE employee, role, department RESTART IDENTITY CASCADE;

-- Insert Departments
INSERT INTO department (name)
VALUES 
  ('Engineering'),
  ('Human Resources');

-- Insert Roles
INSERT INTO role (title, salary, department)
VALUES
  ('Software Engineer', 95000.00, 1),
  ('DevOps Engineer', 105000.00, 1),
  ('HR Manager', 75000.00, 2);

-- Insert Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Alice', 'Smith', 1, NULL),    -- Software Engineer
  ('Bob', 'Johnson', 2, 1),       -- DevOps, reports to Alice
  ('Carol', 'Williams', 3, NULL), -- HR Manager
  ('Dave', 'Brown', 1, 1);        -- Software Engineer, reports to Alice
