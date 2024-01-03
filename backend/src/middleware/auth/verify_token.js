import jwt from 'jsonwebtoken'

async function verify_token(req, res, next) {
  const { authorization } = req.headers

  if (!authorization)
    return res.status(401).send({ message: 'authorization header not provided' })

  const token = authorization.split(' ')[1]

  if (!token) {
    return res.status(403).send({ message: 'token not found' })
  }

  try {
    const { user_id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user_id = user_id
    next()
  } catch (e) {
    return res.status(403).send({ message: e.message })
  }
}

export default verify_token
