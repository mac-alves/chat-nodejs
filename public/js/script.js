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