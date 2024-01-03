import { Page } from '@playwright/test'

export class HomePage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }
  async visit() {
    await this.page.goto('http://127.0.0.1:3000/')
  }
  async getCreateButton() {
    const createTaskButton = await this.page.getByTestId('create-task-button');
    return createTaskButton
  }
  async getFirstTaskItem() {
    const taskItems = await this.page.getByTestId('task-item').all()
    return taskItems[0]
  }
  async clickCreateTaskButton() {
    const createTaskButton = await this.getCreateButton();
    await createTaskButton.click()
  }

  async getCreateTaskDialog() {
    const taskDialog = await this.page.getByTestId('create-task-dialog')
    return taskDialog
  }
  async getEditForm() {
    const editdialog = await this.page.getByTestId('')
  }

  async interceptGetRequest(){
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
