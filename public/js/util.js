const ENTER_KEY = 13;
const URL_LOCAL = 'http://localhost:3000';
const Socket = io(URL_LOCAL);

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

/**
 * Retorna o tempo formatado da mensagem
 * 
 * @param date 
 */
function getFormatedTime(date) {
    const dateCurrent = new Date();
    const dateMsg = new Date(date);
    const dateDifference = new Date(dateCurrent - dateMsg + (dateMsg.getTimezoneOffset() * 60000)).getDate();

    let dateFinal = 'ontem';

    if (dateDifference >= 3) {
        dateFinal = new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }).format(dateMsg);
    }

    if (dateDifference === 1) {
        dateFinal = new Intl.DateTimeFormat('pt-BR', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false,
        }).format(dateMsg);
    }

    return dateFinal;
}