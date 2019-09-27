const http      = require('http')
const router    = require('./router')
const port  = 3000
const adress = '127.0.0.1'

http.createServer(router).listen(port, adress, () => {
  console.log(`Server running at http://${adress}:${port}/`)
})
