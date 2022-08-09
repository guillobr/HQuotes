const { Router } = require('express')

const Quote = require('../models/Quote')
const Author = require('../models/Author')
const Category = require('../models/Category')

const router = Router()


//GET
  router.get('/', async function (req, res) {
    try {
      const quotes = await Quote.find({})
      .populate({
      path: 'author', 
      select: 'name', 
      select: { _id: 0 } })
      .populate({
        path: 'category',
        select: 'category'
      })
      return res.json(quotes)
    } catch (error) {
      console.log('FALLO GET Quotes', error)
    }
  })



  //GET ID
  router.get('/:id', async function (req, res) {
    const { id } = req.params
    try {
      if (id.length !== 24) throw new Error('The id have 24 characters')
      const quote = await Quote.findById(id).populate(['author', 'category'])
      if (quote === null) throw new Error('Quote not found')
      res.status(200).json(quote)
    } catch (err) {
      res.status(404).send(err.message)
    }
  })


  //GET CATEGORY
  router.get('/category/:category', async function (req, res) {
    const { category } = req.params
    console.log(category)
    try {
      if (category) {
        const quotes = await Quote.find({})
          .populate({
            path: 'category',
            select: { category: 1, _id: 0 },
          })
          .populate({
            path: 'author',
            select: { name: 1, _id: 0, surname: 1, biography: 1 },
          })
  
        const quotesCategory = quotes?.filter((e) =>
          e.category?.find((e) => e.category === category)
        )
  
        return res.json(quotesCategory)
      }
    } catch (error) {
      console.log('FALLO Categorya', error)
    }
  })


  //GET SEARCH
  // router.get('/search', async function (req, res) {
  //   let { quote, name } = req.query
  //   try {
  //     if (quote) {
  //       quote = quote[0].toUpperCase() + quote.slice(1)
  //       const quoteNameFilter = await Quote.find({
  //         quote: { $regex: quote },
  //       }).populate(['author', 'category'])
  //       res.status(200).json(quoteNameFilter)
  //     } else if (name) {
  //       name = name[0].toUpperCase() + name.slice(1)
  //       const authorNameFilter = await Author.find({
  //         name: { $regex: name },
  //       }).populate('quotes')
  //       res.status(200).json(authorNameFilter)
  //     } else {
  //       const quotes = await Quote.find({}).populate(['author', 'category'])
  //       res.json(quotes)
  //     }
  //   } catch (err) {
  //     res.send(err.message)
  //   }
  // })

  router.get('/search/:quote', async function (req, res) {
    let { quote } = req.params
    quote = quote[0].toUpperCase() + quote.slice(1)
    try {
      if (quote) {
        const quoteNameFilter = await Quote.find({
          name: { $regex: quote },
        }).populate('author', { name: 1}).populate('category',{Category: 1})
        res.status(200).json(quoteNameFilter)
      } else {
        const quote = await Quote.find({}).populate(['author', 'category'])
        if (!quote) throw new Error('No q found')
        res.status(200).json(quote)
      }
    } catch (err) {
      res.send(err.message)
    }
  })




  //ADD QUOTE
router.post('/addQuote', async function (req, res) {
  const {
    quote,
    author,
    category
  } = req.body
  console.log('Cat:',category)

  const arrayCategory = await category.map(async (e) => {
    const getCategory = await Category.find({ category: e }, { category: 1 })
    return getCategory
  })
  const categories = await Promise.all(arrayCategory)
  const aux = categories?.map((e) => e?.find((e) => e._id))
  const categoryId = aux.map((e) => e._id)

 
  const authorDb = await Author.find({
    name: author,
  })
  console.log('soy:',authorDb)

  try {
    if (!authorDb) throw new Error('Author not found')
    const newQuote = new Quote({
      quote,
      author: authorDb[0]._id,
      category: categoryId,
    })
    await newQuote.save()
    const saveQuote = await Quote.find({ quote: quote })
    .populate({
      path: 'category',
      select: { category: 1, _id: 0 },
    })
      .populate({
        path: 'author',
        select: { name: 1, _id: 0, biography: 1 },
      })
    authorDb[0].quotes.push(saveQuote[0]._id)
    await authorDb[0].save()

    return res.json(newQuote)
  } catch (err) {
    console.log('FALLO POST BOOKS', err.message)
  }
})



//PUT QUOTE
router.put('/update/:id', async (req, res) => {
  const { id } = req.params
  try {
    if (Object.keys(req.body).length === 0) throw new Error('Send propertys')
    const quote = await Quote.findByIdAndUpdate(id, req.body, { new: 1 })
    res.json(quote)
  } catch (err) {
    res.status(404).send(err.message)
  }
})



//DELETE
  router.delete('/deleteQuote/:id', async (req, res) => {
    const { id } = req.params
    try {
      await Quote.deleteOne({ _id: id })
        .populate({
          path: 'category',
          select: 'category',
        })
        .populate({ path: 'author', select: 'name', select: { _id: 0 } })
  
      res.status(204).send()
    } catch {
      res.status(404)
      res.send({ error: 'ESE Quote NO EXISTE' })
    }
  })


//HIDE
  router.post('/hideQuote/:id', async (req, res) => {
    const { id } = req.params
    try {
      if (id) {
        await Quote.findByIdAndUpdate(id, { isActive: false })
        res.send('The quote is hidden now')
      }
    } catch (err) {
      res.status(404).send(err.message)
    }
  })
  


  //SHOW
  router.post('/showQuote/:id', async (req, res) => {
    const { id } = req.params
    try {
      if (id) {
        await Quote.findByIdAndUpdate(id, { isActive: true })
        res.send('The quote can be seen now')
      }
    } catch (err) {
      res.status(404).send(err.message)
    }
  })

module.exports = router