const router = require('express').Router();

const userController = require('../controller/userController');

// API
// users
// /register = endpoint
router.get('/', userController.getUsers)
router.post('/register', userController.createUser)
router.post('/login', userController.login)
router.get('/:id', userController.getUserById)
router.put('/:id', userController.editUser)
router.delete('/:id', userController.deleteUser)

// module exports
module.exports = router