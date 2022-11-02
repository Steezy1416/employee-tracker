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

module.exports = {
    getDepartmentNames
}
