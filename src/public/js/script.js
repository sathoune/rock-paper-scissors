const updateScore = outcome => {
  if(outcome === 'win') {
    const playerScoreElement = document.getElementById('player-score')
    playerScoreElement.innerText = Number(playerScoreElement.innerText) + 1
  } else if (outcome === 'lose') {
    const opponentScoreElement = document.getElementById('opponent-score')
    opponentScoreElement.innerText = Number(opponentScoreElement.innerText) + 1
  }
}

const updateMessage = ({result, playerWeapon, opponentWeapon}) => {
  document.getElementById('outcome').innerText = `Player ${result}s with ${playerWeapon} against ${opponentWeapon}`
}

const requestFight = playerWeapon => ajax({
  method: 'POST', 
  url: 'fight', 
  payload: JSON.stringify({weapon: playerWeapon}),
  contentType: 'application/json',
  callback: xhr => {
    const {fight} = JSON.parse(xhr.responseText)
    updateScore(fight.result)
    updateMessage(fight)
  },
}) 