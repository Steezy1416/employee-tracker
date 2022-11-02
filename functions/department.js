const db = require("../db/connection")
const cTable = require("console.table")

//the return keeps returning undefined
const departmentArr = () => {
    const sql = "SELECT * FROM departments"
    const result = []
    db.query(sql, (err, rows) => {
       rows.forEach(row => {
        result.push(row.name)
       })
       console.log(result)
       return result
    })
}

const displayDepartment = () => {
    const sql = "SELECT * FROM departments"

    db.query(sql, (err, rows) => {
       const table = cTable.getTable(rows)
       console.log(rows)
       console.log(table)
    })
}

const  addDepartment = (name) => {
    const sql = `INSERT INTO departments (name) 
                VALUES ("${name}");`
    
    db.query(sql)

}

const deleteDepartment = (name) => {
    const sql = "DELETE FROM departments WHERE "
}



module.exports = {
    departmentArr,
    displayDepartment,
    addDepartment
}
