import express from 'express'
import appRouter from './routes/router.js'
import mongoose from 'mongoose'
import dontenv from 'dotenv'
import bodyParser from 'body-parser'

dontenv.config()
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', appRouter)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('mongodb connected')
  })
  .catch((e) => console.log(e))

app.listen(process.env.PORT, () => {
  console.log(`api is on http://127.0.0.1:${process.env.PORT}`)
})
