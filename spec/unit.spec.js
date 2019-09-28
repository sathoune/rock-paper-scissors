const {rules, resolve, selectRandomFromArray, weapons} = require('../src/fight')

describe('resolve()', () => {
  describe('given rules of rock-paper-scissors', () => {
    const rps = resolve(rules)
    it('rock is covered by paper', () => {
      const result = rps('rock', 'paper')
      expect(result).toEqual('lose')
    })
    it('scissors cuts paper', () => {
      const result = rps('scissors', 'paper')
      expect(result).toEqual('win')   
    })
    it('rock draws with rock', () => {
      const result = rps('rock', 'rock')
      expect(result).toEqual('draw')   
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
      expect(result).toEqual('win')
    })
    it('Spock vaporizes rock', () => {
      const result = rpslS('Spock', 'rock')
      expect(result).toEqual('win')
    })
    it('paper disproves Spock', () => {
      const result = rpslS('paper', 'Spock')
      expect(result).toEqual('win')
    })
  })
})

describe('selectRandomFromArray()', () => {
  it('given an array it selects one of given inputs', () => {
    const selectWeapon = selectRandomFromArray(weapons)
    const weapon = selectWeapon()
    expect(weapons.includes(weapon)).toBe(true)
  })
})