const { Router } = require('express')
const router = Router()

const quotes = require('./quotes')
const users = require('./users')
const authors = require('./authors')

router.use('/quotes', quotes)
router.use('/users', users)
router.use('/authors', authors)

module.exports = router
