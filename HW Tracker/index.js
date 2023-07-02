// const connection = require('./config/connection');
const inquirer = require('inquirer');
var figlet = require("figlet");

figlet("Hello World!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
const {
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
} = require('./controllers');


// Start 
// start();

// Start the application
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
    // .then((answers) => {
    //   const { menuChoice } = answers;

    //   switch (menuChoice) {
    //     case 'View all departments':
    //       viewDepartments();
    //       break;
    //     case 'View all roles':
    //       viewRoles();
    //       break;
    //     case 'View all employees':
    //       viewEmployees();
    //       break;
    //     case 'Add a department':
    //       addDepartment();
    //       break;
    //     case 'Add a role':
    //       addRole();
    //       break;
    //     case 'Add an employee':
    //       addEmployee();
    //       break;
    //     case 'Update an employee role':
    //       updateEmployeeRole();
    //       break;
    //     case 'Update an employee manager':
    //       updateEmployeeManager();
    //       break;
    //     case 'View employees by manager':
    //       viewEmployeesByManager();
    //       break;
    //     case 'View employees by department':
    //       viewEmployeesByDepartment();
    //       break;
    //     case 'Delete a department':
    //       deleteDepartment();
    //       break;
    //     case 'Delete a role':
    //       deleteRole();
    //       break;
    //     case 'Delete an employee':
    //       deleteEmployee();
    //       break;
    //     case 'View department budget':
    //       viewDepartmentBudget();
    //       break;
    //     case 'Exit':
    //       console.log('Disconnected');
    //       process.exit();
    //   }
    // });
}
start();