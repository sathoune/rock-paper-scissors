const fs        = require('fs')
const path      = require('path')
const url       = require('url')
const mimeTypes = require('./mimeTypes')
const {selectWeapon} = require('./selectWeapon.js')

const router = async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const sanitizedPath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
  switch(sanitizedPath) {
    case '/': 
      renderMain(req, res)
      break

    case '/opponent' :
      createOpponent(req, res)
      break

    default: 
      const pathname = path.join(__dirname, 'public', sanitizedPath)
      if( fs.existsSync(pathname)) sendFile(req, res, pathname)
      else pathNotFound(req, res, sanitizedPath)
      break
  }  
}

const renderMain = (req, res) => {
  const indexPage = fs.readFileSync(path.join(__dirname, 'public', 'index.html'))
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.end(indexPage, 'utf-8')
}

const createOpponent = (req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'})
  res.end(JSON.stringify({
    opponent: selectWeapon()
  }))
}

const pathNotFound = (req, res, path) => {
  res.writeHead(404, {'Content-Type': 'text/plain'})
  res.end(`Route for ${path} not found`)
}

const sendFile = (req, res, pathname) => {
  try {
    const file = fs.readFileSync(pathname)
    const extension = path.parse(pathname).ext
    res.writeHead(200, {'Content-Type': mimeTypes[extension] || 'text/plain'})
    res.end(file)    
  } catch (err) {
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.end(`Error retrieving file ${sanitizedPath}`)
  }
}

module.exports = router