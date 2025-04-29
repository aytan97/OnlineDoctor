const express = require('express')
const router = express.Router()
const { CommonUser } = require('../models/commonUser')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const getBlog = require('../middleware/getBlogs')
require('dotenv').config()

router.post('/', async (req, res) => {
  try {
    const { categoryId, title, description, image, body, status, tags } =
      req.body

    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const user = await CommonUser.findById(decodedToken.userId)
    console.log(user.role[1])
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    if (user.role[1] !== 'doctor') {
    }
    if (typeof image !== 'string' || !/^data:image\/\w+;base64,/.test(image)) {
      return res.status(400).json({ message: 'Incorrect image format' })
    }

    const base64Image = image.split(';base64,').pop()

    const imageBuffer = Buffer.from(base64Image, 'base64')
    const postingBlog = new Blog({
      categoryId,
      title,
      description,
      image: imageBuffer,
      body,
      authorId: user._id,
      status,
      tags,
    })

    await postingBlog.save()
    return res.status(201).json(postingBlog)
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'publish' })
    console.log(blogs.length)
    res.json(blogs)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/getMyBlogs', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const userId = decodedToken.userId

    const blogs = await Blog.find({ authorId: userId })
    if (blogs.length > 0) {
      res.json(blogs)
    } else {
      res.json({ message: 'You do not have blogs' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/:id', getBlog, async (req, res) => {
  res.send(res.blog)
})

router.patch('/:id', getBlog, async (req, res) => {
  try {
    if (req.body.categoryId != null) {
      res.blog.categoryId = req.body.categoryId
    }
    if (req.body.description != null) {
      res.blog.description = req.body.description
    }
    if (req.body.title != null) {
      res.blog.title = req.body.title
    }
    if (req.body.body != null) {
      res.blog.body = req.body.body
    }
    if (req.body.status != null) {
      res.blog.status = req.body.status
    }
    if (req.body.tags != null) {
      res.blog.tags = req.body.tags
    }

    if (req.body.image != null) {
      if (res.blog.image && res.blog.image.data) {
        await res.blog.image.remove()
      }
      const base64Image = req.body.image.split(';base64,').pop()
      const imageBuffer = Buffer.from(base64Image, 'base64')
      res.blog.image = imageBuffer
    }

    const updatedBlog = await res.blog.save()
    res.json(updatedBlog)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.delete('/:id', getBlog, async (req, res) => {
  try {
    await res.blog.deleteOne()
    res.json(res.blog._id)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
