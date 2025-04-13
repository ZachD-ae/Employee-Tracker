export const getAllEmployees = async (db) => {
    const result = await db.query(`
      SELECT e.id, e.first_name, e.last_name, role.title AS job_title,
        department.name AS department, role.salary,
        CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department ON role.department = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `);
    return result.rows;
  };
  
  export const addEmployee = async (db, firstName, lastName, roleId, managerId) => {
    await db.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`,
      [firstName, lastName, roleId, managerId || null]
    );
  };

  export const updateEmployeeRole = async (db, employeeId, newRoleId) => {
    await db.query(
      `UPDATE employee SET role_id = $1 WHERE id = $2`,
      [newRoleId, employeeId]
    );
  };
