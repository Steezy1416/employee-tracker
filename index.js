const inquirer = require("inquirer")
const { getDepartmentNames, departmentHandler} = require("./functions/department")
const { getEmployeeNames} = require("./functions/employee")
const { getRoleTitles} = require("./functions/role")

let departmentNames = []
let employeeNames = []
let roleNames = []

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
            if (answer.options === "Departments") { departments() }
            if (answer.options === "Employees") { employees() }
            if (answer.options === "Roles") { roles() }
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
                when: ({ departmentOption }) => {
                    const option = departmentOption.split(/[()]+/)
                    if (option[1] === "2") {
                        return true
                    }
                }
            },
            {
                type: "rawlist",
                name: "removeDepartmentName",
                message: "Which department would you like to remove?",
                choices: departmentNames,
                when: ({ departmentOption }) => {
                    const option = departmentOption.split(/[()]+/)
                    if (option[1] === "3") {
                        return true
                    }
                }
            },
            {
                type: "rawlist",
                name: "totalDepartmentName",
                message: "Which department would you like to view its total utilized budged?",
                choices: departmentNames,
                when: ({ departmentOption }) => {
                    const option = departmentOption.split(/[()]+/)
                    if (option[1] === "4") {
                        return true
                    }
                }
            },
        ])
        .then(answer => {
            console.log(answer)
            const optionNum = answer.departmentOption.split(/[()]+/)[1]
            departmentHandler(optionNum, answer)
            .then(() => {
                setQuestion()
            })
        })
        

}

const employees = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "employeeOption",
                message: "What would you like to do with employees",
                choices: ["(1) View all employees", "(2) Add a employee", "(3) Update employee role", "(4) Remove Employee", "(5) View employees by manager", "(6) View employees by department", "(7) Update employee manager"]
            },
            //Start of add employee
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "2") {
                        return true
                    }
                }
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
                when: ({ firstName }) => firstName
            },
            {
                type: "rawlist",
                name: "employeeRole",
                message: "What is the employee's role?",
                choices: roleNames,
                when: ({ lastName }) => lastName
            },
            {
                type: "rawlist",
                name: "employeeDepartment",
                message: "What is the employee's department?",
                choices: departmentNames,
                when: ({ employeeRole }) => employeeRole
            },
            //end of add employee

            //start of update employee role
            {
                type: "rawlist",
                name: "employeeNameUpt",
                message: "Which employee's role would you like to update?",
                choices: employeeNames,
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "3") {
                        return true
                    }
                }
            },
            {
                type: "rawlist",
                name: "employeeDepartmentUpt",
                message: "What is the updated employees role?",
                choices: roleNames,
                when: ({ employeeNameUpt }) => employeeNameUpt
            },
            //end of update employee role

            //start of remove employee
            {
                type: "rawlist",
                name: "removeName",
                message: "Which employee would you like to remove?",
                choices: employeeNames,
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "4") {
                        return true
                    }
                }
            },
            //end of remove employee

            //start of employee based on manager
            {
                type: "input",
                name: "employeeManagerList",
                message: "Under which manager?",
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "5") {
                        return true
                    }
                }
            },
            //end of employee based on manager

            //start of employee based on department
            {
                type: "rawlist",
                name: "employeeDepartmentList",
                message: "Under which department?",
                choices: departmentNames,
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "6") {
                        return true
                    }
                }
            },
            //end of employee based on department

            //start of update employee manager
            {
                type: "rawlist",
                name: "employeeManagerUpdateName",
                message: "Which employee would you like to update their manager?",
                choices: employeeNames,
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "7") {
                        return true
                    }
                }
            },
            {
                type: "input",
                name: "employeeManagerUpdateMan",
                message: "Who will be the updated manager?",
                when: ({ employeeManagerUpdateName }) => employeeManagerUpdateName
            },
            //end of update employee manager
        ])
        .then(choice => {
            console.log(choice)
            question()
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
                when: ({ roleOption }) => {
                    const option = roleOption.split(/[()]+/)
                    if (option[1] === "2") {
                        return true
                    }
                }
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of the role",
                when: ({ roleName }) => roleName
            },
            {
                type: "rawlist",
                name: "roleDepartment",
                message: "What department does the role belong to?",
                choices: departmentNames,
                when: ({ roleSalary }) => roleSalary
            },
            {
                type: "rawlist",
                name: "roleDeletion",
                message: "Which role would you like to remove?",
                choices: roleNames,
                when: ({ roleOption }) => {
                    const option = roleOption.split(/[()]+/)
                    if (option[1] === "3") {
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

const setQuestion = () => {
    Promise.all([
        getDepartmentNames(),
        getEmployeeNames(),
        getRoleTitles()
    ])
    .then((results) => {

        departmentNames = []
        employeeNames = []
        roleNames = []

        results[0].forEach(row => {
            departmentNames.push(row.name)
        });
        results[1].forEach(row => {
            employeeNames.push(`${row.first_name} ${row.last_name}`)
        })
        results[2].forEach(row => {
            roleNames.push(row.title)
        })
    })
    .then(() => {
        question()
    })
}
setQuestion()

