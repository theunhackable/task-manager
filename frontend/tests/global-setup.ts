import { Browser, Page, chromium, expect } from "@playwright/test";
import { SignInPage } from "./pages/signin-page.po";
async function globalSetup() {
  const browser: Browser = await chromium.launch({headless: true});
  const context = await browser.newContext()

  const page: Page = await context.newPage();
  const signInPage = new SignInPage(page)
  await signInPage.visit()
  await signInPage.fillSignInForm('psrsai001@gmail.com', 'Sai@35941');
  const loginButton = await signInPage.getLogInButton();
  await loginButton.click();
  await page.context().storageState({ path: 'tests/fixtures/userfile.json' });
  await browser.close();
}

export default globalSetup;