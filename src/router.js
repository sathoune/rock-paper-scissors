const path      = require('path')
const url       = require('url')

const {sendFile, fight} = require('./routes')
const {indexPath} = require('./constants')

const router = async (req, res) => {
  const parsedUrl = url.parse(req.url)
  const sanitizedPath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
  req.body = req.headers.data
  switch(sanitizedPath) {
    case '/': 
      sendFile(req, res, indexPath)
      break

    case '/fight':
      fight(req, res)
      break

    default: 
      sendFile(req, res, sanitizedPath)
      break
  }  
}

module.exports = router