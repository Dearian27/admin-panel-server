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
    const { password:userPassword, ...other } = user._doc;
    console.log(other);    
    await user.save();
    return res.status(200).json({ message: 'User created successfully.', user: other, token });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Error creating user." });
  }
  
}

export const signIn = async(req, res) => {
  const { password, email } = req.body;

  if( !email || !password) { 
    return res.json({ message: 'Please provide credentials.'});
  }
  try {
    const user = await User.findOne({email});
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch) {
      return res.json({ message: 'Wrong password.' });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const { password:userPassword, ...other } = user._doc;
    
    return res.status(200).json({ message: 'Authorization success.', user: other, token });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Error creating user." });
  }
}