const db = require("../db/connection")

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

const departmentHandler = (optionNum, answerObj) => {
    if(optionNum === "1"){displayDepartment()}
}

const displayDepartment = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM departments"
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
