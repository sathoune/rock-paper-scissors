const {Builder, By} = require('selenium-webdriver')
const chrome = require('chromedriver')

const baseUrl = 'http://127.0.0.1:3000/'

describe('website', () => {
  it('has #scissors, #rock, #paper and #score elements', async () => {
    const driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get(baseUrl)
      const scissorsElement = await driver.findElement(By.id('scissors'))
      const rockElement     = await driver.findElement(By.id('rock'))
      const paperElement    = await driver.findElement(By.id('paper'))
      const scoreElement    = await driver.findElement(By.id('score'))
      expect(await scissorsElement.getAttribute('innerHTML')).toEqual('scissors')
      expect(await rockElement    .getAttribute('innerHTML')).toEqual('rock')
      expect(await paperElement   .getAttribute('innerHTML')).toEqual('paper')
      expect(await scoreElement)  .not.toBe(undefined)
    } finally {
      await driver.quit()
    }
  })
})
