/**
 * Realica a requisição mediante o path passado
 * 
 * @param path 
 */
function postSubmit(path) {
    const userName = $('#userName').val();

    if (userName.length) {
        $.post(`${path}`, {name: userName}, (data, status, xhr) => {            
            if (data.user) {
                const legged = JSON.stringify(data.user);
                
                localStorage.setItem('@user', legged);
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