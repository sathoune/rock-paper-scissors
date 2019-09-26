const http  = require('http')
const fs    = require('fs')
const path  = require('path')
const url   = require('url')

const port  = 3000
const adress = '127.0.0.1'

http.createServer( async (req, res) => {
  const adress = await url.parse(req.url).pathname
  switch(adress) {
    case '/': 
      const indexPage = await fs.readFileSync(path.join(__dirname, 'public/index.html'))
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(indexPage, 'utf-8')
      break
    case '/random' :
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({
        opponent: 'rock'
      }))
      break
    default: 
      res.writeHead(404, {'Content-Type': 'text/html'})
      res.write('Route not found')
      res.end()
      break
  }
}).listen(port, adress, () => {
  console.log(`Server running at http://${adress}:${port}/`)
})
