const { json } = require('express');
const userObj = require('../services/user.service');

const registerUser = async (req, res, next) => {
  console.log('Register____', req.body)
  try {
    const x = await userObj.registerUser(req.body, res);
    console.log('xxxxxx______', x)
    return x
  } catch (err) {
    console.error(`Error getting user`, err.message);
    next(err);
  }
}

const loginUser = async (req, res, next) => {
  console.log('login____', req.body)
  try {
    const user = await userObj.loginUser(req.body, res)
    return user;
  } catch (err) {
    console.error(`Error getting user`, err.message);
    next(err);
  }
}

const getUser = async (req, res, next) => {
  try {
    res.json(await userObj.getUsers(req, res));
  } catch (err) {
    console.error(`Error getting user`, err.message);
    next(err);
  }
}

const createUser = async (req, res, next) => {
  try {
    res.json(await userObj.create(req.body,res));
  } catch (err) {
    console.error(`Error creating user`, err.message);
    next(err);
  }
}

const updateUser = async (req, res, next) => {
  try {
    res.json(await userObj.updateUser(req.params.userId, req.body, res));
  } catch (err) {
    console.error(`Error updating user`, err.message);
    next(err);
  }
}

const removeUser = async (req, res, next) => {
  try {
    res.json(await userObj.remove(req.params.userId, req.body, res));
  } catch (err) {
    console.error(`Error deleting user`, err.message);
    next(err);
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  removeUser,
  loginUser,
  registerUser
};