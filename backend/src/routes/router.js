import express from 'express'
import authRouter from './auth.js'
import taskRouter from './tasks.js'
const router = express.Router()

router.get('/', (req, res) => {
  res.send({
    available_routes: {
      '/users': {
        methods: ['get', 'post'],
      },
      '/tasks': {
        methods: ['get', 'post', 'patch', 'delete'],
      },
    },
  })
})

router.use('/auth', authRouter)
router.use('/tasks', taskRouter)

export default router
