const mysql = require('mysql')

const config = {
  host: process.env.JAWSDB_URL || 'localhost',
  port: process.env.port || 3306,
  user: process.env.username || 'root',
  password: process.env.password || 'password',
  database: process.env.database || 'bamazon'
}
console.log(config)

const connection = mysql.createConnection(config)
connection.connect((err) => {
  if (err) {
    throw err
  }
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

  selectId: function (table, column, id) {
    return new Promise((resolve, reject) => {
      const queryString = 'SELECT * FROM ?? WHERE ?? = ?'
      connection.query(queryString, [ table, column, id ], (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  },

  insertInto: function (table, dataObj) {
    return new Promise((resolve, reject) => {
      const queryString = 'INSERT INTO ?? (product_name, department_name, price, stock_quantity) VALUES (?)'
      connection.query(queryString, [ table, dataObj ], (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  },

  delete: function (table, column, id) {
    return new Promise((resolve, reject) => {
      const queryString = 'DELETE FROM ?? WHERE ?? = ?'
      connection.query(queryString, [ table, column, id ], (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  },

  updateAmount: function (table, column, id, amount) {
    return new Promise((resolve, reject) => {
      const queryString = 'UPDATE ?? SET ?? = ? WHERE item_id = ?'
      connection.query(queryString, [ table, column, amount, id ], (err, result, fields) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
    })
  }
}

module.exports = orm
