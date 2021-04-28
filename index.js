const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');



// create the connection information for the sql database

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "password",
    database: "employeeDB"
});


// connection 
connection.connect(err => {
    if (err) throw err;
    initPrompt();
});

// inital prompt
const initPrompt = () => {
    inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Employees','View Roles', 'View Departments', 'Add EE', 'Add Role?','Add Department?', 'Update EE', ],
        })
        .then((answer) => {
            // based on their answer, either add,remove,add, update or view functions
            switch(answer.choice){
                case "View Employees":
                viewEmployee();
                break;
        
              case "View Roles":
                  viewRoles();
                break;
              case "View Departments":
                  viewDepartments();
                break;
              
              case "Add EE":
                    addEmployee();
                  break;
    
              case "Update EE":
                    updateEmployee();
                  break;
          
                case "Add Role?":
                    addRole();
                  break;
          
                case "Add Department?":
                    addDepartment();
                  break;
        
                }
        })
    }
            
// function view employee
function viewEmployee() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ' ,manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id =department.id LEFT JOIN employee manager on manager.id= employee.manager_id;", 
    function(err, res) {
        console.log(res);
      if (err) throw err
      console.table(res)
      initPrompt()
  })
}
// view roles
function viewRoles() {
    connection.query("SELECT  employee.first_name, employee.last_name, role.title AS Title FROM employee  JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    initPrompt()
    })
  }

//   view departments
function viewDepartments() {
    connection.query("SELECT department.id, department.name, SUM(role.salary) AS salary FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name;", 
    function(err, res) {
      console.log(res);
        if (err) throw err
      console.table(res)
      initPrompt()
    })
  }
var role=[];
function findRole(){
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          role.push(res[i].title);
        }
    
      })
      return role;
    }
    var manager = [];
    function findManager() {
      connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
          manager.push(res[i].first_name);
        }
    
      })
      return manager;
    }

//   add employee
function addEmployee() { 
    inquirer.prompt([
        {
          name: "firstName",
          type: "input",
          message: "Enter the employee's first name "
        },
        {
          name: "lastName",
          type: "input",
          message: "Enter the employee's last name "
        },
        {
          name: "role",
          type: "list",
          message: "What is the employee role? ",
          choices: findRole()
        },
        {
            name: "choice",
            type: "rawlist",
            message: "Whats the managers name?",
            choices: findManager()
        }
    ]).then(function (answer) {
        var roleById = findRole().indexOf(answer.role) + 1
        var managerById = findManager().indexOf(answer.choice) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            manager_id: managerById,
            role_id: roleById
            
        }, function(err,answer){
            if (err) throw err
            console.log(answer)
            initPrompt()
        })
  
    })
  }
//   update employee
function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "id",
            type: "input",
            
            message: "What is the id of the employee? ",
          },
          {
            name: "role",
            type: "input",
            message: "What is the role id?",
          },
      ]).then(function(answer) {
        connection.query("UPDATE employee SET role_id=? WHERE id=?", 
        [
            answer.role,answer.id
        ],
        function(err){
            if (err) throw err
            console.table(answer)
            initPrompt()
        })
  
    });
  });

  }
//   add role
function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } ,
          {
            name: "DepartmentId",
            type: "input",
            message: "What is the department id?"
  
          } 

      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
                department_id:res.DepartmentId
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  initPrompt();
              }
          )
  
      });
    });
    }
// add department
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                initPrompt();
            }
        )
    })
  }
