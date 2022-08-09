const { Router } = require('express')
const router = Router()

const quotes = require('./quotes')
const users = require('./users')
const authors = require('./authors')
const categories = require('./categories')

router.use('/quotes', quotes)
router.use('/users', users)
router.use('/authors', authors)
router.use('/categories', categories)

module.exports = router
