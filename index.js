const inquirer = require("inquirer")
const { getDepartmentNames, departmentHandler} = require("./functions/department")
const { getEmployeeNames, getManagerNames, employeeHandler} = require("./functions/employee")
const { getRoleTitles, roleHandler} = require("./functions/role")

let departmentNames = []
let employeeNames = []
let managerNames = []
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
            return
        })
}

const departments = () => {
    return inquirer
        .prompt([
            {
                type: "list",
                name: "departmentOption",
                message: "What would you like to do with departments?",
                choices: ["(1) View all departments", "(2) Add a department", "(3) Remove department"]
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
            }
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
                choices: ["(1) View all employees", "(2) Add a employee", "(3) Update employee role", "(4) Remove Employee", "(5) View employees by manager", "(6) Update employee manager"]
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
                name: "employeeManager",
                message: "Who is the employee's manager?",
                choices: managerNames,
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
                name: "employeeRoleUpt",
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
                type: "rawlist",
                name: "employeeManagerList",
                message: "Under which manager?",
                choices: managerNames,
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "5") {
                        return true
                    }
                }
            },
            //end of employee based on manager

            //start of update employee manager
            {
                type: "rawlist",
                name: "employeeManagerUpdateName",
                message: "Which employee would you like to update their manager?",
                choices: employeeNames,
                when: ({ employeeOption }) => {
                    const option = employeeOption.split(/[()]+/)
                    if (option[1] === "6") {
                        return true
                    }
                }
            },
            {
                type: "rawlist",
                name: "employeeManagerUpdateMan",
                message: "Who will be the updated manager?",
                choices: managerNames,
                when: ({ employeeManagerUpdateName }) => employeeManagerUpdateName
            },
            //end of update employee manager
        ])
        .then(answer => {
            console.log(answer)
            const optionNum = answer.employeeOption.split(/[()]+/)[1]
            employeeHandler(optionNum, answer)
            .then(() => {
                setQuestion()
            })
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
            const optionNum = answer.roleOption.split(/[()]+/)[1]
            roleHandler(optionNum, answer)
            .then(() => {
                setQuestion()
            })
        })

}

const setQuestion = () => {
    Promise.all([
        getDepartmentNames(),
        getEmployeeNames(),
        getManagerNames(),
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
            managerNames.push(`${row.first_name} ${row.last_name}`)
        })
        results[3].forEach(row => {
            roleNames.push(row.title)
        })
    })
    .then(() => {
        question()
    })
}
setQuestion()

