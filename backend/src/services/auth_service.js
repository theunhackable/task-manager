import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userService from '../services/user_service.js'
class AuthService {
  async signin(email, password) {
    try {
      const user = await userService.get_by_email(email)

      if (!user) throw new Error('user not found.')

      const password_match = await bcrypt.compare(password, user.password)
      if (!password_match) {
        throw new Error('Incorrect password')
      }
      const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET)
      return {
        name: user.name,
        email: user.email,
        token,
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async signup(name, email, password) {
    const hashed_password = await bcrypt.hash(password, 10)
    try {
      const user = await userService.get_by_email(email)
      if (user) throw new Error('user already exists')
      try {
        const user = await userService.create(name, email, hashed_password)
        return user
      } catch (e) {
        throw new Error('unable to create user')
      }
    } catch (e) {
      throw e
    }
  }
}

export default new AuthService()
