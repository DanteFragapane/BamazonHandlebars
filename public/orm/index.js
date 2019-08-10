const mysql = require('mysql')
const config = require('../../config.json')

const connection = mysql.createConnection({
  host: config.host,
  port: config.port,
  user: config.username,
  password: config.password,
  database: config.db
})

const orm = {
  selectAll: function (table) {
    return new Promise((resolve, reject) => {
      // Create the actual query, set it to a variable
      const queryString = 'SELECT * FROM ??'
      // Make the query! Note, we use the variable we created INSTEAD of writing out the query
      connection.query(queryString, table, (err, result) => {
        // If there's an error, reject the promise and send the error back
        if (err) {
          return reject(err)
        }
        // Remember, that return short-circuits the function. So if there is no error, just resolve the promise
        return resolve(result)
      })
    })
  },

  insertInto: function (table, dataObj) {
    // Create the actual query, set it to a variable
    const queryString = 'INSERT INTO ?? (product_name, department_name, price, stock_quantity) VALUES (?)'
    return new Promise((resolve, reject) => {
      // Make the query! Note, we use the variable we created INSTEAD of writing out the query
      connection.query(queryString, [ table, dataObj ], (err, result) => {
        // If there's an error, reject the promise and send the error back
        if (err) {
          return reject(err)
        }
        // Remember, that return short-circuits the function. So if there is no error, just resolve the promise
        return resolve(result)
      })
    })
  },

  delete: function (table, id) {
    // Create the actual query, set it to a variable
    const queryString = 'DELETE FROM ?? WHERE item_id = ?'
    return new Promise((resolve, reject) => {
      // Make the query! Note, we use the variable we created INSTEAD of writing out the query
      connection.query(queryString, [ table, id ], (err, result) => {
        // If there's an error, reject the promise and send the error back
        if (err) {
          return reject(err)
        }
        // Remember, that return short-circuits the function. So if there is no error, just resolve the promise
        return resolve(result)
      })
    })
  }
}

module.exports = orm
