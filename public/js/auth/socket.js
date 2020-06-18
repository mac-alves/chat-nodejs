var socket = io('http://localhost:3000');

function menssageRender(message) {
    $('.messages').append('<div class="message"><strong>'+message.author+'</strong>:'+message.message+'</div>')
}

socket.on('previousMessages', function(messages){
    console.log(messages);
    
    for (message of messages) {
        menssageRender(message);
    }			
});

socket.on('receiveMessage', function(message){
    menssageRender(message);
});