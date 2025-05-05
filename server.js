const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // تحميل ملفات الواجهة

io.on('connection', (socket) => {
    console.log('⚡ مستخدم متصل!');

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // إرسال الرسالة لجميع المستخدمين
    });

    socket.on('disconnect', () => {
        console.log('❌ مستخدم غادر');
    });
});

server.listen(3000, () => {
    console.log('🚀 الخادم يعمل على http://localhost:3000');
});
