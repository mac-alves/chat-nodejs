import { Socket } from 'socket.io';
import knex from '../database/connection';

class MessageEvent {

    onConnect(socket: Socket) {
        console.log(`socket conectado ${socket.id}`);
    
        /**
         * Adiciona no banco e envia a mensagem enviada
         */
        socket.on('sendMessage', async (data) => {
            console.log(data);
            const { from_user, to_user, body, created_at } = data;

            const toUserExist = await knex('users')
                .where('id', to_user)
                .select('*');
            
            if (toUserExist.length === 0) {
                // socket.broadcast
                socket.emit('receiveMessage', {
                    success: false,
                    error: 'Usuarios destino não existem.',
                    post: []
                });

                return
            }

            const msgCreated = await knex('posts')
                .insert({ from_user, to_user, body, created_at });

            const newMsg = await knex('posts')
                .select(
                    'posts.*',  
                    'usr_to.name as to_name', 
                    'usr_from.name as from_name'
                ).join('users as usr_to', 'posts.to_user', '=', 'usr_to.id')
                .join('users as usr_from', 'posts.from_user', '=', 'usr_from.id')
                .where('posts.id', msgCreated[0])
                
            socket.emit('receiveMessage', {
                success: true,
                error: '',
                post: newMsg[0]
            });
        });
    }
}   

export default MessageEvent;