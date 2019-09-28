const {weapons} = require('./fight')

const sanitizeFight = (req, res) => {
  if(req.headers['content-type'] !== 'application/json') {
    badRequest(res, 'Wrong type of content')
    return false
  }
  const {weapon: playerWeapon} = JSON.parse(req.body)
  if(!playerWeapon){
    badRequest(res, 'Do not come unarmed')
    return false
  }
  if(!weapons.includes(playerWeapon)){
    badRequest(res, 'Illegal weapon')
    return false
  }
  return true
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
  sanitizeFight: sanitizeFight,
  badRequest: badRequest,
  redirectTo: redirectTo
}