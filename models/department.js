const db = require("../config/connection");
const Table = require("cli-table3");

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
