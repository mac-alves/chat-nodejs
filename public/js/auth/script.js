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