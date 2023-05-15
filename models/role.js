const db = require("../config/connection");
const Table = require("cli-table3");

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

  