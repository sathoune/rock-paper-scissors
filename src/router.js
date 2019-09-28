const fs        = require('fs')
const path      = require('path')
const url       = require('url')
const mimeTypes = require('./mimeTypes')
const {resolveRPS, selectWeapon} = require('./fight')
const {sanitizeFight, redirectTo} = require('./serverFunctions')

const router = async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const sanitizedPath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
  req.body = req.headers.data
  switch(sanitizedPath) {
    case '/': 
      sendFile(req, res, 'index.html')
      break

    case '/fight':
      fight(req, res)
      break

    default: 
      sendFile(req, res, sanitizedPath)
      break
  }  
}

const fight = (req, res) => {
  if(sanitizeFight(req, res)) {
    const {weapon: playerWeapon} = JSON.parse(req.body)
    const opponentWeapon = selectWeapon()
    const result = resolveRPS(playerWeapon, opponentWeapon)
    
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({
      fight: {
        playerWeapon,
        opponentWeapon,
        result
      }
    }))    
  }
}

const sendFile = (req, res, fileName) => {
  const pathname = path.join(__dirname, 'public', fileName)
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
  }
  else redirectTo('/')(req, res)
}

module.exports = router