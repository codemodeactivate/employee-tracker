
const inquirer = require('inquirer');
const db = require('../config/connection');
const Table = require('cli-table3');

async function startProgram() {
    try {
      const answers = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Quit'
        ]
      });
      switch(answers.choice) {
        case 'View all departments':
          await viewAllDepartments();
          break;
        case 'View all roles':
          await viewAllRoles();
          break;
        case 'View all employees':
          await viewAllEmployees();
          break;
        case 'Add a department':
          await addDepartment();
          break;
        case 'Add a role':
          await addRole();
          break;
        case 'Add an employee':
          await addEmployee();
          break;
        case 'Update an employee role':
          await updateEmployeeRole();
          break;
        case 'Quit':
          console.log('Goodbye!');
          process.exit();
          break;
        default:
          console.log('Invalid choice');
          await startProgram();
          break;
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function viewAllDepartments() {
    try {
      const [rows] = await db.promise().query('SELECT name FROM department');
      const table = new Table({
        head: [{hAlign: 'center', content: 'Department Names', colSpan: 1}],
        colWidths: [30],
        style: {head: ['green']}
      });
      rows.forEach(row => {
        table.push([row.name]);
      });
      console.log(table.toString());
      await startProgram();
    } catch (error) {
      console.log('Error:', error);
    } finally {
      await startProgram();
    }
  }

  async function viewAllRoles() {
    try {
      const [rows] = await db.promise().query('SELECT title FROM role');
      const table = new Table({
        head: [{hAlign: 'center', content: 'Role Names', colSpan: 1}],
        colWidths: [30],
        style: {head: ['green']}
      });
      for (const row of rows) {
        table.push([row.title]);
      }
      console.log(table.toString());
      await startProgram();
    } catch (error) {
      console.log('Error:', error);
      await startProgram();
    }
  }

  async function viewAllEmployees() {
    try {
      const [rows] = await db.promise().query('SELECT first_name, last_name FROM employee');
      const table = new Table({
        head: [{hAlign: 'center', content: 'Employee Names', colSpan: 2}],
        colWidths: [30, 30],
        style: {head: ['green']}
      });
      for (const row of rows) {
        table.push([row.first_name, row.last_name]);
      }
      console.log(table.toString());
      await startProgram();
    } catch (error) {
      console.log('Error:', error);
    } finally {
      await startProgram();
    }

  }

  async function addDepartment() {
    try {
      const answers = await inquirer.prompt({
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:'
      });

      // Create a new department object
      const department = {
        name: answers.departmentName
      };

      // Insert the new department into the database
      const newDept = 'INSERT INTO department SET ?';
      const result = await db.promise().query(newDept, department);
      console.log(`Added department ${department.name} with ID ${result.insertId}`);

      await startProgram();
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function addRole() {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'roleTitle',
          message: 'Enter the title of the role:'
        },
        {
          type: 'input',
          name: 'roleSalary',
          message: 'Enter the salary for the role:'
        },
        {
          type: 'input',
          name: 'departmentId',
          message: 'Enter the department ID for the role:'
        }
      ]);
      // Code to add the role to the database
      await startProgram();
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function addEmployee() {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name of the employee:'
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name of the employee:'
        },
        {
          type: 'input',
          name: 'roleId',
          message: 'Enter the ID of the employee\'s role:'
        },
        {
          type: 'input',
          name: 'managerId',
          message: 'Enter the ID of the employee\'s manager:'
        }
      ]);
      // Code to add the employee to the database
      await startProgram();
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function updateEmployeeRole() {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'Enter the ID of the employee you want to update:'
        },
        {
          type: 'input',
          name: 'newRoleId',
          message: 'Enter the ID of the employee\'s new role:'
        }
      ]);
      // Code to update the employee's role in the database
      await startProgram();
    } catch (error) {
      console.log('Error:', error);
    }
  }





module.exports = { startProgram, viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole }
