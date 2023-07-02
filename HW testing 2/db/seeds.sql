

-- Departments
INSERT INTO departments (department_name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Marketing'),
  ('Human Resources');

-- Roles
INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 85000.00, 1),
  ('Sales Representative', 55000.00, 1),
  ('Software Engineer', 90000.00, 2),
  ('QA Engineer', 70000.00, 2),
  ('Marketing Specialist', 65000.00, 3),
  ('HR Manager', 75000.00, 4);

-- NBA All-Star Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('Steph', 'Curry', 1, NULL),
  ('Allen', 'Iverson', 2, 1),
  ('Michael', 'Jordan', 3, 1),
  ('Lecry', 'James', 4, 2),
  ('Kobe', 'Bryant', 5, 3),
  ('Derrick', 'Rose', 6, NULL);