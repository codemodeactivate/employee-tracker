const db = require("../config/connection");
const Table = require("cli-table3");

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

    async function deleteEmployee() {
        try {
          const answer = await inquirer.prompt([
            {
              type: 'input',
              name: 'employeeId',
              message: 'Enter the ID of the employee you want to delete:'
            }
          ]);

          // Code to delete the employee from the database
          await db.promise().query('DELETE FROM employee WHERE id = ?', [answer.employeeId]);

          console.log('Employee deleted successfully.');
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }

      module.exports = {
        viewAllEmployees,
        addEmployee,
        updateEmployeeRole,
        deleteEmployee,
      }
