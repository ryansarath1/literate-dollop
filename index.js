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

}
function viewAllRoles(){

}
function viewAllEmployees(){

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