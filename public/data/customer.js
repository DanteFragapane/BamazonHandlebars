// Submitting the purchas request
$('.buyButton').click((event) => {
  const id = $(event.target).data().id
  const amount = $(`.buy[data-id=${$(event.target).data().id}]`).val()
  console.log(amount)
  $.ajax({
    url: '/api/buyproduct',
    method: 'PUT',
    data: { id: id, amount: amount }
  })
  location.reload()
})
