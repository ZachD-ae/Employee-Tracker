import pkg from 'pg';
const { Client } = pkg;

import dotenv from 'dotenv';
import inquirer from 'inquirer';
import * as departmentQueries from './queries/department.js';
import * as roleQueries from './queries/role.js';
import * as employeeQueries from './queries/employee.js';



dotenv.config();


const db = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

await db.connect();

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: ' What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit',
      ],
    },
  ]);

  switch (action) {
    case 'View All Departments':
      await viewDepartments();
      break;
    case 'View All Roles':
      await viewRoles();
      break;
    case 'View All Employees':
      await viewEmployees();
      break;
    case 'Add a Department':
      await addDepartment();
      break;
    case 'Add a Role':
      await addRole();
      break;
    case 'Add an Employee':
      await addEmployee();
      break;
    case 'Update an Employee Role':
      await updateEmployeeRole();
      break;
    case 'Exit':
      console.log(' Goodbye!');
      await db.end();
      process.exit();
  }

  await mainMenu(); // loop again
};

// Simple working query (placeholder)
const viewDepartments = async () => {
    const departments = await departmentQueries.getAllDepartments(db);
    console.table(departments);
  };

  const viewRoles = async () => {
    const roles = await roleQueries.getAllRoles(db);
    console.table(roles);
  };
  

  const viewEmployees = async () => {
    const employees = await employeeQueries.getAllEmployees(db);
    console.table(employees);
  };
  

// ADD DEPARTMENT, ROLE, EMPLOYEE, UPDATE EMPLOYEE ROLE

const addDepartment = async () => {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the new department:',
      },
    ]);
  
    try {
      await departmentQueries.addDepartment(db, name);
      console.log(` Department "${name}" added!`);
    } catch (err) {
      console.error(' Error adding department:', err.message);
    }
  };

  const addRole = async () => {
    const departments = await departmentQueries.getAllDepartments(db);
  
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for this role:',
        validate: (value) => !isNaN(value) || 'Enter a valid number',
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department:',
        choices: departments.map((dept) => ({
          name: dept.name,
          value: dept.id,
        })),
      },
    ]);
  
    try {
      await roleQueries.addRole(db, title, salary, departmentId);
      console.log(` Role "${title}" added to department ID ${departmentId}`);
    } catch (err) {
      console.error(' Error adding role:', err.message);
    }
  };

  const addEmployee = async () => {
    const roles = await roleQueries.getAllRoles(db);
    const employees = await employeeQueries.getAllEmployees(db);
  
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
      },
      {
        type: 'list',
        name: 'roleId',
        message: "Select the employee's role:",
        choices: roles.map((role) => ({
          name: `${role.title} (${role.department})`,
          value: role.id,
        })),
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Select the employee's manager:",
        choices: [
          { name: 'None', value: null },
          ...employees.map((emp) => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id,
          })),
        ],
      },
    ]);
  
    try {
      await employeeQueries.addEmployee(db, firstName, lastName, roleId, managerId);
      console.log(` Employee ${firstName} ${lastName} added!`);
    } catch (err) {
      console.error(' Error adding employee:', err.message);
    }
  };
  
  const updateEmployeeRole = async () => {
    const employees = await employeeQueries.getAllEmployees(db);
    const roles = await roleQueries.getAllRoles(db);
  
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employees.map((emp) => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id,
        })),
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role:',
        choices: roles.map((role) => ({
          name: `${role.title} (${role.department})`,
          value: role.id,
        })),
      },
    ]);
  
    try {
      await employeeQueries.updateEmployeeRole(db, employeeId, roleId);
      console.log(`Employee role updated successfully!`);
    } catch (err) {
      console.error('Error updating role:', err.message);
    }
  };

await mainMenu();
