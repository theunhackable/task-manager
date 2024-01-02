import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
  title: String,
  desc: String,
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    default: 'To Do',
  },
})

const Task = mongoose.model('tasks', taskSchema)

export default Task
