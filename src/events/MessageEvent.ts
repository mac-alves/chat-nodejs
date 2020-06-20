import { Socket } from 'socket.io';
import knex from '../database/connection';

class MessageEvent {

    onConnect(socket: Socket) {
        console.log(`socket conectado ${socket.id}`);
        
        /**
         * Envia todas as mensagens anteriores
         */
        socket.emit('previousMessages', []);
    
        /**
         * Adiciona no banco e envia a mensagem enviada
         */
        socket.on('sendMessage', async (data) => {
            console.log(data);
            const { from_user, to_user, body } = data;

            const toUserExist = await knex('users')
                .where('id', to_user)
                .select('*');
            
            if (toUserExist.length === 0) {
                // socket.broadcast
                socket.emit('receiveMessage', {
                    success: false,
                    error: 'Usuarios destino não existem.'
                });

                return
            }

            const msgCreated = await knex('posts')
                .insert({ from_user, to_user, body });

            const newMsg = await knex('posts')
                .where('id', msgCreated[0]).select('*');
            
            socket.emit('receiveMessage', newMsg);
        });
    }
}   

export default MessageEvent;