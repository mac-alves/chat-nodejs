const ENTER_KEY = 13;
const URL_LOCAL = 'http://localhost:3000';
const Socket = io(URL_LOCAL);
const CANAL_MSG_RECEBIDAS = 'receiveMessage';

/**
 * Função chamada quando a requisição for ok
 * 
 * @param path path de redirecionamento - default: origin
 */
function responseSuccess(path = ''){
    window.location.replace(`${window.location.origin}${path}`);
}

/**
 * Função chamada quando a requisição der error
 * @param message menssagem de erro
 * @param idCamp campo onde ira inserir a mensagem de erro
 */
function responseError(message, idCamp = 'error'){
    $(`[name="name"]`).addClass('is-error');
    $(`#${idCamp}`).html(message);
}