const http = require('http')
const fs = require('fs')

http.createServer( async (req, res) => {
    const content = await fs.readFileSync('./index.html')
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(content, 'utf-8')
}).listen(3000)
console.log('Server running at http://127.0.0.1:3000/')