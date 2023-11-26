import user from '../models/user.js';
import User from '../models/user.js'

export const getUsers = async(req, res) => {
  try {
    if(!req.isAdmin) {
      return res.status(403).json({ message: 'You do not have permission.'});
    }
    const users = await User.find();
    const editedUsers = users.map(user => {
      const {password, ...other} = user._doc;
      return other;
    });
    return res.status(200).json({ message: 'Get users', users: editedUsers });

  } catch(err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

export const deleteUser = async(req, res) => {
  const { id } = req.params;
  try {
    if(!req.isAdmin) {
      return res.status(403).json({ message: 'You do not have permission.'});
    }
    const user = await User.findById(id);
    if(!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await User.findOneAndDelete({_id: id});

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch(err) {
    return res.status(500).json({ message: 'Something went wrong' });
  }
}