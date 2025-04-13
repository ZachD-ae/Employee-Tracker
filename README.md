# 🧑‍💼 Employee Tracker CLI

A command-line application for managing a company's departments, roles, and employees using Node.js and PostgreSQL.

---

## 📋 Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Schema](#schema)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## 📖 Description

The Employee Tracker is a Node.js CLI application that allows users to view and manage departments, roles, and employees in a company. It uses PostgreSQL as the database and provides a seamless experience directly from the command line.

---

## 🚀 Features

- View all departments, roles, and employees
- Add new departments, roles, and employees
- Update an employee’s role
- Modular query structure using ES modules
- PostgreSQL database integration
- Clean terminal output using `console.table`

---

## 🛠️ Installation

1. Clone the repo:
   ```bash
   git clone git@github.com:ZachD-ae/Employee-Tracker.git
   cd Employee-Tracker

 2. Install dependencies 
    ```bash 
    npm install inquirer pg dotenv
 
 3. Set up your .env file in the root:
DB_USER=postgres
DB_PASSWORD=your_password <------ make sure to change this to the password you use for postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=employee_db
 
 4. Create and seed your database
    ```bash
psql -U postgres -f db/schema.sql
psql -U postgres -f db/seeds.sql

---

## 💻 Usage

Run the application with:
    ```bash 
node index.js

You'll be prompted with a list of actions like viewing departments, adding roles, or updating employee roles. Data is automatically retrieved from or written to the PostgreSQL database.

---

## 🧬 Schema Diagram

department
- id (PK)
- name

role
- id (PK)
- title
- salary
- department (FK → department.id)

employee
- id (PK)
- first_name
- last_name
- role_id (FK → role.id)
- manager_id (FK → employee.id)

---

## 🧰 Technologies Used

Node.js
PostgreSQL
Inquirer.js
Dotenv
Console.table

---

## 🪪 License

This project is licensed under the MIT License.

---

## ✍️ Author
Zach Donels
GitHub @ZachD-ae

---

## 🎬 Demo Walkthrough

Follow this link to the watch A demo walkthrough. 

L📽️ [Click here to watch the walkthrough video](./demo/employee-tracker-demo.mp4)
