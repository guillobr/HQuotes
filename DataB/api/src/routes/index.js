const { Router } = require('express')
const router = Router()

const quotes = require('./quotes')
const users = require('./users')

router.use('/quotes', quotes)
router.use('/users', users)

module.exports = router
