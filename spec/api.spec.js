const Axios = require("axios")
const {weapons} = require('../src/selectWeapon.js')
const baseUrl = 'http://127.0.0.1:3000/'

describe('/opponent', () => {
  it('returns rock, paper or scissors', async () => {
    const res = await Axios.get(baseUrl + 'opponent')
    expect(weapons.includes(res.data.opponent)).toBe(true)
  })
})

describe('/', () => {
  it('renders a base page', async () => {
    const res = await Axios.get(baseUrl)
    expect(res.headers['content-type']).toBe('text/html')
    expect(res.data.includes('!DOCTYPE')).toBe(true)
  })
})

describe('any other', () => {
  const examples = ['404', 'login', 'favourite']
  examples.forEach( site => {
    it('returns 404 error', async () => {
      const res = await Axios.get(baseUrl + site).catch( e => e.response)
      expect(res.status).toBe(404)
      expect(res.data).toBe(`Route for /${site} not found`)
    })
  })
})