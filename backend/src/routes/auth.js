import express from 'express'
import auth_service from '../services/auth_service.js'
import verify_input from '../middleware/verify_input.js'
const router = express.Router()

router.post('/signin', verify_input, async (req, res) => {
  const { body } = req
  const { email, password } = body

  try {
    const user = await auth_service.signin(email, password)
    return res.status(200).send(user)
  } catch (e) {
    return res.status(403).send({ message: e.message })
  }
})

router.post('/signup', verify_input, async (req, res) => {
  const { body } = req
  const { name, email, password } = body
  try {
    const user = await auth_service.signup(name, email, password)
    return res.status(201).send({ message: 'user created successfully' })
  } catch (e) {
    return res.status(400).send({ message: e.message })
  }
})

export default router
