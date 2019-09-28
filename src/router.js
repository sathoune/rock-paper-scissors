const fs        = require('fs')
const path      = require('path')
const url       = require('url')
const mimeTypes = require('./mimeTypes')
const {resolve, rules, weapons, selectWeapon} = require('./fight')

const router = async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const sanitizedPath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
  req.body = req.headers.data
  switch(sanitizedPath) {
    case '/': 
      renderMain(req, res)
      break

    case '/fight':
      fight(req, res)
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
const redirectTo = page => (req, res) => {
  res.writeHead(301, {Location: page})
  res.end()
}

const fight = (req, res) => {
  if(req.headers['content-type'] === 'application/json') {
    const body = JSON.parse(req.body)
    if(body.weapon){
      const playerWeapon = body.weapon
      if(weapons.includes(playerWeapon)){
        const opponentWeapon = selectWeapon()
        const result = resolve(rules)(playerWeapon, opponentWeapon)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({
          fight: {
            playerWeapon,
            opponentWeapon,
            result
          }
        }))
      } else {
        res.writeHead(400)
        res.send('Illegal weapon')
      }
    } else {
     res.writeHead(400)
     res.send('No content') 
    }
  } else {
    res.writeHead(400)  
    res.end('Wrong type of content')
  }


}

const pathNotFound = (req, res, path) => {
  redirectTo('/')(req, res)
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