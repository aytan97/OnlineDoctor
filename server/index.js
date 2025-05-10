const path = require('path')
const fs = require('fs')
const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser')
// const favicon = require('serve-favicon')
require('dotenv').config()
const app = express()
const server = http.createServer(app)

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
// app.get('/favicon.ico', (req, res) => {
//   res.status(204).end() // or serve actual file
// })
const io = new Server(server, {
  autoConnect: true,
  cors: {
    origin: 'https://online-doctor-two.vercel.app',
  },
})

// app.use(
//   cors({
//     origin: '*',
//   })
// )

const emailToSocketIdMap = new Map()
const socketIdToEmailMap = new Map()

io.on('connection', (socket) => {
  console.log('New user connected.', socket.id)

  socket.on('addCategory', (newCategory) => {
    console.log('New Category added:', newCategory)
    io.emit('categoryAdded', newCategory)
  })

  socket.on('room:join', (data) => {
    console.log(data)
    const { email, room } = data
    emailToSocketIdMap.set(email, socket.id)
    socketIdToEmailMap.set(socket.id, email)

    io.to(socket.id).emit('room:join', data)
  })

  socket.on('notification', (notification) => {
    console.log('New notification:', notification) // db ye kaydedilebilir + mail gönderin, sms gönderin, push notification gönderin
    io.emit('notification', notification)
  })

  socket.on('disconnect', () => {
    console.log('New user connected.')
  })
})

app.use(express.json())
app.use(cors())
mongoose
  .connect(process.env.DATABASE_SERVER_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database!')
  })
  .catch((err) => {
    console.log('Connection failed!', err)
    console.log('Hello, World!')
  })

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

const SOCKET_PORT = process.env.SOCKET_PORT || 7001
io.listen(SOCKET_PORT, () =>
  console.log(`socket.io server running on port ${SOCKET_PORT}`)
)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => console.log(`server running on port ${PORT}`))
