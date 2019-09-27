const {Builder, By} = require('selenium-webdriver')
const chrome = require('chromedriver')

const baseUrl = 'http://127.0.0.1:3000/'

describe('Tony would like to play a Rock-Paper-Scissors game, so he visits this original site', () => {
  const driver = new Builder().forBrowser('chrome').build()
  
  beforeAll( async () => {
    await driver.get(baseUrl)
  })
  afterAll( async () => {
    await driver.quit()
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
    await driver.findElement(By.id('scissors')).click()
    const outcomeText = await driver.findElement(By.id('outcome')).getAttribute('innerText')
    expect(outcomeText.length > 0).toBe(true)
  })
})

describe('Tony would like to play a round of R-P-S game, but he has made a horrible mistake typing the main page adress', () => {
  const driver = new Builder().forBrowser('chrome').build()
  beforeAll( async () => {
    await driver.get(baseUrl+'/whreShalIgo/')
  })
  afterAll( async () => {
    await driver.quit()
  })
  it('redirects him to main page', async () => {
    setTimeout( async () => {
      const url = await driver.getCurrentUrl()
      expect(url).toEqual(baseUrl)  
    }, 50)
  })
}) 