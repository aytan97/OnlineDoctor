const Blog = require('../models/blog')

async function getBlog(req, res, next) {
  let blog
  try {
    blog = await Blog.findById(req.params.id)
    if (blog == null) {
      return res
        .status(404) // not bulundu
        .json({ message: 'Blog not found' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.blog = blog
  next()
}

module.exports = getBlog

// 100 -> Informational
// 200 -> Success, Created, Accepted
// 300 -> Redirection
// 400 -> Client Error (Kullanıcı bazlı)
// 500 -> Server Error (Sunucu bazlı)
