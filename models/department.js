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
