import express from 'express'
import taskService from '../services/task_service.js'
import verify_token from '../middleware/auth/verify_token.js'
const router = express.Router()

router.get('/', verify_token, async (req, res) => {
  const user_id = req.user_id
  try {
    const tasks = await taskService.get_by_creator_id(user_id)
    res.send({ message: 'request success.', data: tasks })
  } catch (e) {
    res
      .status(500)
      .send({ message: 'something went wrong. please try again', data: null })
  }
})

router.post('/', verify_token, async (req, res) => {
  const { body } = req
  const { title, desc } = body
  const user_id = req.user_id
  console.log(title, desc, user_id)
  try {
    const task = await taskService.create(title, desc, user_id)
    return res.status(201).send({ message: 'task created successfully.', data: task })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .send({ message: 'error occoured while creating a task', data: null })
  }
})

router.patch('/:id', verify_token, async (req, res) => {
  const { body } = req
  const {id} = req.params
  const { title, desc, status } = body
  try {
    const task = await taskService.get_by_id(id)
    if(title) task.title = title;
    if(desc) task.desc = desc;
    if(status) task.status = status;
    task.save();
    res.send({message: "successfully updated the task.", data:task})
  } catch(e) {
    res.send({message: e.message, data: null})
  }
})


router.delete('/:id', verify_token, async (req, res) => {
  const {id} = req.params

  try {
    const task = await taskService.delete(id)
    res.send({message: "successfully updated the task.", data:task})
  } catch(e) {
    console.log(e)
    res.status(404).send({message: e.message, data: null})
  }
})

export default router
