const indexPath = 'html/index.html'
const mimeTypes = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
}

const weapons = ['rock', 'paper', 'scissors']
const rules = { //array contains elements beaten by weapon represented with keyword
  rock:     ['scissors'],
  paper:    ['rock'],
  scissors: ['paper']
}

module.exports = {
  indexPath,
  mimeTypes,
  weapons,
  rules
}