// Submitting the add product form on the manager page
$('#addProduct').on('submit', (event) => {
  event.preventDefault()

  const productName = $('#product_name').val().trim()
  const departmentName = $('#department_name').val().trim()
  const price = $('#price').val().trim()
  const stockQuantity = $('#stock_quantity').val().trim()
  if (productName === '' || departmentName === '' || price === '' || stockQuantity === '') {
    return false
  }
  $.ajax({
    url: '/api/addproduct',
    method: 'POST',
    data: { productName: productName, departmentName: departmentName, price: price, stockQuantity: stockQuantity }
  })
  location.reload()
})

// Clicking the delete product button on the manager page
$('.deleteButton').click((event) => {
  console.log($(event.target).data())
  $.ajax({
    url: '/api/deleteproduct',
    method: 'DELETE',
    data: $(event.target).data()
  })
  location.reload()
})

// Clicking the restock button
$('.restockButton').click((event) => {
  $.ajax({
    url: '/api/restock',
    method: 'POST',
    data: $(event.target).data()
  })
  location.reload()
})
