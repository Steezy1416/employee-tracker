const inquirer = require("inquirer")

const question = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "options",
            message: "Please select an option related to your request",
            choices: ["Departments", "Employees", "Roles", "Exit"]
        }
    ])
    .then(answer => {
        if(answer.options === "Departments"){departments()}
        if(answer.options === "Employees"){employees()}
        if(answer.options === "Roles"){roles()}
    })
}

const departments = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "departmentOption",
            message: "What would you like to do with departments?",
            choices: ["(1) View all departments", "(2) Add a department", "(3) Remove department", "(4) View total utilized budget for a department"]
        },
        {
            type: "input",
            name: "addDepartmentName",
            message: "What is the name of the new department?",
            when: ({departmentOption}) => {
                const option = departmentOption.split(/[()]+/)
                if(option[1] === "2"){
                    return true
                }
            }
        },
        {
            type: "input",
            name: "removeDepartmentName",
            message: "Which department would you like to remove?",
            when: ({departmentOption}) => {
                const option = departmentOption.split(/[()]+/)
                if(option[1] === "3"){
                    return true
                }
            }
        },
        {
            type: "input",
            name: "totalDepartmentName",
            message: "Which department would you like to view its total utilized budged?",
            when: ({departmentOption}) => {
                const option = departmentOption.split(/[()]+/)
                if(option[1] === "4"){
                    return true
                }
            }
        },
    ])
    .then(answer => {
        console.log(answer)
        question()
    })
    
}

const employees = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "employeeOption",
            message: "What would you like to do with employees",
            choices: ["(1) View all employees", "(2) Add a employee", "(3) Update employee role", "(4) Remove Employee", "(5) View employees by manager", "(6) View employees by department"]
        },
        //Start of add employee
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
            when: ({employeeOption}) => {
                const option = employeeOption.split(/[()]+/)
                if(option[1] === "2"){
                    return true
                }
            }
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
            when: ({firstName}) => firstName
        },
        {
            type: "input",
            name: "employeeRole",
            message: "What is the employee's role?",
            when: ({lastName}) => lastName
        },
        {
            type: "input",
            name: "employeeDepartment",
            message: "What is the employee's department?",
            when: ({employeeRole}) => employeeRole
        },
        //end of add employee

        //start of update employee role
        {
            type: "input",
            name: "employeeNameUpt",
            message: "Which employee's role would you like to update?",
            when: ({employeeOption}) => {
                const option = employeeOption.split(/[()]+/)
                if(option[1] === "3"){
                    return true
                }
            }
        },
        {
            type: "input",
            name: "employeeDepartmentUpt",
            message: "What is the updated employees role?",
            when: ({employeeNameUpt}) => employeeNameUpt
        },
        //end of update employee role

        //start of remove employee
        {
            type: "input",
            name: "removeName",
            message: "Which employee would you like to remove?",
            when: ({employeeOption}) => {
                const option = employeeOption.split(/[()]+/)
                if(option[1] === "4"){
                    return true
                }
            }
        },
        //end of remove employee
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
        },
        {
            type: "input",
            name: "roleName",
            message: "What is the name of the role?",
            when: ({roleOption}) => {
                const option = roleOption.split(/[()]+/)
                if(option[1] === "2"){
                    return true
                }
            }
        },
        {
            type: "input",
            name: "roleSalary",
            message: "What is the salary of the role",
            when: ({roleName}) => roleName
        },
        {
            type: "input",
            name: "roleDepartment",
            message: "What department does the role belong to?",
            when: ({roleSalary}) => roleSalary
        },
        {
            type: "input",
            name: "roleDeletion",
            message: "Which role would you like to remove?",
            when: ({roleOption}) => {
                const option = roleOption.split(/[()]+/)
                if(option[1] === "3"){
                    return true
                }
            }
        },
    ])
    .then(answer => {
        console.log(answer)
        question()
    })
    
}

question()
    