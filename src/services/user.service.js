const { default: mongoose } = require('mongoose');
const db = require('../db/mongooseConnection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
const { user_Schema, register_user_Schema } = require('../models/user.model');

const userModel = mongoose.model('users', user_Schema)
const registerModel = mongoose.model('register', register_user_Schema)

const registerUser = async (user, res) => {
  console.log('Register user_____', res)
  try {
    let isUserExisit = await registerModel.findOne({ email: user.email })
    if (isUserExisit) {
      res.status(201).send({ message: 'User already exists' })
    }
    else {
      let hashPassword = await bcrypt.hashSync(user.password, salt);
      const register = new registerModel(user)
      register.password = hashPassword
      await register.save()
      res.status(201).send({ message: 'Account created successfully' })
    }

  }
  catch (err) {
    throw err
  }
}

const loginUser = async (user, res) => {
  console.log('Login user_______', user)
  let loginUser
  try {
    loginUser = await registerModel.findOne({ email: user.email })
    if (loginUser.email == user.email) {
      const token = await jwt.sign({ email: user.email }, 'privateKey')
      const passVerify = await bcrypt.compare(user.password, loginUser.password)
      if (passVerify) {
        return res.status(201).send({ message: 'User Login Succefully', token, loginUser })
      }
      else {
        return { status: '401', message: "Password didn't match!" };
      }
    }
  } catch (err) {
    throw err
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({})
    if (!users) {
      return res.status(404).send()
    }
    res.send(users)
  }
  catch (err) {
    console.log('--error----', err)
  }
}

const create = async (user, res) => {
  try {
    const newUser = new userModel(user);
    await newUser.save()
    res.status(201).send({ user: newUser, message: 'User created successfully' })
  }
  catch (err) {
    console.log('--error----', err)
  }
}

const updateUser = async (userId, body, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate({ userId }, body)
    if (!updatedUser) {
      return res.status(400).send({ error: 'Invalid updates' })
    }
    res.send({ message: 'User updated successfully' })
  }
  catch (err) {
    console.log('--error----', err)
  }
}

const remove = async (userId, body, res) => {
  try {
    const deleteduser = await userModel.findOneAndDelete({ userId })
    if (!deleteduser) {
      return res.status(400).send({ error: 'Invalid request' })
    }
    res.send({ message: 'User deleted successfully' })
  }
  catch (err) {
    console.log('--error----', err)
  }
}

module.exports = {
  getUsers,
  create,
  updateUser,
  remove,
  registerUser,
  loginUser
}