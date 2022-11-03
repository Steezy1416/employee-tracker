const db = require("../db/connection")
const cTable = require("console.table")

//returns all the role titles
const getRoleTitles = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT title FROM roles"
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

//handles role functions based on the users choice
const roleHandler = (optionNum, answer) => {
    if(optionNum === "1"){return displayRoles()}
    if(optionNum === "2"){return addRole(answer)}
    if(optionNum === "3"){return removeRole(answer)}
}

//displays a table of all the roles
const displayRoles = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM roles"
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

//adds a role
const addRole = (answer) => {
    return new Promise((resolve, reject) => {
        //serches for the id based on the department picked then runs the query to insert into table
        const { roleName, roleSalary, roleDepartment } = answer
        const sql1 = `SELECT id FROM departments WHERE name = "${roleDepartment}"`

        db.query(sql1, (err, rows) => {
            if (err) {
                reject(err)
            }
            else {
                const id = rows[0].id
                const sql2 = `INSERT INTO roles (title, salary, department_id)
                VALUES("${roleName}",${roleSalary},${id})`
                db.query(sql2, (err, rows) => {
                    resolve(rows)
                })

            }
        })

    })
}

//removes a role
const removeRole = (answer) => {
    return new Promise((resolve, reject) => {
        const {roleDeletion} = answer
        const sql = `DELETE FROM roles WHERE title = "${roleDeletion}"`

        db.query(sql, (err, rows) => {
            if(err) {
                reject(err)
            }
            else{
                resolve(rows)
            }
        })
    })
}

module.exports = {
    getRoleTitles,
    roleHandler
}