const { Router } = require('express')
const router = Router()

const quotes = require('./quotes')

router.use('/quotes', quotes)

module.exports = router
