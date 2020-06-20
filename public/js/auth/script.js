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

/**
 * Logout
 */
$('#logout').click(event => {
    $.post('/logout', {}, (data, status, xhr) => {
        responseSuccess();
    }, error => {
        console.log("Erro: ", error);
        responseError(error.responseJSON.error)
    });
});