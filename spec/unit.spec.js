const {rules, fight} = require('../src/public/js/script')

describe('fight()', () => {
  describe('given rules of rock-paper-scissors', () => {
    const rps = fight(rules)
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
    const rpslS = fight(rpslSRules)
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