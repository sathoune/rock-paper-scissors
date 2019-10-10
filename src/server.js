const http      = require('http')

const router    = require('./router')
const PORT      = process.env.PORT || 3000

const server = http.createServer(router).listen(PORT, () => {
  console.log(`server listening at port ${PORT}`)
})

module.exports = server