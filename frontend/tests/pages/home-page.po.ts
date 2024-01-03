import { Page } from '@playwright/test'

export class HomePage {
  private page: Page

  constructor(page: Page) {
    this.page = page
  }
  async visit() {
    await this.page.goto('http://localhost:3000/')
  }

  async getName() {
    return this.page.getByTestId('name')
  }
  async getCreateButton() {
    const createTaskButton = this.page.getByTestId('create-task-button');
    return createTaskButton
  }
  async getFirstTaskItem() {
    const taskItem = this.page.getByTestId('task-item').first()
    return taskItem
  }
  async clickCreateTaskButton() {
    const createTaskButton = await this.getCreateButton();
    await createTaskButton.click()
  }

  async getCreateTaskDialog() {
    const taskDialog = this.page.getByTestId('create-task-dialog')
    return taskDialog
  }
  async getEditTaskDialog(){
    const editDialog = this.page.getByTestId('edit-task-dialog')
    return editDialog
  }
  async fillEditTaskForm(title: string, desc: string) {
    const editDialog = await this.getEditTaskDialog()
    const titleInput = editDialog.locator('input[id="title"]')
    const descInput = editDialog.locator('input[id="desc"]')
    await titleInput.fill('title edited')
    await descInput.fill('new description')
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
  async interceptPostRequest(){
    await this.page.route(            
      'http://127.0.0.1:4000/tasks',
      async route => {
          route.fulfill({
              status: 200,
              contentType: 'application/json',
              path: 'tests/fixtures/task-added-success.json'
          })
      },)
  }

  async interceptTitleEditRequest(){
    await this.page.route(            
      'http://127.0.0.1:4000/tasks/*',
      async route => {
          route.fulfill({
              status: 200,
              contentType: 'application/json',
              path: 'tests/fixtures/task-edited-success.json'
          })
      },)
  }
  async intercepSwitchStatusRequest(){
    await this.page.route(            
      'http://127.0.0.1:4000/tasks/*',
      async route => {
          route.fulfill({
              status: 200,
              contentType: 'application/json',
              path: 'tests/fixtures/task-status-switch-success.json'
          })
      },)
  }

  async intercepTaskDeleteRequest(){
    await this.page.route(            
      'http://127.0.0.1:4000/tasks/*',
      async route => {
          route.fulfill({
              status: 200,
              contentType: 'application/json',
              path: 'tests/fixtures/task-deleted-success.json'
          })
      },)
  }
  
}
