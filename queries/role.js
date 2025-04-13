export const getAllRoles = async (db) => {
    const result = await db.query(`
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      LEFT JOIN department ON role.department = department.id
    `);
    return result.rows;
  };
  
  export const addRole = async (db, title, salary, departmentId) => {
    await db.query(
      `INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)`,
      [title, salary, departmentId]
    );
  };