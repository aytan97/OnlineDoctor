const path = require('path')
const fs = require('fs')
const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const http = require('http')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(
  cors({
    origin: '*',
  })
)

const emailToSocketIdMap = new Map()
const socketIdToEmailMap = new Map()

app.use(express.json())
app.use(cors())
mongoose
// .connect(process.env.DATABASE_SERVER_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to the database!')
// })
// .catch((err) => {
//   console.log('Connection failed!', err)
//   console.log('Hello, World!')
// })

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
