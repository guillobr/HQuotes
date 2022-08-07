const { Router } = require('express')
const router = Router()
const Author = require('../models/Author')
const Quote = require('../models/Quote')





router.get('/', async (req, res) => {
    try {
      const author = await Author.find({}).populate('quotes', {
        quote: 1,
        _id: 1,
      })
      if (!author) throw new Error('No author found')
      res.status(200).json(author)
    } catch (err) {
      res.status(404).send(err.message)
    }
  })


  


  router.post('/addAuthor', async (req, res) => {
    const { name, birth, country, picture, biography } = req.body
  
    try {
      const getAuthor = await Author.find({
        name: name,
      })
  
      if (getAuthor.length > 0) throw new Error('Author already exists')
  
      const newAuthor = new Author({
        name,
        birth,
        country,
        picture,
        biography,
      })
      const authorSave = await newAuthor.save()
  
      res.status(200).json(authorSave)
    } catch (err) {
      res.status(404).send(err.message)
    }
  })



router.delete('/deleteAuthor/:id', async (req, res) => {
    const { id } = req.params
    try {
      await Author.deleteOne({ _id: id })
      res.status(204).send()
    } catch {
      res.status(404)
      res.send({ error: 'ESA Autor NO EXISTE' })
    }
  })

module.exports = router