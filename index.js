const express = require('express')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const routes = require('./src/routes')
const bodyParser = require('body-parser')
dotenv.config()
const app = express()
const PORT = process.env.PORT || 4000
app.use(bodyParser.json())
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
