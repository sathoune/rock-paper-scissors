const http      = require('http')
const fs        = require('fs')
const path      = require('path')
const url       = require('url')
const mimeTypes = require('./mimeTypes')

const port  = 3000
const adress = '127.0.0.1'

http.createServer( async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const sanitizedPath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
 
  switch(sanitizedPath) {
    case '/': 
      const indexPage = fs.readFileSync(path.join(__dirname, 'public', 'index.html'))
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
      const pathname = path.join(__dirname, 'public', sanitizedPath)
      if( fs.existsSync(pathname)) {
        try {
          const file = fs.readFileSync(pathname)
          const extension = path.parse(pathname).ext
          res.writeHead(200, {'Content-Type': mimeTypes[extension] || 'text/plain'})
          res.end(file)    
        } catch (err) {
          res.writeHead(500, {'Content-Type': 'text/plain'})
          res.end(`Error retrieving file ${sanitizedPath}`)
        }
      } else {
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.end(`Route for ${sanitizedPath} not found`)
      }
      break
  }  
}).listen(port, adress, () => {
  console.log(`Server running at http://${adress}:${port}/`)
})
