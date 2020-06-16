var socket = io('http://localhost:3000');

function menssageRender(message) {
    $('.messages').append('<div class="message"><strong>'+message.author+'</strong>:'+message.message+'</div>')
}

socket.on('previousMessages', function(messages){
    for (message of messages) {
        menssageRender(message);
    }			
});

socket.on('receiveMessage', function(message){
    menssageRender(message);
});

$('#chat').submit(function(event){
    event.preventDefault();

    var author = $('input[name=username]').val();
    var mensage = $('input[name=mensage]').val();

    if (author.length && mensage.length) {
        var mensageObject = {
            author:author,
            message:mensage
        };

        menssageRender(mensageObject);

        socket.emit('sendMessage', mensageObject);
    }
});