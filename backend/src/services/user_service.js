import User from '../models/User.js'

class UserService {
  async create(name, email, password) {
    if (!name || !email || !password) throw new Error('empty name or email or password')
    try {
      const newUser = new User({ name, email, password })
      const savedUser = await newUser.save()
      return savedUser
    } catch (error) {
      throw error
    }
  }

  async get_by_id(user_id) {
    try {
      const user = await User.findById(user_id)
      return user
    } catch (error) {
      throw error
    }
  }
  async get_by_email(email) {
    try {
      const user = await User.findOne({ email })
      return user
    } catch (e) {
      throw e
    }
  }

  async update(user_id, data) {
    try {
      const user = await User.findByIdAndUpdate(user_id, data, { new: true })
      return user
    } catch (error) {
      throw error
    }
  }

  async delete(user_id) {
    try {
      const user = await User.findByIdAndDelete(user_id)
      return user
    } catch (error) {
      throw error
    }
  }
}

export default new UserService()
