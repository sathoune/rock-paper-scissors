const {weapons, rules} = require('./constants')

const selectRandomFromArray = weapons => () => (
  (Array.isArray(weapons)) ? 
    weapons[Math.floor(Math.random() * weapons.length)] :
    undefined
)

const resolve = rules => (p1, p2) => (
  (p1 === p2) ? 'draw' : 
    (rules[p1].includes(p2) ? 'win' : 'lose') 
)

module.exports = {
  resolve: resolve,
  selectRandomFromArray: selectRandomFromArray,
  selectWeapon: selectRandomFromArray(weapons),
  resolveRPS: resolve(rules)
}