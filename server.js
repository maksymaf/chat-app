const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

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

server.listen(PORT, () => {
    console.log('Server has successfuly started working.');
})