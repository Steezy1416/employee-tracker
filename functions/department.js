const db = require("../db/connection")
const cTable = require("console.table")

//returns all department names
const getDepartmentNames = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT name FROM departments"
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

//handles which department function will be called based on the users choice
const departmentHandler = (optionNum, answerObj) => {
    if(optionNum === "1"){return displayDepartment()}
}

//displays the dapartment table
const displayDepartment = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM departments"
        db.query(sql, (err, rows) => {
            if(err){
                reject(err)
            }
            else{
                const table = cTable.getTable(rows)
                resolve(table)
            }
        })
    })
}

module.exports = {
    getDepartmentNames,
    departmentHandler
}
