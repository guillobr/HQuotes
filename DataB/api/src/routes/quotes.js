const { Router } = require('express')

const Quote = require('../models/Quote')
const Author = require('../models/Author')

const router = Router()


router.get('/', async function (req, res) {
    try {
      const quotes = await Quote.find({})
      return res.json(quotes)
    } catch (error) {
      console.log('FALLO GET Quotes', error)
    }
  })
  // router.get('/', async function (req, res) {
  //   try {
  //     const quotes = await Quote.find({}).populate({
  //     path: 'authors', select: 'name', select: { _id: 0 } })
  //     return res.json(quotes)
  //   } catch (error) {
  //     console.log('FALLO GET Quotes', error)
  //   }
  // })



  // router.post('/addQuote', async function (req, res) {
  //   const { quote , author } = req.body
   
  //   const authorDb = await Author.find({
  //     name: author.name,
  //   })
   
  
  //   try {
  //     if (!authorDb) throw new Error('Author not found')
  //     const newQuote = new Quote({
  //       quote:quote,
  //       author: authorDb._id,
  //     })
  //     await newQuote.save()
  //     const saveQuote = await Quote.find({ quote: quote })
  //       .populate({
  //         path: 'author',
  //         select: { name: 1, _id: 0, biography: 1 },
  //       })
  //     authorDb.quotes.push(saveQuote[0]._id)
  //     await authorDb[0].save()
  
  //     return res.json(saveQuote)
  //   } catch (err) {
  //     console.log('FALLO POST BOOKS', err.message)
  //   }
  // })


// router.post('/addQuote', async function (req, res) {
//     const { quote , author } = req.body

//     const authorDb = await Author.find({
//       name: author,
//     })

//     console.log('soy',authorDb)
   
//     try{
//       if (!authorDb) throw new Error('Author not found')

//     const newQuote = new Quote({
//         quote,
//         author
//       })
//       await newQuote.save()

//       const saveQuote = await Quote.find({ quote: quote })
//       .populate({
//         path: 'author',
//         select: { name: 1, _id: 0, biography: 1 },
//       })
//       console.log('soySave:',saveQuote)
//       authorDb[0].quotes.push(saveQuote[0]._id)
//       await authorDb[0].save()


//       return res.json(saveQuote)
//     }catch (err){
//         console.log('FALLO POST QUOTES', err.message)
//     }
// })


router.post('/addQuote', async function (req, res) {
  const {
    quote,
    author,
  } = req.body

 
  const authorDb = await Author.find({
    name: author,
  })
  console.log('soy:',authorDb)

  try {
    if (!authorDb) throw new Error('Author not found')
    const newQuote = new Quote({
      quote,
      author: authorDb[0]._id,
    })
    await newQuote.save()
    const saveQuote = await Quote.find({ quote: quote })
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