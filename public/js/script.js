/**
 * Realica a requisição mediante o path passado
 * 
 * @param path 
 */
function postSubmit(path) {
    var userName = $('#userName').val();

    if (userName.length) {
        $.post(`${path}`, {name: userName}, (data, status, xhr) => {
            if (data.userId) {
                localStorage.setItem('@userId', data.userId);
                responseSuccess();
            }
        }, error => {
            console.log("Erro: ", error);
            responseError(error.responseJSON.error)
        });
    }
}


/**
 * form de login
 */
$('#login').submit(function(event){
    event.preventDefault();
    postSubmit(paths.AUTH.LOGIN);
});

/**
 * form de registro de novo usuario
 */
$('#register').submit(function(event){
    event.preventDefault();
    postSubmit(paths.USERS.CREATE);
});