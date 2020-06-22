const ENTER_KEY = 13;
const CANAL_MSG_RECEBIDAS = 'receiveMessage';

const paths = {
    USERS: {
        SHOW: '/users/show',
        SEARCH: '/users/search',
        CREATE: '/users/create'
    },
    AUTH: {
        LOGIN: '/login',
        LOGOUT: '/logout'
    },
    MESSAGES: '/messages'
}

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