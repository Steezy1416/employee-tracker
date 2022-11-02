const db = require("../db/connection")

//returns all employee names
const getEmployeeNames = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT first_name, last_name FROM employees"
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
    getEmployeeNames
}