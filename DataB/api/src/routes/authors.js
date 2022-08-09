const { Router } = require('express')
const router = Router()
const Author = require('../models/Author')
const Quote = require('../models/Quote')



//GET

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


  //GET ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      if (id.length !== 24) throw new Error('The id have 24 characters')
      const author = await Author.findById(id).populate('quotes')
      if (!author) throw new Error('No author found')
      res.status(200).json(author)
    } catch (err) {
      res.status(404).send(err.message)
    }
  })
  

  //GET ID QUOTE
  router.get('/:id/quotes', async (req, res) => {
    const { id } = req.params
    try {
      const getAuthor = await Author.findById(id)
        .populate('quotes')
        .catch(() => {
          throw new Error('No author found')
        })
      if (getAuthor.quotes.length <= 0) throw new Error('No quotes found')
      const authorQuotes = getAuthor.quotes
      res.status(200).json(authorQuotes)
    } catch (err) {
      res.status(404).send(err.message)
    }
  })
  


  //SEARCH NAME
  router.get('/search/:name', async function (req, res) {
    let { name } = req.params
    name = name[0].toUpperCase() + name.slice(1)
    try {
      if (name) {
        const authorNameFilter = await Author.find({
          name: { $regex: name },
        }).populate('quotes', { quote: 1})
        res.status(200).json(authorNameFilter)
      } else {
        const author = await Author.find({}).populate('quotes')
        if (!author) throw new Error('No authors found')
        res.status(200).json(author)
      }
    } catch (err) {
      res.send(err.message)
    }
  })


  

//ADD
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


  //PUT
  router.put('/update/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      if (Object.keys(req.body).length === 0) throw new Error('Send propertys')
      const author = await Author.findByIdAndUpdate(id, req.body, { new: 1 })
      res.json(author)
    } catch (error) {
      console.log('FALLO EL UPDATE', error)
    }
  })
 //Revisar: en quotes solo trae los id, estaria bueno que traiga todo?



 //DELETE
 router.delete('/deleteAuthor/:id', async (req, res) => {
  const { id } = req.params
  try {
    const Autor = await Author.findOne({ _id: id }).populate('quotes')
    const quotes = await Quote.find({ author: Autor })
      .populate({
        path: 'category',
        select: 'category',
      })
      .populate({ path: 'author', select: 'name', select: { _id: 0 } })

    const deleteQuotes = await Quote.deleteMany({ author: Autor })
      .populate({
        path: 'category',
        select: 'category',
      })
      .populate({ path: 'author', select: 'name', select: { _id: 0 } })

    const deleteAutor = await Author.deleteOne({ _id: id }).populate('quotes')

    if (!quotes) {
      res.send('No hay quotes de este autor')
    } else {
      res.json(deleteQuotes).send('Quotes del autor borrados')
    }

    if (!Autor) {
      res.send('No existe el autor')
    } else {
      res.json(deleteAutor).send('Autor borrado')
    }
  } catch {
    res.status(404)
    res.send({ error: 'ESE AUTOR NO EXISTE' })
  }
})
  //SI Borro al autor no se borra la frase, chequear cuando vea la ruta de hide


  //HIDE
  router.post('/hideAuthor/:id', async (req, res) => {
    const { id } = req.params
    try {
      if (id) {
        const Autor = await Author.findOne({ _id: id }).populate('quotes')
        await Author.findByIdAndUpdate(id, { isActive: false }).populate('quotes')
        await Quote.updateMany({ author: Autor }, { isActive: false })
          .populate({
            path: 'category',
            select: 'category',
          })
          .populate({ path: 'author', select: 'name', select: { _id: 0 } })
  
        res.send('The author and his quote are hidden now')
      }
    } catch (err) {
      res.status(404).send(err.message)
    }
  })

  //SHOW
  
  router.post('/showAuthor/:id', async (req, res) => {
    const { id } = req.params
    try {
      if (id) {
        const Autor = await Author.findOne({ _id: id }).populate('quotes')
        await Author.findByIdAndUpdate(id, { isActive: true }).populate('quotes')
        await Quote.updateMany({ author: Autor }, { isActive: true })
          .populate({
            path: 'category',
            select: 'category',
          })
          .populate({ path: 'author', select: 'name', select: { _id: 0 } })
  
        res.send('The author and his books can be seen now')
      }
    } catch (err) {
      res.status(404).send(err.message)
    }
  })

  
module.exports = router