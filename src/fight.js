const weapons = ['rock', 'paper', 'scissors']

const selectRandomFromArray = weapons => () => (
  weapons[Math.floor(Math.random() * weapons.length)]
)

const resolve = rules => (p1, p2) => (
  (p1 === p2) ? 'draw' : 
    (rules[p1].includes(p2) ? 'win' : 'lose') 
)

const rules = {
  rock:     ['scissors'],
  paper:    ['rock'],
  scissors: ['paper']
}

module.exports = {
  weapons: weapons, 
  rules: rules,
  resolve: resolve,
  selectRandomFromArray: selectRandomFromArray,
  selectWeapon: selectRandomFromArray(weapons),
  resolveRPS: resolve(rules)
}