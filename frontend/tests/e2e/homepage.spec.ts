import { expect, test } from '@playwright/test'
import { HomePage } from '../pages/home-page.po'

test.describe('homepage', () => {
  test.use({storageState: 'tests/fixtures/user-default.json'})

  test.beforeEach(async ({browser}) => {

    const context = await browser.newContext({
      storageState: 'tests/fixtures/user-default.json'
    })
    const page = await context.newPage()
    const homePage  = new HomePage(page)

    await homePage.interceptGetRequest()
    await homePage.visit()
  })


  
  test('displays user name', async ({page}) => {
      const homePage = new HomePage(page)
      const name = await page.getByTestId('name')
      await expect(name).toHaveText("Jhon Wick")
  })
})