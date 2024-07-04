const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

/* GET users list. */
router.get('/', userController.getUser);

/* POST create user */
router.post('/', userController.createUser);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

/* PUT update user using id */
router.put('/:userId', userController.updateUser);

/* DELETE user */
router.delete('/:userId', userController.removeUser);

module.exports = router;