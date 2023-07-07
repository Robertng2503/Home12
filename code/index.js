const inquirer = require("inquirer");
const mysql = require("mysql2");
require("console.table");


const db = mysql.createConnection({
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "123456789",
    database :"employee_tracker"
})
db.connect (function(err){
  console.log(err)
})
function mainMenu(){
    inquirer.prompt([
        {
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role'
          ]
        }
      ]).then(answers => {
      
        // Handle the selected action here
        if (answers.action == 'View all departments') {
            viewAlldepartment()
    
          // Implement logic for viewing all departments
        } else if (answers.action == 'View all roles') {
          viewAllrole()
          // Implement logic for viewing all roles
        } else if (answers.action == 'View all employees') {
          viewAllemployee()

          // Implement logic for viewing all employees
        } else if (answers.action == 'Add a department') {
            addDepartment();
          // Implement logic for adding a department
        } else if (answers.action == 'Add a role') {
          addarole()
          // Implement logic for adding a role
        } else if (answers.action == 'Add an employee') {
          addaemployee ()
          // Implement logic for adding an employee
        } else if (answers.action == 'Update an employee role') {
          // Implement logic for updating an employee's role
          updaterole()
        }
      })
}


  function viewAlldepartment (){
    console.log("viewing all departments!!")

    db.query("SELECT * FROM department;",function(err, result) {
        if(err){
         console.log(err)
        } else{
        console.table(result);
        mainMenu();
        }
    })
  }

  function viewAllrole (){
    console.log("viewing all roles!!")

    db.query("SELECT * FROM role;",function(err, result) {
        if(err){
         console.log(err)
        } else{
        console.table(result);
        mainMenu();
        }
    })
  }

  function viewAllemployee (){
    console.log("viewing all employees!!")

    db.query("SELECT * FROM employee;",function(err, result) {
        if(err){
         console.log(err)
        } else{
        console.table(result);
        mainMenu();
        }
    })
  }

  function addDepartment () {
    inquirer.prompt([
        {
            type:"inqut",
            name:"name",
            message:"What is the name of the new department?"
         }])
         .then(answers =>{
            db.query('INSERT INTO department(name) VALUES (?);',[answers.name],function(err, result) {
                if(err){
                 console.log(err)
                } else{
                console.log("Department has been added!");
                mainMenu();
                }
            })
         })
  }

  function addarole () {
    inquirer.prompt([
        {
            type:"input",
            name:"title",
            message:"What is the title of new role?"
         },
         {
          type:"input",
          name:"salary",
          message:"What is the salary of the new role?"
       },
       {
        type:"input",
        name:"department_id",
        message:"What is the department ID of the new role?"
     }
        ])
         .then(answers =>{
            db.query('INSERT INTO role(title,salary,department_id) VALUES (?,?,?);',[answers.title,answers.salary,answers.department_id],function(err, result) {
                if(err){
                 console.log(err)
                } else{
                console.log("role has been added!");
                mainMenu();
                }
            })
         })
  }

  function addaemployee () {
    inquirer.prompt([
        {
            type:"input",
            name:"first_name",
            message:"What is the first name of new employee?"
         },
         {
          type:"input",
          name:"last_name",
          message:"What is the last name of the new employee?"
       },
       {
        type:"input",
        name:"role_id",
        message:"What is the role ID of the new employee?"
     },
     {
      type:"input",
      name:"manager_id",
      message:"What is the manager ID of the new employee?"
   }
        ])
         .then(answers =>{
          if(answers.manager_id == ""){
            answers.manager_id = null
          }
            db.query('INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?);',[answers.first_name,answers.last_name,answers.role_id,answers.manager_id],function(err, result) {
                if(err){
                 console.log(err)
                } else{
                console.log("employee has been added!");
                mainMenu();
                }
            })
         })
  }

  function updaterole () {
    inquirer.prompt([
        {
            type:"input",
            name:"id",
            message:"What is theid of the employee that you want to update?"
         },
         {
          type:"input",
          name:"role_id",
          message:"What is the role id that you want to give this employee?"
       },
        ])
         .then(answers =>{
            db.query('UPDATE employee SET role_id = ? WHERE id = ?;',[answers.role_id, answers.id],function(err, result) {
                if(err){
                 console.log(err)
                } else{
                console.log("employee has been updated!");
                mainMenu();
                }
            })
         })
  }


  mainMenu();