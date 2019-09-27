const weapons = ['rock', 'paper', 'scissors']

const selectWeapon = weapons => () => (
  weapons[Math.floor(Math.random() * weapons.length)]
)

module.exports = {
  weapons: weapons, 
  selectWeapon: selectWeapon(weapons)
}