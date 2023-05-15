const inquirer = require("inquirer");
const db = require("../config/connection");
const Table = require("cli-table3");
const uuid = require ("uuid");
async function startProgram() {
    try {
        const answers = await inquirer.prompt({
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "View department budgets",
                "Quit",
            ],
        });
        switch (answers.choice) {
            case "View all departments":
                await viewAllDepartments();
                break;
            case "View all roles":
                await viewAllRoles();
                break;
            case "View all employees":
                await viewAllEmployees();
                break;
            case "Add a department":
                await addDepartment();
                break;
            case "Add a role":
                await addRole();
                break;
            case "Add an employee":
                await addEmployee();
                break;
            case "Update an employee role":
                await updateEmployeeRole();
                break;
            case "View department budgets":
                await viewDepartmentBudget();
                break;

            case "Quit":
                console.log("Goodbye!");
                process.exit();

            default:
                console.log("Invalid choice");
                await startProgram();
                break;
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

async function viewAllDepartments() {
    try {
        const [rows] = await db.promise().query("SELECT name FROM department");
        const table = new Table({
            head: [
                { hAlign: "center", content: "Department Names", colSpan: 1 },
            ],
            colWidths: [30],
            style: { head: ["green"] },
        });
        rows.forEach((row) => {
            table.push([row.name]);
        });
        console.log(table.toString());
        await startProgram();
    } catch (error) {
        console.log("Error:", error);
    } finally {
        await startProgram();
    }
}

async function viewAllRoles() {
    try {
        const [rows] = await db.promise().query("SELECT title FROM role");
        const table = new Table({
            head: [{ hAlign: "center", content: "Role Names", colSpan: 1 }],
            colWidths: [30],
            style: { head: ["green"] },
        });
        for (const row of rows) {
            table.push([row.title]);
        }
        console.log(table.toString());
        await startProgram();
    } catch (error) {
        console.log("Error:", error);
        await startProgram();
    }
}

async function viewAllEmployees() {
    try {
        const [rows] = await db
            .promise()
            .query("SELECT first_name, last_name FROM employee");
        const table = new Table({
            head: [{ hAlign: "center", content: "Employee Names", colSpan: 2 }],
            colWidths: [30, 30],
            style: { head: ["green"] },
        });
        for (const row of rows) {
            table.push([row.first_name, row.last_name]);
        }
        console.log(table.toString());
        await startProgram();
    } catch (error) {
        console.log("Error:", error);
    } finally {
        await startProgram();
    }
}

async function addDepartment() {
    try {
        const answers = await inquirer.prompt({
            type: "input",
            name: "departmentName",
            message: "Enter the name of the department:",
        });

        // Create a new department object
        const department = {
            name: answers.departmentName,
        };

        // Insert the new department into the database
        const newDept = "INSERT INTO department SET ?";
        const result = await db.promise().query(newDept, department);
        console.log(
            `Added department ${department.name} with ID ${result.insertId}`
        );

        await startProgram();
    } catch (error) {
        console.log("Error:", error);
    }
}

async function addRole() {
  try {
    // Fetch the departments from the database
    const [departments] = await db.promise().query("SELECT id, name FROM department");

    // Create an array of choices for the department prompt
    const departmentChoices = departments.map((department) => ({
      name: department.name,
      value: department.id,
    }));

    // Ask the user for the role details, including the department
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "Enter the title of the role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for the role:",
      },
      {
        type: "list",
        name: "departmentId",
        message: "Select a department:",
        choices: departmentChoices,
      },
    ]);

    // Insert the new role into the database
    const newRole = "INSERT INTO role SET ?";
    const result = await db.promise().query(newRole, {
      title: answers.roleTitle,
      salary: answers.roleSalary,
      department_id: answers.departmentId,
    });

    console.log(`Added role ${answers.roleTitle} with ID ${result.insertId}`);
    await startProgram();
  } catch (error) {
    console.log("Error:", error);
    await startProgram();
  }
}


async function addEmployee() {
    try {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter the first name of the employee:",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter the last name of the employee:",
            },
            {
                type: "input",
                name: "roleId",
                message: "Enter the ID of the employee's role:",
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter the ID of the employee's manager:",
            },
        ]);
        // Code to add the employee to the database
        const newEmployee = "INSERT INTO employee SET ?";
        const result = await db.promise().query(newEmployee, {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: answers.roleId,
            manager_id: answers.managerId,
        });
        console.log(
            `Added employee ${answers.firstName} ${answers.lastName} with ID ${result.insertId}`
        );
        await startProgram();
    } catch (error) {
        console.log("Error:", error);
    }
}

async function updateEmployeeRole() {
    try {
        const [roles] = await db.promise().query("SELECT id, title FROM role");
        const roleChoices = roles.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        const [departments] = await db
          .promise()
          .query("SELECT id, name FROM department");
        const departmentChoices = departments.map((department) => ({
          name: department.name,
          value: department.id,
        }));

        const answers = await inquirer.prompt([
          {
            type: "list",
            name: "roleId",
            message: "Select the role you want to update:",
            choices: roleChoices,
          },
          {
            type: "input",
            name: "newRoleTitle",
            message: "Enter the new title for the role:",
          },
          {
            type: "input",
            name: "newSalary",
            message: "Enter the new salary for the role:",
          },
          {
            type: "list",
            name: "departmentId",
            message: "Select the department for the role:",
            choices: departmentChoices,
          },
        ]);

        const updateRole = "UPDATE role SET title = ?, salary = ?, department_id = ? WHERE id = ?";
        await db.promise().query(updateRole, [
          answers.newRoleTitle,
          answers.newSalary,
          answers.departmentId,
          answers.roleId,
        ]);

        console.log("Role updated successfully");
        await startProgram();
      } catch (error) {
        console.log("Error:", error);
      }
    }

    async function viewDepartmentBudget() {
        try {
          const [departments] = await db
            .promise()
            .query("SELECT id, name FROM department");
          const departmentChoices = departments.map((department) => ({
            name: department.name,
            value: department.id,
          }));

          const answers = await inquirer.prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Select the department to view its budget:",
              choices: departmentChoices,
            },
          ]);

          const viewDepartmentBudget = `
            SELECT d.name AS department, SUM(r.salary) AS budget
            FROM employee e
            INNER JOIN role r ON e.role_id = r.id
            INNER JOIN department d ON r.department_id = d.id
            WHERE d.id = ?
            GROUP BY d.id`;

          const [rows] = await db.promise().query(viewDepartmentBudget, [
            answers.departmentId,
          ]);

          const table = new Table({
            head: [
              { hAlign: "center", content: "Department", colSpan: 1 },
              { hAlign: "center", content: "Budget", colSpan: 1 },
            ],
            colWidths: [30, 30],
            style: { head: ["green"] },
          });

          rows.forEach((row) => {
            table.push([row.department, row.budget]);
          });

          console.log(table.toString());
          await startProgram();
        } catch (error) {
          console.log("Error:", error);
        }
      }










module.exports = {
    startProgram,
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    viewDepartmentBudget,
};
