const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Buffer, required: false, default: null }, // Use Buffer type for image
    body: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'CommonUser',
    },
    status: { type: String, required: true },
    tags: { type: [String], required: true },
  },
  { collection: 'Blogs', timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchema)
