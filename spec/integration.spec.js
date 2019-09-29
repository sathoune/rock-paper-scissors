const Axios = require("axios")
const {weapons} = require('../src/constants')
const baseUrl = process.env.TESTSERVER || 'http://127.0.0.1:3000/'

const POST = 'POST'
const fightUrl = baseUrl + 'fight'

describe('/fight', () => {
  it('Given player\'s weapon responds with fight results', async () => {
    const weapon = 'rock'
    
    const res = await Axios({
      url: fightUrl, 
      method: POST,
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

  it('allows only "application/json" content', async () => {
    const weapon = 'paper'

    await Axios({
      url: fightUrl,
      method: POST,
      headers: {
        'Content-Type': 'text/html',
        data: weapon
      }
    }).catch( ({response}) => {
      expect(response.status).toBe(400)
      expect(response.data).toBe('Wrong type of content')
    })
  })

  it('requires proper object format', async () => {

    await Axios({
      url: fightUrl,
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        data: ''
      }
    }).catch( ({response}) => {
      expect(response.status).toBe(400)
      expect(response.data).toBe('File battle request properly!')
    })
  })

  it('requires player to send their weapon of choice', async () => {

    await Axios({
      url: fightUrl,
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        data: JSON.stringify({
          
        })
      }
    }).catch( ({response}) => {
      expect(response.status).toBe(400)
      expect(response.data).toBe('Do not come unarmed!')
    }) 
  })

  it('requires player to file a legal weapon', async () => {
    const wrongWeapon = 'morgernstern'

    await Axios({
      url: fightUrl,
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        data: JSON.stringify({
          weapon: wrongWeapon
        })
      }
    }).catch( ({response}) => {
      expect(response.status).toBe(400)
      expect(response.data).toBe('Illegal weapon!')
    })
  })
})

describe('/', () => {
  it('renders a main page', async () => {
    const res = await Axios.get(baseUrl)
    expect(res.headers['content-type']).toBe('text/html')
    expect(res.data.includes('!DOCTYPE html')).toBe(true)
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