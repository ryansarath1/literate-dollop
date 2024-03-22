const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Winners@123",
  database: "employee_db",
}, console.log("connected to database"));

function mainmenu() {
  const logotext = logo({
    name: "Employee Tracker"
  }).render();
  console.log(logotext);

  inquirer
    .prompt([{
      type: "list",
      name: "openingMessage",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee",
        "Quit",
      ],
    }])
    .then((userchoice) => {
      let choice = userchoice.openingMessage;
      switch (choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add a Department":
          addADepartment();
          break;
        case "Add a Role":
          addARole();
          break;
        case "Add an Employee":
          addAEmployee();
          break;
        case "Update Employee":
          updateEmployee();
          break;
        case "Quit":
          quit();
          break;
        default:
          console.log("Something went wrong");
          break;
      }
    });
}

function viewAllDepartments() {
  db.query("SELECT id AS department_id, dept_name AS department_name FROM department_list;", function (err, res) {
    err ? console.error(err) : console.table(res);
    mainmenu();
  });
}
function viewAllRoles() {
  db.query("SELECT r.id AS role_id, r.title AS job_title, r.salary, d.dept_name AS department_name FROM role_list r JOIN department_list d ON r.department_list_id = d.id;", function (err, res) {
    err ? console.error(err) : console.table(res);
    mainmenu();
  });
}

function viewAllEmployees() {
  db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.dept_name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee_list e JOIN role_list r ON e.role_list_id = r.id JOIN department_list d ON r.department_list_id = d.id LEFT JOIN employee_list m ON e.manager_id = m.id;", function (err, res) {
    err ? console.error(err) : console.table(res);
    mainmenu();
  });
}
function addADepartment() {
  inquirer.prompt([{
    type: "input",
    name: "adddepartment",
    message: "Enter department name"
  }]).then((response) => {
    let departmenttitle = response.adddepartment;
    db.query("INSERT INTO department_list (dept_name) VALUES (?)", [departmenttitle], function (err, res) {
      err ? console.error(err) : viewAllDepartments();
    });
  });
}

function addARole() {
  db.query("SELECT * FROM department_list", function (err, results) {
    if (err) {
      console.log(err);
      return workTime();
    }
    const departmentChoices = results.map((department) => ({
      value: department.id,
      name: department.dept_name,
    }));
    inquirer.prompt([{
        type: "input",
        name: "title",
        message: "Enter role title:",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter role salary:",
      },
      {
        type: "list",
        name: "department",
        message: "Select department:",
        choices: departmentChoices,
      },
    ]).then((response) => {
      const {
        title,
        salary,
        department
      } = response;
      db.query("INSERT INTO role_list (title, salary, department_list_id) VALUES (?, ?, ?)", [title, salary, department], function (err, res) {
        err ? console.error(err) : viewAllRoles();
      });
    });
  });
}
function addAEmployee() { db.query("SELECT * FROM role_list", function (err, results) {
  if (err) {
    console.error(err);
    return mainmenu(); 
  }
  const roleChoices = results.map((role) => ({
    value: role.id,
    name: role.title,
  }));
  inquirer.prompt([{
      type: "input",
      name: "first_name",
      message: "Enter employee's first name:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter employee's last name:",
    },
    {
      type: "list",
      name: "role_id",
      message: "Select employee's role:",
      choices: roleChoices,
    },
  ]).then((response) => {
    const {
      first_name,
      last_name,
      role_id
    } = response;
    db.query("INSERT INTO employee_list (first_name, last_name, role_list_id) VALUES (?, ?, ?)", [first_name, last_name, role_id], function (err, res) {
      if (err) {
        console.error(err);
      } else {
        console.log("Employee added successfully!");
      }
      mainmenu(); 
    });
  });
});
}
function updateEmployee() {
  db.query("SELECT * FROM employee_list", function (err, results) {
    if (err) {
      console.error(err);
      return mainmenu();
    }

    const employeeChoices = results.map((employee) => ({
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    }));
    inquirer.prompt([{
      type: "list",
      name: "employee_id",
      message: "Select an employee to update:",
      choices: employeeChoices,
    }]).then((response) => {
      const {
        employee_id
      } = response;
      inquirer.prompt([{
          type: "input",
          name: "first_name",
          message: "Enter employee's new first name:",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter employee's new last name:",
        },
      ]).then((updatedData) => {
        const {
          first_name,
          last_name
        } = updatedData;
        db.query("UPDATE employee_list SET first_name = ?, last_name = ? WHERE id = ?", [first_name, last_name, employee_id], function (err, res) {
          if (err) {
            console.error(err);
          } else {
            console.log("Employee updated successfully!");
          }
          mainmenu();
        });
      });
    });
  });
}
function quit() {
  console.log("Goodbye");
  process.exit();
}
mainmenu();