const inquirer = require("inquirer")

const question = () => {
    return inquirer
    .prompt([
        {
            type: "rawlist",
            name: "options",
            message: "Please select an option related to your request",
            choices: ["Departments", "Employees", "Roles"]
        }
    ])
}

const departments = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "departmentOption",
            message: "What would you like to do with departments?",
            choices: ["(1) View all departments", "(2) Add a department", "(3) Remove department", "(4) View total utilized budget for a department"]
        }
    ])
    .then(choice => {
        console.log(choice)
    })
}

const employees = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "employeeOption",
            message: "What would you like to do with employees",
            choices: ["(1) View all employees", "(2) Add a employee", "(3) Remove Employee", "(4) View employees by manager", "(5) View employees by department"]
        }
    ])
    .then(choice => {
        console.log(choice)
    })
}

const roles = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "roleOption",
            message: "What would you like to do with roles?",
            choices: ["(1) View all roles", "(2) Add a role", "(3) Remove a role"]
        }
    ])
    .then(choice => {
        console.log(choice)
    })
}

question()
    .then(answer => {
        if(answer.options === "Departments"){departments()}
        if(answer.options === "Employees"){employees()}
        if(answer.options === "Roles"){roles()}
    })
    