// Require Statements
const mysql = require('mysql');
const inquirer = require('inquirer');


// MYSQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: 'root',
  database: 'nba_db',
});

// Connection to DB
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');

  
  start();
});

// Start of the Application
function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'View employees by manager',
        'View employees by department',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update employee manager',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;

        case 'View all employees':
          viewEmployees();
          break;

        case 'View employees by manager':
          viewEmployeesByManager();
          break;

        case 'View employees by department':
          viewEmployeesByDepartment();
          break;

        case 'Add a department':
          addDepartment();
          break;

        case 'Add a role':
          addRole();
          break;

        case 'Add an employee':
          addEmployee();
          break;

        case 'Update an employee role':
          updateEmployeeRole();
          break;

        case 'Update employee manager':
          updateEmployeeManager();
          break;

        case 'Delete a department':
          deleteDepartment();
          break;

        case 'Delete a role':
          deleteRole();
          break;

        case 'Delete an employee':
          deleteEmployee();
          break;

        case 'Exit':
          console.log('Exiting the app :().');
          connection.end();
          break;
      }
    });
}

//  View all departments
function viewDepartments() {
  connection.query('SELECT * FROM departments', (err, res) => {
    if (err) throw err;
    console.table(res);
    start();
  });
}

//  View all roles
function viewRoles() {
  connection.query(
    `SELECT roles.role_id, roles.title, roles.salary, departments.department_name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.department_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}
//  View all employees
function viewEmployees() {
  connection.query(
    `SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.department_name AS department, roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.role_id
    LEFT JOIN departments ON roles.department_id = departments.department_id
    LEFT JOIN employees AS managers ON employees.manager_id = managers.employee_id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    }
  );
}




