const db = require("../db/connection")
const cTable = require("console.table")
const { promise } = require("../db/connection")

//returns all employee names
const getEmployeeNames = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT first_name, last_name FROM employees"
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

//returns all employee manager names
const getManagerNames = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL"
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(rows)
            }
        })
    })
}

//handles all employee functions
const employeeHandler = (optionNum, answer) => {
    if(optionNum === "1"){return displayEmployees()}
    if(optionNum === "2"){return addEmployee(answer)}
    if(optionNum === "3"){return updateEmployeeRole(answer)}
    if(optionNum === "4"){return removeEmployee({removeName} = answer)}
    if(optionNum === "5"){return employeesByManager(answer)}
    if(optionNum === "6"){return updateEmployeeManager(answer)}
}

//display the employees table
const displayEmployees = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM employees"
        db.query(sql, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                const table = cTable.getTable(rows)
                resolve(console.log(`\n${table}`))
            }
        })
    })
}

//adds an employee to the table
const addEmployee = (answer) => {
    return new Promise((resolve, reject) => {
        const { firstName, lastName, employeeRole, employeeManager } = answer
        const sql1 = `SELECT id FROM roles WHERE title = "${employeeRole}"`
        const sql2 = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = "${employeeManager}"`
        db.query(sql1, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                roleId = rows[0].id

                db.query(sql2, (err, rows) => {
                    if (err) {
                        reject(err)
                    }
                    else {
                        const managerId = rows[0].id

                        db.query(sql2, (err, rows) => {
                            if (err) {
                                reject(err)
                            }
                            else {
                                managerId = rows[0].id
                                const sql3 = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId})`

                                db.query(sql3, (err, rows) => {
                                    resolve(rows)
                                })

                            }
                        })
                    }
                })
            }
        })

    })
}

//updates employee role
const updateEmployeeRole = (answer) => {
    return new Promise((resolve, reject) => {
        const {employeeNameUpt, employeeRoleUpt} = answer
        const sql1 = `SELECT id FROM roles WHERE title = "${employeeRoleUpt}"`
        db.query(sql1, (err, rows) => {

            roleId = rows[0].id
            const sql = `
            UPDATE employees
            SET role_id = ${roleId}
            WHERE CONCAT(first_name, " ", last_name) = "${employeeNameUpt}"`

            db.query(sql, (err, rows) => {
                resolve(rows)
            })
        })
    })
}

//removes employee
const removeEmployee = ({removeName}) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM employees WHERE CONCAT(first_name, " ", last_name) = "${removeName}";`
        db.query(sql, (err, rows) => {
            if(err){
                reject(err)
            }
            else{
                resolve(rows)
            }
        })
    })
}

//gets table of employees under a specific manager
const employeesByManager = (answer) => {
    return new Promise((resolve, reject) => {
        const {employeeManagerList} = answer
        const sql1 = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = "${employeeManagerList}"`
        
        db.query(sql1, (err, rows) => {
            const managerId = rows[0].id

            const sql = `SELECT * FROM employees WHERE manager_id = ${managerId}`

            db.query(sql, (err, rows) => {
                const managerFilter = cTable.getTable(rows)
                resolve(console.log(managerFilter))
            })
        })
    })
}

//updates employee manager
const updateEmployeeManager = (answer) => {
    return new Promise((resolve, reject) => {
        const {employeeManagerUpdateName, employeeManagerUpdateMan } = answer
        const sql1 = `SELECT id FROM employees WHERE CONCAT(first_name, " ", last_name) = "${employeeManagerUpdateMan}"`
        
        db.query(sql1, (err, rows) => {
            const managerId = rows[0].id

            const sql = `
            UPDATE employees
            SET manager_id = ${managerId}
            WHERE CONCAT(first_name, " ", last_name) = "${employeeManagerUpdateName}"`

            db.query(sql, (err, rows) => {
                resolve(rows)
            })
        })
    })
}

module.exports = {
    getEmployeeNames,
    getManagerNames,
    employeeHandler
}