const fs        = require('fs')
const path      = require('path')

const {resolveRPS, selectWeapon} = require('./fight')
const {mimeTypes, weapons} = require('./constants')

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


const sanitizeFight = (req, res) => {
  if(req.headers['content-type'] !== 'application/json') {
    badRequest(res, 'Wrong type of content')
    return false
  }
  const {weapon: playerWeapon, error} = parseJSON(req.body)
  if(error instanceof SyntaxError) {
    badRequest(res, 'File battle request properly!')
    return false
  }
  if(!playerWeapon){
    badRequest(res, 'Do not come unarmed!')
    return false
  }
  if(!weapons.includes(playerWeapon)){
    badRequest(res, 'Illegal weapon!')
    return false
  }
  return true
} 

const parseJSON = json => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return {error: e}
  }
}

const badRequest = (res, msg) => {
  res.writeHead(400)
  res.end(msg)
}

const redirectTo = page => (req, res) => {
  res.writeHead(301, {Location: page})
  res.end()
}

module.exports = {
  sendFile,
  fight,
  parseJSON,
  sanitizeFight,
  badRequest,
  redirectTo
}