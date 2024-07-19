const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./src/routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true,
    },
});

// Middleware để truyền io vào req
app.use((req, res, next) => {
    req.io = io;
    next();
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

app.use(bodyParser.json());
app.use(cookieParser());

require('./passport');

const momoRoutes = require('./momo');
app.use('/api/momo', momoRoutes);

routes(app);

mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect to Database success');
    })
    .catch(() => {
        console.log('Connect database ERROR');
    });

io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(PORT, () => {
    console.log('Server on running port', +PORT);
});

module.exports = { app, io };
