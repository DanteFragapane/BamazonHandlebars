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
    .delete('products', 'item_id', req.body.id)
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

router.put('/api/buyproduct', (req, res) => {
  const { id, amount } = req.body
  orm
    .selectId('products', 'item_id', id)
    .then((result) => {
      if (result.affectedRows === 0) {
        return res.send('Nothing found with given ID.')
      }
      const delta = result[0].stock_quantity - amount
      if (delta < 0) {
        return res.send('Insufficient quantity')
      }

      orm
        .updateAmount('products', 'stock_quantity', id, delta)
        .then((data) => {
          if (data.affectedRows === 0) {
            return res.status(404).send('Unable to update product!')
          }
        })
        .catch((err) => {
          if (err) {
            console.error(err)
            return res.status(500).send('Something broke!')
          }
        })
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
})

module.exports = router