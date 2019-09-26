const http  = require('http')
const fs    = require('fs')
const port  = 3000
const adress = '127.0.0.1'

http.createServer( async (req, res) => {
    const content = await fs.readFileSync('./index.html')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content, 'utf-8')
}).listen(port, adress, () => {
  console.log(`Server running at http://${adress}:${port}/`)
})
