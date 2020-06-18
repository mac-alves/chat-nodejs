import { Socket } from 'socket.io';
import knex from '../database/connection';

class MessageEvent {
    public messages: any[] = [];

    onConnect(socket: Socket) {
        console.log(`socket conectado ${socket.id}`);
        
        /**
         * Envia todas as mensagens anteriores
         */
        socket.emit('previousMessages', []);
    
        /**
         * Adiciona e envia a mensagem enviada
         */
        socket.on('sendMessage', data => {
            console.log(data);
            
            const { } = data;
            // this.messages.push(data);
            socket.broadcast.emit('receiveMessage', data);
        });
    }
}   

export default MessageEvent;