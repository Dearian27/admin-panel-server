import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async(req, res) => {
  const { password, name, email } = req.body;

  if( !email || !password  || !name) { 
    return res.json({ message: 'Please provide credentials.'});
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if(!hashedPassword) {
      return res.json({ message: 'Error hashing password.' });
    }
    const user = new User({email, password: hashedPassword, name});
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    console.log(user._doc)
    const { userPassword, ...other } = user._doc;
    
    await user.save();
    return res.json({ message: 'User created successfully.', other, token });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Error creating user." });
  }
  
}

export const signIn = (req, res) => {

}