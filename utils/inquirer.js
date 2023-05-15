const inquirer = require("inquirer");
const db = require("../config/connection");
const Table = require("cli-table3");

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
                "Delete an employee",
                "Delete a role",
                "Delete a department",
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
            case "Delete an employee":
                await deleteEmployee();
                break;
            case "Quit":
                console.log("Goodbye!");
                process.exit();
                break;
            default:
                console.log("Invalid choice");
                await startProgram();
                break;
        }
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
    deleteEmployee,


};
