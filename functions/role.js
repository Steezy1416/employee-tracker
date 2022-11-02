const db = require("../db/connection")

//returns all the role titles
const getRoleTitles = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT title FROM roles"
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
    getRoleTitles
}