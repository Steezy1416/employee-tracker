const db = require("../db/connection")
const cTable = require("console.table")

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

const employeeHandler = (optionNum, answer) => {
    if (optionNum === "1") { return displayEmployees() }
    if (optionNum === "2") { return addEmployee(answer) }
}

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
                        managerId = rows[0].id

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

module.exports = {
    getEmployeeNames,
    getManagerNames,
    employeeHandler
}