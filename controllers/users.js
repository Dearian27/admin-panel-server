

export const createUser = (req, res) => {
  const { password } = req.body;
  return res.json({ message: 'fdsfda', password});
}

export const getUsers = (req, res) => {
  return res.json({ message: "get users"})
}

export const deleteUser = (req, res) => {

}