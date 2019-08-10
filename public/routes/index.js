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
      return res.status(200).redirect('/manager')
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
      return res.status(200).redirect('/manager')
    })
    .catch((err) => {
      if (err) {
        console.error(err)
      }
    })
})

// Restock a product
router.post('/api/restock', (req, res) => {
  orm
    .updateAmount('products', 'stock_quantity', req.body.productid, 100)
    .then((result) => {
      return res.status(200).redirect('/manager')
    })
    .catch((err) => {
      if (err) {
        return res.status(500).send('Something broke while restocking!')
      }
    })
})

// Buy a product and reduce the stock number
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
          return res.status(200).redirect('/')
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
        return res.status(500).send('Something broke!')
      }
    })
})

module.exports = router
