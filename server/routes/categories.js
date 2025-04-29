const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const getCategory = require('../middleware/getCategory')
const authenticationToken = require('../middleware/authenticationToken')

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', getCategory, async (req, res) => {
  res.send(res.category)
})

router.post('/', authenticationToken, async (req, res) => {
  const category = new Category({
    categoryName: req.body.categoryName,
    description: req.body.description,
  })
  category
    .save()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.json({ message: err }))
})

router.post('/bulk-insert', async (req, res) => {
  console.log(req.body.categories)
  const categories = req.body.categories.map((cat) => ({
    categoryName: cat.categoryName,
    departmentName: cat.departmentName,
    description: cat.description,
  }))

  console.log(categories)

  Category.insertMany(categories)
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json({ message: err }))
})

router.patch('/:id', authenticationToken, getCategory, async (req, res) => {
  if (req.body.categoryName != null) {
    res.category.categoryName = req.body.categoryName
  }
  if (req.body.description != null) {
    res.category.description = req.body.description
  }
  if (req.body.categoryId != null) {
    res.category.categoryId = req.body.categoryId
  }
  try {
    const updatedCategory = await res.category.save()
    res.json(updatedCategory)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', authenticationToken, getCategory, async (req, res) => {
  try {
    await res.category.deleteOne()

    res.json(res.category._id)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
