// io підключається до нашого сокет-серверу 
const socket = io('http://localhost:3000');

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageData = document.getElementById('message').value;
    document.getElementById('message').value = '';

    socket.emit('clientMessage', messageData);
});

socket.on('clientMessage', (messageData) => {
    if(messageData){
        const ul = document.getElementById('messages')
        const li = document.createElement('li');
        li.textContent = `${messageData}`;
        ul.append(li);
        ul.scrollTop = ul.scrollHeight;
    }
}); 