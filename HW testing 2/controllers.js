const connection = require('./config/connection');
const inquirer = require('inquirer');

function start() {
  inquirer
    .prompt({
      type: 'list',
      name: 'menuChoice',
      message: 'What do you want to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        'View employees by manager',
        'View employees by department',
        'Delete a department',
        'Delete a role',
        'Delete an employee',
        'View department budget',
        'Exit',
      ],
    })
    .then((answers) => {
      const { menuChoice } = answers;

      switch (menuChoice) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
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
        case 'Update an employee manager':
          updateEmployeeManager();
          break;
        case 'View employees by manager':
          viewEmployeesByManager();
          break;
        case 'View employees by department':
          viewEmployeesByDepartment();
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
        case 'View department budget':
          viewDepartmentBudget();
          break;
        case 'Exit':
          console.log('Disconnected');
          process.exit();
      }
    });
}

// function start() {
//   inquirer
//     .prompt({
//       type: 'list',
//       name: 'menuChoice',
//       message: 'What do you want to do?',
//       choices: [
//         'View all departments',
//         'View all roles',
//         'View all employees',
//         'Add a department',
//         'Add a role',
//         'Add an employee',
//         'Update an employee role',
//         'Update an employee manager',
//         'View employees by manager',
//         'View employees by department',
//         'Delete a department',
//         'Delete a role',
//         'Delete an employee',
//         'View department budget',
//         'Exit',
//       ],
//     })};

// View all departments
function viewDepartments() {
  connection.query('SELECT * FROM departments', (error, results) => {
    if (error) throw error;
    console.log('\n');
    console.table(results);
    start();
  });
}

// View all roles
function viewRoles() {
  connection.query('SELECT * FROM roles', (error, results) => {
    if (error) throw error;
    console.log('\n');
    console.table(results);
    start();
  });
}

// View all employees
function viewEmployees() {
  connection.query('SELECT * FROM employees', (error, results) => {
    if (error) throw error;
    console.log('\n');
    console.table(results);
    start();
  });
}

// Add a department
function addDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department:',
    })
    .then((answers) => {
      const { departmentName } = answers;
      connection.query('INSERT INTO departments SET ?', { name: departmentName }, (error) => {
        if (error) throw error;
        console.log('Department added!');
        start();
      });
    });
}

// Add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role selected:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role selected:',
      },
      {
        type: 'input',
        name: 'departmentId',
        message: 'Enter the department ID for the role selected:',
      },
    ])
    .then((answers) => {
      const { title, salary, departmentId } = answers;
      connection.query(
        'INSERT INTO roles SET ?',
        { title: title, salary: salary, department_id: departmentId },
        (error) => {
          if (error) throw error;
          console.log('Role added!');
          start();
        }
      );
    });
}

// Add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the role ID for the employee:',
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the manager ID for the employee:',
      },
    ])
    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;
      connection.query(
        'INSERT INTO employees SET ?',
        { first_name: firstName, last_name: lastName, role_id: roleId, manager_id: managerId },
        (error) => {
          if (error) throw error;
          console.log('Employee added!');
          start();
        }
      );
    });
}

// Update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to update:',
      },
      {
        type: 'input',
        name: 'roleId',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answers) => {
      const { employeeId, roleId } = answers;
      connection.query(
        'UPDATE employees SET role_id = ? WHERE id = ?',
        [roleId, employeeId],
        (error) => {
          if (error) throw error;
          console.log('Employee role updated!');
          start();
        }
      );
    });
}

// Update an employee manager
function updateEmployeeManager() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeId',
        message: 'Enter the ID of the employee to update:',
      },
      {
        type: 'input',
        name: 'managerId',
        message: 'Enter the new manager ID for the employee:',
      },
    ])
    .then((answers) => {
      const { employeeId, managerId } = answers;
      connection.query(
        'UPDATE employees SET manager_id = ? WHERE id = ?',
        [managerId, employeeId],
        (error) => {
          if (error) throw error;
          console.log('Employee manager updated!');
          start();
        }
      );
    });
}

// View employees by manager
function viewEmployeesByManager() {
  inquirer
    .prompt({
      type: 'input',
      name: 'managerId',
      message: 'Enter the ID of the manager:',
    })
    .then((answers) => {
      const { managerId } = answers;
      connection.query(
        'SELECT * FROM employees WHERE manager_id = ?',
        [managerId],
        (error, results) => {
          if (error) throw error;
          console.log('\n');
          console.table(results);
          start();
        }
      );
    });
}

// View employees by department
function viewEmployeesByDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentId',
      message: 'Enter the ID of the department:',
    })
    .then((answers) => {
      const { departmentId } = answers;
      connection.query(
        'SELECT employees.*, roles.title AS role_title FROM employees LEFT JOIN roles ON employees.role_id = roles.id WHERE roles.department_id = ?',
        [departmentId],
        (error, results) => {
          if (error) throw error;
          console.log('\n');
          console.table(results);
          start();
        }
      );
    });
}

// Delete a department
function deleteDepartment() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentId',
      message: 'Enter the ID of the department to delete:',
    })
    .then((answers) => {
      const { departmentId } = answers;
      connection.query('DELETE FROM departments WHERE id = ?', [departmentId], (error) => {
        if (error) throw error;
        console.log('Department deleted!');
        start();
      });
    });
}

//  Delete a role
function deleteRole() {
  inquirer
    .prompt({
      type: 'input',
      name: 'roleId',
      message: 'Enter the ID of the role to delete:',
    })
    .then((answers) => {
      const { roleId } = answers;
      connection.query('DELETE FROM roles WHERE id = ?', [roleId], (error) => {
        if (error) throw error;
        console.log('Role deleted!');
        start();
      });
    });
}

// Delete an employee
function deleteEmployee() {
  inquirer
    .prompt({
      type: 'input',
      name: 'employeeId',
      message: 'Enter the ID of the employee to delete:',
    })
    .then((answers) => {
      const { employeeId } = answers;
      connection.query('DELETE FROM employees WHERE id = ?', [employeeId], (error) => {
        if (error) throw error;
        console.log('Employee deleted!');
        start();
      });
    });
}

// View department budget
function viewDepartmentBudget() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentId',
      message: 'Enter the ID of the department:',
    })
    .then((answers) => {
      const { departmentId } = answers;
      connection.query(
        'SELECT SUM(salary) AS total_budget FROM employees JOIN roles ON employees.role_id = roles.id WHERE roles.department_id = ?',
        [departmentId],
        (error, results) => {
          if (error) throw error;
          console.log('\n');
          console.table(results);
          start();
        }
      );
    });
}
start();

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateEmployeeManager,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewDepartmentBudget,
};

