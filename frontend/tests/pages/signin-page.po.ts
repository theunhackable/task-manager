import { Page } from '@playwright/test'

export class SignInPage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }
  async visit() {
    await this.page.goto('http://127.0.0.1:3000/signin')
  }
  async getEmailInput() {
    const emailInput = await this.page.locator('input[id="email"]');
    return emailInput
  }
  async getPasswordInput() {
    const passwordInput = await this.page.locator('input[id="password"]')
    return passwordInput
  }
  
  async getLogInButton() {
    const loginButton = await this.page.getByTestId('signin-button')
    return loginButton
  }

  async fillSignInForm(email: string, password: string) {
    const emailInput = await this.getEmailInput();
    const passwordInput = await this.getPasswordInput();
    await emailInput.fill(email)
    await passwordInput.fill(password)
  }

  async interceptRequest(){
    await this.page.route(            
      'http://127.0.0.1:4000/auth/signin',
      async route => {
          route.fulfill({
              status: 200,
              contentType: 'application/json',
              path: 'tests/fixtures/user-default.json'
          })
      },
  )
  }

  async interceptHomeRequest(){
    await this.page.route(            
      'http://127.0.0.1:4000/tasks',
      async route => {
          route.fulfill({
              status: 200,
              contentType: 'application/json',
              path: 'tests/fixtures/tasks.json'
          })
      },
  )
  }
  
  
}
