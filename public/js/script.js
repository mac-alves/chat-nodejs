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
 * form de login
 */
$('#login').submit(function(event){
    event.preventDefault();
    var userName = $('#userName').val();

    if (userName.length) {
        $.post('/login', {name: userName}, () => {
            responseSuccess();
        }, error => {
            console.log("Erro: ", error);
            responseError(error.responseJSON.error)
        });
    }
});

/**
 * form de registro de novo usuario
 */
$('#register').submit(function(event){
    event.preventDefault();
    var userName = $('#userName').val();

    if (userName.length) {
        $.post('/users', {name: userName}, () => {
            responseSuccess();
        }, error => {
            console.log("Erro: ", error);
            responseError(error.responseJSON.error)
        });
    }
});