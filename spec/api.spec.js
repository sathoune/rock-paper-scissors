const Axios = require("axios")
const {weapons} = require('../src/fight')
const baseUrl = 'http://127.0.0.1:3000/'

describe('/fight', () => {
  it('returns fighter weapons and the result', async () => {
    const weapon = 'rock'
    const res = await Axios({
      url: baseUrl + 'fight', 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        data: JSON.stringify({
          weapon
        }),
      } 
    })
    const fight = res.data.fight
    expect(fight.playerWeapon).toBe(weapon)
    expect(weapons.includes(fight.opponentWeapon)).toBe(true)
    expect(fight.result).not.toBe(undefined)
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
    it('redirects to main page', async () => {
      const res = await Axios.get(baseUrl + site)
      expect(res.status).toBe(200)
      expect(res.data.includes('!DOCTYPE html')).toBe(true)
    })
  })
})