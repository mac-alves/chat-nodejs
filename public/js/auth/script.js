/**
 * Factory do painel de chat
 */
const chat = {
    init: function() {
        this.cacheDOM();
        this.scrollToBottom();
    },
    cacheDOM: function() {
        this.$chatHistory = $('.chat-history');
    },
    scrollToBottom: function() {
        this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
}

/**
 * Inicialica a factory realizano do scroll das mgs
 */
chat.init();

/**
 * Realiza o Logout
 */
$('#logout').click(event => {
    $.post('/logout', {}, (data, status, xhr) => {
        localStorage.clear();
        responseSuccess();
    }, error => {
        console.log("Erro: ", error);
        responseError(error.responseJSON.error)
    });
});