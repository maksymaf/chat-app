require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRouter = require('./routes/user.route');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: 'sessions'
    })
}));
app.use(express.urlencoded({extended: false}));
app.use('/api', userRouter);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on('connect', (socket) => {
    console.log(`Client has joined the server: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Client has left the server: ${socket.id}`);
    });

    socket.on('clientMessage', (messageData) => {
        io.emit('clientMessage', messageData, socket.id);
    });
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Successfuly connected to database.');
        server.listen(PORT, () => {
            console.log('Server has successfuly started working.');
        })
    })
    .catch(() => {
        console.log('Connection failed.');
    });
