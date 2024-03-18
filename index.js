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

}
mainmenu()