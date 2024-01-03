import { expect, test } from '@playwright/test'
import { SignInPage } from '../pages/signin-page.po'

test('Sign In Test', async ({ page }) => {
  const signInPage = new SignInPage(page)

  // Navigate to the sign-in page
  await signInPage.visit()
  signInPage.interceptRequest()
  signInPage.interceptHomeRequest()
  signInPage.fillSignInForm('psrsai001@gmail.com', 'Sai@35941')
  const loginButton = await signInPage.getLogInButton()
  await loginButton.click()
  const logOutLink = page.getByRole('button', { name: 'Sign Out' })
  await expect(logOutLink).toBeVisible()
  
})

