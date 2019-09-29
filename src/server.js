const http      = require('http')

const router    = require('./router')
const PORT      = process.env.PORT || 3000
const ADDRESS    = process.env.ADDRESS || '127.0.0.1'

const server = http.createServer(router).listen(PORT, ADDRESS, () => {
  console.log(`Server running at http://${ADDRESS}:${PORT}/`)
})

module.exports = server