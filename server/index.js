const path = require('path')
const fs = require('fs')
const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const allowedOrigin = 'https://online-doctor-two.vercel.app'

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.json())

mongoose
  .connect(process.env.DATABASE_SERVER_URL, {
    serverSelectionTimeoutMS: 10000, // Helps reduce cold-start timeout errors
    ssl: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Connection failed!', err))

const authRouter = require('./routes/auth')
const roleRouter = require('./routes/roles')
const uploadRouter = require('./routes/uploads')
const productsRouter = require('./routes/products')
const userRoleRouter = require('./routes/userRoles')
const categoriesRouter = require('./routes/categories')
const permissionRouter = require('./routes/permissions')
const zoomRouter = require('./routes/zoom')
const blogRouter = require('./routes/blog')
// const bookingRoute = require('./routes/booking')

app.use('/auth', authRouter)
app.use('/roles', roleRouter)
app.use('/uploads', uploadRouter)
app.use('/products', productsRouter)
app.use('/userRoles', userRoleRouter)
app.use('/categories', categoriesRouter)
app.use('/permissions', permissionRouter)
app.use('/zoom', zoomRouter)
app.use('/blog', blogRouter)
// app.use('/bookings', bookingRoute)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`server running on port ${PORT}`))

// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err.stack || err)
//   res.status(500).json({
//     success: false,
//     message: 'Internal Server Error',
//     error: err.message,
//   })
// })
