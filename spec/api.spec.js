const Axios = require("axios")

const baseUrl = 'http://127.0.0.1:3000/'

describe('/random', () => {
  it('returns rock, paper or scissors', async () => {
    const res = await Axios.get(baseUrl + 'random')
    expect(res.data.opponent).toBe('rock' || 'paper' || 'scissors')
  })
})