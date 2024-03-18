const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
require("console.table");

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "Winners@123",
      database: "employee_db",
    },
    console.log("connected to database")
);
function mainmenu(){
    const logotext=logo({
        name:"Employee Tracker"
    }).render()
    console.log(logotext)

    inquirer
    .prompt([
      {
        type: "list",
        name: "openingMessage",
        message: "What would you like to do?",
        choices: [
          "viewAllEmployees",
          "viewAllDepartments",
          "viewAllRoles",
          "addADepartment",
          "addARole",
          "addAEmployee",
          "updateEmployee",          
          "quit",
        ],
      },
    ]).then((userchoice)=>{
        let choice=userchoice.openingMessage
        console.log(choice)
        switch (choice) {
            case "viewAllEmployees":
              viewAllEmployees();
              break;
            case "viewAllDepartments":
              viewAllDepartments();
              break;
            case "viewAllRoles":
              viewAllRoles();
              break;
            case "addADepartment":
              addADepartment();
              break;
            case "addARole":
              addARole();
              break;
            case "addAEmployee":
              addAEmployee();
              break;
            case "updateEmployee":
              updateEmployee();
              break;       
            case "quit":
              quit();
              break;
            default:
              console.log("somethings wrong with you");
              break;
          }
    })

}
function viewAllDepartments(){
    db.query("SELECT id AS department_id, dept_name AS department_name FROM department_list;", function(err, res) {
        err? console.error(err): console.table(res), mainmenu()
    })

}
function viewAllRoles(){
    db.query("SELECT r.id AS role_id,  r.title AS job_title,  r.salary,  d.dept_name AS department_name FROM   role_list r JOIN   department_list d ON r.department_list_id = d.id;",function(err, res){
        err? console.error(err): console.table(res), mainmenu()
    })

}
function viewAllEmployees(){
    db.query("SELECT  e.id AS employee_id,  e.first_name,  e.last_name,  r.title AS job_title,  d.dept_name AS department,  r.salary,  CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM   employee_list e JOIN   role_list r ON e.role_list_id = r.id JOIN   department_list d ON r.department_list_id = d.id LEFT JOIN   employee_list m ON e.manager_id = m.id;",function(err, res){
        err? console.error(err): console.table(res), mainmenu()
    })

}
function addADepartment(){

}
function addARole(){

}
function addAEmployee(){

}
function updateEmployee(){

}
function quit(){
    console.log("Goodbye")
    process.exit()

}
mainmenu()