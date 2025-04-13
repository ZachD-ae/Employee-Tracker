export const getAllDepartments = async (db) => {
    const result = await db.query('SELECT * FROM department');
    return result.rows;
  };
  
  export const addDepartment = async (db, name) => {
    await db.query('INSERT INTO department (name) VALUES ($1)', [name]);
  };