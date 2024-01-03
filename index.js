const express = require('express')

const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const routes = require('./src/routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))
app.use(bodyParser.json())
app.use(cookieParser())
routes(app)

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Connect to Database success');
})

.catch(() => {
    console.log(('Connect database ERROR'));
})

app.listen(PORT,() => {
    console.log('Server on running port', + PORT);
})

