const http  = require('http')
const fs    = require('fs')
const path  = require('path')
const port  = 3000
const adress = '127.0.0.1'

http.createServer( async (req, res) => {
    const indexPage = await fs.readFileSync(path.join(__dirname, 'public/index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(indexPage, 'utf-8')
}).listen(port, adress, () => {
  console.log(`Server running at http://${adress}:${port}/`)
})
