const {Builder, By} = require('selenium-webdriver')
const chrome = require('chromedriver')

const baseUrl = 'http://127.0.0.1:3000/'

describe('website', () => {
  it('has #scissors, #rock, #paper elements', async () => {
    const driver = new Builder().forBrowser('chrome').build()
    try {
      await driver.get(baseUrl)
      const scissorsElement = await driver.findElement(By.id('scissors'))
      const rockElement     = await driver.findElement(By.id('rock'))
      const paperElement    = await driver.findElement(By.id('paper'))
    expect(await scissorsElement.getAttribute('innerHTML')).toEqual('scissors')
    expect(await rockElement    .getAttribute('innerHTML')).toEqual('rock')
    expect(await paperElement   .getAttribute('innerHTML')).toEqual('paper')
   } finally { await driver.quit() }
  })
})

describe('Tony opens page wanting to play R-P-S', () => {
  it('he chooses scissors', async () => {
    const driver = new Builder().forBrowser('chrome').build()
    try {
      await driver.get(baseUrl)
      await driver.findElement(By.id('scissors')).click()
      const outcomeText = await driver.findElement(By.id('outcome')).getAttribute('innerText')
      expect(outcomeText.length > 0).toBe(true)
    } finally { await driver.quit() }
  })
})