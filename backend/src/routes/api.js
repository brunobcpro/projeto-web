const express = require('express')

const UserController = require ("../../app/controllers/UserController")

const router = express.Router()

router.get('/users', UserController.index)

module.exports = router