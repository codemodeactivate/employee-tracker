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
