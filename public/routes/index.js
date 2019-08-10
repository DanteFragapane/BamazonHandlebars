const express = require('express')
const router = express.Router()
const orm = require('../orm')

// Main 'GET' route for the customer page
router.get('/', (req, res) => {
  orm
    .selectAll('products')
    .then((data) => {
      res.render('customer', { products: data })
    })
    .catch((err) => {
      if (err) {
        console.error(err)
        res.status(500).send('I apologize, but something has gone terribly wrong.')
      }
    })
})

// Main 'GET' route for the manager page
router.get('/manager', (req, res) => {
  orm
    .selectAll('products')
    .then((data) => {
      res.render('manager', { products: data })
    })
    .catch((err) => {
      if (err) {
        console.error(err)
        res.status(500).send('I apologize, but something has gone terribly wrong.')
      }
    })
})

// Add a product
router.post('/api/addproduct', (req, res) => {
  orm
    .insertInto('products', [ req.body.productName, req.body.departmentName, req.body.price, req.body.stockQuantity ])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Product not added!')
      }
      res.redirect('/manager')
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
})

// Delete a product
router.delete('/api/deleteproduct', (req, res) => {
  orm
    .delete('products', req.body.id)
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Product could not be deleted.')
      }
      res.redirect('/manager')
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
})

// Update a product
router.put('/api/updateproduct:id', (req, res) => {})

module.exports = router
