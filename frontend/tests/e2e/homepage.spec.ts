import { expect, test } from '@playwright/test'
import { HomePage } from '../pages/home-page.po'
import { SignInPage } from '../pages/signin-page.po'
test.describe('homepage', () => {
  test.use({ storageState: 'tests/fixtures/auth.json' })
  test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page)
     homePage.interceptGetRequest()
    await homePage.visit()
  })
  
  
  
  test('user must be logged in', async ({page}) => {
    const homePage = new HomePage(page)
    const name = await page.getByTestId('name')
    const logOutLink = await page.getByRole('button', { name: 'Sign Out' })
    await expect(logOutLink).toBeVisible()
  })

  test('display the user name', async ({page}) => {
    const homePage = new HomePage(page)
    const name = await homePage.getName()
    await expect(name).toHaveText('welcome Jhon Wick')
  })

  test('display the create task button', async ({page}) => {
    const homePage = new HomePage(page)
    const createTaskButton = await homePage.getCreateButton()
    await expect(createTaskButton).toBeVisible()
  })

  test('display the task list', async ({page}) => {
    const homePage = new HomePage(page)
    const taskItem = await homePage.getFirstTaskItem()
    await expect(taskItem).toBeVisible()
  })

  test('display the create task dialog', async ({page}) => {
    const homePage = new HomePage(page)
    await homePage.clickCreateTaskButton()
    const taskDialog = await homePage.getCreateTaskDialog()
    await expect(taskDialog).toBeVisible()
  })

  test('should be able to create new task', async ({page}) => {
    const homePage = new HomePage(page)
    await homePage.clickCreateTaskButton()
    const taskDialog = await homePage.getCreateTaskDialog()
    const titleInput = await taskDialog.locator('input[id="title"]')
    const descInput = await taskDialog.locator('input[id="desc"]')
    await titleInput.fill('new task')
    await descInput.fill('new task description')
    const submitButton = await page.getByRole('button', { name: 'Create Task' })
    homePage.interceptPostRequest()
    await submitButton.click()

    const taskItem = await homePage.getFirstTaskItem()
    await expect(taskItem).toContainText('new task')
  })

  test('should be able to change task status', async ({page}) => {
    const homePage = new HomePage(page)
    const taskItem = await homePage.getFirstTaskItem()
    const statusButton = taskItem.getByRole('button', { name: 'In Progress' })
    homePage.intercepSwitchStatusRequest()
    await statusButton.click()
    const inProgressButton = await taskItem.getByRole('button', { name: 'In Progress' })
    await expect(inProgressButton).toBeDisabled()
  
  })

  test('should be able to edit task', async ({page}) => {
    const homePage = new HomePage(page)
    const taskItem = await homePage.getFirstTaskItem()
    const editButton = taskItem.getByTestId('edit-task-button')
    await editButton.click()
    const editDialog = await homePage.getEditTaskDialog()
    await homePage.fillEditTaskForm('title edited', 'new description')
    const submitButton = page.getByRole('button', { name: 'Save changes' })
    homePage.interceptTitleEditRequest()
    await submitButton.click()
    
    await expect(taskItem).toContainText('title edited')
  })
  test('should be able to delete task', async ({page}) => {
    const homePage = new HomePage(page)
    const taskItem = await homePage.getFirstTaskItem()
    const deleteButton = taskItem.getByTestId('delete-task-button')
    homePage.intercepTaskDeleteRequest()
    await deleteButton.click()
    await expect(taskItem).not.toContainText('title 1')
  })
})