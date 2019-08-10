// Imports
const express = require('express')
const router = require('./public/routes')
const bodyParser = require('body-parser')

// Create the Express app
const app = express()

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000

// Set up all Express-Handlebars stuff
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Set up static file serves
app.use(express.static('public'))

// Set up url encoding for JSON
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Use the custom router
app.use(router)

// Listen for requests on the given port
app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`)
})
