import express from 'express';
import path from 'path';
import http from 'http';
import socket from 'socket.io';
import routes from './routes';

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(routes);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

let messages: any[] = [];

io.on('connection', socket => {
	console.log(`socket conectado ${socket.id}`);

	socket.emit('previousMessages', messages);

	socket.on('sendMessage', data => {
		messages.push(data);
		socket.broadcast.emit('receiveMessage', data);
	});
});

server.listen(3000, () => {
	console.log("Server iniciado em http://localhost:3000");
});