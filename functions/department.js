const db = require("../db/connection")
const cTable = require("console.table")

//returns all department names
const getDepartmentNames = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT department FROM departments"
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
const departmentHandler = (optionNum, answer) => {
    if(optionNum === "1"){return displayDepartment()}
    if(optionNum === "2"){return addDepartment({addDepartmentName} = answer)}
    if(optionNum === "3"){return removeDepartment({removeDepartmentName} = answer)}
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
                resolve(console.log(`\n${table}`))
            }
        })
    })
}

//adds a department based on name givien by user
const addDepartment = ({addDepartmentName}) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO departments (department) VALUES("${addDepartmentName}")`
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

//removes a department based on user choice
const removeDepartment = ({removeDepartmentName}) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM departments WHERE department = "${removeDepartmentName}";`
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

module.exports = {
    getDepartmentNames,
    departmentHandler
}
