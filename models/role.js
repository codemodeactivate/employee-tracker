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

