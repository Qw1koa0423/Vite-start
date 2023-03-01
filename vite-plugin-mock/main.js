fetch('/api/users', {
  method: 'POST',
}).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})