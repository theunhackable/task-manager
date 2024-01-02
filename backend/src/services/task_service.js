import Task from '../models/Task.js'

class TaskService {
  async create(title, desc, created_by) {
    try {
      const new_task = new Task({ title, desc, created_by })
      const saved_task = await new_task.save()
      return saved_task
    } catch (error) {
      throw error
    }
  }

  async get_by_id(task_id) {
    try {
      const task = await Task.findById(task_id)
      return task
    } catch (error) {
      throw error
    }
  }

  async get_by_creator_id(creator_id) {
    try {
      const tasks = await Task.find({ created_by: creator_id })
      console.log(tasks)
      return tasks
    } catch (e) {
      throw error
    }
  }

  async update(task_id, data) {
    try {
      const updated_task = await Task.findByIdAndUpdate(task_id, data, {
        new: true,
      })
      return updated_task
    } catch (error) {
      throw error
    }
  }

  async delete(task_id) {
    try {
      const deleted_task = await Task.findByIdAndDelete(task_id)
      return deleted_task
    } catch (error) {
      throw error
    }
  }
}

export default new TaskService()
