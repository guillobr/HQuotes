const { Router } = require('express')

const Quote = require('../models/Quote')

const router = Router()


router.get('/', async function (req, res) {
    try {
      const quotes = await Quote.find({})
      return res.json(quotes)
    } catch (error) {
      console.log('FALLO GET Quotes', error)
    }
  })

router.post('/addQuote', async function (req, res) {
    const { quote , author } = req.body
    console.log('Entre')
    try{
    const newQuote = new Quote({
        quote,
        author
      })
      await newQuote.save()
      return res.json(newQuote)
    }catch{
        console.log('FALLO POST QUOTES', err.message)
    }
})

router.delete('/deleteQuote/:id', async (req, res) => {
    const { id } = req.params
    try {
      await Quote.deleteOne({ _id: id })
      res.status(204).send()
    } catch {
      res.status(404)
      res.send({ error: 'ESA FRASE NO EXISTE' })
    }
  })

module.exports = router