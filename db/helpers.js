async function viewAllDepartments () {
    const departments = await db.query('SELECT * FROM department');
    console.table(departments);
    await startProgram();
}

async function viewAllRoles () {
    const roles = await db.query('SELECT * FROM role');
    console.table(roles);
    await startProgram();
}



module.exports = { startProgram, viewAllDepartments, viewAllRoles, viewAllEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole }
