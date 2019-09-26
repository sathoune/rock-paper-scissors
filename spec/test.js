const {Builder, By} = require('selenium-webdriver');
const chrome = require('chromedriver');

describe('website', () => {
  it('has #scissors element', async () => {
    const driver = await new Builder().forBrowser('chrome').build()
    try {
      await driver.get('http://127.0.0.1:3000/')
      const result = await driver.findElement(By.id('scissors'))
      expect(await result.getAttribute('innerHTML')).toEqual('hi')
    } finally {
      await driver.quit()
    }
  })
})
