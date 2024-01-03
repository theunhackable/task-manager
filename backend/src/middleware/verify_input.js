import { validateEmail, validateName, validatePassword } from '../lib/utils.js';

async function verify_input(req, res, next) {
  const {body} = req
  const {email, name, password } = body;
  if(email){
   const error = validateEmail(email)
   if(error) return res.status(400).send({message: "Invalid email. Please check your again."})
  }
  if(name){
    const error = validateName(name)
    if(error) return res.status(400).send({message: "Invalid name. Please check your again."})
   }
   if(password){
    const error = validatePassword(password)
    if(error) return res.status(400).send({message: "Invalid password. Please check your again."})
   }
  next();  
}

export default verify_input