const { Router } = require('express')
const Category = require('../models/Category')
const router = Router()

router.get('/', async function (req, res) {
  try {
    const categories = await Category.find({}).populate('quotes')
    if (categories.length < 0) throw new Error('Cat not found')
    res.status(200).json(categories)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

router.get('/:id', async function (req, res) {
  try {
    const category = await Category.findById(req.params.id).populate('quotes')
    if (category.length < 0) throw new Error('Categories not found')
    res.status(200).json(category)
  } catch (error) {
    res.status(404).send(error.message)
  }
})

router.post('/addCategory', async function (req, res) {
  const { category } = req.body
  try {
    if (category === undefined) throw new Error('Cat must be defined')
    const newCategory = new Category({
      category
    })
    await newCategory.save()
    res.status(200).send(newCategory)
  } catch (err) {
    res.status(404).send(err.message)
  }
})

module.exports = router
