const updateScore = outcome => {
  if(outcome === 'win') {
    const playerScoreElement = document.getElementById('player-score')
    playerScoreElement.innerText = Number(playerScoreElement.innerText) + 1
  } else if (outcome === 'lose') {
    const opponentScoreElement = document.getElementById('opponent-score')
    opponentScoreElement.innerText = Number(opponentScoreElement.innerText) + 1
  }
}

const updateMessage = (outcome, weapon0, weapon1) => {
  document.getElementById('outcome').innerText = `Player ${outcome}s with ${weapon0} against ${weapon1}`
}

const requestOpponent = playerWeapon => ajax(
  'GET', 
  'opponent', 
  xhr => {
    const data = JSON.parse(xhr.responseText)
    const outcome = fight(rules)(playerWeapon, data.opponent)
    updateScore(outcome)
    updateMessage(outcome, playerWeapon, data.opponent)
  }
) 

const fight = rules => (p1, p2) => (
  (p1 === p2) ? 'draw' : 
    (rules[p1].includes(p2) ? 'win' : 'lose') 
)

const rules = {
  rock:     ['scissors'],
  paper:    ['rock'],
  scissors: ['paper']
}
