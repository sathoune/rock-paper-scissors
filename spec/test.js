const {Builder, By} = require('selenium-webdriver')
const chrome = require('chromedriver')

describe('website', () => {
  it('has #scissors, #rock and #paper elements', async () => {
    const driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get('http://127.0.0.1:3000/')
      const scissorsElement = await driver.findElement(By.id('scissors'))
      const rockElement     = await driver.findElement(By.id('rock'))
      const paperElement    = await driver.findElement(By.id('paper'))
      expect(await scissorsElement.getAttribute('innerHTML')).toEqual('scissors')
      expect(await rockElement    .getAttribute('innerHTML')).toEqual('rock')
      expect(await paperElement   .getAttribute('innerHTML')).toEqual('paper')
    } finally {
      await driver.quit()
    }
  })
})
