const {Builder, By} = require('selenium-webdriver')
const chrome = require('chromedriver')

const baseUrl = 'http://127.0.0.1:3000/'
describe('Tony would like to play a Rock-Paper-Scissors game', () => {
  const driver = new Builder().forBrowser('chrome').build()
  afterAll( async () => {
    await driver.quit()
  })

  describe('Tony visits this magnificent site', () => {
    beforeAll( async () => {
      await driver.get(baseUrl)
   })
    it('Tony sees #scissors, #rock, #paper elements', async () => {
      const scissorsElement = await driver.findElement(By.id('scissors'))
      const rockElement     = await driver.findElement(By.id('rock'))
      const paperElement    = await driver.findElement(By.id('paper'))
      expect(await scissorsElement.getAttribute('innerHTML')).not.toEqual('')
      expect(await rockElement    .getAttribute('innerHTML')).not.toEqual('')
      expect(await paperElement   .getAttribute('innerHTML')).not.toEqual('')
     
    })
    it('Tony chooses scissors and sees an outcome of the battle', async () => {
      const startingText = await driver.findElement(By.id('outcome')).getAttribute('innerText') 
      await driver.findElement(By.id('scissors')).click()
      const outcomeText = await driver.findElement(By.id('outcome')).getAttribute('innerText')
      expect(outcomeText).not.toBe(startingText)
    })
  })
  
  describe('but he made a horrible mistake typing the main page adress', () => {
    it('however he ends up at the main page', async () => {
      await driver.get(baseUrl + '../server.js')
      const url = await driver.getCurrentUrl()
      expect(url).toEqual(baseUrl)  
    })
  })   
})
