const {resolve, selectRandomFromArray} = require('../src/fight')
const {rules, weapons} = require('../src/constants')
const {parseJSON} = require('../src/routes')

describe('resolve()', () => {
  describe('given rules of rock-paper-scissors', () => {
    const rps = resolve(rules)
    it('rock is covered by paper', () => {
      const result = rps('rock', 'paper')
      expect(result).toBe('lose')
    })
    it('scissors cuts paper', () => {
      const result = rps('scissors', 'paper')
      expect(result).toBe('win')   
    })
    it('rock draws with rock', () => {
      const result = rps('rock', 'rock')
      expect(result).toBe('draw')   
    })
  })

  describe('given rules of rock-paper-scissors-lizzard-Spock', () => {
    const rpslSRules = {
      rock: ['scissors', 'lizard'],
      paper: ['Spock', 'rock'],
      scissors: ['paper', 'lizard'],
      lizard: ['Spock', 'paper'],
      Spock: ['scissors', 'rock']
    }
    const rpslS = resolve(rpslSRules)
    it('lizard poisons Spock', () => {
      const result = rpslS('lizard', 'Spock')
      expect(result).toBe('win')
    })
    it('Spock vaporizes rock', () => {
      const result = rpslS('Spock', 'rock')
      expect(result).toBe('win')
    })
    it('paper disproves Spock', () => {
      const result = rpslS('paper', 'Spock')
      expect(result).toBe('win')
    })
  })
})

describe('selectRandomFromArray()', () => {
  it('given an array it selects one of given inputs', () => {
    const selectWeapon = selectRandomFromArray(weapons)
    const weapon = selectWeapon()
    expect(weapons.includes(weapon)).toBe(true)
  })
  it('given an empty array returns undefined', () => {
    const result = selectRandomFromArray([])()
    expect(result).toBeUndefined()
  })
  it('given not an array returns undefined', () => {
    const badArrays = [
      42,
      true,
      'Almost array',
      null,
      undefined,
      {question: 'What is the purpose?', answer: '42'},
      BigInt(90127498174321470129471942174914794791479141),
      Symbol(42),
    ]
    badArrays.forEach( noArray => { 
      const result = selectRandomFromArray(noArray)()
      expect(result).toBeUndefined()
    })
  })
})

describe('parseJSON()', () => {
  it('given json returns object', () => {
    const obj = {
      serverWorks: true,
      errorCount: 0
    }
    const parsedJSON = parseJSON(JSON.stringify(obj))
    const objKeys = Object.keys(obj)
    const parsedKeys = Object.keys(parsedJSON)
    expect(objKeys.length).toBe(parsedKeys.length)
    objKeys.forEach( key => {
      expect(parsedKeys.includes(key)).toBeTruthy()
    })
  })
  it('returns error did not pass json', () => {
    const parsedJSON = parseJSON({a: 42})
    expect(parsedJSON.error.name).toBe('SyntaxError')
  })
})